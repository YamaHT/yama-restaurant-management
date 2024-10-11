import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import CrudTabs from '@/components/Crud Components/CrudTabs'
import {
	Add,
	BackupTable,
	Delete,
	FoodBank,
	Icecream,
	LocalDrink,
	Menu,
	Search,
	StoreMallDirectory,
	TableBar,
	TableRestaurant,
	Update,
} from '@mui/icons-material'
import {
	Autocomplete,
	Avatar,
	AvatarGroup,
	Button,
	Chip,
	InputAdornment,
	MenuItem,
	Paper,
	Stack,
	Tab,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'
import CrudAdd from './AddtTable'
import CrudUpdate from './UpdateTable'

const headCells = [
	{
		name: 'Table_ID',
		orderData: 'id',
		numeric: true,
		widthPercent: 10,
	},
	{
		name: 'Image',
		orderData: 'image',
		numeric: true,
		widthPercent: 25,
	},
	{
		name: 'Floor',
		orderData: 'floor',
		numeric: true,
		widthPercent: 10,
	},
	{
		name: 'Type',
		orderData: 'type',
		numeric: false,
		widthPercent: 10,
	},
	{
		name: 'Status',
		orderData: 'isDeleted',
		numeric: false,
		widthPercent: 30,
	},
	{
		name: 'Action',
		widthPercent: 5,
	},
]

function createData(id, image, floor, type, isDeleted) {
	return {
		id,
		image,
		floor,
		type,
		isDeleted,
	}
}

const rows = [
	createData(1, 'https://via.placeholder.com/100', 1, 'Food', false),
	createData(2, 'https://via.placeholder.com/100', 2, 'Food', true),
	createData(3, 'https://via.placeholder.com/100', 3, 'Food'),
	createData(4, 'https://via.placeholder.com/100', 1, 'Drink'),
	createData(5, 'https://via.placeholder.com/100', 2, 'Food'),
	createData(6, 'https://via.placeholder.com/100', 3, 'Food'),
	createData(7, 'https://via.placeholder.com/100', 1, 'Drink'),
	createData(8, 'https://via.placeholder.com/100', 2, 'Food'),
	createData(9, 'https://via.placeholder.com/100', 3, 'Food'),
	createData(10, 'https://via.placeholder.com/100', 1, 'Drink'),
	createData(11, 'https://via.placeholder.com/100', 2, 'Food'),
	createData(12, 'https://via.placeholder.com/100', 3, 'Drink'),
	createData(13, 'https://via.placeholder.com/100', 1, 'Food'),
	createData(14, 'https://via.placeholder.com/100', 2, 'Drink'),
	createData(15, 'https://via.placeholder.com/100', 3, 'Food'),
	createData(16, 'https://via.placeholder.com/100', 1, 'Food'),
	createData(17, 'https://via.placeholder.com/100', 2, 'Drink'),
	createData(18, 'https://via.placeholder.com/100', 3, 'Food'),
	createData(19, 'https://via.placeholder.com/100', 1, 'Drink'),
	createData(20, 'https://via.placeholder.com/100', 2, 'Food'),
]

const categoryNavigation = [
	{ icon: <Menu />, name: 'All' },
	{ icon: <BackupTable />, name: 'Small' },
	{ icon: <TableRestaurant />, name: 'Big' },
	{ icon: <TableBar />, name: 'Round' },
	{ icon: <Icecream />, name: 'Private' },
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

const TableManagement = () => {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [page, setPage] = useState(0)
	const [categoryTab, setCategoryTab] = useState(0)
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
	const CrudSearchBar = ({ listItem, widthPercent, value, handleChange }) => {
		return (
			<Autocomplete
				size='small'
				options={listItem}
				value={value}
				onChange={handleChange}
				freeSolo
				sx={{ width: widthPercent + '%' || '100%' }}
				renderInput={(params) => (
					<>
						<TextField
							{...params}
							slotProps={{
								input: {
									...params.InputProps,
									startAdornment: (
										<InputAdornment position='start'>
											<Search />
										</InputAdornment>
									),
								},
							}}
							placeholder='Search by phone...'
						/>
					</>
				)}
			/>
		)
	}

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10))
		setPage(0)
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	const visibleRows = React.useMemo(() => {
		const filteredRows = rows.filter((row) => {
			return searchName ? row.type.toLowerCase().includes(searchName.toLowerCase()) : true
		})

		return filteredRows
			.sort(getComparator(order, orderBy))
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}, [order, orderBy, page, rowsPerPage, searchName])

	return (
		<Paper
			sx={{
				width: 1200,
				padding: '1%',
				bgcolor: '#f0f2f5',
				zIndex: -1,
			}}
		>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight={'bold'}>
					Table Management
				</Typography>

				<Stack direction={'row'} justifyContent={'space-between'} padding={'0 1%'}>
					<CrudSearchBar
						widthPercent={50}
						value={searchName}
						handleChange={(e, value) => setSearchName(value)}
					/>
					<React.Fragment>
						<Button variant='contained' onClick={() => setOpenAddPage(true)} startIcon={<Add />}>
							Add New
						</Button>
						{openAddPage && (
							<CrudAdd open={openAddPage} handleClose={() => setOpenAddPage(false)} />
						)}
					</React.Fragment>
				</Stack>

				<CrudTabs value={categoryTab} handleChange={setCategoryTab}>
					{categoryNavigation.map((cate) => (
						<Tab icon={cate.icon} iconPosition='start' label={cate.name} />
					))}
				</CrudTabs>
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
									<TableCell align='center'>{row.id}</TableCell>
									<TableCell>
										<AvatarGroup max={10}>
											<Avatar src={row.image}></Avatar>
										</AvatarGroup>
									</TableCell>
									<TableCell align='right'>{row.floor}</TableCell>
									<TableCell>{row.type}</TableCell>

									<TableCell>
										{row.isDeleted ? (
											<Chip label='Not Available' color='error' />
										) : (
											<Chip label='Available' color='success' />
										)}
									</TableCell>
									<TableCell>
										<CrudMenuOptions>
											<MenuItem>
												<React.Fragment>
													<Button onClick={() => setOpenAddPage(true)} startIcon={<Update />}>
														Update Table
													</Button>
													{openAddPage && (
														<CrudUpdate
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

export default TableManagement
