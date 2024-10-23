import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import CrudTabs from '@/components/Crud Components/CrudTabs'
import { EnumService } from '@/services/EnumService'
import { TableManagementService } from '@/services/TableManagementService'
import {
	Add,
	BackupTable,
	Delete,
	Edit,
	Icecream,
	Menu,
	Restore,
	TableBar,
	TableRestaurant,
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
import AddTable from './AddTable'
import UpdateTable from './UpdateTable'
import { AssetImages } from '@/utilities/AssetImages'

const headCells = [
	{ name: 'Id', orderData: 'id', numeric: true, widthPercent: 10 },
	{ name: 'Image', orderData: 'image', numeric: true, widthPercent: 25 },
	{ name: 'Floor', orderData: 'floor', numeric: true, widthPercent: 10 },
	{ name: 'Type', orderData: 'type', numeric: false, widthPercent: 10 },
	{ name: 'Status', orderData: 'isDeleted', numeric: false, widthPercent: 30 },
	{ name: '', widthPercent: 5 },
]

const typeNavigation = [
	{ icon: <Menu />, name: 'All' },
	{ icon: <BackupTable />, name: 'Small' },
	{ icon: <TableRestaurant />, name: 'Big' },
	{ icon: <TableBar />, name: 'Round' },
	{ icon: <Icecream />, name: 'Private' },
]

const TableManagement = () => {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [page, setPage] = useState(0)
	const [typeTab, setTypeTab] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [openAddPage, setOpenAddPage] = useState(false)
	const [openUpdatePage, setOpenUpdatePage] = useState(false)
	const [selectedTable, setSelectedTable] = useState(null)
	const [tableTypes, setTableTypes] = useState([])
	const [rows, setRows] = useState([])
	const [filteredRows, setFilteredRows] = useState([])
	const [loading, setLoading] = useState(true) // Loading state
	const [error, setError] = useState(null) // Error handling

	useEffect(() => {
		const fetchTables = async () => {
			setLoading(true)
			try {
				const data = await TableManagementService.GET_ALL()
				setRows(data)
				setFilteredRows(data) // Initialize filtered rows
			} catch (err) {
				setError('Failed to fetch tables.')
			} finally {
				setLoading(false)
			}
		}

		const fetchTableTypes = async () => {
			try {
				const data = await EnumService.GET_ALL_TABLE_TYPE()
				setTableTypes(data)
			} catch (err) {
				setError('Failed to fetch table types.')
			}
		}

		fetchTableTypes()
		fetchTables()
	}, [])

	useEffect(() => {
		const typeFilterMap = ['All', 'Small', 'Big', 'Round', 'Private']
		if (typeFilterMap[typeTab] === 'All') {
			setFilteredRows(rows)
		} else {
			setFilteredRows(rows.filter((row) => row.type === typeFilterMap[typeTab]))
		}
	}, [typeTab, rows])

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const handleOpenUpdate = (table) => {
		setSelectedTable(table)
		setOpenUpdatePage(true)
	}

	const handleRemoveTable = async (tableId) => {
		const data = await TableManagementService.REMOVE_TABLE(tableId)
		setRows(data)
	}

	const handleRestoreTable = async (tableId) => {
		const data = await TableManagementService.RESTORE_PRODUCT(tableId)
		if (data) {
			setRows(data)
		}
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0

	const visibleRows = React.useMemo(
		() =>
			filteredRows
				.slice()
				.sort((a, b) =>
					order === 'desc' ? (b[orderBy] < a[orderBy] ? -1 : 1) : b[orderBy] > a[orderBy] ? -1 : 1
				)
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage, filteredRows]
	)

	return (
		<Box>
			<Stack marginBottom={1} spacing={2}>
				<Typography variant='h5' fontWeight={'bold'}>
					Table Management
				</Typography>

				<Stack direction={'row'} justifyContent={'space-between'}>
					<Button variant='contained' onClick={() => setOpenAddPage(true)} startIcon={<Add />}>
						Add New Table
					</Button>
					{openAddPage && <AddTable open={openAddPage} handleClose={() => setOpenAddPage(false)} />}
				</Stack>

				<CrudTabs value={typeTab} handleChange={setTypeTab}>
					{typeNavigation.map((type, index) => (
						<Tab key={index} icon={type.icon} iconPosition='start' label={type.name} />
					))}
				</CrudTabs>
			</Stack>

			{loading && <Typography>Loading...</Typography>}
			{error && <Typography color='error'>{error}</Typography>}

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
							visibleRows.map((row) => (
								<TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
									<TableCell align='right'>{row.id}</TableCell>
									<TableCell>
										{row.image && row.image.length > 0 ? (
											<AvatarGroup max={10}>
												{row.image.map((imgSrc, index) => (
													<Avatar
														key={index}
														src={AssetImages.TableImage(imgSrc)}
														alt={`Table Image ${index}`}
													/>
												))}
											</AvatarGroup>
										) : (
											<Avatar alt={row.type} />
										)}
									</TableCell>

									<TableCell align='right'>{row.floor}</TableCell>
									<TableCell>{row.type}</TableCell>
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
														{openUpdatePage && selectedTable && (
															<UpdateTable
																open={openUpdatePage}
																handleClose={() => setOpenUpdatePage(false)}
																existingTable={selectedTable}
															/>
														)}
													</MenuItem>
													<MenuItem>
														<CrudConfirmation
															title='Delete Confirmation'
															description='Are you sure you want to delete this?'
															handleConfirm={() => handleRemoveTable(row.id)}
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
														handleConfirm={() => handleRestoreTable(row.id)}
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
								<TableCell colSpan={6} align='center'>
									No tables available
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
					component='div'
					count={filteredRows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	)
}

export default TableManagement
