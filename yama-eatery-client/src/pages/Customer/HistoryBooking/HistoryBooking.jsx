import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserService } from '@/services/UserService'

const formatDate = (dateStr) => {
	const date = new Date(dateStr)
	return date.toLocaleDateString('en-GB')
}

const HistoryBooking = () => {
	const [bookingList, setBookingList] = useState([])
	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const data = await UserService.HISTORY_BOOKING()
				setBookingList(data)
			} catch (error) {
				console.error('Error fetching bookings:', error)
			}
		}
		fetchBookings()
	}, [])
	return (
		<Box>
			{bookingList.map((booking) => (
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
								booking.isBooking ? (booking.bookingStatus.isPaid ? 'primary' : 'error') : 'success'
							}
						>
							{booking.isBooking
								? booking.bookingStatus.isPaid
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
								{!booking.bookingStatus.isPaid && (
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
