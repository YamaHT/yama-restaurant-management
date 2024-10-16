import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
const formatDate = (dateStr) => {
	const date = new Date(dateStr)
	return date.toLocaleDateString('en-GB')
}
const HistoryBooking = () => {
	const BookingList = [
		{
			id: 1945,
			bookingDate: '1945-04-30',
			dayPart: 'Morning',
			isBooking: true,
			note: ' This is the node This is the nodeThis is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node',
			bookingDetail: { id: 1945, isPaid: true },
			totalPayment: 50,
			totalAmount: 10,
			table: {
				id: 1,
				img: '',
				floor: 1,
				type: 'small',
			},
		},
		{
			id: 1945,
			bookingDate: '1945-04-30',
			dayPart: 'Evening',
			isBooking: true,
			note: ' This is the node This is the nodeThis is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node',
			bookingDetail: { id: 1945, isPaid: false },
			totalPayment: 50,
			totalAmount: 10,
			table: {
				id: 1,
				img: '',
				floor: 2,
				type: 'large',
			},
		},
		{
			id: 1945,
			bookingDate: '1945-04-30',
			dayPart: 'Night',
			isBooking: false,
			note: ' This is the node This is the nodeThis is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node This is the node',
			bookingDetail: { id: 1945, isPaid: true },
			totalPayment: 500,
			totalAmount: 100,
			table: {
				id: 1,
				img: '',
				floor: 3,
				type: 'medium',
			},
		},
	]
	return (
		<Box>
			{BookingList.map((booking) => (
				<Paper
					key={booking.id}
					sx={{ background: '#f0f2f5', boxShadow: '0 2px 5px #000a', p: '2%', m: '2% 0' }}
				>
					<Box display={'flex'} justifyContent={'space-between'}>
						<Typography variant='body2' fontSize={15}>
							ID: {booking.id} | Booking Date: {booking.dayPart} {formatDate(booking.bookingDate)}
						</Typography>
						<Typography
							variant='body1'
							fontWeight='bold'
							color={
								booking.isBooking ? (booking.bookingDetail.isPaid ? 'primary' : 'error') : 'success'
							}
						>
							{booking.isBooking
								? booking.bookingDetail.isPaid
									? 'Deposited'
									: 'Undeposited'
								: 'Booked'}
						</Typography>
					</Box>
					<Divider sx={{ my: 1, borderBottomWidth: 3 }} />
					<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
						<Box width={'25%'}>
							<Avatar
								src={booking.table.img}
								variant='square'
								alt={`Table ${booking.table.type}`}
								style={{ width: '100%', height: '100%', aspectRatio: 7 / 6, objectFit: 'cover' }}
							/>
						</Box>
						<Box width={'75%'} pl={'2%'}>
							<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
								<Typography variant='h6' fontWeight={'bold'}>
									Table Number: {booking.table.id}
								</Typography>
								<Typography variant='h6' fontWeight={'bold'} textAlign={'right'}>
									Total Payment: ${booking.totalPayment}
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'row'}
								justifyContent={'space-between'}
								alignItems={'center'}
							>
								<Box>
									<Typography variant='body1' fontWeight={'bold'}>
										Type: {booking.table.type}
									</Typography>
									<Typography variant='body1' fontWeight={'bold'}>
										Floor: {booking.table.floor}
									</Typography>
								</Box>
								<Typography variant='h6' textAlign={'right'} fontWeight={'bold'}>
									Total Dishes: {booking.totalAmount}
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'column'}
								alignItems={'self-start'}
								justifyContent={'center'}
								minHeight={'60%'}
								pl={'2%'}
								mt={'1%'}
							>
								<Typography
									variant='body2'
									sx={{
										display: '-webkit-box',
										WebkitLineClamp: 2,
										WebkitBoxOrient: 'vertical',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									Note: {booking.note}
								</Typography>
								{!booking.bookingDetail.isPaid && booking.isBooking && (
									<Box display='flex' flexDirection='column' width='100%'>
										<Button
											fullWidth
											variant='contained'
											style={{
												background: '#d50000',
												textTransform: 'capitalize',
												marginTop: '20px',
											}}
										>
											Cancel Booking
										</Button>
										<Button
											fullWidth
											variant='contained'
											style={{
												background: 'green',
												textTransform: 'capitalize',
												marginTop: '10px',
											}}
										>
											Payment
										</Button>
									</Box>
								)}
							</Box>
						</Box>
					</Box>
				</Paper>
			))}
		</Box>
	)
}

export default HistoryBooking
