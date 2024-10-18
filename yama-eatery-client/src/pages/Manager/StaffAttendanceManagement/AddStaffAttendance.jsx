import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import {
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
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
		widthPercent: 10,
	},
]

function createData(name) {
	return {
		name,
	}
}

const rows = [
	createData('User 1'),
	createData('User 2'),
	createData('User 3'),
	createData('User 4'),
	createData('User 5'),
	createData('User 6'),
	createData('User 7'),
	createData('User 8'),
	createData('User 9'),
	createData('User 10'),
	createData('User 11'),
	createData('User 12'),
	createData('User 13'),
	createData('User 14'),
	createData('User 15'),
	createData('User 16'),
	createData('User 17'),
	createData('User 18'),
	createData('User 19'),
	createData('User 20'),
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
	const [searchName, setSearchName] = useState(null)
	const [rowsPerPage, setRowsPerPage] = useState(10)

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
				.filter((row) => !searchName || row.name.toLowerCase().includes(searchName.toLowerCase()))
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage, searchName]
	)

	return (
		<>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight={'bold'}>
					List Staff
				</Typography>

				<CrudSearchBar
					listItem={[]}
					value={searchName}
					handleChange={(e) => setSearchName(e.target.value)}
					placeholder={'Search by Name...'}
				/>
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

									<TableCell>
										<Stack direction='row' spacing={1}>
											<Button variant='contained' color='primary' onClick={null}>
												Add
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
