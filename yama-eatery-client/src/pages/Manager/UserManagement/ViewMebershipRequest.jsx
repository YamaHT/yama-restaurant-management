import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import { UserService } from '@/services/UserService'
import { Search } from '@mui/icons-material'
import {
	Autocomplete,
	Button,
	InputAdornment,
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

const headCells = [
	{
		name: 'Name',
		orderData: 'name',
		numeric: false,
		widthPercent: 10,
	},

	{
		name: 'Phone',
		orderData: 'phone',
		numeric: false,
		widthPercent: 10,
	},
	{},
]

function createData(name, phone) {
	return {
		name,
		phone,
	}
}

const rows = [
	createData('User 1', '0123456789'),
	createData('User 2', '0987654321'),
	createData('User 3', '0192837465'),
	createData('User 4', '0246813579'),
	createData('User 5', '0357911135'),
	createData('User 6', '0468201357'),
	createData('User 7', '0579313579'),
	createData('User 8', '0689425791'),
	createData('User 9', '0791535791'),
	createData('User 10', '0813579135'),
	createData('User 11', '0924681357'),
	createData('User 12', '1035791357'),
	createData('User 13', '1146913579'),
	createData('User 14', '1257035791'),
	createData('User 15', '1368145791'),
	createData('User 16', '1479257913'),
	createData('User 17', '1580368135'),
	createData('User 18', '1691479257'),
	createData('User 19', '1702580368'),
	createData('User 20', '1813691479'),
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

export default function ViewMembershipRequest() {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [page, setPage] = useState(0)
	const [searchPhone, setSearchPhone] = useState(null)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [membershipStatus, setMembershipStatus] = useState('')

	const handleCancelMembership = async () => {
		const data = await UserService.CANCEL_MEMBERSHIP()
		console.log(data)
		setMembershipStatus(data.membershipStatus)
		setMembershipStatus('Inactive')
	}

	const handleMembershipRegister = async () => {
		const data = await UserService.REGISTER_MEMBERSHIP()
		console.log(data)
		setMembershipStatus(data.membershipStatus)
		setMembershipStatus('Requesting')
	}

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

	const visibleRows = React.useMemo(
		() =>
			[...rows]
				.filter(
					(row) => !searchPhone || row.phone.toLowerCase().includes(searchPhone.toLowerCase())
				)
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage, searchPhone]
	)

	return (
		<>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight={'bold'}>
					View Membership Request
				</Typography>

				<Stack direction={'row'} justifyContent={'space-between'} padding={'0 1%'}>
					<Autocomplete
						size='small'
						options={[]}
						value={searchPhone}
						onChange={(event, newValue) => setSearchPhone(newValue)}
						freeSolo
						sx={{ width: '100%' }}
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
								placeholder='Search by phone...'
							/>
						)}
					/>
				</Stack>
			</Stack>

			<Paper sx={{ borderRadius: 3, overflow: 'auto' }}>
				<Table stickyHeader sx={{ minWidth: '200px' }}>
					<CrudTableHead
						order={order}
						orderBy={orderBy}
						headCells={headCells}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>
						{visibleRows.map((row, index) => {
							return (
								<TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
									<TableCell>{row.name}</TableCell>

									<TableCell>{row.phone}</TableCell>
									<TableCell>
										<Stack direction='row' spacing={1}>
											<Button variant='contained' color='error' onClick={handleCancelMembership}>
												Deny
											</Button>
											<Button
												variant='contained'
												color='success'
												onClick={handleMembershipRegister}
											>
												Approve
											</Button>
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
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	)
}
