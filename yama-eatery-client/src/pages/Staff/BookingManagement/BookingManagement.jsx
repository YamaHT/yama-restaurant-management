import TableBookingCard from '@/components/BookingManagement/TableBookingCard'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import DialogChoosingTable from '@/components/DialogChoosing/DialogChoosingTable'
import { BookingManagementService } from '@/services/BookingManagementService'
import { formatDateWithLetterMonth, getFormattedDate } from '@/utilities/FormatUtil'
import { Add } from '@mui/icons-material'
import { Box, Button, Grid2, MenuItem, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import BookingDetail from './BookingDetail'
import InvoiceDetail from './InvoiceDetail'

const BookingManagement = () => {
	const [bookings, setBookings] = useState([])
	const [filteredbookings, setFilteredbookings] = useState([])
	const [searchNumber, setSearchNumber] = useState()

	const [openTableChoosing, setOpenTableChoosing] = useState(false)

	const [selectedBooking, setSelectedBooking] = useState(null)
	const [openBookingDetail, setOpenBookingDetail] = useState(false)
	const [openBill, setOpenBill] = useState(false)
	const [isChange, setIsChange] = useState(false)

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

	const dateOptions = [
		{
			label: `Yesterday - ${formatDateWithLetterMonth(getFormattedDate(-1))}`,
			value: getFormattedDate(-1),
		},
		{
			label: `Today - ${formatDateWithLetterMonth(getFormattedDate(0))}`,
			value: getFormattedDate(0),
		},
		{
			label: `Tomorrow - ${formatDateWithLetterMonth(getFormattedDate(1))}`,
			value: getFormattedDate(1),
		},
		{
			label: `2 Days Later - ${formatDateWithLetterMonth(getFormattedDate(2))}`,
			value: getFormattedDate(2),
		},
		{
			label: `3 Days Later - ${formatDateWithLetterMonth(getFormattedDate(3))}`,
			value: getFormattedDate(3),
		},
	]

	useEffect(() => {
		const fetchBooking = async () => {
			const data = await BookingManagementService.GET_ALL(selectedDate, selectedDayPart)
			if (data) {
				setBookings(data)
			}
		}
		fetchBooking()
	}, [selectedDate, selectedDayPart, isChange])

	useEffect(() => {
		let filtered = bookings

		if (searchNumber) {
			filtered = bookings.filter((booking) => booking.table.id.toString() === searchNumber)
		}

		const getBookingPriority = (booking) => {
			const isTroubleTable = booking.bookingDetails.some(
				(detail) => detail.cookingStatus === 'InTrouble'
			)
			const isDepositTable = booking.depositPrice !== 0

			if (isTroubleTable && isDepositTable) return 1
			if (isTroubleTable) return 2
			if (isDepositTable) return 3
			return 4
		}

		const sortedBookings = filtered.sort((a, b) => {
			return getBookingPriority(a) - getBookingPriority(b)
		})

		setFilteredbookings(sortedBookings)
	}, [searchNumber, bookings])

	const triggerPaidBooking = () => {
		setIsChange(!isChange)
	}

	const handleAddBooking = async (tableId) => {
		const formData = {
			tableId,
			date: selectedDate,
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
				Booking Management - Reservation
			</Typography>
			<Stack my={2} spacing={5} direction={'row'}>
				<CrudSearchBar
					listItem={bookings.map((booking) => booking.table.id.toString())}
					widthPercent={100}
					placeholder={'Search table number...'}
					value={searchNumber}
					handleChange={setSearchNumber}
				/>
				<ValidationSelect
					label={'Date'}
					size='small'
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
				>
					{dateOptions.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</ValidationSelect>
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
				{selectedDate !== getFormattedDate(-1) && (
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
								date={selectedDate}
								dayPart={selectedDayPart}
								handleClose={() => setOpenTableChoosing(false)}
								handleSelectTable={handleAddBooking}
							/>
						)}
					</Grid2>
				)}
				{filteredbookings.map((booking) => (
					<Grid2
						key={booking.id}
						onClick={() => handleBookingClick(booking)}
						size={{ xs: 12, sm: 6, md: 4 }}
					>
						<TableBookingCard booking={booking} />
					</Grid2>
				))}
				{openBookingDetail && (
					<BookingDetail
						bookingId={selectedBooking.id}
						open={openBookingDetail}
						handleClose={() => setOpenBookingDetail(false)}
						handleOpenBill={() => setOpenBill(true)}
						trigger={triggerPaidBooking}
					/>
				)}
				{openBill && (
					<InvoiceDetail
						open={openBill}
						bookingId={selectedBooking.id}
						handleClose={() => setOpenBill(false)}
					/>
				)}
			</Grid2>
		</Box>
	)
}

export default BookingManagement
