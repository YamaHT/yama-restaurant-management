import { Avatar, Box, Button, Divider, Pagination, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserService } from '@/services/UserService'
import { AssetImages } from '@/utilities/AssetImages'
import { formatDateWithLetterMonth, formmatOverflowText } from '@/utilities/FormatUtil'

const getColorByStatus = (status) => {
	switch (status) {
		case 'Undeposited':
			return 'error.main'
		case 'Booking':
			return 'primary.main'
		default:
			return 'success.main'
	}
}

const bookingsPerPage = 5

const HistoryBooking = () => {
	const [bookingList, setBookingList] = useState([])
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(bookingList.length / bookingsPerPage)
	const currentBookings = bookingList.slice(
		(currentPage - 1) * bookingsPerPage,
		currentPage * bookingsPerPage
	)

	useEffect(() => {
		const fetchBookings = async () => {
			const data = await UserService.HISTORY_BOOKING()
			if (data) {
				setBookingList(data)
			}
		}
		fetchBookings()
	}, [])

	const handlePageChange = (event, page) => {
		setCurrentPage(page)
	}

	return (
		<Stack spacing={2}>
			{currentBookings.map((booking) => (
				<Paper key={booking.id} sx={{ p: '2%' }}>
					<Stack
						direction={'row'}
						spacing={1}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Typography variant='body2'>ID: {booking.id}</Typography>
						<Divider orientation='vertical' variant='middle' flexItem sx={{ bgcolor: 'gray' }} />
						<Typography variant='body2' sx={{ flexGrow: 1 }}>
							Booking Date: {booking.dayPart} {formatDateWithLetterMonth(booking.bookingDate)}
						</Typography>
						<Typography
							variant='body1'
							fontWeight='bold'
							color={getColorByStatus(booking.bookingStatus)}
						>
							{booking.bookingStatus}
						</Typography>
					</Stack>
					<Divider sx={{ my: 1, borderBottomWidth: 3 }} />
					<Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
						<Box width={'25%'}>
							<Avatar
								variant='rounded'
								alt={`Table ${booking.table.type}`}
								style={{ width: '100%', height: '100%', aspectRatio: 7 / 6, objectFit: 'cover' }}
								src={AssetImages.TableImage(booking.table.image[0])}
							/>
						</Box>
						<Stack width={'75%'} pl={'2%'} spacing={1} justifyContent={'space-between'}>
							<Box>
								<Stack flexDirection={'row'} justifyContent={'space-between'}>
									<Typography variant='h6' fontWeight={'bold'}>
										Table Number: {booking.table.id}
									</Typography>
									<Box>
										<Typography variant='h6' fontWeight={'bold'} textAlign={'right'}>
											Total Payment: ${booking.totalPayment}
										</Typography>
									</Box>
								</Stack>
								<Stack direction={'row'} justifyContent={'space-between'}>
									<Box>
										<Typography variant='body1' fontWeight={'bold'}>
											Type: {booking.table.type}
										</Typography>
										<Typography variant='body1' fontWeight={'bold'}>
											Floor: {booking.table.floor}
										</Typography>
									</Box>
									<Typography variant='h6' fontWeight={'bold'} textAlign={'right'}>
										Total Dishes: {booking.bookingDetails.length}
									</Typography>
								</Stack>
							</Box>

							<Typography
								variant='body1'
								sx={{
									flexGrow: 1,
									...formmatOverflowText(3),
								}}
							>
								{`Note: ${booking.note}`}
							</Typography>

							{booking.bookingStatus == 'Undeposited' && (
								<Stack direction={'row'} spacing={2} width={'100%'}>
									<Button
										variant='contained'
										fullWidth
										style={{
											background: 'green',
											textTransform: 'capitalize',
										}}
									>
										Pay Deposit ${booking.depositPrice.toFixed(2)}
									</Button>
									<Button
										variant='contained'
										fullWidth
										style={{
											background: '#d50000',
											textTransform: 'capitalize',
										}}
									>
										Cancel Booking
									</Button>
								</Stack>
							)}
						</Stack>
					</Box>
				</Paper>
			))}

			<Stack alignItems={'center'}>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					color='primary'
				/>
			</Stack>
		</Stack>
	)
}

export default HistoryBooking
