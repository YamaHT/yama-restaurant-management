import { Box, Button, Card, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { tables } from '../TableMockData/TableMockData'

export default function TableDetail() {
	const { id } = useParams() // Get the table id from the URL
	const table = tables.find((t) => t.id === parseInt(id)) // Find the table by id
	const navigate = useNavigate() // Initialize useNavigate

	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		date: '',
		dayPart: '',
		note: '',
	})
	const [formErrors, setFormErrors] = useState({}) // State to track validation errors

	const handleImageChange = (direction) => {
		if (direction === 'next') {
			setSelectedImageIndex((selectedImageIndex + 1) % table.img.length)
		} else if (direction === 'prev') {
			setSelectedImageIndex((selectedImageIndex - 1 + table.img.length) % table.img.length)
		}
	}

	const handleFormChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}
	const validateForm = () => {
		let errors = {}

		// Required field validations
		if (!formData.firstName) errors.firstName = 'First name is required'
		if (!formData.lastName) errors.lastName = 'Last name is required'
		if (!formData.phone) {
			errors.phone = 'Phone number is required'
		} else if (!/^\d{10}$/.test(formData.phone)) {
			errors.phone = 'Phone number must be 10 digits'
		}

		// Date validation to prevent past dates
		if (!formData.date) {
			errors.date = 'Date is required'
		} else {
			const selectedDate = new Date(formData.date)
			const currentDate = new Date()

			// Compare selected date with current date
			if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
				errors.date = 'Date cannot be in the past'
			}
		}

		// Day Part validation based on Vietnam time
		if (!formData.dayPart) {
			errors.dayPart = 'Please select a time of day'
		} else {
			// Get current time in Vietnam (UTC+7)
			const vietnamTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
			const currentTimeInVietnam = new Date(vietnamTime)
			const currentHour = currentTimeInVietnam.getHours()

			// Define time ranges for day parts
			const dayParts = {
				Morning: { start: 6, end: 12 }, // 6 AM to 12 PM
				Afternoon: { start: 12, end: 18 }, // 12 PM to 6 PM
				Evening: { start: 18, end: 24 }, // 6 PM to midnight
			}

			// Check if the selected day part is valid for the current time
			const selectedPart = dayParts[formData.dayPart]
			if (selectedPart && (currentHour < selectedPart.start || currentHour >= selectedPart.end)) {
				errors.dayPart = `The selected ${formData.dayPart.toLowerCase()} time has passed in Vietnam`
			}
		}

		setFormErrors(errors)
		return Object.keys(errors).length === 0 // Return true if no errors
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validateForm()) {
			console.log('Form submitted:', formData)
			navigate('/confirmation') // Redirect to the confirmation page
		}
	}

	if (!table) {
		return <Box>No table found!</Box>
	}

	return (
		<Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
				<Typography variant='h5'>{table.tableType} Table</Typography>
				<Typography variant='subtitle1'>Floor {table.floor}</Typography>
			</Stack>
			<Card
				sx={{
					minHeight: 500,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'linear-gradient(to top right, #F8C794, #FFE0B5, #FFF2D7)',
					p: 4,
				}}
			>
				<Stack direction='row' justifyContent='center' alignItems='center' spacing={2} mb={2}>
					<Button variant='outlined' onClick={() => handleImageChange('prev')}>
						{'<'}
					</Button>
					<Box
						component='img'
						src={table.img[selectedImageIndex]}
						alt={`Table Image ${selectedImageIndex + 1}`}
						sx={{
							width: '1000px', // Explicit width
							height: '562.5px', // Maintain 16:9 aspect ratio
							borderRadius: '10px',
							objectFit: 'cover',
						}}
					/>
					<Button variant='outlined' onClick={() => handleImageChange('next')}>
						{'>'}
					</Button>
				</Stack>
			</Card>
			{/* Thumbnail Images */}
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
							border: selectedImageIndex === index ? '2px solid #ff6347' : '2px solid transparent',
							cursor: 'pointer',
							objectFit: 'cover',
						}}
						onClick={() => setSelectedImageIndex(index)}
					/>
				))}
			</Stack>
			{/* Booking Information */}
			<Box
				sx={{
					marginTop: '20px',
					padding: '20px',
					backgroundColor: '#f9f9f9',
					borderRadius: '10px',
				}}
			>
				<Typography variant='h6'>Booking Information</Typography>
				<form onSubmit={handleSubmit}>
					<Stack direction='row' spacing={2} mb={2}>
						<TextField
							fullWidth
							name='firstName'
							label='First Name'
							value={formData.firstName}
							onChange={handleFormChange}
							error={!!formErrors.firstName}
							helperText={formErrors.firstName}
						/>
						<TextField
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
						<TextField
							fullWidth
							name='phone'
							label='Phone'
							type='tel'
							value={formData.phone}
							onChange={handleFormChange}
							error={!!formErrors.phone}
							helperText={formErrors.phone}
						/>
						<TextField
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
						<Select
							fullWidth
							name='dayPart'
							value={formData.dayPart}
							onChange={handleFormChange}
							displayEmpty
							error={!!formErrors.dayPart}
						>
							<MenuItem value=''>
								<em>Day Part</em>
							</MenuItem>
							<MenuItem value='Morning'>Morning</MenuItem>
							<MenuItem value='Afternoon'>Afternoon</MenuItem>
							<MenuItem value='Evening'>Evening</MenuItem>
						</Select>
						{formErrors.dayPart && (
							<Typography variant='caption' color='error'>
								{formErrors.dayPart}
							</Typography>
						)}
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
					{/* Pricing Information */}
					<Stack direction='row' justifyContent='space-between' mb={2}>
						<Typography>Total Reserve: ${table.price || 1000}</Typography>
						<Typography>Deposit: ${table.deposit || 100}</Typography>
					</Stack>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ backgroundColor: '#ff6347', color: 'white' }}
					>
						Book Now
					</Button>
				</form>
			</Box>
		</Box>
	)
}
