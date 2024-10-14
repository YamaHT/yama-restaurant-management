import { Box, Button, Card, IconButton, MenuItem, Stack, Typography } from '@mui/material'
import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { tables } from '../TableMockData/TableMockData'
import styles from './TableSlide.module.css'
import {
	Add,
	ArrowBack,
	ArrowBackIos,
	ArrowForwardIos,
	ArrowLeft,
	ArrowRight,
} from '@mui/icons-material'

export default function TableDetail() {
	const { id } = useParams()
	const table = tables.find((t) => t.id === parseInt(id))
	const navigate = useNavigate()

	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		date: '',
		dayPart: '',
		note: '',
	})
	const [formErrors, setFormErrors] = useState({})
	const slideRef = useRef(null)

	const handleFormChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const validateForm = () => {
		let errors = {}
		if (!formData.firstName) errors.firstName = 'First name is required'
		if (!formData.lastName) errors.lastName = 'Last name is required'
		if (!formData.phone) {
			errors.phone = 'Phone number is required'
		} else if (!/^\d{10}$/.test(formData.phone)) {
			errors.phone = 'Phone number must be 10 digits'
		}
		const currentDate = new Date()
		if (!formData.date) {
			errors.date = 'Date is required'
		} else {
			const selectedDate = new Date(formData.date)
			if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
				errors.date = 'Date cannot be in the past'
			}
		}
		if (!formData.dayPart) {
			errors.dayPart = 'Please select a time of day'
		} else {
			const vietnamTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
			const currentTimeInVietnam = new Date(vietnamTime)
			const currentHour = currentTimeInVietnam.getHours()
			const dayParts = {
				Morning: { start: 6, end: 12 },
				Afternoon: { start: 12, end: 18 },
				Evening: { start: 18, end: 24 },
			}
			const selectedPart = dayParts[formData.dayPart]
			const isToday =
				new Date(formData.date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)

			if (isToday && selectedPart && currentHour >= selectedPart.start) {
				errors.dayPart = `The selected ${formData.dayPart.toLowerCase()} time has passed in Vietnam`
			}
		}

		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validateForm()) {
			console.log('Form submitted:', formData)
			navigate('/confirmation')
		}
	}

	const handleThumbnailClick = (index) => {
		setSelectedImageIndex(index)
		slideRef.current.goTo(index)
	}

	if (!table) {
		return <Box>No table found!</Box>
	}

	return (
		<Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
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
				<Typography variant='h4'>{table.tableType} Table</Typography>

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
						{table.img.map((slide, index) => {
							return (
								<Box height={500} key={index}>
									<img
										style={{ width: '100%', aspectRatio: 2 / 1, objectFit: 'fill' }}
										src={slide}
									/>
								</Box>
							)
						})}
					</Slide>
				</Box>
			</Card>

			<Stack direction='row' justifyContent='center' mt={1}>
				{table.img.map((img, index) => (
					<Box
						key={index}
						component='img'
						src={img}
						alt={`Thumbnail ${index + 1}`}
						sx={{
							width: '80px',
							height: '50px',
							marginRight: '10px',
							cursor: 'pointer',
							objectFit: 'cover',
						}}
						onError={(e) => {
							e.target.onerror = null
							e.target.src = 'path/to/placeholder-image.jpg'
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
				<IconButton
					sx={{
						width: 160,
						height: 130,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						border: '1px dashed gray',
						borderRadius: '10px',
					}}
				>
					<Add sx={{ fontSize: 50 }} />
				</IconButton>
				<form onSubmit={handleSubmit} noValidate>
					<Stack direction='row' spacing={2} my={2}>
						<ValidationTextField
							fullWidth
							name='firstName'
							label='First Name'
							value={formData.firstName}
							onChange={handleFormChange}
							error={!!formErrors.firstName}
							helperText={formErrors.firstName}
						/>
						<ValidationTextField
							fullWidth
							name='lastName'
							label='Last Name'
							value={formData.lastName}
							onChange={handleFormChange}
							error={!!formErrors.lastName}
							helperText={formErrors.lastName}
						/>
					</Stack>
					<Stack direction='row' spacing={2} mb={2}>
						<ValidationTextField
							fullWidth
							name='phone'
							label='Phone'
							type='tel'
							value={formData.phone}
							onChange={handleFormChange}
							error={!!formErrors.phone}
							helperText={formErrors.phone}
						/>
						<ValidationTextField
							fullWidth
							name='date'
							label='Date'
							type='date'
							InputLabelProps={{ shrink: true }}
							value={formData.date}
							onChange={handleFormChange}
							error={!!formErrors.date}
							helperText={formErrors.date}
						/>
						<ValidationSelect
							fullWidth
							name='dayPart'
							value={formData.dayPart}
							onChange={handleFormChange}
							displayEmpty
							error={!!formErrors.dayPart}
						>
							<MenuItem value=''>Day Part</MenuItem>
							<MenuItem value='Morning'>Morning</MenuItem>
							<MenuItem value='Afternoon'>Afternoon</MenuItem>
							<MenuItem value='Evening'>Evening</MenuItem>
						</ValidationSelect>
						{formErrors.dayPart && (
							<Typography variant='caption' color='error'>
								{formErrors.dayPart}
							</Typography>
						)}
					</Stack>
					<ValidationTextField
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
							<Typography>Total Reserve: ${table.price || 1000}</Typography>
							<Typography>Deposit: ${table.deposit || 100}</Typography>
						</Box>
						<Box mt={1}>
							<Button type='submit' fullWidth variant='contained' primary>
								Book Now
							</Button>
						</Box>
					</Stack>
				</form>
			</Box>
		</Box>
	)
}
