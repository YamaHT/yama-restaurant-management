import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import { ManagerRequest, UserManagementRequest } from '@/requests/UserManagementRequest'
import { UserManagementService } from '@/services/UserManagementService'
import { UserService } from '@/services/UserService'
import { Search } from '@mui/icons-material'
import {
	Autocomplete,
	Box,
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
import React, { useEffect, useState } from 'react'

const headCells = [
	{
		name: 'ID',
		orderData: 'id',
		numeric: false,
		widthPercent: 5,
	},
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
	const [membership, setMembership] = useState([])

	const fetchMembership = async () => {
		try {
			const data = await UserManagementService.VIEW_MEMBERSHIP_REQUEST()
			if (data) {
				setMembership(data)
				console.log(data)
			}
		} catch (error) {
			console.error('Error fetching membership data:', error)
		}
	}
	useEffect(() => {
		fetchMembership()
	}, [])

	const handleDenyMembership = async (id) => {
		const data = await UserManagementService.DENY_MEMBERSHIP(id)
		console.log(data)
		await fetchMembership()
	}

	const handlApproveMembership = async (id) => {
		const data = await UserManagementService.APPROVE_MEMBERSHIP(id)
		console.log(data)
		await fetchMembership()
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

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - membership.length) : 0

	const visibleRows = React.useMemo(
		() =>
			[...membership]
				.filter(
					(membership) =>
						!searchPhone || membership.phone.toLowerCase().includes(searchPhone.toLowerCase())
				)
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage, searchPhone, membership]
	)

	return (
		<Box width={'500px'}>
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

			<Paper>
				<Table stickyHeader sx={{ minWidth: '200px' }}>
					<CrudTableHead
						order={order}
						orderBy={orderBy}
						headCells={headCells}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>
						{visibleRows.length > 0 ? (
							visibleRows.map((row) => (
								<TableRow hover key={row} sx={{ cursor: 'pointer' }}>
									<TableCell>{row.id}</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.phone}</TableCell>
									<TableCell>
										<Stack direction='row' spacing={1}>
											<Button
												variant='contained'
												color='error'
												onClick={() => handleDenyMembership(row.id)}
											>
												Deny
											</Button>
											<Button
												variant='contained'
												color='success'
												onClick={() => handlApproveMembership(row.id)}
											>
												Approve
											</Button>
										</Stack>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={10} align='center'>
									No membership requests available.
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
					count={membership.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	)
}
