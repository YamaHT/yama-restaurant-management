import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import CrudTabs from '@/components/Crud Components/CrudTabs'
import {
	Add,
	Delete,
	Edit,
	FoodBank,
	Icecream,
	LocalDrink,
	LunchDining,
	Menu,
	SystemUpdateAlt,
} from '@mui/icons-material'
import {
	Avatar,
	Button,
	Chip,
	MenuItem,
	Paper,
	Stack,
	Tab,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import UpdateProduct from './UpdateProduct'
import AddProduct from './AddProduct'
import RestockProduct from './RestockProduct'

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
		name: 'Quantity',
		orderData: 'quantity',
		numeric: true,
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

function createData(id, image, name, category, price, quantity, isDeleted) {
	return {
		id,
		image,
		name,
		category,
		price,
		quantity,
		isDeleted,
	}
}

const initialRows = [
	createData(
		1,
		'https://readymadeui.com/images/product2.webp',
		'Spicy Tuna Roll',
		'Food',
		12.99,
		4,
		false
	),
	createData(2, '', 'Margherita Pizza', 'Food', 15.49, 3, true),
	createData(3, '', 'Vegan Burger', 'Food', 11.99, 1, false),
	createData(4, '', 'Lemon Iced Tea', 'Drink', 3.49, 0, false),
	createData(5, '', 'BBQ Chicken Wings', 'Food', 10.99, 4, false),
	createData(6, '', 'Caesar Salad', 'Food', 9.99, 3, false),
	createData(7, '', 'Espresso', 'Drink', 2.99, 4, false),
	createData(8, '', 'Grilled Salmon', 'Food', 17.99, 0, false),
	createData(9, '', 'Chicken Alfredo Pasta', 'Food', 14.49, 0, true),
	createData(10, '', 'Mango Smoothie', 'Drink', 5.99, 10, false),
	createData(11, '', 'Beef Tacos', 'Food', 9.49, 0, false),
	createData(12, '', 'Chocolate Milkshake', 'Drink', 4.99, 10, false),
	createData(13, '', 'Lobster Bisque', 'Food', 22.99, 4, false),
	createData(14, '', 'Iced Coffee', 'Drink', 3.99, 3, false),
	createData(15, '', 'Pulled Pork Sandwich', 'Food', 8.99, 0, true),
	createData(16, '', 'Cucumber Salad', 'Food', 6.99, 3, false),
	createData(17, '', 'Orange Juice', 'Drink', 2.99, 4, false),
	createData(18, '', 'Stuffed Mushrooms', 'Food', 12.99, 4, false),
	createData(19, '', 'Cappuccino', 'Drink', 3.49, 4, false),
	createData(20, '', 'Chicken Caesar Wrap', 'Food', 9.99, 3, true),
]

const categoryNavigation = [
	{ icon: <Menu />, name: 'All' },
	{ icon: <FoodBank />, name: 'Food' },
	{ icon: <LocalDrink />, name: 'Drink' },
	{ icon: <Icecream />, name: 'Dessert' },
	{ icon: <LunchDining />, name: 'Snack' },
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

const ProductManagement = () => {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('name')
	const [page, setPage] = useState(0)
	const [categoryTab, setCategoryTab] = useState(0)
	const [searchName, setSearchName] = useState('')
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [openAddPage, setOpenAddPage] = useState(false)
	const [openUpdatePage, setOpenUpdatePage] = useState(false)
	const [openRestockPage, setOpenRestockPage] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)

	const [rows, setRows] = useState(initialRows)
	const [filteredRows, setFilteredRows] = useState(initialRows)

	useEffect(() => {
		const categoryFilterMap = ['All', 'Food', 'Drink', 'Dessert', 'Snack']

		if (categoryFilterMap[categoryTab] === 'All') {
			setFilteredRows(rows)
		} else {
			setFilteredRows(rows.filter((row) => row.category === categoryFilterMap[categoryTab]))
		}
	}, [categoryTab, rows])

	useEffect(() => {
		if (searchName) {
			setFilteredRows(
				rows.filter((row) => row.name.toLowerCase().includes(searchName.toLowerCase()))
			)
		} else {
			// Reset to category-filtered rows
			const categoryFilterMap = ['All', 'Food', 'Drink', 'Dessert', 'Snack']
			if (categoryFilterMap[categoryTab] === 'All') {
				setFilteredRows(rows)
			} else {
				setFilteredRows(rows.filter((row) => row.category === categoryFilterMap[categoryTab]))
			}
		}
	}, [searchName, rows, categoryTab])

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

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0

	const visibleRows = React.useMemo(
		() =>
			[...filteredRows]
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage, filteredRows]
	)

	const handleOpenUpdate = (product) => {
		setSelectedProduct(product)
		setOpenUpdatePage(true)
	}
	const handleUpdateProduct = (updatedProduct) => {
		setRows((prevRows) =>
			prevRows.map((row) => (row.id === updatedProduct.id ? updatedProduct : row))
		)
		setOpenUpdatePage(false)
	}
	const handleOpenRestock = (product) => {
		setSelectedProduct(product)
		setOpenRestockPage(true)
	}

	const handleRestockProduct = (restockQuantity) => {
		setRows((prevRows) =>
			prevRows.map((row) =>
				row.id === selectedProduct.id ? { ...row, quantity: restockQuantity } : row
			)
		)
		setOpenRestockPage(false)
	}

	const handleAddProduct = (newProduct) => {
		setRows((prevRows) => [...prevRows, newProduct])
		setOpenAddPage(false)
	}

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
					Product Management
				</Typography>

				<Stack direction={'row'} justifyContent={'space-between'} padding={'0 1%'}>
					<CrudSearchBar
						listItem={rows.map((row) => row.name)}
						widthPercent={50}
						value={searchName}
						handleChange={(e, value) => setSearchName(value)}
					/>
					<React.Fragment>
						<Button variant='contained' onClick={() => setOpenAddPage(true)} startIcon={<Add />}>
							Add New
						</Button>
						{openAddPage && (
							<AddProduct
								open={openAddPage}
								handleClose={() => setOpenAddPage(false)}
								handleAddProduct={handleAddProduct}
							/>
						)}
						{openUpdatePage && selectedProduct && (
							<UpdateProduct
								open={openUpdatePage}
								handleClose={() => setOpenUpdatePage(false)}
								existingProduct={selectedProduct}
								handleUpdateProduct={handleUpdateProduct}
							/>
						)}
						{openRestockPage && selectedProduct && (
							<RestockProduct
								open={openRestockPage}
								handleClose={() => setOpenRestockPage(false)}
								currentQuantity={selectedProduct.quantity}
								productName={selectedProduct.name} // Pass product name as a prop
								onRestock={(newQuantity) => handleRestockProduct(newQuantity)}
							/>
						)}
					</React.Fragment>
				</Stack>

				<CrudTabs value={categoryTab} handleChange={setCategoryTab}>
					{categoryNavigation.map((cate, index) => (
						<Tab key={index} icon={cate.icon} iconPosition='start' label={cate.name} />
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
						{visibleRows.length > 0 ? (
							visibleRows.map((row) => {
								return (
									<TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
										<TableCell>
											<Stack direction={'row'} spacing={2} alignItems={'center'}>
												<Avatar src={row.image} />
												<p>{row.name}</p>
											</Stack>
										</TableCell>
										<TableCell>{row.category}</TableCell>
										<TableCell align='right'>${row.price.toFixed(2)}</TableCell>
										<TableCell align='right'>
											<Chip
												label={row.quantity}
												color={
													row.quantity === 0 ? 'error' : row.quantity < 10 ? 'warning' : 'success'
												}
											/>
										</TableCell>
										<TableCell>
											<Chip
												label={row.isDeleted ? 'Not Available' : 'Available'}
												color={row.isDeleted ? 'error' : 'success'}
											/>
										</TableCell>
										<TableCell>
											<CrudMenuOptions>
												<MenuItem>
													<Button startIcon={<Edit />} onClick={() => handleOpenUpdate(row)}>
														Update
													</Button>
												</MenuItem>
												<MenuItem>
													<Button
														startIcon={<SystemUpdateAlt />}
														onClick={() => handleOpenRestock(row)}
													>
														Restock
													</Button>
												</MenuItem>
												<MenuItem>
													<CrudConfirmation
														title='Delete Confirmation'
														description='Are you sure you want to delete this?'
														handleConfirm={() => {
															// Implement your delete logic here
															alert(`Deleted product with ID: ${row.id}`)
															setRows((prevRows) => prevRows.filter((r) => r.id !== row.id))
														}}
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
							})
						) : (
							<TableRow>
								<TableCell colSpan={6} align='center'>
									No products available
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Paper>
			<TablePagination
				component='div'
				count={filteredRows.length}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Paper>
	)
}

export default ProductManagement
