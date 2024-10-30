import DialogChoosingProduct from '@/components/DialogChoosing/DialogChoosingProduct'
import { BookingManagementService } from '@/services/BookingManagementService'
import { AssetImages } from '@/utilities/AssetImages'
import { Add, Close, Delete, Remove } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'

const BookingDetail = ({ open, bookingId, handleClose }) => {
	const [booking, setBooking] = useState(null)
	const [openChoosingProduct, setOpenChoosingProduct] = useState(false)

	useEffect(() => {
		const fetchBooking = async () => {
			const data = await BookingManagementService.GET_DETAIL(bookingId)
			if (data) {
				setBooking(data)
			}
		}
		fetchBooking()
	}, [open])

	const handleAddBookingDetail = async (productId) => {
		const formData = {
			bookingId,
			productId,
		}
		const data = await BookingManagementService.ADD_BOOKING_DETAIL(formData)
		if (data) {
			setBooking(data)
		}
	}

	const handleUpdateBookingDetail = async (productId, quantity) => {
		const formData = {
			bookingId,
			productId,
			quantity,
		}
		const data = await BookingManagementService.UPDATE_BOOKING_DETAIL(formData)
		if (data) {
			setBooking(data)
		}
	}

	const handleDeleteBookingDetail = async (productId) => {
		const formData = {
			bookingId,
			productId,
		}
		const data = await BookingManagementService.DELETE_BOOKING_DETAIL(formData)
		if (data) {
			setBooking(data)
		}
	}

	const handlePayBooking = async () => {
		const data = await BookingManagementService.PAY_BOOKING(bookingId)
	}

	return (
		<Dialog maxWidth PaperProps={{ sx: { bgcolor: '#eee', width: 'min(900px, 90%)' } }} open={true}>
			<DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant='h6'>Table number {booking?.table.id}</Typography>
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ maxHeight: 300 }}>
				<Stack spacing={2}>
					{booking?.bookingDetails.map((detail) => (
						<Stack direction={'row'} spacing={2}>
							<Avatar
								src={AssetImages.ProductImage(detail.product.image?.[0])}
								sx={{ width: 50, height: 50 }}
								variant='rounded'
							/>
							<Stack flexGrow={1}>
								<Stack direction={'row'} spacing={1}>
									<Typography>{detail.product.name}</Typography>
									<Divider
										sx={{ bgcolor: 'gray', width: 2 }}
										variant='middle'
										orientation='vertical'
									/>
									<Typography>
										{detail.product.subCategory.category.name} / {detail.product.subCategory.name}
									</Typography>
								</Stack>
								<Typography>${detail.product.price}</Typography>
							</Stack>
							<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
								<Typography variant='h6'>${detail.product.price * detail.quantity}</Typography>
								<ButtonGroup>
									<IconButton
										onClick={() => handleUpdateBookingDetail(detail.productId, detail.quantity - 1)}
									>
										<Remove />
									</IconButton>
									<Button disabled>
										<Typography variant='body1' color='textPrimary'>
											{detail.quantity}
										</Typography>
									</Button>
									<IconButton
										onClick={() => handleUpdateBookingDetail(detail.productId, detail.quantity + 1)}
									>
										<Add />
									</IconButton>
								</ButtonGroup>
							</Stack>
							<Button
								onClick={() => handleDeleteBookingDetail(detail.productId)}
								variant='contained'
								startIcon={<Delete />}
							>
								Delete
							</Button>
						</Stack>
					))}
				</Stack>
			</DialogContent>
			<Divider />
			<DialogActions>
				<Stack alignItems={'start'} width={'100%'}>
					<Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
						<Box>
							<Typography variant='h6'>
								Customer name: {booking?.customerName || 'Not Specified'}
							</Typography>
							<Typography variant='h6'>Phone: {booking?.phone || 'Not Specified'}</Typography>
							<Typography variant='subtitle1'>Note: {booking?.note || 'Not Specified'}</Typography>
						</Box>
						<Box>
							<Typography variant='h6'>
								Total dishes:{' '}
								{booking?.bookingDetails.reduce((total, detail) => total + detail.quantity, 0)}
							</Typography>
							<Typography variant='h6'>Total price: ${booking?.totalPayment}</Typography>
						</Box>
					</Stack>
					<Stack direction={'row'} width={'100%'} spacing={2}>
						<Button
							onClick={() => setOpenChoosingProduct(true)}
							variant='contained'
							color='primary'
							size='large'
							fullWidth
						>
							Add new product
						</Button>
						<Button variant='contained' color='success' size='large' fullWidth>
							Pay booking
						</Button>
					</Stack>
				</Stack>
			</DialogActions>
			{openChoosingProduct && (
				<DialogChoosingProduct
					open={openChoosingProduct}
					handleSelectProduct={handleAddBookingDetail}
					handleClose={() => setOpenChoosingProduct(false)}
				/>
			)}
		</Dialog>
	)
}

export default BookingDetail
