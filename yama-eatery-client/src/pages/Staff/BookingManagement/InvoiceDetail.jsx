import { BookingManagementService } from '@/services/BookingManagementService'
import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'

const InvoiceDetail = ({ open, bookingId, handleClose }) => {
	const [booking, setBooking] = useState(null)

	useEffect(() => {
		const fetchBooking = async () => {
			const data = await BookingManagementService.GET_DETAIL(bookingId)
			if (data) {
				setBooking(data)
			}
		}
		fetchBooking()
	}, [open])
	return (
		<Dialog maxWidth PaperProps={{ sx: { bgcolor: '#eee' } }} open={true}>
			<DialogTitle>
				Booking {booking?.id}
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
			</DialogTitle>
		</Dialog>
	)
}

export default InvoiceDetail
