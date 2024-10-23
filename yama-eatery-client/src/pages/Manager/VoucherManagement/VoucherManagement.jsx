import React, { useEffect, useMemo, useState } from 'react'
import {
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
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudTabs from '@/components/Crud Components/CrudTabs'
import { Add, Delete, Edit } from '@mui/icons-material'
import VoucherAdd from './VoucherAdd'
import VoucherUpdate from './VoucherUpdate'
import { VoucherManagementService } from '@/services/VoucherManagementService'
import { AssetImages } from '@/utilities/AssetImages'

const headCells = [
	{ name: 'Voucher Name', orderData: 'name', numeric: false, widthPercent: 20 },
	{ name: 'Expiration Date', orderData: 'expiredDate', numeric: false, widthPercent: 10 },
	{ name: 'Description ', orderData: 'description', numeric: false, widthPercent: 10 },
	{ name: 'Reduced Percent', orderData: 'reducedPercent', numeric: true, widthPercent: 15 },
	{ name: 'Max Reducing', orderData: 'maxReducing', numeric: true, widthPercent: 15 },
	{ name: 'Quantity', orderData: 'quantity', numeric: true, widthPercent: 10 },
	{ name: 'Status', orderData: 'isDeleted', numeric: false, widthPercent: 15 },
	{ name: '', numeric: false, widthPercent: 5 },
]

const VoucherManagement = () => {
	const [vouchers, setVouchers] = useState([])
	const [filteredVouchers, setFilteredVouchers] = useState([])
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('name')
	const [page, setPage] = useState(0)
	const rowsPerPage = 10
	const [openAddPage, setOpenAddPage] = useState(false)
	const [openUpdatePage, setOpenUpdatePage] = useState(false)
	const [selectedRow, setSelectedRow] = useState(null)
	const [selectedTab, setSelectedTab] = useState(0)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		const fetchVouchers = async () => {
				const data = await VoucherManagementService.VIEW_ALL_VOUCHER_MANAGEMENT()
				setVouchers(data)
				setFilteredVouchers(data)
		}
		fetchVouchers()
	}, [])

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
			return { label: 'Expired', color: 'error' }
		}
		if (voucher.quantity === 0) {
			return { label: 'Out of Stock', color: 'warning' }
		}
		return { label: 'Available', color: 'success' }
	}

	const handleChangePage = (event, newPage) => setPage(newPage)

	const handleChangeTab = (event, newValue) => {
		setSelectedTab(newValue)
		setPage(0)
		filterVouchers(newValue, searchTerm)
	}

	const filterVouchers = (tabIndex, searchValue) => {
		let updatedVouchers = [...vouchers]

		if (tabIndex === 1) {
			updatedVouchers = updatedVouchers.filter((voucher) => voucher.quantity > 0) 
		} else if (tabIndex === 2) {
			updatedVouchers = updatedVouchers.filter((voucher) => voucher.quantity === 0) 
		}

		if (searchValue) {
			updatedVouchers = updatedVouchers.filter((voucher) =>
				voucher.name.toLowerCase().includes(searchValue.toLowerCase())
			)
		}

		setFilteredVouchers(updatedVouchers)
	}

	const handleSearchChange = (value) => {
		setSearchTerm(value)
		filterVouchers(selectedTab, value)
	}

	const visibleRows = useMemo(() => {
		return filteredVouchers
			.sort((a, b) =>
				order === 'desc' ? (b[orderBy] < a[orderBy] ? -1 : 1) : a[orderBy] < b[orderBy] ? -1 : 1
			)
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}, [order, orderBy, page, filteredVouchers, rowsPerPage])

	const refreshVouchers = async () => {
			const data = await VoucherManagementService.VIEW_ALL_VOUCHER_MANAGEMENT()
			setVouchers(data)
			setFilteredVouchers(data)
	}	

	const handleOpenUpdate = (row) => {
		setSelectedRow(row)
		setOpenUpdatePage(true)
	}

	const handleCloseUpdate = () => {
		setOpenUpdatePage(false)
		setSelectedRow(null)
	}

	const handleDelete = async (Id) => {
		const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa voucher này?')
		if (confirmDelete) {
				await VoucherManagementService.REMOVE_VOUCHER(Id)
				setVouchers(vouchers.filter((voucher) => voucher.id !== Id))
				refreshVouchers()
	}
     }

	return (
		<Box>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight='bold'>
					Voucher Management
				</Typography>
				<Stack direction='row' justifyContent='space-between' padding='0 1%'>
					<CrudSearchBar
						listItem={filteredVouchers.map((row) => row.name)}
						widthPercent={70}
						value={searchTerm}
						handleChange={(e, value) => handleSearchChange(value)}
					/>
					<Button variant='contained' onClick={() => setOpenAddPage(true)} startIcon={<Add />}>
						Add New Voucher
					</Button>
				</Stack>
				<CrudTabs value={selectedTab} handleChange={handleChangeTab}>
					<Tab label='All Vouchers' />
					<Tab label='In Stock' />
					<Tab label='Out of Stock' />
				</CrudTabs>
			</Stack>
			<Paper sx={{ borderRadius: 3, overflow: 'auto' }}>
				<Table stickyHeader sx={{ minWidth: '750px' }}>
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
									<TableCell>
										<Stack direction='row' spacing={2} alignItems='center'>
											<p>{row.name}</p>
										</Stack>
									</TableCell>
									<TableCell>{row.expiredDate}</TableCell>
									<TableCell>{row.description}</TableCell>
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
											<MenuItem>
												<Button onClick={() => handleOpenUpdate(row)} startIcon={<Edit />}>
													Update
												</Button>
											</MenuItem>
											<MenuItem>
												<Button
													onClick={() => handleDelete(row.id)}
													startIcon={<Delete />}
													disabled={getVoucherStatus(row).label === 'Deleted'}
												>
													Remove
												</Button>
											</MenuItem>
										</CrudMenuOptions>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={7} align='center'>
									No vouchers found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component='div'
					count={filteredVouchers.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
				/>
			</Paper>
			{openAddPage && (
				<VoucherAdd
					open={openAddPage}
					handleClose={() => setOpenAddPage(false)}
					onSuccess={refreshVouchers}
				/>
			)}
			{openUpdatePage && (
				<VoucherUpdate
					open={openUpdatePage}
					handleClose={handleCloseUpdate}
					row={selectedRow}
					onSuccess={refreshVouchers}
				/>
			)}
		</Box>
	)
}

export default VoucherManagement
