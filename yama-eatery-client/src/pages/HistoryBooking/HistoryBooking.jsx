import { Box, Button, Paper, Typography } from '@mui/material'
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
				img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
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
				img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
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
				img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
				floor: 3,
				type: 'medium',
			},
		},
	]
	return (
		<Box>
			{BookingList.map((booking) => (
				<Box
					key={booking.id}
					maxWidth={'50%'}
					p={'1%'}
					border={1}
					borderRadius={0}
					margin={'1% auto'}
					component={Paper}
				>
					<Box display={'flex'} justifyContent={'space-between'}>
						<Typography variant='body2' color={'GrayText'}>
							Id: {booking.id} | Booking Date: {booking.dayPart} {formatDate(booking.bookingDate)}
						</Typography>
						<Typography
							variant='body1'
							fontWeight='bold'
							color={
								booking.isBooking
									? booking.bookingDetail.isPaid
										? 'inherit'
										: 'darkslategray'
									: 'tomato'
							}
						>
							{booking.isBooking
								? booking.bookingDetail.isPaid
									? 'Deposited'
									: 'Undeposited'
								: 'Booked'}
						</Typography>
					</Box>
					<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
						<Box width={'25%'}>
							<img
								src={booking.table.img}
								alt={`Table ${booking.table.type}`}
								style={{ width: '100%', aspectRatio: 7 / 6, objectFit: 'cover' }}
							/>
						</Box>
						<Box width={'75%'} pl={'2%'}>
							<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
								<Typography variant='body1'>Table Number: {booking.table.id}</Typography>
								<Typography variant='body1' color={'GrayText'} textAlign={'right'}>
									Total Payment: ${booking.totalPayment}
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'row'}
								justifyContent={'space-between'}
								alignItems={'center'}
								paddingLeft={'3%'}
							>
								<Box>
									<Typography variant='body2' color={'GrayText'}>
										Type: {booking.table.type}
									</Typography>
									<Typography variant='body2' color={'GrayText'}>
										Floor: {booking.table.floor}
									</Typography>
								</Box>
								<Typography variant='body1' color={'GrayText'} textAlign={'right'}>
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
									variant='caption'
									color='GrayText'
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
									<Button
										fullWidth
										variant='contained'
										style={{ background: 'tomato', textTransform: 'capitalize' }}
									>
										Cancel Booking
									</Button>
								)}
							</Box>
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default HistoryBooking
