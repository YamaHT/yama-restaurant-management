import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import { StaffInformationManagementService } from '@/services/StaffInformationManagementService'
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
		name: 'ID',
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
	const [month, setMonth] = useState('')
	const [rows, setRows] = useState([])

	const fetchStaffSalary = async () => {
		const data = await StaffInformationManagementService.STAFF_SALARY_LIST()
		if (data) {
			console.log(data)
			setRows(data)
		}
	}

	useEffect(() => {
		fetchStaffSalary()
	}, [])

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (e, newPage) => {
		setPage(newPage)
	}
	const handlePaySalaryButton = () => {}

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10))
		setPage(0)
	}
	const handleChangeMonth = (event) => {
		setMonth(event.target.value)
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
		<Box>
			<Stack marginBottom={1} spacing={1}>
				<Typography variant='h5' fontWeight={'bold'}>
					Staff Salary Management
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
				<Box>
					<FormControl
						sx={{
							width: '200px',
							ml: 1.5,
						}}
					>
						<InputLabel>Select Month</InputLabel>
						<Select value={month} label='Select Month' onChange={handleChangeMonth}>
							<MenuItem value='January'>January</MenuItem>
							<MenuItem value='February'>February</MenuItem>
							<MenuItem value='March'>March</MenuItem>
							<MenuItem value='April'>April</MenuItem>
							<MenuItem value='May'>May</MenuItem>
							<MenuItem value='June'>June</MenuItem>
							<MenuItem value='July'>July</MenuItem>
							<MenuItem value='August'>August</MenuItem>
							<MenuItem value='September'>September</MenuItem>
							<MenuItem value='October'>October</MenuItem>
							<MenuItem value='November'>November</MenuItem>
							<MenuItem value='December'>December</MenuItem>
						</Select>
					</FormControl>
				</Box>
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
											onClick={() => handlePaySalaryButton()}
											variant='contained'
											color='success'
										>
											Pay Salary
										</Button>
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
		</Box>
	)
}

export default StaffSalaryManagement
