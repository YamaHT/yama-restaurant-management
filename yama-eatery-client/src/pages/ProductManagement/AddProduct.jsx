import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { DescriptionGenerator } from '@/utilities/DescriptionGenerator'
import { Add, Close } from '@mui/icons-material'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	Skeleton,
	Stack,
	TextField,
	Typography,
} from '@mui/material'

import { useRef, useState } from 'react'

const AddProduct = ({ open, handleClose }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})
	const [imageBase64Array, setImageBase64Array] = useState([])
	const [values, setValues] = useState({
		images: [],
		name: '',
		price: '',
		description: '',
		category: '',
	})

	const [generatorOption, setGeneratorOption] = useState('')
	const [error, setError] = useState('')
	const [draggingIndex, setDraggingIndex] = useState(null)

	const handleValueChange = (e) => {
		const { name, value } = e.target
		setValues((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageChange = (e) => {
		const files = e.target.files
		if (values.images.length + files.length > 5) {
			setError('You can upload up to 5 images.')
			return
		} else {
			setError('')
		}
		if (files.length) {
			const fileReaders = Array.from(files).map((file) => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				return new Promise((resolve) => {
					reader.onload = () => resolve({ name: file.name, base64: reader.result })
				})
			})

			Promise.all(fileReaders).then((images) => {
				const newImages = images.map(({ name }) => name)
				setValues((prev) => ({
					...prev,
					images: [...prev.images, ...newImages],
				}))
				setImageBase64Array((prev) => [...prev, ...images.map(({ base64 }) => base64)])
			})
		}
	}

	const removeImage = (index) => {
		setValues((prev) => {
			const newImages = [...prev.images]
			newImages.splice(index, 1)
			return { ...prev, images: newImages }
		})
		setImageBase64Array((prev) => {
			const newBase64 = [...prev]
			newBase64.splice(index, 1)
			return newBase64
		})
	}

	const handleDescriptionGenerator = async () => {
		try {
			const descriptionGenerated = await DescriptionGenerator(
				'Product',
				values.name,
				generatorOption
			)
			if (descriptionGenerated !== 404) {
				setValues((prev) => ({
					...prev,
					description: descriptionGenerated.trim(),
				}))
			}
		} catch (error) {
			setValues((prev) => ({ ...prev, description: '' }))
		}
	}

	const handleAddProduct = async () => {
		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			const productData = {
				images: values.images,
				name: values.name,
				price: parseFloat(values.price),
				description: values.description,
				category: values.category,
			}

			console.log(productData)
			handleClose()
		}
	}

	// Drag-and-Drop Handlers
	const handleDragStart = (index) => {
		setDraggingIndex(index)
	}

	const handleDragOver = (e, index) => {
		e.preventDefault()
		if (draggingIndex === index) return

		const reorderedImages = [...values.images]
		const reorderedBase64 = [...imageBase64Array]

		// Remove the dragged item
		const [movedImage] = reorderedImages.splice(draggingIndex, 1)
		const [movedBase64] = reorderedBase64.splice(draggingIndex, 1)

		// Insert it at the new position
		reorderedImages.splice(index, 0, movedImage)
		reorderedBase64.splice(index, 0, movedBase64)

		setValues((prev) => ({
			...prev,
			images: reorderedImages,
		}))
		setImageBase64Array(reorderedBase64)
		setDraggingIndex(index)
	}

	const handleDragEnd = () => {
		setDraggingIndex(null)
	}

	const customInputImageProperties = {
		inputLabel: {
			style: { color: 'gray' },
		},
		input: {
			disabled: true,
			style: { backgroundColor: 'rgba(0, 0, 0, 0.06)' },
			endAdornment: (
				<>
					<input
						accept='image/*'
						type='file'
						multiple
						hidden
						ref={fileRef}
						onChange={handleImageChange}
					/>
				</>
			),
		},
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add New Product</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<Stack direction='row' spacing={2} style={{ flexWrap: 'wrap' }}>
						{imageBase64Array.length > 0
							? imageBase64Array.map((base64, index) => (
									<Box
										key={index}
										draggable
										onDragStart={() => handleDragStart(index)}
										onDragOver={(e) => handleDragOver(e, index)}
										onDragEnd={handleDragEnd}
										sx={{
											position: 'relative',
											width: 160,
											height: 130,
											border: draggingIndex === index ? '2px dashed #000' : 'none',
											borderRadius: '10px',
											cursor: 'move',
											marginBottom: '8px',
										}}
									>
										<img
											src={base64}
											style={{
												width: '100%',
												height: '100%',
												borderRadius: '10px',
												objectFit: 'cover',
											}}
											alt={`Uploaded ${index}`}
										/>
										<IconButton
											style={{ position: 'absolute', top: 0, right: 0 }}
											onClick={() => removeImage(index)}
										>
											<Close />
										</IconButton>
									</Box>
							  ))
							: null}
						<IconButton
							sx={{
								width: 175,
								height: 130,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								border: '1px dashed gray',
								borderRadius: '10px',
							}}
							onClick={() => fileRef.current.click()}
						>
							<Add sx={{ fontSize: 50 }} />
						</IconButton>
					</Stack>
					{error && <Typography color='error'>{error}</Typography>}
					<ValidationTextField
						ref={(el) => (fieldsRef.current['image'] = el)}
						label='Images'
						variant='filled'
						name='image'
						value={values.images.join(', ')}
						slotProps={customInputImageProperties}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['name'] = el)}
						label='Name'
						name='name'
						variant='filled'
						value={values.name}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['price'] = el)}
						label='Price'
						name='price'
						type='number'
						variant='filled'
						value={values.price}
						onChange={handleValueChange}
					/>
					<Stack direction={'row'} alignItems={'center'}>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['description'] = el)}
							fullWidth
							label='Description'
							name='description'
							variant='filled'
							multiline
							minRows={3}
							value={values.description}
							onChange={handleValueChange}
						/>
						<Stack alignItems={'center'} padding={'0 1%'} spacing={1}>
							<TextField
								size='small'
								variant='outlined'
								label='(Optional)'
								value={generatorOption}
								onChange={(e) => setGeneratorOption(e.target.value)}
							/>
							<Button
								fullWidth
								variant='contained'
								color='info'
								onClick={handleDescriptionGenerator}
							>
								Auto Generate
							</Button>
						</Stack>
					</Stack>
					<ValidationSelect
						ref={(el) => (fieldsRef.current['category'] = el)}
						label='Category'
						name='category'
						value={values.category}
						onChange={handleValueChange}
					>
						<MenuItem value={1}>Category 1</MenuItem>
						<MenuItem value={2}>Category 2</MenuItem>
						<MenuItem value={3}>Category 3</MenuItem>
					</ValidationSelect>
				</Stack>
			</DialogContent>
			<DialogActions
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: 2,
				}}
			>
				<Button onClick={handleClose} variant='outlined' color='inherit'>
					Close
				</Button>
				<Button onClick={handleAddProduct} size='large' variant='contained' color='primary'>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddProduct
