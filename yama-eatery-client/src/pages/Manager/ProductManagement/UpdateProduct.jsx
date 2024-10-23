import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { AssetImages } from '@/utilities/AssetImages'
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
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import { useRef, useState, useEffect } from 'react'

const UpdateProduct = ({ categories, open, handleClose, existingProduct, handleUpdateProduct }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})
	const [imagePresentations, setImagePresentations] = useState([])
	const [deletedImages, setDeletedImages] = useState([])
	const [imageFiles, setImageFiles] = useState([])
	const [values, setValues] = useState({
		id: '',
		image: [],
		name: '',
		price: '',
		description: '',
		subCategoryId: '',
	})

	const [generatorOption, setGeneratorOption] = useState('')
	const [error, setError] = useState('')
	const [priceError, setPriceError] = useState('')

	useEffect(() => {
		if (existingProduct) {
			setValues({
				id: existingProduct.id || '',
				image: existingProduct.image || [],
				name: existingProduct.name || '',
				price: existingProduct.price?.toString() || '',
				description: existingProduct.description || '',
				subCategoryId: existingProduct.subCategory.id || '',
			})
		}
	}, [existingProduct])

	const handleValueChange = (e) => {
		const { name, value } = e.target

		if (name === 'price' && !/^\d*\.?\d*$/.test(value)) {
			return
		}

		setValues((prev) => ({
			...prev,
			[name]: value,
		}))
		if (name === 'price') {
			const priceValue = parseFloat(value)
			if (priceValue <= 0 || priceValue >= 10000) {
				setPriceError('Price must be greater than 0 and less than 10,000.')
			} else {
				setPriceError('')
			}
		}
	}

	const handleImageChange = (e) => {
		const files = e.target.files
		if (values.image.length + files.length > 5) {
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
				setImageFiles((prev) => [...prev, ...Array.from(files)])
				setImagePresentations((prev) => [...prev, ...images.map(({ base64 }) => base64)])
			})
		}
	}

	const removeExistedImage = (index) => {
		setValues((prev) => {
			const newImages = [...prev.image]
			newImages.splice(index, 1)
			return { ...prev, image: newImages }
		})

		setDeletedImages((prev) => [...prev, values.image[index]])
	}

	const removeNewImage = (index) => {
		setImagePresentations((prev) => {
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
			if (descriptionGenerated.trim().toString() !== '404') {
				setValues((prev) => ({
					...prev,
					description: descriptionGenerated.trim(),
				}))
			} else {
				enqueueSnackbar('Cant generate description', { variant: 'warning' })
			}
		} catch (error) {
			setValues((prev) => ({ ...prev, description: '' }))
		}
	}

	const handleUpdate = () => {
		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			var formData = new FormData()
			formData.append('productId', values.id)
			values.image.forEach((remainImage) => {
				formData.append('remainImages', remainImage)
			})
			deletedImages.forEach((deletedImage) => {
				formData.append('deletedImages', deletedImage)
			})
			imageFiles.forEach((file) => {
				formData.append(`ImageFiles`, file)
			})
			formData.append('name', values.name)
			formData.append('description', values.description)
			formData.append('price', parseFloat(values.price))
			formData.append('subCategoryId', parseInt(values.subCategoryId))

			handleUpdateProduct(formData)
			enqueueSnackbar('Update Product Sucessfully', { variant: 'success' })
			handleClose()
		}
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
			<DialogTitle>Update Product</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<Stack direction='row' gap={2} style={{ flexWrap: 'wrap' }}>
						{values.image.length > 0
							? values.image.map((image, index) => (
									<Box
										key={index}
										sx={{
											position: 'relative',
											width: 160,
											height: 130,
											borderRadius: '10px',
											cursor: 'move',
											marginBottom: '8px',
										}}
									>
										<img
											src={AssetImages.ProductImage(image)}
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
											onClick={() => removeExistedImage(index)}
										>
											<Close />
										</IconButton>
									</Box>
							  ))
							: null}

						{imagePresentations.length > 0
							? imagePresentations.map((base64, index) => (
									<Box
										key={index}
										sx={{
											position: 'relative',
											width: 160,
											height: 130,
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
											onClick={() => removeNewImage(index)}
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
						ref={(el) => (fieldsRef.current['id'] = el)}
						label='ID'
						name='id'
						variant='filled'
						value={values.id}
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
						error={!!priceError}
						helperText={priceError}
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
						name='subCategoryId'
						value={values.subCategoryId}
						onChange={handleValueChange}
						variant='filled'
					>
						{categories?.map((category) =>
							category.subCategories?.map((subCategory) => (
								<MenuItem key={subCategory.id} value={subCategory.id}>
									{subCategory.name}
								</MenuItem>
							))
						)}
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
				<Button onClick={handleUpdate} size='large' variant='contained' color='primary'>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UpdateProduct
