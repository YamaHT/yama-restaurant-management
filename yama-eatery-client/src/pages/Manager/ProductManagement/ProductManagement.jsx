import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import CrudTabs from '@/components/Crud Components/CrudTabs'
import { EnumService } from '@/services/EnumService'
import { ProductManagementService } from '@/services/ProductManagementService'
import { AssetImages } from '@/utilities/AssetImages'
import {
	Add,
	Apple,
	Cookie,
	Delete,
	Dining,
	Edit,
	Menu,
	Restore,
	SystemUpdateAlt,
	WineBar,
} from '@mui/icons-material'
import {
	Avatar,
	AvatarGroup,
	Box,
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
import AddProduct from './AddProduct'
import RestockProduct from './RestockProduct'
import UpdateProduct from './UpdateProduct'

const headCells = [
	{
		name: 'product',
		orderData: 'name',
		numeric: false,
		widthPercent: 20,
	},
	{
		name: 'Image',
		orderData: 'name',
		numeric: true,
		widthPercent: 20,
	},
	{
		name: 'Category',
		orderData: 'subCategory.category.name',
		numeric: false,
		widthPercent: 25,
	},
	{
		name: 'Price',
		orderData: 'price',
		numeric: true,
		widthPercent: 10,
	},
	{
		name: 'Quantity',
		orderData: 'stockQuantity',
		numeric: true,
		widthPercent: 10,
	},
	{
		name: 'status',
		orderData: 'isDeleted',
		numeric: false,
		widthPercent: 10,
	},
	{
		name: '',
		numeric: false,
		widthPercent: 5,
	},
]

const categoryNavigation = [
	{ icon: <Menu />, name: 'All' },
	{ icon: <Apple />, name: 'Starters' },
	{ icon: <Dining />, name: 'Main' },
	{ icon: <WineBar />, name: 'Beverages' },
	{ icon: <Cookie />, name: 'Desserts' },
]

function descendingComparator(a, b, orderBy) {
	const getValue = (obj, path) => path.split('.').reduce((acc, part) => acc?.[part], obj)

	const valueA = getValue(a, orderBy)
	const valueB = getValue(b, orderBy)

	if (valueB < valueA) {
		return -1
	}
	if (valueB > valueA) {
		return 1
	}
	return 0
}

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
	const [categories, setCategories] = useState()
	const [rows, setRows] = useState([])
	const [filteredRows, setFilteredRows] = useState([])

	useEffect(() => {
		async function fetchProducts() {
			const data = await ProductManagementService.GET_ALL()
			if (data) {
				setRows(data)
			}
		}

		async function fetchCategories() {
			const data = await EnumService.GET_ALL_CATEGORY()
			if (data) {
				setCategories(data)
			}
		}
		fetchCategories()

		fetchProducts()
	}, [])

	useEffect(() => {
		const categoryFilterMap = ['All', 'Starters', 'Main', 'Beverages', 'Desserts']

		if (categoryFilterMap[categoryTab] === 'All') {
			setFilteredRows(rows)
		} else {
			setFilteredRows(
				rows.filter((row) => row.subCategory.category.name === categoryFilterMap[categoryTab])
			)
		}
	}, [categoryTab, rows])

	useEffect(() => {
		const categoryFilterMap = ['All', 'Starters', 'Main', 'Beverages', 'Desserts']

		let filteredData = rows

		if (categoryFilterMap[categoryTab] !== 'All') {
			filteredData = filteredData.filter(
				(row) => row.subCategory?.category?.name === categoryFilterMap[categoryTab]
			)
		}

		if (searchName) {
			filteredData = filteredData.filter((row) =>
				row.name.toLowerCase().includes(searchName.toLowerCase())
			)
		}

		setFilteredRows(filteredData)
	}, [searchName, categoryTab, rows])

	const handleRemoveProduct = async (productId) => {
		const data = await ProductManagementService.REMOVE_PRODUCT(productId)
		if (data) {
			setRows(data)
		}
	}

	const handleRestoreProduct = async (productId) => {
		const data = await ProductManagementService.RESTORE_PRODUCT(productId)
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

	const handleOpenRestock = (product) => {
		setSelectedProduct(product)
		setOpenRestockPage(true)
	}

	const handleRestockProduct = async (restockQuantity) => {
		const updatedRows = await ProductManagementService.RESTOCK_PRODUCT({
			productId: selectedProduct.id,
			stockQuantity: restockQuantity,
		})

		setRows(updatedRows)
		setOpenRestockPage(false)
	}

	const handleAddProduct = async (formData) => {
		const data = await ProductManagementService.ADD_PRODUCT(formData)
		if (data) {
			setRows(data)
			setOpenAddPage(false)
		}
	}

	const handleUpdateProduct = async (formData) => {
		const data = await ProductManagementService.UPDATE_PRODUCT(formData)
		if (data) {
			setRows(data)
			setSelectedProduct(null)
			setOpenUpdatePage(false)
		}
	}

	return (
		<Box>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight={'bold'}>
					Product Management
				</Typography>

				<Stack direction={'row'} justifyContent={'space-between'}>
					<CrudSearchBar
						listItem={rows.map((row) => row.name)}
						widthPercent={50}
						value={searchName}
						handleChange={(e, value) => setSearchName(value)}
					/>
					<React.Fragment>
						<Button variant='contained' onClick={() => setOpenAddPage(true)} startIcon={<Add />}>
							Add New Product
						</Button>
						{openAddPage && (
							<AddProduct
								categories={categories}
								open={openAddPage}
								handleClose={() => setOpenAddPage(false)}
								handleAddProduct={handleAddProduct}
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
										<TableCell>{row.name}</TableCell>
										<TableCell>
											<AvatarGroup max={5} variant='rounded'>
												{row.image && row.image.length > 0 ? (
													row.image.map((imgSrc, index) => (
														<Avatar
															key={index}
															src={AssetImages.ProductImage(imgSrc)}
															alt={`Product Image ${index}`}
														/>
													))
												) : (
													<Avatar alt={row.name} />
												)}
											</AvatarGroup>
										</TableCell>
										<TableCell>
											{row.subCategory.category.name} / {row.subCategory.name}
										</TableCell>
										<TableCell align='right'>${row.price.toFixed(2)}</TableCell>
										<TableCell align='right'>
											<Chip
												label={row.stockQuantity}
												color={
													row.stockQuantity === 0
														? 'error'
														: row.stockQuantity < 10
														? 'warning'
														: 'success'
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
												{!row.isDeleted ? (
													<>
														<MenuItem>
															<Button
																variant='outlined'
																onClick={() => handleOpenUpdate(row)}
																startIcon={<Edit />}
															>
																Update
															</Button>
															{openUpdatePage && selectedProduct && (
																<UpdateProduct
																	categories={categories}
																	open={openUpdatePage}
																	handleClose={() => setOpenUpdatePage(false)}
																	existingProduct={selectedProduct}
																	handleUpdateProduct={handleUpdateProduct}
																/>
															)}
														</MenuItem>
														<MenuItem>
															<Button
																variant='outlined'
																startIcon={<SystemUpdateAlt />}
																onClick={() => handleOpenRestock(row)}
															>
																Restock
															</Button>
															{openRestockPage && selectedProduct && (
																<RestockProduct
																	open={openRestockPage}
																	handleClose={() => setOpenRestockPage(false)}
																	currentQuantity={selectedProduct.stockQuantity}
																	productName={selectedProduct.name}
																	onRestock={handleRestockProduct}
																/>
															)}
														</MenuItem>
														<MenuItem>
															<CrudConfirmation
																title='Delete Confirmation'
																description='Are you sure you want to delete this?'
																handleConfirm={() => handleRemoveProduct(row.id)}
															>
																{(handleOpen) => (
																	<Button
																		variant='outlined'
																		startIcon={<Delete />}
																		onClick={handleOpen}
																	>
																		Delete
																	</Button>
																)}
															</CrudConfirmation>
														</MenuItem>
													</>
												) : (
													<MenuItem>
														<CrudConfirmation
															title='Restore Confirmation'
															description='Are you sure you want to restore this?'
															handleConfirm={() => handleRestoreProduct(row.id)}
														>
															{(handleOpen) => (
																<Button
																	variant='outlined'
																	startIcon={<Restore />}
																	onClick={handleOpen}
																>
																	Restore
																</Button>
															)}
														</CrudConfirmation>
													</MenuItem>
												)}
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
						{emptyRows > 0 && (
							<TableRow>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
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
		</Box>
	)
}

export default ProductManagement
