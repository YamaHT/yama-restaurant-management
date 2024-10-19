import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import { AccessAlarm, Add, Delete, Search, Update } from '@mui/icons-material'
import {
	Autocomplete,
	Button,
	Checkbox,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	FormControlLabel,
	IconButton,
	InputAdornment,
	MenuItem,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddStaffAttendance from './AddStaffAttendance'
import UpdateStaffAttendance from './UpdateStaffAttendance'
import { StaffManagementService } from '@/services/StaffManagementService'

const headCells = [
	{
		name: 'ID',
		orderData: 'id',
		numeric: true,
		widthPercent: 5,
	},
	{
		name: 'Name',
		orderData: 'name',
		numeric: false,
		widthPercent: 20,
	},

	{
		name: 'CheckIn',
		orderData: 'checkin',
		numeric: false,
		widthPercent: 10,
	},
	{
		name: 'CheckOut',
		orderData: 'checkout',
		numeric: false,
		widthPercent: 10,
	},
	{
		name: 'Workhours',
		orderData: 'workhours',
		numeric: true,
		widthPercent: 5,
	},
	{
		name: 'LateOrEarly',
		orderData: 'lateOrEarly',
		numeric: false,
		widthPercent: 20,
	},
	{
		name: '',
		widthPercent: 20,
	},
]

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

const StaffAttendanceManagement = () => {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [page, setPage] = useState(0)
	const [searchName, setSearchName] = useState(null)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [staffAttendance, setStaffAttendance] = useState([])
	const [openAddPage, setOpenAddPage] = useState(false)
	const [openMembershipDialog, setOpenMembershipDialog] = useState(false)
	const [checkinStatus, setCheckinStatus] = useState('checkin')
	const fetchStaffAttendance = async () => {
		const data = await StaffManagementService.STAFF_ATTENDANCE_LIST()
		if (data) {
			setStaffAttendance(data)
			console.log(data)
		}
	}
	useEffect(() => {
		fetchStaffAttendance()
	}, [])

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}
	const handleCloseMembershipDialog = () => {
		setOpenMembershipDialog(false)
	}
	const handleOpenMembershipDialog = () => {
		setOpenMembershipDialog(true)
	}

	const handleChangePage = (e, newPage) => {
		setPage(newPage)
	}
	const handleCheckboxChange = (id, field) => {
		setStaffAttendance((prevRows) =>
			prevRows.map((row) => (row.id === id ? { ...row, [field]: !row[field] } : row))
		)
	}
	const handleCheckinClick = (id) => {
		setStaffAttendance((prevRows) =>
			prevRows.map((row) => {
				if (row.id === id) {
					setCheckinStatus('checkout')
					return { ...row, checkinStatus: 'checkout' }
				}
				return row
			})
		)
	}
	const handleCheckoutClick = (id) => {
		setStaffAttendance((prevRows) =>
			prevRows.map((row) => {
				if (row.id === id) {
					setCheckinStatus('checkbox')
					return { ...row, checkinStatus: 'checkbox' }
				}
				return row
			})
		)
	}

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10))
		setPage(0)
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staffAttendance.length) : 0

	const visibleRows = React.useMemo(() => {
		const filteredRows = staffAttendance.filter((row) => {
			return searchName ? row.name.toLowerCase().includes(searchName.toLowerCase()) : true
		})

		return filteredRows
			.sort(getComparator(order, orderBy))
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}, [order, orderBy, page, rowsPerPage, searchName, staffAttendance])

	return (
		<Paper
			sx={{
				width: '100%',
				padding: '1%',
				bgcolor: '#f0f2f5',
				zIndex: -1,
			}}
		>
			<Stack marginBottom={1} spacing={1}>
				<Typography variant='h5' fontWeight={'bold'}>
					Staff Attendance Management
				</Typography>
				<Stack direction={'row'} justifyContent={'space-between'} padding={'0 1%'}>
					<Autocomplete
						size='small'
						options={[]}
						value={searchName}
						onChange={(event, newValue) => setSearchName(newValue)}
						freeSolo
						sx={{ width: '50%' }}
						renderInput={(params) => (
							<TextField
								{...params}
								InputProps={{
									...params.InputProps,
									startAdornment: (
										<InputAdornment position='start'>
											<Search />
										</InputAdornment>
									),
								}}
								placeholder='Search by name...'
							/>
						)}
					/>
				</Stack>
			</Stack>
			<Button
				variant='contained'
				sx={{ mb: 1, width: '300px' }}
				onClick={handleOpenMembershipDialog}
			>
				Add Staff
			</Button>
			<Paper sx={{ borderRadius: 3, overflow: 'auto' }}>
				<Table stickyHeader sx={{ minWidth: '750px' }}>
					<CrudTableHead
						order={order}
						orderBy={orderBy}
						headCells={headCells}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>
						{visibleRows.map((row) => {
							return (
								<TableRow hover key={row.id}>
									<TableCell align='center'>{row.id}</TableCell>
									<TableCell>{row.employee.name}</TableCell>
									<TableCell>{row.checkInTime}</TableCell>
									<TableCell>{row.checkOutTime}</TableCell>
									<TableCell align='right'>{row.workHours}</TableCell>
									<TableCell>
										<Stack direction={'row'} spacing={1}>
											{row.isLate && <Chip variant='filled' color='error' label='Late Arrived' />}
											{row.isEarlyDeparture && (
												<Chip variant='filled' color='error' label='Early Departure' />
											)}
										</Stack>
									</TableCell>
									<TableCell>
										<Stack direction={'column'} spacing={1}>
											{checkinStatus === 'checkin' && (
												<Button
													startIcon={<AccessAlarm />}
													onClick={() => handleCheckinClick(row.id)}
													variant='contained'
													color='primary'
												>
													Check in
												</Button>
											)}
											{checkinStatus === 'checkout' && (
												<Button
													startIcon={<AccessAlarm />}
													onClick={() => handleCheckoutClick(row.id)}
													variant='contained'
												>
													Check out
												</Button>
											)}

											{checkinStatus === 'checkbox' && (
												<FormControlLabel
													control={
														<Checkbox
															checked={row.isLate}
															onChange={() => handleCheckboxChange(row.id, 'isLate')}
														/>
													}
													label='Late Arrived'
												/>
											)}

											{checkinStatus === 'checkbox' && (
												<FormControlLabel
													control={
														<Checkbox
															checked={row.isEarlyDeparture}
															onChange={() => handleCheckboxChange(row.id, 'isEarlyDeparture')}
														/>
													}
													label='Early Departure'
												/>
											)}

											<Button
												variant='contained'
												onClick={() => setOpenAddPage(true)}
												startIcon={<Update />}
												color='success'
											>
												Update
											</Button>
											{openAddPage && (
												<UpdateStaffAttendance
													open={openAddPage}
													handleClose={() => setOpenAddPage(false)}
												/>
											)}

											<CrudConfirmation
												title='Delete Confirmation'
												description='Are you sure you want to delete this?'
												handleConfirm={() => alert('Deleted')}
											>
												{(handleOpen) => (
													<Button
														color='error'
														startIcon={<Delete />}
														variant='contained'
														onClick={handleOpen}
													>
														Delete
													</Button>
												)}
											</CrudConfirmation>
										</Stack>
									</TableCell>
								</TableRow>
							)
						})}
						{emptyRows > 0 && (
							<TableRow>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 20]}
					component={'div'}
					count={staffAttendance.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<Dialog
				open={openMembershipDialog}
				onClose={handleCloseMembershipDialog}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogContent>
					<AddStaffAttendance />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseMembershipDialog}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</Paper>
	)
}

export default StaffAttendanceManagement
