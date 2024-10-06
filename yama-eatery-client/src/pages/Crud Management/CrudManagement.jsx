import logo from '@/assets/img/general/logo192.png'
import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import CrudTabs from '@/components/Crud Components/CrudTabs'
import { Add, Delete, Edit, FoodBank, Icecream, LocalDrink, Menu } from '@mui/icons-material'
import {
	Avatar,
	Button,
	Chip,
	MenuItem,
	Paper,
	Rating,
	Stack,
	Tab,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'
import CrudAdd from './CrudAdd'

const headCells = [
	{
		name: 'product',
		orderData: 'name',
		numeric: false,
		widthPercent: 30,
	},
	{
		name: 'Category',
		orderData: 'category',
		numeric: false,
		widthPercent: 20,
	},
	{
		name: 'Price',
		orderData: 'price',
		numeric: true,
		widthPercent: 10,
	},
	{
		name: 'Rating',
		orderData: 'rating',
		numeric: false,
		widthPercent: 20,
	},
	{
		name: 'status',
		orderData: 'isDeleted',
		numeric: false,
		widthPercent: 15,
	},
	{
		name: '',
		numeric: false,
		widthPercent: 5,
	},
]

function createData(id, image, name, category, price, rating, isDeleted) {
	return {
		id,
		image,
		name,
		category,
		price,
		rating,
		isDeleted,
	}
}

const rows = [
	createData(1, '', 'Spicy Tuna Roll', 'Food', 12.99, 4.6, false),
	createData(2, '', 'Margherita Pizza', 'Food', 15.49, 3.3, true),
	createData(3, '', 'Vegan Burger', 'Food', 11.99, 1.9, false),
	createData(4, '', 'Lemon Iced Tea', 'Drink', 3.49, 4.1, false),
	createData(5, '', 'BBQ Chicken Wings', 'Food', 10.99, 4.9, false),
	createData(6, '', 'Caesar Salad', 'Food', 9.99, 3.8, false),
	createData(7, '', 'Espresso', 'Drink', 2.99, 4.4, false),
	createData(8, '', 'Grilled Salmon', 'Food', 17.99, 4.7, false),
	createData(9, '', 'Chicken Alfredo Pasta', 'Food', 14.49, 4.0, true),
	createData(10, '', 'Mango Smoothie', 'Drink', 5.99, 4.8, false),
	createData(11, '', 'Beef Tacos', 'Food', 9.49, 4.2, false),
	createData(12, '', 'Chocolate Milkshake', 'Drink', 4.99, 4.5, false),
	createData(13, '', 'Lobster Bisque', 'Food', 22.99, 4.9, false),
	createData(14, '', 'Iced Coffee', 'Drink', 3.99, 3.5, false),
	createData(15, '', 'Pulled Pork Sandwich', 'Food', 8.99, 4.6, true),
	createData(16, '', 'Cucumber Salad', 'Food', 6.99, 3.9, false),
	createData(17, '', 'Orange Juice', 'Drink', 2.99, 4.3, false),
	createData(18, '', 'Stuffed Mushrooms', 'Food', 12.99, 4.7, false),
	createData(19, '', 'Cappuccino', 'Drink', 3.49, 4.2, false),
	createData(20, '', 'Chicken Caesar Wrap', 'Food', 9.99, 3.7, true),
]

const categoryNavigation = [
	{ icon: <Menu />, name: 'All' },
	{ icon: <FoodBank />, name: 'Food' },
	{ icon: <LocalDrink />, name: 'Drink' },
	{ icon: <Icecream />, name: 'Dessert' },
]

// Not change function
function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

// Not change function
function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

const CrudManagement = () => {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('name')
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

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10))
		setPage(0)
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	const visibleRows = React.useMemo(
		() =>
			[...rows]
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage]
	)

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
					Data Management
				</Typography>

				<Stack direction={'row'} justifyContent={'space-between'} padding={'0 1%'}>
					<CrudSearchBar
						listItem={['dsadsads', 'eweweewewqqwe', 'dsadasewew', 'cxzczx']}
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
									<TableCell>
										<Stack direction={'row'} spacing={2} alignItems={'center'}>
											<Avatar src={logo} />
											<p>{row.name}</p>
										</Stack>
									</TableCell>
									<TableCell>{row.category}</TableCell>
									<TableCell align='right'>${row.price}</TableCell>
									<TableCell>
										<Rating
											sx={{ overflow: 'none' }}
											readOnly
											value={row.rating}
											precision={0.25}
										/>
									</TableCell>
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
												<Button startIcon={<Edit />}>Update</Button>
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

export default CrudManagement
