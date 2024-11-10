import { BookingManagementService } from '@/services/BookingManagementService'
import { AssetImages } from '@/utilities/AssetImages'
import { formatDateWithDateTime } from '@/utilities/FormatUtil'
import { Close } from '@mui/icons-material'
import {
	Avatar,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Typography,
} from '@mui/material'
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

			<DialogContent sx={{ maxHeight: '50vh' }}>
				<Stack spacing={1}>
					{booking?.bookingDetails?.map((detail) => (
						<Stack direction={'row'} gap={2} alignItems={'center'}>
							<Avatar
								src={AssetImages.ProductImage(detail.product.image?.[0])}
								sx={{ width: '50px', height: '50px' }}
								variant='rounded'
							/>
							<Stack flexGrow={1} spacing={0.5}>
								<Stack direction={'row'} spacing={1}>
									<Typography>{detail.product.name}</Typography>
									<Divider
										sx={{ bgcolor: 'gray', width: 2 }}
										variant='middle'
										orientation='horizontal'
									/>
									<Typography>
										{detail.product.subCategory.category.name} / {detail.product.subCategory.name}
									</Typography>
								</Stack>
								<Typography>
									${detail.unitPrice} x {detail.quantity}
								</Typography>
							</Stack>
							<Typography variant='h6'>${detail.quantity * detail.unitPrice}</Typography>
						</Stack>
					))}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack alignItems={'start'} width={'100%'}>
					<Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
						<Typography variant='body1'>Total Dishes: </Typography>
						<Typography variant='body1'>
							x {booking?.bookingDetails.reduce((sum, detail) => sum + detail.quantity, 0)}
						</Typography>
					</Stack>
					<Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
						<Typography variant='body1'>Payment:</Typography>
						<Typography variant='body1'>
							${booking?.remainPayment} / {booking?.totalPayment}
						</Typography>
					</Stack>
					<Divider variant='fullWidth' sx={{ width: 0.25, height: 2, my: 1, bgcolor: '#ccc' }} />
					<Typography variant='body1'>
						Customer name: {booking?.customerName || 'Not Specified'}
					</Typography>
					<Typography variant='body1'>Phone: {booking?.phone || 'Not Specified'}</Typography>
					<Typography variant='body1'>
						Checkout Time: {formatDateWithDateTime(booking?.newPaymentDate)}
					</Typography>
				</Stack>
			</DialogActions>
		</Dialog>
	)
}

export default InvoiceDetail
