import TableBookingCard from '@/components/BookingManagement/TableBookingCard'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import DialogChoosingTable from '@/components/DialogChoosing/DialogChoosingTable'
import { BookingManagementService } from '@/services/BookingManagementService'
import { Add } from '@mui/icons-material'
import { Box, Button, Grid2, MenuItem, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import BookingDetail from './BookingDetail'

const BookingManagement = () => {
	const [bookings, setBookings] = useState([])
	const [searchNumber, setSearchNumber] = useState()
	const [openTableChoosing, setOpenTableChoosing] = useState(false)
	const [selectedBooking, setSelectedBooking] = useState(null)
	const [openBookingDetail, setOpenBookingDetail] = useState(false)
	const [selectedDayPart, setSelectedDayPart] = useState(() => {
		const currentHour = new Date().getHours()
		if (currentHour >= 18) {
			return 'Evening'
		} else if (currentHour >= 12) {
			return 'Afternoon'
		} else {
			return 'Morning'
		}
	})

	useEffect(() => {
		const fetchBooking = async () => {
			const data = await BookingManagementService.GET_ALL(selectedDayPart)
			if (data) {
				setBookings(data)
			}
		}
		fetchBooking()
	}, [selectedDayPart])

	const handleAddBooking = async (tableId) => {
		const formData = {
			tableId,
			dayPart: selectedDayPart,
		}
		const data = await BookingManagementService.ADD_BOOKING(formData)
		if (data) {
			setBookings(data)
		}
	}

	const handleBookingClick = async (booking) => {
		setSelectedBooking(booking)
		setOpenBookingDetail(true)
	}

	return (
		<Box>
			<Typography variant='h5' fontWeight={'bold'}>
				Booking Management
			</Typography>
			<Stack my={2} spacing={5} direction={'row'}>
				<CrudSearchBar
					listItem={bookings.map((booking) => booking.table.id)}
					widthPercent={30}
					placeholder={'Search table number...'}
					value={searchNumber}
					handleChange={setSearchNumber}
				/>
				<ValidationSelect
					label={'Day Part'}
					value={selectedDayPart}
					onChange={(e) => setSelectedDayPart(e.target.value)}
					sx={{ width: '30%' }}
					size={'small'}
				>
					<MenuItem value={'Morning'}>Morning</MenuItem>
					<MenuItem value={'Afternoon'}>Afternoon</MenuItem>
					<MenuItem value={'Evening'}>Evening</MenuItem>
				</ValidationSelect>
			</Stack>
			<Grid2 container spacing={2}>
				<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
					<Button
						onClick={() => setOpenTableChoosing(true)}
						sx={{
							width: '100%',
							height: 150,
							fontSize: '2rem',
							'& .MuiSvgIcon-root': { fontSize: '2rem' },
						}}
						variant='outlined'
						startIcon={<Add sx={{ bgcolor: 'primary.main', color: 'white' }} />}
					>
						Add new table
					</Button>
					{openTableChoosing && (
						<DialogChoosingTable
							open={openTableChoosing}
							dayPart={selectedDayPart}
							handleClose={() => setOpenTableChoosing(false)}
							handleSelectTable={handleAddBooking}
						/>
					)}
				</Grid2>
				{bookings.map((booking) => (
					<Grid2 onClick={() => handleBookingClick(booking)} size={{ xs: 12, sm: 6, md: 4 }}>
						<TableBookingCard table={booking.table} />
					</Grid2>
				))}
				{openBookingDetail && (
					<BookingDetail
						bookingId={selectedBooking.id}
						open={openBookingDetail}
						handleClose={() => setOpenBookingDetail(false)}
					/>
				)}
			</Grid2>
		</Box>
	)
}

export default BookingManagement
