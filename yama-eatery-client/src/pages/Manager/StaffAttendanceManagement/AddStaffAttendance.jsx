import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import { StaffAttendanceManagementService } from '@/services/StaffAttendanceManagementService'
import { StaffInformationManagementService } from '@/services/StaffInformationManagementService'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
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
		widthPercent: 10,
	},

	{
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

export default function AddStaffAttendance({ open, handleAddStaffAttendance, handleClose }) {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [page, setPage] = useState(0)
	const [searchName, setSearchName] = useState('')
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [rows, setRows] = useState([])

	const fetchStaffInformation = async () => {
		const data = await StaffAttendanceManagementService.GET_NOT_TODAY_ATTENDANCE()
		if (data) {
			setRows(data)
		}
	}

	useEffect(() => {
		fetchStaffInformation()
	}, [open])

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

	const handleAdd = (staffId) => {
		handleAddStaffAttendance(staffId)
		handleClose()
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	const visibleRows = React.useMemo(
		() =>
			[...rows]
				.filter((row) => !searchName || row.name.toLowerCase().includes(searchName.toLowerCase()))
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage, searchName, rows]
	)

	return (
		<Dialog open={open}>
			<DialogContent>
				<Stack marginBottom={1} spacing={2}>
					<Typography variant='h5' fontWeight={'bold'}>
						List Staff
					</Typography>

					<CrudSearchBar
						listItem={rows.map((row) => row.name)}
						value={searchName}
						handleChange={(event, newValue) => {
							if (typeof newValue === 'string') {
								setSearchName(newValue)
							} else if (event && event.target) {
								setSearchName(event.target.value)
							}
						}}
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
							{visibleRows.map((row) => (
								<TableRow key={row.id}>
									{' '}
									<TableCell align='right'>{row.id}</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell>
										<Stack direction='row' spacing={1}>
											<Button variant='contained' color='primary' onClick={() => handleAdd(row.id)}>
												Add
											</Button>
										</Stack>
									</TableCell>
								</TableRow>
							))}
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
			</DialogContent>

			<DialogActions>
				<Button onClick={() => handleClose()}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}
