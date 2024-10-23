import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import {
	Autocomplete,
	Avatar,
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
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

import { Search, TrendingUpTwoTone } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import ViewMembershipRequest from './ViewMebershipRequest'
import { UserManagementService } from '@/services/UserManagementService'
import { AssetImages } from '@/utilities/AssetImages'

const headCells = [
	{
		name: 'Id',
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
		name: 'Email',
		orderData: 'email',
		numeric: false,
		widthPercent: 20,
	},
	{
		name: 'Phone',
		orderData: 'phone',
		numeric: true,
		widthPercent: 20,
	},
	{
		name: 'Gender',
		orderData: 'gender',
		numeric: false,
		widthPercent: 10,
	},
	{
		name: 'Birthday',
		orderData: 'birthday',
		numeric: false,
		widthPercent: 15,
	},
	{
		name: 'Status',
		orderData: 'isMembership',
		numeric: false,
		widthPercent: 10,
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

export default function UserManagement() {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [page, setPage] = useState(0)
	const [searchPhone, setSearchPhone] = useState(null)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [openMembershipDialog, setOpenMembershipDialog] = useState(false)
	const [user, setUser] = useState([])

	const fetchUserList = async () => {
		try {
			const data = await UserManagementService.VIEW_USER_LIST()
			if (data) {
				setUser(data)
				console.log(data)
			}
		} catch (error) {
			console.error('Error fetching user list data')
		}
	}
	useEffect(() => {
		fetchUserList()
	}, [])

	const handleOpenMembershipDialog = () => {
		setOpenMembershipDialog(true)
	}

	const handleCloseMembershipDialog = () => {
		setOpenMembershipDialog(false)
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

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - user.length) : 0

	const visibleRows = React.useMemo(
		() =>
			[...user]
				.filter(
					(row) => !searchPhone || row.phone.toLowerCase().includes(searchPhone.toLowerCase())
				)
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage, searchPhone, user]
	)

	return (
		<Box>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight={'bold'}>
					User Management
				</Typography>

				<Stack direction={'row'} justifyContent={'space-between'} padding={'0 1%'}>
					<Autocomplete
						size='small'
						options={[]}
						value={searchPhone}
						onChange={(newValue) => setSearchPhone(newValue)}
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
								placeholder='Search by phone...'
							/>
						)}
					/>

					<Button variant='contained' onClick={handleOpenMembershipDialog}>
						View Membership Request
					</Button>
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
						{visibleRows.length > 0 ? (
							visibleRows.map((row, index) => (
								<TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
									<TableCell align='right'>{row.id}</TableCell>
									<TableCell>
										<Stack direction='row' spacing={2} alignItems='center'>
											<Avatar alt={row.name} src={AssetImages.UserImage(row.image)} />
											<Typography>{row.name}</Typography>
										</Stack>
									</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell align='right'>{row.phone}</TableCell>
									<TableCell>{row.gender}</TableCell>
									<TableCell>{row.birthday}</TableCell>
									<TableCell>
										{row.isMembership ? (
											<Chip label='Membership' color='success' />
										) : (
											<Chip label='Not membership' color='error' />
										)}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={10} align='center'>
									No users available.
								</TableCell>
							</TableRow>
						)}

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={user.length}
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
					<ViewMembershipRequest />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseMembershipDialog}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}
