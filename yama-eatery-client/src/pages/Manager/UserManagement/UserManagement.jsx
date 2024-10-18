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

import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import ViewMembershipRequest from './ViewMebershipRequest'

const headCells = [
	{
		name: 'Id',
		orderData: 'id',
		numeric: true,
		widthPercent: 10,
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
		numeric: false,
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
		widthPercent: 5,
	},
]

function createData(id, name, email, image, phone, gender, birthday, isMembership) {
	return {
		id,
		name,
		email,
		phone,
		gender,
		birthday,
		image,
		isMembership,
	}
}
const rows = [
	createData(
		1,
		'User 1',
		'user1@example.com',
		'https://via.placeholder.com/100',
		'0123456789',
		'Male',
		'1990-01-01',
		true
	),
	createData(
		2,
		'User 2',
		'user2@example.com',
		'https://via.placeholder.com/100',
		'0987654321',
		'Female',
		'1992-02-02',
		true
	),
	createData(
		3,
		'User 3',
		'user3@example.com',
		'https://via.placeholder.com/100',
		'0192837465',
		'Male',
		'1993-03-03',
		false
	),
	createData(
		4,
		'User 4',
		'user4@example.com',
		'https://via.placeholder.com/100',
		'0246813579',
		'Female',
		'1994-04-04',
		false
	),
	createData(
		5,
		'User 5',
		'user5@example.com',
		'https://via.placeholder.com/100',
		'0357911135',
		'Male',
		'1995-05-05',
		false
	),
	createData(
		6,
		'User 6',
		'user6@example.com',
		'https://via.placeholder.com/100',
		'0468201357',
		'Female',
		'1996-06-06',
		false
	),
	createData(
		7,
		'User 7',
		'user7@example.com',
		'https://via.placeholder.com/100',
		'0579313579',
		'Male',
		'1997-07-07',
		false
	),
	createData(
		8,
		'User 8',
		'user8@example.com',
		'https://via.placeholder.com/100',
		'0689425791',
		'Female',
		'1998-08-08',
		false
	),
	createData(
		9,
		'User 9',
		'user9@example.com',
		'https://via.placeholder.com/100',
		'0791535791',
		'Male',
		'1999-09-09',
		false
	),
	createData(
		10,
		'User 10',
		'user10@example.com',
		'https://via.placeholder.com/100',
		'0813579135',
		'Female',
		'2000-10-10',
		false
	),
	createData(
		11,
		'User 11',
		'user11@example.com',
		'https://via.placeholder.com/100',
		'0924681357',
		'Male',
		'2001-11-11',
		false
	),
	createData(
		12,
		'User 12',
		'user12@example.com',
		'https://via.placeholder.com/100',
		'1035791357',
		'Female',
		'2002-12-12',
		false
	),
	createData(
		13,
		'User 13',
		'user13@example.com',
		'https://via.placeholder.com/100',
		'1146913579',
		'Male',
		'1995-01-01',
		false
	),
	createData(
		14,
		'User 14',
		'user14@example.com',
		'https://via.placeholder.com/100',
		'1257035791',
		'Female',
		'1996-02-02',
		false
	),
	createData(
		15,
		'User 15',
		'user15@example.com',
		'https://via.placeholder.com/100',
		'1368145791',
		'Male',
		'1997-03-03',
		false
	),
	createData(
		16,
		'User 16',
		'user16@example.com',
		'https://via.placeholder.com/100',
		'1479257913',
		'Female',
		'1998-04-04',
		false
	),
	createData(
		17,
		'User 17',
		'user17@example.com',
		'https://via.placeholder.com/100',
		'1580368135',
		'Male',
		'1999-05-05',
		false
	),
	createData(
		18,
		'User 18',
		'user18@example.com',
		'https://via.placeholder.com/100',
		'1691479257',
		'Female',
		'2000-06-06',
		false
	),
	createData(
		19,
		'User 19',
		'user19@example.com',
		'https://via.placeholder.com/100',
		'1702580368',
		'Male',
		'2001-07-07',
		false
	),
	createData(
		20,
		'User 20',
		'user20@example.com',
		'https://via.placeholder.com/100',
		'1813691479',
		'Female',
		'2002-08-08',
		false
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

export default function UserManagement() {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [page, setPage] = useState(0)
	const [searchPhone, setSearchPhone] = useState(null)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [openMembershipDialog, setOpenMembershipDialog] = useState(false)

	const handleOpenMembershipDialog = () => {
		setOpenMembershipDialog(true)
	}

	const handleCloseMembershipDialog = () => {
		setOpenMembershipDialog(false)
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
						onChange={(event, newValue) => setSearchPhone(newValue)}
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
						{visibleRows.map((row, index) => {
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
									<TableCell>{row.phone}</TableCell>
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
							)
						})}
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
					count={rows.length}
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
