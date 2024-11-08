import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import { StaffInformationManagementService } from '@/services/StaffInformationManagementService'
import { AssetImages } from '@/utilities/AssetImages'
import { Add, Delete, Edit, Search } from '@mui/icons-material'
import {
	Autocomplete,
	Avatar,
	Button,
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
import AddStaff from './AddStaff'
import UpdateStaff from './UpdateStaff'

const headCells = [
	{ name: 'Id', orderData: 'id', numeric: true, widthPercent: 5 },
	{ name: 'Name', orderData: 'name', numeric: false, widthPercent: 20 },
	{ name: 'Email', orderData: 'email', numeric: false, widthPercent: 20 },
	{ name: 'Birthday', orderData: 'birthday', numeric: false, widthPercent: 15 },
	{ name: 'Phone', orderData: 'phone', numeric: false, widthPercent: 15 },
	{ name: 'Gender', orderData: 'gender', numeric: false, widthPercent: 10 },
	{ name: 'Position', orderData: 'position.name', numeric: false, widthPercent: 15 },
	{ name: '', widthPercent: 5 },
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

const StaffInformationManagement = () => {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [page, setPage] = useState(0)
	const [searchName, setSearchName] = useState(null)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [staffInformation, setStaffInformation] = useState([])
	const [openAddPage, setOpenAddPage] = useState(false)
	const [openUpdatePage, setOpenUpdatePage] = useState(false)
	const [selectedStaff, setSelectedStaff] = useState(null)

	useEffect(() => {
		const fetchStaffInformation = async () => {
			const data = await StaffInformationManagementService.GET_ALL_STAFF()
			if (data) {
				setStaffInformation(data)
			}
		}
		fetchStaffInformation()
	}, [])

	const handleRemoveStaff = async (employeeId) => {
		const data = await StaffInformationManagementService.DELETE_STAFF(employeeId)
		if (data) {
			setStaffInformation(data)
		}
	}

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (e, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10))
		setPage(0)
	}

	const handleAddStaff = async (formData) => {
		const data = await StaffInformationManagementService.ADD_STAFF(formData)
		if (data) {
			setStaffInformation(data)
		}
	}

	const handleUpdateStaff = async (formData) => {
		const data = await StaffInformationManagementService.UPDATE_STAFF(formData)
		if (data) {
			setStaffInformation(data)
		}
	}

	const handleUpdateClick = (staff) => {
		setSelectedStaff(staff)
		setOpenUpdatePage(true)
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staffInformation.length) : 0

	const visibleRows = React.useMemo(() => {
		const filteredRows = staffInformation.filter((row) => {
			return searchName ? row.name.toLowerCase().includes(searchName.toLowerCase()) : true
		})

		return filteredRows
			.sort(getComparator(order, orderBy))
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}, [order, orderBy, page, rowsPerPage, searchName, staffInformation])

	return (
		<Stack spacing={2}>
			<Typography variant='h5' fontWeight={'bold'}>
				Staff Information Management
			</Typography>
			<Stack direction={'row'} justifyContent={'space-between'}>
				<Autocomplete
					size='small'
					options={[]}
					value={searchName}
					onChange={(newValue) => setSearchName(newValue)}
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
				<Button variant='contained' onClick={() => setOpenAddPage(true)} startIcon={<Add />}>
					Add New Staff
				</Button>
				{openAddPage && (
					<AddStaff
						open={openAddPage}
						handleClose={() => setOpenAddPage(false)}
						handleAddStaff={handleAddStaff}
					/>
				)}
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
									<TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
										<TableCell align='right'>{row.id}</TableCell>
										<TableCell>
											<Stack direction='row' spacing={2} alignItems='center'>
												<Avatar alt={row.name} src={AssetImages.EmployeeImage(row.image)} />
												<Typography>{row.name}</Typography>
											</Stack>
										</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell>{row.birthday}</TableCell>
										<TableCell>{row.phone}</TableCell>
										<TableCell>{row.gender}</TableCell>
										<TableCell>{row.position?.name}</TableCell>
										<TableCell>
											<CrudMenuOptions>
												<MenuItem>
													<Button
														variant='outlined'
														onClick={() => handleUpdateClick(row)}
														startIcon={<Edit />}
													>
														Update
													</Button>
													{openUpdatePage && (
														<UpdateStaff
															open={openUpdatePage}
															handleClose={() => setOpenUpdatePage(false)}
															handleUpdateStaff={handleUpdateStaff}
															existingStaff={selectedStaff}
														/>
													)}
												</MenuItem>
												<MenuItem>
													<CrudConfirmation
														title='Delete Confirmation'
														description='Are you sure you want to delete this?'
														handleConfirm={() => handleRemoveStaff(row.id)}
													>
														{(handleOpen) => (
															<Button
																variant='outlined'
																onClick={handleOpen}
																startIcon={<Delete />}
															>
																Remove
															</Button>
														)}
													</CrudConfirmation>
												</MenuItem>
											</CrudMenuOptions>
										</TableCell>
									</TableRow>
								)
							})
						) : (
							<TableRow>
								<TableCell colSpan={100} align='center'>
									No employees available
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
					count={staffInformation.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Stack>
	)
}

export default StaffInformationManagement
