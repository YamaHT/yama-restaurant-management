import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import { StaffAttendanceManagementService } from '@/services/StaffAttendanceManagementService'
import { AccessAlarm, Add, Delete, Update } from '@mui/icons-material'
import {
	Avatar,
	Button,
	Chip,
	MenuItem,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddStaffAttendance from './AddStaffAttendance'
import UpdateStaffAttendance from './UpdateStaffAttendance'
import { AssetImages } from '@/utilities/AssetImages'

const headCells = [
	{
		name: 'Id',
		orderData: 'id',
		numeric: true,
		widthPercent: 5,
	},
	{
		name: 'Employee',
		orderData: 'employee.name',
		numeric: false,
		widthPercent: 25,
	},
	{
		name: 'CheckIn',
		orderData: 'checkin',
		numeric: false,
		widthPercent: 15,
	},
	{
		name: 'CheckOut',
		orderData: 'checkout',
		numeric: false,
		widthPercent: 15,
	},
	{
		name: 'Workhours',
		orderData: 'workhours',
		numeric: true,
		widthPercent: 10,
	},
	{
		name: 'LateOrEarly',
		orderData: 'lateOrEarly',
		numeric: false,
		widthPercent: 25,
	},
	{
		name: '',
		widthPercent: 5,
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
	const [searchName, setSearchName] = useState('')
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [staffAttendance, setStaffAttendance] = useState([])
	const [selectedAttendance, setSelectedAttendance] = useState(null)

	const [openUpdatePage, setOpenUpdatePage] = useState(false)
	const [openStaffListDialog, setOpenStaffListDialog] = useState(false)

	const today = new Date()

	useEffect(() => {
		const fetchStaffAttendance = async () => {
			const data = await StaffAttendanceManagementService.GET_TODAY_ATTENDANCE()
			if (data) {
				setStaffAttendance(data)
			}
		}
		fetchStaffAttendance()
	}, [])

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleAddStaffAttendance = async (staffId) => {
		const data = await StaffAttendanceManagementService.ADD_STAFF_ATTENDANCE(staffId)
		if (data) {
			setStaffAttendance(data)
		}
	}

	const handleChangePage = (e, newPage) => {
		setPage(newPage)
	}

	const handleSelectAttendance = (attendance) => {
		setSelectedAttendance(attendance)
		setOpenUpdatePage(true)
	}

	const handleCheckinClick = async (id) => {
		const data = await StaffAttendanceManagementService.CHECK_IN(id)
		if (data) {
			setStaffAttendance(data)
		}
	}
	const handleCheckoutClick = async (id) => {
		const data = await StaffAttendanceManagementService.CHECK_OUT(id)
		if (data) {
			setStaffAttendance(data)
		}
	}

	const handleUpdateStaffAttendance = async (formData) => {
		const data = await StaffAttendanceManagementService.UPDATE_STAFF_ATTENDANCE(formData)
		if (data) {
			setStaffAttendance(data)
		}
	}
	const handleDeleteStaffAttendance = async (employeeId) => {
		const data = await StaffAttendanceManagementService.DELETE_STAFF_ATTENDANCE(employeeId)
		if (data) {
			setStaffAttendance(data)
		}
	}

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10))
		setPage(0)
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staffAttendance.length) : 0

	const visibleRows = React.useMemo(() => {
		const filteredRows = staffAttendance.filter((row) => {
			return searchName ? row.employee.name?.toLowerCase().includes(searchName.toLowerCase()) : true
		})

		return filteredRows
			.sort(getComparator(order, orderBy))
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}, [order, orderBy, page, rowsPerPage, searchName, staffAttendance])

	return (
		<Stack spacing={2}>
			<Typography variant='h5' fontWeight={'bold'}>
				Staff Attendance Management - {`${today.toLocaleDateString()}`}
			</Typography>
			<Stack direction={'row'} justifyContent={'space-between'}>
				<CrudSearchBar
					listItem={staffAttendance.map((attendance) => attendance.employee.name)}
					value={searchName}
					handleChange={(event, newValue) => setSearchName(newValue)}
					placeholder={'Search by name...'}
					widthPercent={30}
				/>
				<Button
					variant='contained'
					onClick={() => setOpenStaffListDialog(true)}
					startIcon={<Add />}
				>
					Add New Attendance
				</Button>
			</Stack>
			<Paper sx={{ borderRadius: 3, overflow: 'auto' }}>
				<Table stickyHeader sx={{ minWidth: '750px' }}>
					<CrudTableHead
						order={order}
						orderBy={orderBy}
						headCells={headCells}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>
						{visibleRows.length > 0 ? (
							visibleRows.map((row) => {
								return (
									<TableRow hover key={row.id}>
										<TableCell align='right'>{row.id}</TableCell>
										<TableCell sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
											<Avatar
												variant='rounded'
												src={AssetImages.EmployeeImage(row.employee.image)}
											/>{' '}
											{row.employee.name}
										</TableCell>
										<TableCell>{row.checkInTime}</TableCell>
										<TableCell>{row.checkOutTime}</TableCell>
										<TableCell align='right'>{row.workHours}</TableCell>
										<TableCell>
											<Stack direction={'row'} spacing={1}>
												{row.lateArrival && (
													<Chip variant='filled' color='error' label='Late Arrived' />
												)}
												{row.earlyLeave && (
													<Chip variant='filled' color='error' label='Early Departure' />
												)}
												{!row.lateArrival && !row.earlyLeave && (
													<Chip variant='filled' color='success' label='Good status' />
												)}
											</Stack>
										</TableCell>
										<TableCell>
											<CrudMenuOptions>
												<Stack direction={'column'} spacing={1}>
													{row.checkInTime === '00:00:00' && (
														<MenuItem>
															<Button
																variant='outlined'
																startIcon={<AccessAlarm />}
																onClick={() => handleCheckinClick(row.id)}
															>
																Check in
															</Button>
														</MenuItem>
													)}
													{row.checkInTime !== '00:00:00' && row.checkOutTime === '00:00:00' && (
														<MenuItem>
															<Button
																variant='outlined'
																startIcon={<AccessAlarm />}
																onClick={() => handleCheckoutClick(row.id)}
															>
																Check out
															</Button>
														</MenuItem>
													)}
													{row.checkInTime !== '00:00:00' && row.checkOutTime !== '00:00:00' && (
														<MenuItem>
															<Button
																variant='outlined'
																onClick={() => handleSelectAttendance(row)}
																startIcon={<Update />}
															>
																Update
															</Button>
															{openUpdatePage && (
																<UpdateStaffAttendance
																	open={openUpdatePage}
																	handleClose={() => setOpenUpdatePage(false)}
																	onUpdate={handleUpdateStaffAttendance}
																	currentStaffAttendance={selectedAttendance}
																/>
															)}
														</MenuItem>
													)}
													<MenuItem>
														<CrudConfirmation
															title='Delete Confirmation'
															description='Are you sure you want to delete this?'
															handleConfirm={() => handleDeleteStaffAttendance(row.id)}
														>
															{(handleOpen) => (
																<Button
																	variant='outlined'
																	startIcon={<Delete />}
																	onClick={handleOpen}
																>
																	Delete
																</Button>
															)}
														</CrudConfirmation>
													</MenuItem>
												</Stack>
											</CrudMenuOptions>
										</TableCell>
									</TableRow>
								)
							})
						) : (
							<TableRow>
								<TableCell colSpan={100} align='center'>
									No attendances are specified
								</TableCell>
							</TableRow>
						)}
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

			<AddStaffAttendance
				open={openStaffListDialog}
				handleClose={() => setOpenStaffListDialog(false)}
				handleAddStaffAttendance={handleAddStaffAttendance}
			/>
		</Stack>
	)
}

export default StaffAttendanceManagement
