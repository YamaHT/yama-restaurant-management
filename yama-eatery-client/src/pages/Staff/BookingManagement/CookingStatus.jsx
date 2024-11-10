import TableBookingCard from '@/components/BookingManagement/TableBookingCard'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import { BookingManagementService } from '@/services/BookingManagementService'
import { formatDateWithLetterMonth, getFormattedDate } from '@/utilities/FormatUtil'
import { Box, Grid2, MenuItem, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CookingStatusBookingDetail from './CookingStatusBookingDetail'

const CookingStatus = () => {
	const [bookings, setBookings] = useState([])
	const [filteredbookings, setFilteredbookings] = useState([])
	const [searchNumber, setSearchNumber] = useState()

	const [selectedBooking, setSelectedBooking] = useState(null)
	const [openBookingDetail, setOpenBookingDetail] = useState(false)
	const [isChange, setIsChange] = useState(false)

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
			const data = await BookingManagementService.GET_ALL(getFormattedDate(0), selectedDayPart)
			if (data) {
				setBookings(data)
			}
		}
		fetchBooking()
	}, [selectedDayPart, isChange])

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

	const handleBookingClick = async (booking) => {
		setSelectedBooking(booking)
		setOpenBookingDetail(true)
	}
	return (
		<Box>
			<Typography variant='h5' fontWeight={'bold'}>
				Booking Management - Cooking Status
			</Typography>
			<Stack my={2} spacing={5} direction={'row'}>
				<CrudSearchBar
					listItem={bookings.map((booking) => booking.table.id.toString())}
					widthPercent={30}
					placeholder={'Search table number...'}
					value={searchNumber}
					handleChange={setSearchNumber}
				/>
				<ValidationSelect
					label={'Day Part'}
					value={selectedDayPart}
					onChange={(e) => setSelectedDayPart(e.target.value)}
					size={'small'}
					sx={{ width: '30%' }}
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
						size={{ xs: 12, sm: 6, md: 4 }}
					>
						<TableBookingCard booking={booking} />
					</Grid2>
				))}
			</Grid2>
			{openBookingDetail && (
				<CookingStatusBookingDetail
					bookingId={selectedBooking.id}
					open={openBookingDetail}
					handleClose={() => setOpenBookingDetail(false)}
					trigger={triggerPaidBooking}
				/>
			)}
		</Box>
	)
}

export default CookingStatus
