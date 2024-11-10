import InvoiceCard from '@/components/BookingManagement/InvoiceCard'
import TableBookingCard from '@/components/BookingManagement/TableBookingCard'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { BookingManagementService } from '@/services/BookingManagementService'
import { getFormattedDate } from '@/utilities/FormatUtil'
import { Box, Button, Grid2, MenuItem, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import InvoiceDetail from './InvoiceDetail'

const HistoryInvoice = () => {
	const [bookings, setBookings] = useState([])
	const [filteredbookings, setFilteredbookings] = useState([])
	const [searchNumber, setSearchNumber] = useState()

	const [selectedBooking, setSelectedBooking] = useState(null)
	const [openBookingDetail, setOpenBookingDetail] = useState(false)

	const [selectedDate, setSelectedDate] = useState(getFormattedDate(0))
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
			const data = await BookingManagementService.GET_HISTORY_INVOICE(selectedDate, selectedDayPart)
			if (data) {
				setBookings(data)
			}
		}
		fetchBooking()
	}, [selectedDate, selectedDayPart])

	useEffect(() => {
		let filtered = bookings

		if (searchNumber) {
			filtered = bookings.filter((booking) => booking.table.id.toString() === searchNumber)
		}

		setFilteredbookings(filtered)
	}, [searchNumber, bookings])

	const handleBookingClick = async (booking) => {
		setSelectedBooking(booking)
		setOpenBookingDetail(true)
	}

	return (
		<Box>
			<Typography variant='h5' fontWeight={'bold'}>
				Booking Management - Reservation
			</Typography>
			<Stack my={2} spacing={5} direction={'row'}>
				<CrudSearchBar
					listItem={[...new Set(bookings.map((booking) => booking.table.id.toString()))]}
					widthPercent={100}
					placeholder={'Search table number...'}
					value={searchNumber}
					handleChange={(e, newValue) => setSearchNumber(newValue)}
				/>
				<ValidationTextField
					label={'Date'}
					size='small'
					type='date'
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
					slotProps={{
						inputLabel: { shrink: true },
						input: { inputProps: { max: getFormattedDate(0) } },
					}}
				/>
				<ValidationSelect
					label={'Day Part'}
					value={selectedDayPart}
					onChange={(e) => setSelectedDayPart(e.target.value)}
					size={'small'}
				>
					<MenuItem value={'Morning'}>Morning</MenuItem>
					<MenuItem value={'Afternoon'}>Afternoon</MenuItem>
					<MenuItem value={'Evening'}>Evening</MenuItem>
				</ValidationSelect>
			</Stack>
			<Grid2 container spacing={2}>
				{filteredbookings.map((booking) => (
					<Grid2
						key={booking.id}
						onClick={() => handleBookingClick(booking)}
						size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
					>
						<InvoiceCard booking={booking} />
					</Grid2>
				))}
			</Grid2>
			{openBookingDetail && (
				<InvoiceDetail
					bookingId={selectedBooking.id}
					handleClose={() => setOpenBookingDetail(false)}
					open={openBookingDetail}
				/>
			)}
		</Box>
	)
}

export default HistoryInvoice
