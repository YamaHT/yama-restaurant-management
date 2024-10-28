import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import { StaffAttendanceManagementService } from '@/services/StaffAttendanceManagementService'
import { StaffInformationManagementService } from '@/services/StaffInformationManagementService'
import { StaffSalaryManagementService } from '@/services/StaffSalaryManagementService'
import { Payment, Search } from '@mui/icons-material'
import {
	Autocomplete,
	Box,
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
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
		name: 'Workhours',
		orderData: 'workhours',
		numeric: true,
		widthPercent: 10,
	},
	{
		name: 'NumberOfFaults',
		orderData: 'numberOfFaults',
		numeric: true,
		widthPercent: 15,
	},
	{
		name: 'Net Salary',
		orderData: 'netSalary',
		numeric: true,
		widthPercent: 15,
	},
	{
		name: 'Payday',
		orderData: 'payday',
		numeric: false,
		widthPercent: 15,
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

const StaffSalaryManagement = () => {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [page, setPage] = useState(0)
	const [searchName, setSearchName] = useState(null)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [month, setMonth] = useState(new Date().getMonth())
	const [rows, setRows] = useState([])

	const currentMonth = new Date().getMonth()

	useEffect(() => {
		const fetchStaffSalary = async () => {
			const data = await StaffSalaryManagementService.GET_STAFF_SALARY()
			if (data) {
				setRows(data)
			}
		}
		fetchStaffSalary()
	}, [month])

	const handleButtonPaySalary = async (employeeId, month) => {
		const data = await StaffSalaryManagementService.PAY_SALARY({ employeeId, month })
		if (data) {
			setRows(data)
		}
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

	const visibleRows = React.useMemo(() => {
		const filteredRows = rows.filter((row) => {
			return searchName ? row.name.toLowerCase().includes(searchName.toLowerCase()) : true
		})

		return filteredRows
			.sort(getComparator(order, orderBy))
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}, [order, orderBy, page, rowsPerPage, searchName, rows])

	return (
		<Stack spacing={2}>
			<Typography variant='h5' fontWeight={'bold'}>
				Staff Salary Management
			</Typography>
			<CrudSearchBar
				listItem={rows.map((row) => row.name)}
				value={searchName}
				handleChange={(e, value) => setSearchName(value)}
				placeholder={'Search by name...'}
				widthPercent={50}
			></CrudSearchBar>
			<FormControl sx={{ width: 200 }}>
				<InputLabel>Select Month</InputLabel>
				<Select label='Select Month' value={month} onChange={(e) => setMonth(e.target.value)}>
					{[...Array(currentMonth + 1).keys()].map((m) => (
						<MenuItem key={m} value={m}>
							{new Date(0, m).toLocaleString('en-US', { month: 'long' })}
						</MenuItem>
					))}
				</Select>
			</FormControl>
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
										<TableCell>{row.employee.name}</TableCell>
										<TableCell align='right'>
											{row.employee.attendances && row.employee.attendances.length > 0
												? row.employee.attendances[0].workHours
												: 'N/A'}
										</TableCell>{' '}
										<TableCell align='right'>{row.numberOfFaults}</TableCell>
										<TableCell align='right'>{row.netSalary}</TableCell>
										<TableCell>{row.payDay}</TableCell>
										<TableCell>
											<Button
												startIcon={<Payment />}
												onClick={() => handleButtonPaySalary(row.id)}
												variant='contained'
												color='success'
											>
												Pay Salary
											</Button>
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
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Stack>
	)
}

export default StaffSalaryManagement
