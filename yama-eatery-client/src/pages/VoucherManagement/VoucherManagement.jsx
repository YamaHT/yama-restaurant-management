import { Add, Delete, Edit, Menu } from '@mui/icons-material'
import { Avatar, Button, Chip, MenuItem, Paper, Stack, Tab, Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import VoucherAdd from './VoucherAdd'
import VoucherUpdate from './VoucherUpdate'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import CrudTabs from '@/components/Crud Components/CrudTabs'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'

const headCells = [
	{ name: 'Voucher Name', orderData: 'name', numeric: false, widthPercent: 30 },
	{ name: 'Expiration Date', orderData: 'expiredDate', numeric: false, widthPercent: 20 },
	{ name: 'Reduced Percent', orderData: 'reducedPercent', numeric: true, widthPercent: 10 },
	{ name: 'Max Reducing (VND)', orderData: 'maxReducing', numeric: true, widthPercent: 20 },
	{ name: 'Quantity', orderData: 'quantity', numeric: false, widthPercent: 15 },
	{ name: 'Status', orderData: 'quantity', numeric: false, widthPercent: 15 },
	{ name: '', numeric: false, widthPercent: 5 },
]

function createData(id, image, name, expiredDate, reducedPercent, maxReducing, quantity) {
	return { id, image, name, expiredDate, reducedPercent, maxReducing, quantity }
}

const rows = [
	createData(1, 'images/voucher1.jpg', 'Black Friday Voucher', '2024-11-25', 50, 200000, 100),
	createData(2, 'images/voucher2.jpg', 'Cyber Monday Voucher', '2024-12-02', 30, 150000, 200),
	createData(3, 'images/voucher3.jpg', 'Christmas Voucher', '2024-12-25', 40, 300000, 0)
]

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) return -1
	if (b[orderBy] > a[orderBy]) return 1
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

const VoucherManage = () => {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('name')
	const [page, setPage] = useState(0)
	const rowsPerPage = 10
	const [openAddPage, setOpenAddPage] = useState(false)
	const [openUpdatePage, setOpenUpdatePage] = useState(false)
	const [selectedRow, setSelectedRow] = useState(null)
	const [selectedTab, setSelectedTab] = useState(0)

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event, newPage) => setPage(newPage)

	const handleChangeTab = (event, newValue) => {
		setSelectedTab(newValue)
		setPage(0)
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	const visibleRows = useMemo(() => {
		const filteredRows =
			selectedTab === 1 ? rows.filter((row) => row.quantity > 0)
			: selectedTab === 2 ? rows.filter((row) => row.quantity === 0)
			: rows
		return filteredRows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}, [order, orderBy, page, selectedTab])

	const handleOpenUpdate = (row) => {
		setSelectedRow(row)
		setOpenUpdatePage(true)
	}

	const handleCloseUpdate = () => {
		setOpenUpdatePage(false)
		setSelectedRow(null)
	}

	const handleDelete = (rowId) => alert(`Deleted voucher with ID: ${rowId}`)

	return (
		<Paper sx={{ width: '1200px', padding: '1%', bgcolor: '#f0f2f5', zIndex: -1 }}>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight='bold'>Voucher Management</Typography>
				<Stack direction='row' justifyContent='space-between' padding='0 1%'>
					<CrudSearchBar listItem={['Black Friday', 'Cyber Monday', 'Christmas']} widthPercent={50} handleChange={() => {}} />
					<Button variant='contained' onClick={() => setOpenAddPage(true)} startIcon={<Add />}>Add New Voucher</Button>
					{openAddPage && <VoucherAdd open={openAddPage} handleClose={() => setOpenAddPage(false)} />}
				</Stack>
				<CrudTabs value={selectedTab} handleChange={handleChangeTab}>
					<Tab icon={<Menu />} iconPosition='start' label='All Vouchers' />
					<Tab icon={<Menu />} iconPosition='start' label='In stock' />
					<Tab icon={<Menu />} iconPosition='start' label='Out Of Stock' />
				</CrudTabs>
				<Typography variant='body1'>Filter by Reduced Percent:</Typography>
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
						{visibleRows.map((row) => (
							<TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
								<TableCell>
									<Stack direction='row' spacing={2} alignItems='center'>
										<Avatar src={row.image} />
										<p>{row.name}</p>
									</Stack>
								</TableCell>
								<TableCell>{row.expiredDate}</TableCell>
								<TableCell align='right'>{row.reducedPercent}%</TableCell>
								<TableCell align='right'>{row.maxReducing.toLocaleString()} VND</TableCell>
								<TableCell>{row.quantity > 0 ? <Chip label={row.quantity} color='success' /> : <Chip label={row.quantity} color='error' />}</TableCell>
								<TableCell>{row.quantity > 0 ? <Chip label='In stock' color='success' /> : <Chip label='Out of stock' color='error' />}</TableCell>
								<TableCell>
									<CrudMenuOptions>
										<MenuItem>
											<Button onClick={() => handleOpenUpdate(row)} startIcon={<Edit />}>Update</Button>
										</MenuItem>
										<MenuItem>
											<CrudConfirmation title='Delete Confirmation' description='Are you sure you want to delete this voucher?' handleConfirm={() => handleDelete(row.id)}>
												{(handleOpen) => (
													<Button onClick={handleOpen} startIcon={<Delete />}>Remove</Button>
												)}
											</CrudConfirmation>
										</MenuItem>
									</CrudMenuOptions>
								</TableCell>
							</TableRow>
						))}
						{emptyRows > 0 && (
							<TableRow><TableCell colSpan={6} /></TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination rowsPerPageOptions={[10]} component='div' count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} />
			</Paper>

			{openUpdatePage && selectedRow && <VoucherUpdate open={openUpdatePage} handleClose={handleCloseUpdate} selectedRow={selectedRow} />}
		</Paper>
	)
}

export default VoucherManage