import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { Add, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import {
	Box,
	Button,
	Card,
	IconButton,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { TableService } from '@/services/TableService'

export default function TableDetail() {
	const { id } = useParams()
	const [table, setTable] = useState()

	useEffect(() => {
		async function fetchProductDetail() {
			const data = await TableService.DETAIL(id)
			if (data) {
				setTable(data)
			}
		}
		fetchProductDetail()

	}, [id], [table])

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		date: '',
		dayPart: '',
		note: '',
	})
	const slideRef = useRef(null)
	const fieldsRef = useRef([])

	const handleFormChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		let isValid = true

		Object.keys(fieldsRef.current).map((key) => {
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
						{table.image?.map((slide, index) => {
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
							<Typography>Total Reserve: ${table.price || 1000}</Typography>
							<Typography>Deposit: ${table.deposit || 100}</Typography>
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
	)
}
