import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import DialogChoosingProduct from '@/components/DialogChoosingProduct/DialogChoosingProduct'
import { TableService } from '@/services/TableService'
import { AssetImages } from '@/utilities/AssetImages'
import { Add, ArrowBackIos, ArrowForwardIos, Cancel } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Card,
	Grid2,
	IconButton,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

export default function TableDetail() {
	const { id } = useParams()
	const navigate = useNavigate()

	const [table, setTable] = useState()
	const [open, setOpen] = useState(false)
	const [formData, setFormData] = useState({
		product: [],
		firstName: '',
		lastName: '',
		phone: '',
		date: '',
		dayPart: '',
		note: '',
	})

	const slideRef = useRef(null)
	const fieldsRef = useRef([])

	const totalReserve = formData.product
		.reduce((acc, product) => acc + product.price * product.quantity, 0)
		.toFixed(2)

	const deposit = (totalReserve * 0.1).toFixed(2)

	useEffect(() => {
		async function fetchProductDetail() {
			const data = await TableService.DETAIL(id)
			if (data) {
				setTable(data)
			} else {
				navigate('/table')
			}
		}
		fetchProductDetail()
	}, [id])

	const handleFormChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleAddBookingDetail = (newProduct) => {
		setFormData((prevState) => {
			const existingProductIndex = prevState.product.findIndex(
				(product) => product.id === newProduct.id
			)

			if (existingProductIndex !== -1) {
				const updatedProducts = prevState.product.map((product, index) =>
					index === existingProductIndex ? { ...product, quantity: product.quantity + 1 } : product
				)
				return {
					...prevState,
					product: updatedProducts,
				}
			}

			const newProductEntry = {
				id: newProduct.id,
				image: newProduct.image[0],
				quantity: 1,
				price: newProduct.price,
			}

			return {
				...prevState,
				product: [...prevState.product, newProductEntry],
			}
		})
	}

	const handleRemoveProduct = (index) => {
		setFormData((prevState) => ({
			...prevState,
			product: prevState.product.filter((_, i) => i !== index),
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
		}
	}

	const handleThumbnailClick = (index) => {
		slideRef.current.goTo(index)
	}

	return table ? (
		<Box p={'2% 5%'}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}></Stack>
			<Card
				sx={{
					minHeight: 500,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'linear-gradient(to top right, #F8C794, #FFE0B5, #FFF2D7)',
					p: 4,
					position: 'relative',
				}}
			>
				<Typography variant='h4'>{table.type} Table</Typography>

				<Typography
					variant='h5'
					sx={{
						position: 'absolute',
						top: 16,
						right: 16,
					}}
				>
					Floor {table.floor}
				</Typography>

				<Box width={'100%'}>
					<Slide
						prevArrow={
							<ArrowBackIos
								sx={{
									transform: 'scale(2)',
									ml: 3,
									color: 'white',
									filter: 'drop-shadow(0px 0px 5px black)',
								}}
							/>
						}
						nextArrow={
							<ArrowForwardIos
								sx={{
									transform: 'scale(2)',
									mr: 3,
									color: 'white',
									filter: 'drop-shadow(0px 0px 5px black)',
								}}
							/>
						}
						easing='ease'
						duration={5000}
						ref={slideRef}
					>
						{table.image?.map((slide, index) => {
							return (
								<Box height={500} key={index}>
									<img
										style={{ width: '100%', aspectRatio: 2 / 1, objectFit: 'fill' }}
										src={AssetImages.TableImage(slide)}
										draggable={false}
										alt={`Thumbnail ${index + 1}`}
									/>
								</Box>
							)
						})}
					</Slide>
				</Box>
			</Card>

			<Stack direction='row' justifyContent='center' mt={1}>
				{table.image.map((image, index) => (
					<Box
						key={index}
						component='img'
						src={AssetImages.TableImage(image)}
						alt={`Thumbnail ${index + 1}`}
						sx={{
							width: '80px',
							height: '50px',
							marginRight: '10px',
							cursor: 'pointer',
							objectFit: 'cover',
						}}
						onClick={() => handleThumbnailClick(index)}
					/>
				))}
			</Stack>
			<Box
				sx={{
					marginTop: '20px',
					padding: '20px',
					backgroundColor: '#f9f9f9',
					borderRadius: '10px',
				}}
			>
				<Typography variant='h6'>Booking Information</Typography>
				<Grid2 container spacing={2}>
					{formData.product?.map((selectedProduct, index) => (
						<Grid2
							size={{ xs: 12, sm: 2, md: 2 }}
							position={'relative'}
							key={selectedProduct.id || index}
						>
							<Avatar
								variant='rounded'
								sx={{ height: 130, width: '100%' }}
								src={AssetImages.ProductImage(selectedProduct.image)}
							></Avatar>
							<Stack
								sx={{ my: 1 }}
								direction={'row'}
								alignItems={'center'}
								justifyContent={'space-between'}
							>
								<Typography
									sx={{ bottom: 0, textShadow: '0 0 5px #fff' }}
									variant='body2'
									color='black'
								>
									Price: {selectedProduct.price * selectedProduct.quantity}
								</Typography>
								<Typography
									sx={{ bottom: 0, textShadow: '0 0 5px #fff' }}
									variant='body2'
									color='black'
								>
									Quantity: {selectedProduct.quantity}
								</Typography>
							</Stack>
							<IconButton
								onClick={() => handleRemoveProduct(index)}
								sx={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}
								size='small'
								variant='contained'
								color='warning'
							>
								<Cancel />
							</IconButton>
						</Grid2>
					))}
					<Grid2 size={{ xs: 12, sm: 2, md: 2 }}>
						<IconButton
							sx={{
								width: '100%',
								height: 130,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								border: '1px dashed gray',
								borderRadius: '10px',
							}}
							onClick={() => setOpen(true)}
						>
							<Add sx={{ fontSize: 50 }} />
						</IconButton>
					</Grid2>
				</Grid2>
				<DialogChoosingProduct
					open={open}
					handleClose={() => setOpen(false)}
					handleAddProduct={handleAddBookingDetail}
				/>
				<Box width={'100%'}>
					<Stack direction='row' spacing={2} my={2}>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['firstName'] = el)}
							fullWidth
							name='firstName'
							label='First Name'
							value={formData.firstName}
							onChange={handleFormChange}
						/>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['lastName'] = el)}
							fullWidth
							name='lastName'
							label='Last Name'
							value={formData.lastName}
							onChange={handleFormChange}
						/>
					</Stack>
					<Stack direction='row' spacing={2} mb={2}>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['phone'] = el)}
							fullWidth
							name='phone'
							label='Phone'
							type='tel'
							value={formData.phone}
							onChange={handleFormChange}
						/>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['date'] = el)}
							fullWidth
							name='date'
							label='Date'
							type='date'
							slotProps={{
								inputLabel: { shrink: true },
								input: { inputProps: { min: new Date().toISOString().split('T')[0] } },
							}}
							value={formData.date}
							onChange={handleFormChange}
						/>
						<ValidationSelect
							ref={(el) => (fieldsRef.current['dayPart'] = el)}
							fullWidth
							name='dayPart'
							label='Day Part'
							value={formData.dayPart}
							onChange={handleFormChange}
							displayEmpty
						>
							<MenuItem value='Morning'>Morning</MenuItem>
							<MenuItem value='Afternoon'>Afternoon</MenuItem>
							<MenuItem value='Evening'>Evening</MenuItem>
						</ValidationSelect>
					</Stack>
					<TextField
						fullWidth
						name='note'
						label='Note'
						multiline
						rows={3}
						value={formData.note}
						onChange={handleFormChange}
						sx={{ mb: 2 }}
					/>
					<Stack direction='row' justifyContent='space-between' my={1}>
						<Box>
							<Typography>Total Reserve: ${totalReserve}</Typography>
							<Typography>Deposit: ${deposit}</Typography>
						</Box>
						<Box mt={1}>
							<Button onClick={handleSubmit} fullWidth variant='contained' primary>
								Book Now
							</Button>
						</Box>
					</Stack>
				</Box>
			</Box>
		</Box>
	) : null
}
