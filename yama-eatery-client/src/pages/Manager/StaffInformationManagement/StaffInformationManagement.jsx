import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import { Add, Delete, Search, Update } from '@mui/icons-material'
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
import React, { useState } from 'react'
import AddStaff from './AddStaff'
import UpdateStaff from './UpdateStaff'

const headCells = [
	{ name: 'ID', orderData: 'id', numeric: true, widthPercent: 5 },
	{ name: 'Image', orderData: 'image', numeric: false, widthPercent: 20 },
	{ name: 'Email', orderData: 'email', numeric: false, widthPercent: 25 },
	{ name: 'Phone', orderData: 'phone', numeric: true, widthPercent: 20 },
	{ name: 'Gender', orderData: 'gender', numeric: false, widthPercent: 10 },
	{ name: 'Action', widthPercent: 10 },
]

export function createData(id, image, email, phone, gender, name) {
	return { id, image, email, phone, gender, name }
}

const rows = [
	createData(
		1,
		'https://via.placeholder.com/100',
		'user1@example.com',
		'0123456789',
		'Male',
		'John Doe'
	),
	createData(
		2,
		'https://via.placeholder.com/100',
		'user2@example.com',
		'0987654321',
		'Female',
		'Jane Smith'
	),
	createData(
		3,
		'https://via.placeholder.com/100',
		'user3@example.com',
		'0192837465',
		'Male',
		'Michael Johnson'
	),
	createData(
		4,
		'https://via.placeholder.com/100',
		'user4@example.com',
		'0246813579',
		'Female',
		'Emily Davis'
	),
	createData(
		5,
		'https://via.placeholder.com/100',
		'user5@example.com',
		'0357911135',
		'Male',
		'David Brown'
	),
	createData(
		6,
		'https://via.placeholder.com/100',
		'user6@example.com',
		'0468201357',
		'Female',
		'Linda Wilson'
	),
	createData(
		7,
		'https://via.placeholder.com/100',
		'user7@example.com',
		'0579313579',
		'Male',
		'James Miller'
	),
	createData(
		8,
		'https://via.placeholder.com/100',
		'user8@example.com',
		'0689425791',
		'Female',
		'Sophia Garcia'
	),
	createData(
		9,
		'https://via.placeholder.com/100',
		'user9@example.com',
		'0791535791',
		'Male',
		'William Martinez'
	),
	createData(
		10,
		'https://via.placeholder.com/100',
		'user10@example.com',
		'0813579135',
		'Female',
		'Olivia Rodriguez'
	),
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

	const [openAddPage, setOpenAddPage] = useState(false)

	const handleRequestSort = (event, property) => {
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

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	const visibleRows = React.useMemo(() => {
		const filteredRows = rows.filter((row) => {
			return searchName ? row.name.toLowerCase().includes(searchName.toLowerCase()) : true
		})

		return filteredRows
			.sort(getComparator(order, orderBy))
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}, [order, orderBy, page, rowsPerPage, searchName])

	return (
		<Paper
			sx={{
				width: '100%',
				bgcolor: '#f0f2f5',
			}}
		>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight={'bold'}>
					Staff Management
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

				<Stack direction={'row'} justifyContent={'space-between'} padding={'0 1%'}>
					<React.Fragment>
						<Button variant='contained' onClick={() => setOpenAddPage(true)} startIcon={<Add />}>
							Add New Staff
						</Button>
						{openAddPage && (
							<AddStaff open={openAddPage} handleClose={() => setOpenAddPage(false)} />
						)}
					</React.Fragment>
				</Stack>
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
						{visibleRows.map((row) => {
							return (
								<TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
									<TableCell align='right'>{row.id}</TableCell>
									<TableCell>
										<Stack direction='row' spacing={2} alignItems='center'>
											<Avatar alt={row.name} src={row.image} />
											<Typography>{row.name}</Typography>
										</Stack>
									</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell align='right'>{row.phone}</TableCell>
									<TableCell>{row.gender}</TableCell>

									<TableCell>
										<CrudMenuOptions>
											<MenuItem>
												<React.Fragment>
													<Button onClick={() => setOpenAddPage(true)} startIcon={<Update />}>
														Update Staff
													</Button>
													{openAddPage && (
														<UpdateStaff
															open={openAddPage}
															handleClose={() => setOpenAddPage(false)}
														/>
													)}
												</React.Fragment>
											</MenuItem>

											<MenuItem>
												<CrudConfirmation
													title='Delete Confirmation'
													description='Are you sure you want to delete this?'
													handleConfirm={() => alert('Deleted')}
												>
													{(handleOpen) => (
														<Button onClick={handleOpen} startIcon={<Delete />}>
															Remove
														</Button>
													)}
												</CrudConfirmation>
											</MenuItem>
										</CrudMenuOptions>
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
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Paper>
	)
}

export default StaffInformationManagement
