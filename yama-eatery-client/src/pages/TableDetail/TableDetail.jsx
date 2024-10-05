import React, { useState } from 'react'
import { Box, Stack, Button, TextField, Select, MenuItem, Typography } from '@mui/material'
import { tables } from '../TableMockData/TableMockData' // Import table data
import { useParams, useNavigate } from 'react-router-dom'

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

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Form submitted:', formData)

		// After form submission, navigate to a different page (e.g., a confirmation page)
		navigate('/confirmation') // Redirect to the confirmation page or another route
	}

	// Get today's date in the correct format (YYYY-MM-DD)
	const today = new Date().toISOString().split('T')[0]

	if (!table) {
		return <Box>No table found!</Box>
	}

	return (
		<Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
			{/* Table Detail Header */}
			<Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
				<Typography variant="h5">{table.tableType} Table</Typography>
				<Typography variant="subtitle1">Floor {table.floor}</Typography>
			</Stack>

			{/* Image Carousel */}
			<Stack direction='row' justifyContent='center' alignItems='center' spacing={2} mb={2}>
				<Button variant='outlined' onClick={() => handleImageChange('prev')}>{'<'}</Button>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Box
						component='img'
						src={table.img[selectedImageIndex]}
						alt={`Table Image ${selectedImageIndex + 1}`}
						sx={{ 
							width: '80%', 
							height: 'auto', 
							borderRadius: '10px', 
							objectFit: 'cover' 
						}}
					/>
				</Box>
				<Button variant='outlined' onClick={() => handleImageChange('next')}>{'>'}</Button>
			</Stack>

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
				<Typography variant="h6">Booking Information</Typography>
				<form onSubmit={handleSubmit}>
					<Stack direction='row' spacing={2} mb={2}>
						<TextField
							fullWidth
							name='firstName'
							label='First Name'
							value={formData.firstName}
							onChange={handleFormChange}
						/>
						<TextField
							fullWidth
							name='lastName'
							label='Last Name'
							value={formData.lastName}
							onChange={handleFormChange}
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
						/>
						<TextField
							fullWidth
							name='date'
							label='Date'
							type='date'
							InputLabelProps={{ shrink: true }}
							inputProps={{ min: today }} // Prevent past dates
							value={formData.date}
							onChange={handleFormChange}
						/>
						<Select
							fullWidth
							name='dayPart'
							value={formData.dayPart}
							onChange={handleFormChange}
							displayEmpty
						>
							<MenuItem value=''>
								<em>Day Part</em>
							</MenuItem>
							<MenuItem value='Morning'>Morning</MenuItem>
							<MenuItem value='Afternoon'>Afternoon</MenuItem>
							<MenuItem value='Evening'>Evening</MenuItem>
						</Select>
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

					{/* Book Now Button */}
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
