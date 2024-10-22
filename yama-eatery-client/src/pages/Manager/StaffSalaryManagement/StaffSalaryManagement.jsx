import CrudTableHead from '@/components/Crud Components/CrudTableHead'
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
import React, { useState } from 'react'

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
function createData(id, name, workhours, numberOfFaults, netSalary, payday) {
	return {
		id,
		name,
		workhours,
		numberOfFaults,
		netSalary,
		payday,
	}
}

const rows = [
	createData(1, 'John Doe', 8, 0, 3000, '2024-10-01'),
	createData(2, 'Jane Smith', 7.83, 1, 2900, '2024-10-01'),
	createData(3, 'Alice Johnson', 8, 0, 3100, '2024-10-01'),
	createData(4, 'Bob Brown', 7.92, 1, 2850, '2024-10-01'),
	createData(5, 'Charlie Davis', 8, 0, 3050, '2024-10-01'),
	createData(6, 'Diana Evans', 7.95, 1, 2950, '2024-10-01'),
	createData(7, 'Edward Green', 8, 0, 3000, '2024-10-01'),
	createData(8, 'Fiona Harris', 8, 0, 3100, '2024-10-01'),
	createData(9, 'George King', 7.97, 1, 2970, '2024-10-01'),
	createData(10, 'Helen Lewis', 8, 0, 3000, '2024-10-01'),
	createData(11, 'Ian Miller', 7.93, 1, 2930, '2024-10-01'),
	createData(12, 'Jackie Nelson', 8, 0, 3050, '2024-10-01'),
	createData(13, 'Karen Owens', 8, 0, 3100, '2024-10-01'),
	createData(14, 'Larry Parker', 7.98, 1, 2980, '2024-10-01'),
	createData(15, 'Mona Quinn', 8, 0, 3000, '2024-10-01'),
	createData(16, 'Nancy Roberts', 8, 0, 3100, '2024-10-01'),
	createData(17, 'Oliver Scott', 8, 0, 3000, '2024-10-01'),
	createData(18, 'Paula Turner', 8, 0, 3100, '2024-10-01'),
	createData(19, 'Quincy Underwood', 8, 0, 3000, '2024-10-01'),
	createData(20, 'Rachel Vincent', 8, 0, 3100, '2024-10-01'),
]

console.log(rows)

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
	}, [order, orderBy, page, rowsPerPage, searchName])

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
									<TableCell>{row.name}</TableCell>
									<TableCell align='right'>{row.workhours}</TableCell>
									<TableCell align='right'>{row.numberOfFaults}</TableCell>
									<TableCell align='right'>{row.netSalary}</TableCell>
									<TableCell>{row.payday}</TableCell>

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
