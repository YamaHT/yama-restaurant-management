import React, { useState } from 'react'
import classNames from 'classnames/bind'
import {
	Box,
	Typography,
	Tab,
	Tabs,
	Table,
	TableBody,
	TableContainer,
	tableCellClasses,
	TableCell,
	TableHead,
	TableRow,
	styled,
	Paper,
} from '@mui/material'
import TabPanel from '@/components/TabPanel/TabPanel'
import {
	ShoppingCart,
	Payment,
	Error,
	LocalShipping,
	CheckCircle,
	Pending,
	Info,
} from '@mui/icons-material'
import { fakeData } from '../../services/fakeData'
import styles from './HistoryOrder.module.scss'

const CustomTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontWeight: 'bold',
	},
	[`&.${tableCellClasses.body}`]: {
		textAlign: 'center',
	},
}))

function a11yProps(index) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	}
}

const HistoryOrderPage = () => {
	const tableColumns = [
		{ name: 'ID', width: '10%' },
		{ name: 'Order Date', width: '25%' },
		{ name: 'Quantity', width: '15%' },
		{ name: 'Order Total', width: '20%' },
		{ name: 'Voucher', width: '40%' },
	]
	const orderTypes = [
		{ id: 1, name: 'In Cart' },
		{ id: 2, name: 'Pay Later' },
		{ id: 3, name: 'Not Pay Yet' },
		{ id: 4, name: 'Pay Online' },
		{ id: 5, name: 'On Delivering' },
		{ id: 6, name: 'Delivered' },
		{ id: 7, name: 'Confirmed' },
		{ id: 8, name: 'Is Error' },
	]
	const getStatusIcon = (status) => {
		switch (status) {
			case 'In Cart':
				return <ShoppingCart />
			case 'Pay Later':
				return <Payment />
			case 'Not Pay Yet':
				return <Pending />
			case 'Pay Online':
				return <Payment />
			case 'On Delivering':
				return <LocalShipping />
			case 'Delivered':
				return <CheckCircle />
			case 'Confirmed':
				return <CheckCircle />
			case 'Is Error':
				return <Error />
			default:
				return <Info />
		}
	}
	const cx = classNames.bind(styles)
	// eslint-disable-next-line
	const [historyOrder, setHistoryOrder] = useState(fakeData())
	const [orderType, setOrderType] = useState(0)
	const [selectedOrder, setSelectedOrder] = useState(null)

	const handleOrderType = (event, newValue) => {
		setOrderType(newValue)
	}

	const handleShowProducts = (orderId) => {
		setSelectedOrder((prevOrder) => (prevOrder === orderId ? null : orderId))
	}

	return (
		<Box className={cx('container')}>
			<Typography variant='h2' className={cx('title')}>
				History Order
			</Typography>
			<Box alignItems='center'>
				<Tabs value={orderType} onChange={handleOrderType} variant='fullWidth' centered>
					{orderTypes.map((order, index) => (
						<Tab
							label={order.name}
							key={index}
							{...a11yProps(index)}
							icon={getStatusIcon(order.name)}
						/>
					))}
				</Tabs>
				{orderTypes.map((order, index) => (
					<TabPanel value={orderType} index={index} key={index}>
						{historyOrder.filter((item) => item.status.id === orderTypes[orderType].id).length ===
						0 ? (
							<Typography variant='h3' textAlign={'center'}>
								You have no order with this status
							</Typography>
						) : (
							<TableContainer component={Paper}>
								<Table classes={cx('historyOrder-table')}>
									<TableHead>
										{tableColumns.map((column, index) => (
											<CustomTableCell key={index} width={column.width} component='th'>
												<Typography variant='h5' textAlign={'center'}>
													{column.name}
												</Typography>
											</CustomTableCell>
										))}
									</TableHead>
									<TableBody>
										{historyOrder
											.filter((item) => item.status.id === orderTypes[orderType].id)
											.map((order) => (
												<>
													<TableRow
														key={order.id}
														className={cx('historyOrder-table-row')}
														onClick={() => handleShowProducts(order.id)}
													>
														<CustomTableCell scope='order'>
															<Typography variant='h4' fontFamily={'unset'}>
																{order.id}
															</Typography>
														</CustomTableCell>
														<CustomTableCell>
															<Typography variant='h5' fontFamily={'sans-serif'}>
																{order.orderDate}
															</Typography>
														</CustomTableCell>
														<CustomTableCell>
															<Typography variant='h4' fontFamily={'monospace'}>
																{order.quantity}
															</Typography>
														</CustomTableCell>
														<CustomTableCell>
															<Typography variant='h4' fontFamily={'monospace'}>
																{order.actualPayment}$
															</Typography>
														</CustomTableCell>
														<CustomTableCell width={'35%'}>
															<Box
																className={cx(
																	'orderDetail-table-productContainer',
																	'orderDetail-table-productDetails'
																)}
															>
																<img
																	src={order.userVoucher.voucher.image}
																	alt={order.userVoucher.voucher.name}
																	className={cx('historyOrder-table-row-voucher-image')}
																/>
																<Typography variant='overline'>
																	{order.userVoucher.voucher.name}
																</Typography>
															</Box>
														</CustomTableCell>
													</TableRow>
													{/* List Order Detail */}
													{selectedOrder === order.id && (
														<TableRow>
															<CustomTableCell colSpan={5}>
																<TableContainer component={Paper}>
																	<Table className={cx('table')}>
																		<TableBody>
																			{order.listOrderDetail.map((orderDetail) => (
																				<TableRow key={orderDetail.Product.id}>
																					<CustomTableCell width={'10%'}>
																						<Box
																							className={cx('orderDetail-table-productContainer')}
																						>
																							<img
																								src={orderDetail.Product.image}
																								alt={orderDetail.Product.name}
																								className={cx('orderDetail-table-product-image')}
																							/>
																						</Box>
																					</CustomTableCell>
																					<CustomTableCell>
																						<Typography variant='h5'>
																							{orderDetail.Product.name}
																						</Typography>
																					</CustomTableCell>
																					<CustomTableCell>
																						<Typography variant='h6'>Food</Typography>
																					</CustomTableCell>
																					<CustomTableCell>
																						<Typography variant='h5' fontFamily={'monospace'}>
																							x{orderDetail.amount}
																						</Typography>
																					</CustomTableCell>
																					<CustomTableCell>
																						<Typography variant='h5' fontFamily={'monospace'}>
																							{orderDetail.subtotal}$
																						</Typography>
																					</CustomTableCell>
																				</TableRow>
																			))}
																		</TableBody>
																	</Table>
																</TableContainer>
															</CustomTableCell>
														</TableRow>
													)}
												</>
											))}
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</TabPanel>
				))}
			</Box>
		</Box>
	)
}

export default HistoryOrderPage
