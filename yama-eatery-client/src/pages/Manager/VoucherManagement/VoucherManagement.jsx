import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import CrudTabs from '@/components/Crud Components/CrudTabs'
import { VoucherManagementService } from '@/services/VoucherManagementService'
import {
	Add,
	AlarmOff,
	CheckCircle,
	Delete,
	Edit,
	Inventory,
	MenuSharp,
	RemoveShoppingCart,
	Restore,
} from '@mui/icons-material'
import {
	Avatar,
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
import { useEffect, useMemo, useState } from 'react'
import VoucherAdd from './VoucherAdd'
import VoucherUpdate from './VoucherUpdate'
import { AssetImages } from '@/utilities/AssetImages'

const headCells = [
	{ name: 'Voucher', orderData: 'name', numeric: false, widthPercent: 20 },
	{ name: 'Expiration Date', orderData: 'expiredDate', numeric: false, widthPercent: 15 },
	{ name: 'Description ', orderData: 'description', numeric: false, widthPercent: 15 },
	{ name: 'Reduced Percent', orderData: 'reducedPercent', numeric: true, widthPercent: 12.5 },
	{ name: 'Max Reducing', orderData: 'maxReducing', numeric: true, widthPercent: 12.5 },
	{ name: 'Quantity', orderData: 'quantity', numeric: true, widthPercent: 10 },
	{ name: 'Status', orderData: '', numeric: false, widthPercent: 10 },
	{ name: '', widthPercent: 5 },
]

const typeNavigation = [
	{ icon: <MenuSharp />, name: 'All' },
	{ icon: <CheckCircle />, name: 'Available' },
	{ icon: <AlarmOff />, name: 'Expired' },
	{ icon: <Inventory />, name: 'In stock' },
	{ icon: <RemoveShoppingCart />, name: 'Out of stock' },
]

const VoucherManagement = () => {
	const [vouchers, setVouchers] = useState([])
	const [filteredVouchers, setFilteredVouchers] = useState([])
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('name')
	const [page, setPage] = useState(0)
	const [openAddPage, setOpenAddPage] = useState(false)
	const [openUpdatePage, setOpenUpdatePage] = useState(false)
	const [selectedRow, setSelectedRow] = useState(null)
	const [selectedTab, setSelectedTab] = useState(0)
	const [searchTerm, setSearchTerm] = useState('')

	const [rowsPerPage, setRowsPerPage] = useState(10)

	useEffect(() => {
		const fetchVouchers = async () => {
			const data = await VoucherManagementService.GET_ALL()
			setVouchers(data)
			setFilteredVouchers(data)
		}
		fetchVouchers()
	}, [])

	useEffect(() => {
		const currentDate = new Date()

		const filters = {
			1: (voucher) =>
				!voucher.isDeleted && voucher.quantity > 0 && new Date(voucher.expiredDate) > currentDate,
			2: (voucher) => new Date(voucher.expiredDate) < currentDate,
			3: (voucher) => voucher.quantity > 0,
			4: (voucher) => voucher.quantity === 0,
		}

		let updatedVouchers = vouchers
			.filter(filters[selectedTab] || (() => true))
			.filter((voucher) =>
				searchTerm ? voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
			)

		setPage(0)
		setFilteredVouchers(updatedVouchers)
	}, [searchTerm, selectedTab, vouchers])

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const getVoucherStatus = (voucher) => {
		if (voucher.isDeleted) {
			return { label: 'Deleted', color: 'error' }
		}
		const currentDate = new Date()
		const expirationDate = new Date(voucher.expiredDate)

		if (expirationDate < currentDate) {
			return { label: 'Expired', color: 'secondary' }
		}
		if (voucher.quantity === 0) {
			return { label: 'Out of Stock', color: 'warning' }
		}
		return { label: 'Available', color: 'success' }
	}

	const handleChangePage = (event, newPage) => setPage(newPage)

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10))
		setPage(0)
	}

	const visibleRows = useMemo(() => {
		return filteredVouchers
			.sort((a, b) =>
				order === 'desc' ? (b[orderBy] < a[orderBy] ? -1 : 1) : a[orderBy] < b[orderBy] ? -1 : 1
			)
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}, [order, orderBy, page, filteredVouchers, rowsPerPage])

	const handleOpenUpdate = (row) => {
		setSelectedRow(row)
		setOpenUpdatePage(true)
	}

	const handleCloseUpdate = () => {
		setOpenUpdatePage(false)
		setSelectedRow(null)
	}

	const handleAdd = async (formData) => {
		const data = await VoucherManagementService.ADD_VOUCHER(formData)
		if (data) {
			setVouchers(data)
		}
	}

	const handleUpdate = async (formData) => {
		const data = await VoucherManagementService.UPDATE_VOUCHER(formData)
		if (data) {
			setVouchers(data)
		}
	}

	const handleDelete = async (Id) => {
		const data = await VoucherManagementService.DELETE_VOUCHER(Id)
		if (data) {
			setVouchers(data)
		}
	}

	const handleRestore = async (Id) => {
		const data = await VoucherManagementService.RESTORE_VOUCHER(Id)
		if (data) {
			setVouchers(data)
		}
	}

	return (
		<Box>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight='bold'>
					Voucher Management
				</Typography>
				<Stack direction='row' justifyContent='space-between'>
					<CrudSearchBar
						listItem={filteredVouchers.map((row) => row.name)}
						widthPercent={50}
						value={searchTerm}
						handleChange={(e, value) => setSearchTerm(value)}
					/>
					<Button variant='contained' onClick={() => setOpenAddPage(true)} startIcon={<Add />}>
						Add New Voucher
					</Button>
				</Stack>
				<CrudTabs value={selectedTab} handleChange={setSelectedTab}>
					{typeNavigation.map((type, index) => (
						<Tab key={index} icon={type.icon} iconPosition='start' label={type.name} />
					))}
				</CrudTabs>
			</Stack>
			<Paper sx={{ borderRadius: 3, overflow: 'auto' }}>
				<Table stickyHeader sx={{ minWidth: '750px', tableLayout: 'fixed' }}>
					<CrudTableHead
						order={order}
						orderBy={orderBy}
						headCells={headCells}
						onRequestSort={(event, property) => handleRequestSort(property)}
					/>
					<TableBody>
						{visibleRows.length > 0 ? (
							visibleRows.map((row) => (
								<TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
									<TableCell sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
										<Avatar variant='rounded' src={AssetImages.VoucherImage(row.image)} />{' '}
										{row.name}
									</TableCell>
									<TableCell>{row.expiredDate}</TableCell>
									<TableCell sx={{ overflow: 'hidden' }}>{row.description}</TableCell>
									<TableCell align='right'>{row.reducedPercent}%</TableCell>
									<TableCell align='right'>{row.maxReducing.toLocaleString()}$</TableCell>
									<TableCell align='right'>{row.quantity}</TableCell>
									<TableCell>
										{(() => {
											const status = getVoucherStatus(row)
											return <Chip label={status.label} color={status.color} />
										})()}
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
													</MenuItem>
													<MenuItem>
														<CrudConfirmation
															title='Delete Confirmation'
															description='Are you sure you want to delete this?'
															handleConfirm={() => handleDelete(row.id)}
														>
															{(handleOpen) => (
																<Button
																	variant='outlined'
																	onClick={handleOpen}
																	startIcon={<Delete />}
																>
																	Remove
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
														handleConfirm={() => handleRestore(row.id)}
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
							))
						) : (
							<TableRow>
								<TableCell colSpan={100} align='center'>
									No vouchers available
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={filteredVouchers.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			{openAddPage && (
				<VoucherAdd
					open={openAddPage}
					handleClose={() => setOpenAddPage(false)}
					handleAdd={handleAdd}
				/>
			)}
			{openUpdatePage && (
				<VoucherUpdate
					open={openUpdatePage}
					handleClose={handleCloseUpdate}
					selectedVoucher={selectedRow}
					handleUpdate={handleUpdate}
				/>
			)}
		</Box>
	)
}

export default VoucherManagement
