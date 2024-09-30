import React, { useEffect, useState } from 'react'
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
} from '@mui/icons-material'

const CustomTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontWeight: 'bold',
		textAlign: 'center',
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
const fakeData = () => {
	return Array.from({ length: 3 }, (_, index) => ({
		id: index + 1,
		quantity: 69 + index,
		total: 50 + index,
		actualPayment: 49.0 + index,
		orderDate: `2024-09-${1 + index}`,
		status: {
			id: index + 1,
			name: `Status ${index + 1}`,
		},
		userVoucher: {
			id: index + 1,
			userId: index * 2 + 1,
			voucher: {
				id: index + 1,
				image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
				name: 'Voucher Name',
			},
		},
		listOrderDetail: Array.from({ length: 3 }, (_, j) => ({
			orderId: index + 1,
			Product: {
				id: j + 1,
				image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
				name: `Product Name ${j + 1}`,
				price: 20 + j,
			},
			amount: 2 + j,
			subtotal: (20 + j) * (2 + j),
		})),
	}))
}
const HistoryOrderPage = () => {
	const tableColumns = [
		{ name: 'ID', width: '10%' },
		{ name: 'Order Date', width: '25%' },
		{ name: 'Quantity', width: '15%' },
		{ name: 'Order Total', width: '15%' },
		{ name: 'Voucher', width: '35%' },
	]
	const orderTypes = [
		{ id: 1, name: 'In Cart', icon: <ShoppingCart /> },
		{ id: 2, name: 'Pay Later', icon: <Payment /> },
		{ id: 3, name: 'Not Pay Yet', icon: <Pending /> },
		{ id: 4, name: 'Pay Online', icon: <Payment /> },
		{ id: 5, name: 'On Delivering', icon: <LocalShipping /> },
		{ id: 6, name: 'Delivered', icon: <CheckCircle /> },
		{ id: 7, name: 'Confirmed', icon: <CheckCircle /> },
		{ id: 8, name: 'Is Error', icon: <Error /> },
	]
	// eslint-disable-next-line
	const [historyOrder, setHistoryOrder] = useState([])
	const [orderType, setOrderType] = useState(0)
	const [selectedOrder, setSelectedOrder] = useState(null)

	const handleOrderType = (event, newValue) => {
		setOrderType(newValue)
	}

	const handleShowProducts = (orderId) => {
		setSelectedOrder((prevOrder) => (prevOrder === orderId ? null : orderId))
	}
	useEffect(() => {
		setHistoryOrder(fakeData())
	}, [])
	return (
		<Box sx={{ margin: '3%' }}>
			<Typography
				variant='h1'
				fontFamily={'cursive'}
				textAlign={'center'}
				textTransform={'uppercase'}
				padding={'2% 0%'}
			>
				History Order
			</Typography>
			<Box alignItems='center'>
				<Tabs
					value={orderType}
					onChange={handleOrderType}
					variant='fullWidth'
					scrollButtons='auto'
					centered
				>
					{orderTypes.map((order, index) => (
						<Tab label={order.name} key={index} {...a11yProps(index)} icon={order.icon} />
					))}
				</Tabs>
				{orderTypes.map((type, index) => (
					<TabPanel value={orderType} index={index} key={index}>
						{historyOrder.filter((item) => item.status.id === orderTypes[orderType].id).length ===
						0 ? (
							<Typography variant='h2' textAlign={'center'}>
								You have no order {type.name.toLocaleLowerCase()}
							</Typography>
						) : (
							<TableContainer component={Paper}>
								<Table sx={{ tableLayout: 'fixed' }}>
									<TableHead>
										{tableColumns.map((column, index) => (
											<CustomTableCell key={index} width={column.width} component='th'>
												<Typography variant='h5'>{column.name}</Typography>
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
														onClick={() => handleShowProducts(order.id)}
														sx={{
															cursor: 'pointer',
															transition: '0.25 ease',
															':hover': {
																backgroundColor: '#f0f0f0',
															},
															'&:last-child td,&:last-child th': {
																border: 0,
															},
														}}
													>
														<CustomTableCell scope='order'>
															<Typography variant='h5' fontWeight={700}>
																{order.id}
															</Typography>
														</CustomTableCell>
														<CustomTableCell>
															<Typography variant='h5' fontFamily={'cursive'}>
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
															{!order.voucher ? (
																<Box
																	display={'flex'}
																	flexDirection={'column'}
																	alignItems={'center'}
																	padding={'0 2%'}
																>
																	<img
																		src={order.userVoucher.voucher.image}
																		alt={order.userVoucher.voucher.name}
																		style={{
																			objectFit: 'cover',
																			width: '50%',
																			aspectRatio: 7 / 3,
																		}}
																	/>
																	<Typography variant='overline'>
																		{order.userVoucher.voucher.name}
																	</Typography>
																</Box>
															) : (
																<Typography variant='h5' fontFamily={'cursive'}>
																	No apply voucher
																</Typography>
															)}
														</CustomTableCell>
													</TableRow>
													{/* List Order Detail */}
													{selectedOrder === order.id && (
														<TableRow>
															<CustomTableCell colSpan={5}>
																<TableContainer component={Paper}>
																	<Table>
																		<TableBody>
																			{order.listOrderDetail.map((orderDetail) => (
																				<TableRow key={orderDetail.Product.id}>
																					<CustomTableCell width={'12%'}>
																						<Box padding={'0 2%'}>
																							<img
																								src={orderDetail.Product.image}
																								alt={orderDetail.Product.name}
																								style={{
																									width: '100%',
																									aspectRatio: 5 / 3,
																									objectFit: 'cover',
																								}}
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
