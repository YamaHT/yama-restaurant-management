import DialogChoosingProduct from '@/components/DialogChoosing/DialogChoosingProduct'
import { BookingManagementService } from '@/services/BookingManagementService'
import { AssetImages } from '@/utilities/AssetImages'
import { Add, Build, Check, Close, Delete, Remove } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useState } from 'react'

const BookingDetail = ({ open, bookingId, handleClose, trigger }) => {
	const [booking, setBooking] = useState(null)
	const [openChoosingProduct, setOpenChoosingProduct] = useState(false)
	const [totalPrice, setTotalPrice] = useState(0)

	useEffect(() => {
		const fetchBooking = async () => {
			const data = await BookingManagementService.GET_DETAIL(bookingId)
			if (data) {
				setBooking(data)
			}
		}
		fetchBooking()
	}, [open])

	useEffect(() => {
		setTotalPrice(
			booking?.bookingDetails.reduce(
				(total, bookingDetail) => total + bookingDetail.product.price * bookingDetail.quantity,
				0
			)
		)
	}, [booking])

	const handleInfoChange = (e) => {
		const { name, value } = e.target
		setBooking((prev) => ({ ...prev, [name]: value }))
	}

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

	const handleUpdateBookingDetailQuantity = async (id, quantity) => {
		const formData = {
			bookingDetailId: id,
			quantity,
		}
		const data = await BookingManagementService.UPDATE_BOOKING_DETAIL_QUANTITY(formData)
		if (data) {
			setBooking(data)
		}
	}
	const handleFixBookingDetail = async (id) => {
		const formData = {
			bookingDetailId: id,
			cookingStatus: 'InCooking',
		}
		const data = await BookingManagementService.UPDATE_BOOKING_DETAIL_STATUS(formData)
		if (data) {
			setBooking(data)
			trigger()
		}
	}

	const handleDeleteBookingDetail = async (id) => {
		const data = await BookingManagementService.DELETE_BOOKING_DETAIL(id)
		if (data) {
			setBooking(data)
		}
	}

	const handleUpdateInformation = async () => {
		const formData = {
			id: booking.id,
			customerName: booking.customerName,
			phone: booking.phone,
			note: booking.note,
		}
		const data = await BookingManagementService.UPDATE_BOOKING(formData)
		if (data) {
			enqueueSnackbar('Update successfully', { variant: 'success' })
			setBooking(data)
		}
	}

	const handlePayBooking = async () => {
		const data = await BookingManagementService.PAY_BOOKING(bookingId)
		if (data) {
		} else {
		}
		handleClose()
		trigger()
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
						<Stack direction={{ md: 'row', sm: 'column' }} gap={2} alignItems={{ md: 'center' }}>
							<Avatar
								src={AssetImages.ProductImage(detail.product.image?.[0])}
								sx={{ width: '100px', height: '100px' }}
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
								<Stack direction={'row'} spacing={1}>
									<Typography>${detail.product.price}</Typography>
									<Chip
										size='small'
										label={`Available: ${detail.product.stockQuantity}`}
										color={
											detail.product.stockQuantity >= 50
												? 'success'
												: detail.product.stockQuantity >= 20
												? 'warning'
												: 'error'
										}
									/>
								</Stack>
							</Stack>
							<Stack
								direction={'row'}
								justifyContent={'space-between'}
								spacing={2}
								flexWrap={'wrap'}
								alignItems={'center'}
							>
								<Typography variant='h6'>${detail.product.price * detail.quantity}</Typography>
								<ButtonGroup>
									{detail.cookingStatus !== 'Cooked' && (
										<IconButton
											onClick={() =>
												handleUpdateBookingDetailQuantity(detail.id, detail.quantity - 1)
											}
										>
											<Remove />
										</IconButton>
									)}
									<Button disabled>
										<Typography variant='body1' color='textPrimary'>
											{detail.quantity}
										</Typography>
									</Button>
									{detail.cookingStatus !== 'Cooked' && (
										<IconButton
											onClick={() =>
												handleUpdateBookingDetailQuantity(detail.id, detail.quantity + 1)
											}
										>
											<Add />
										</IconButton>
									)}
								</ButtonGroup>
								{detail.cookingStatus === 'InTrouble' && (
									<Button
										onClick={() => handleFixBookingDetail(detail.id)}
										variant='contained'
										color='warning'
										startIcon={<Build />}
									>
										Fixed
									</Button>
								)}
								{detail.cookingStatus === 'InCooking' && (
									<Button
										onClick={() => handleDeleteBookingDetail(detail.id)}
										variant='contained'
										color='error'
										startIcon={<Delete />}
									>
										Delete
									</Button>
								)}
								{detail.cookingStatus === 'Cooked' && (
									<Button
										disableFocusRipple
										disableElevation
										sx={{ userSelect: 'none', pointerEvents: 'none' }}
										variant='contained'
										color='success'
										startIcon={<Check />}
									>
										Done
									</Button>
								)}
							</Stack>
						</Stack>
					))}
				</Stack>
			</DialogContent>
			<Divider />
			<DialogActions>
				<Stack alignItems={'start'} width={'100%'} maxHeight={300} spacing={2} overflow={'auto'}>
					<Stack
						direction={{ md: 'row', sm: 'column' }}
						justifyContent={'space-between'}
						width={'100%'}
					>
						<Box width={'80%'}>
							<Typography variant='h6'>Customer name:</Typography>
							<TextField
								size='small'
								name='customerName'
								value={booking?.customerName}
								onChange={handleInfoChange}
								fullWidth
							/>

							<Typography variant='h6'>Phone: </Typography>
							<TextField
								size='small'
								name='phone'
								value={booking?.phone}
								onChange={handleInfoChange}
								fullWidth
							/>

							<Typography variant='subtitle1'>Note:</Typography>
							<TextField
								multiline
								size='small'
								name='note'
								value={booking?.note}
								onChange={handleInfoChange}
								fullWidth
							/>
						</Box>
						<Box p={2}>
							<Typography variant='h6'>
								Total dishes:{' '}
								{booking?.bookingDetails.reduce((total, detail) => total + detail.quantity, 0)}
							</Typography>
							<Typography variant='h6'>Total price: ${totalPrice}</Typography>
							<Button
								variant='contained'
								color='success'
								onClick={() => handleUpdateInformation()}
								sx={{ mt: 2 }}
							>
								Update information
							</Button>
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
						<Button
							onClick={handlePayBooking}
							variant='contained'
							color='success'
							size='large'
							fullWidth
						>
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
