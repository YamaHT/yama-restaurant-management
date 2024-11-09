import { BookingManagementService } from '@/services/BookingManagementService'
import { AssetImages } from '@/utilities/AssetImages'
import { Build, Close, Done, Error } from '@mui/icons-material'
import {
	Avatar,
	Button,
	ButtonGroup,
	Chip,
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

const CookingStatusBookingDetail = ({ open, bookingId, handleClose, trigger }) => {
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

	const handleChangeStatus = async (id, status) => {
		const formData = {
			bookingDetailId: id,
			cookingStatus: status,
		}
		const data = await BookingManagementService.UPDATE_BOOKING_DETAIL_STATUS(formData)
		if (data) {
			setBooking(data)
			trigger()
		}
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
					{booking?.bookingDetails.map(
						(detail) =>
							detail.cookingStatus !== 'Cooked' && (
								<Stack
									direction={{ md: 'row', sm: 'column' }}
									spacing={2}
									alignItems={{ md: 'center' }}
								>
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
												{detail.product.subCategory.category.name} /{' '}
												{detail.product.subCategory.name}
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
									<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
										<ButtonGroup>
											<Button disabled>
												<Typography variant='body1' color='textPrimary'>
													{detail.quantity}
												</Typography>
											</Button>
										</ButtonGroup>
									</Stack>
									{detail.cookingStatus === 'InTrouble' ? (
										<Button
											onClick={() => handleChangeStatus(detail.id, 'InCooking')}
											variant='contained'
											color='warning'
											startIcon={<Build />}
										>
											Fixed
										</Button>
									) : (
										<Button
											onClick={() => handleChangeStatus(detail.id, 'InTrouble')}
											variant='contained'
											color='error'
											startIcon={<Error />}
										>
											Trouble
										</Button>
									)}
									<Button
										onClick={() => handleChangeStatus(detail.id, 'Cooked')}
										variant='contained'
										color='success'
										disabled={detail.cookingStatus === 'InTrouble'}
										startIcon={<Done />}
									>
										Finish
									</Button>
								</Stack>
							)
					)}
				</Stack>
			</DialogContent>
			<Divider />
			<DialogActions>
				<Stack alignItems={'start'} width={'100%'} maxHeight={300} overflow={'auto'}>
					<Stack width={'100%'}>
						<Typography variant='h6'>
							Customer name: {booking?.customerName || 'Not Specified'}
						</Typography>
						<Typography variant='h6'>Phone: {booking?.phone || 'Not Specified'}</Typography>
						<Typography variant='body1' sx={{ wordWrap: 'break-word' }}>
							Note: {booking?.note || 'Not Specified'}
						</Typography>
					</Stack>
				</Stack>
			</DialogActions>
		</Dialog>
	)
}

export default CookingStatusBookingDetail
