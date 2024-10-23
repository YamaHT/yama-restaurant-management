import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { DescriptionGenerator } from '@/utilities/DescriptionGenerator'
import { Add, Close } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid2,
	IconButton,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useRef, useState } from 'react'
const AddProduct = ({ categories, open, handleClose, handleAddProduct }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})
	const [imagePresentations, setImagePresentations] = useState([])
	const [imageFiles, setImageFiles] = useState([])
	const [values, setValues] = useState({
		images: [],
		name: '',
		price: '',
		description: '',
		subCategoryId: '',
		stockQuantity: '',
	})

	const [generatorOption, setGeneratorOption] = useState('')
	const [error, setError] = useState('')
	const [priceError, setPriceError] = useState('')

	const handleValueChange = (e) => {
		const { name, value } = e.target
		if (name === 'price' && !/^\d*\.?\d*$/.test(value)) {
			return;
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
		if (values.images.length + files.length > 5) {
			setError('You can only upload up to 5 images.')
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
				setImageFiles((prev) => [...prev, ...Array.from(files)])
				setImagePresentations((prev) => [...prev, ...images.map(({ base64 }) => base64)])
			})
		}
	}

	const removeImage = (index) => {
		setValues((prev) => {
			const newImages = [...prev.images]
			newImages.splice(index, 1)
			return { ...prev, images: newImages }
		})
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
			}
		} catch (error) {
			setValues((prev) => ({ ...prev, description: '' }))
		}
	}

	const handleAdd = () => {
		let isValid = true

		if (values.images.length === 0) {
			setError('You must upload at least 1 image')
			isValid = false
		} else {
			setError('')
		}

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			var formData = new FormData()
			imageFiles.forEach((file) => {
				formData.append(`ImageFiles`, file)
			})
			formData.append('name', values.name)
			formData.append('description', values.description)
			formData.append('price', parseFloat(values.price))
			formData.append('stockQuantity', parseInt(values.stockQuantity))
			formData.append('subCategoryId', parseInt(values.subCategoryId))

			handleAddProduct(formData)
			enqueueSnackbar('Add Product Sucessfully', { variant: 'success' })
			handleClose()
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add New Product</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<Grid2 container spacing={2}>
						{imagePresentations.length > 0
							? imagePresentations.map((base64, index) => (
									<Grid2
										key={index}
										size={4}
										sx={{
											position: 'relative',
											height: 130,
											borderRadius: '10px',
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
									</Grid2>
							  ))
							: null}
						<Grid2 size={4}>
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
								onClick={() => fileRef.current.click()}
							>
								<Add sx={{ fontSize: 50 }} />
							</IconButton>
						</Grid2>
					</Grid2>
					{error && <Typography color='error'>{error}</Typography>}
					<ValidationTextField
						ref={(el) => (fieldsRef.current['image'] = el)}
						label='Images'
						variant='filled'
						name='image'
						value={values.images.join(', ')}
						sx={{ display: 'none' }}
						slotProps={{
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
						}}
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
					<ValidationTextField
						ref={(el) => (fieldsRef.current['stockQuantity'] = el)}
						label='Stock Quantity'
						name='stockQuantity'
						type='number'
						variant='filled'
						value={values.stockQuantity}
						onChange={handleValueChange}
						inputProps={{ min: 0 }}
						regex='^(0|[1-9][0-9]{0,2})$'
						regexErrorText='Stock Quantity must be a positive integer between 0 and 999.'
						requiredErrorText='Stock Quantity is required.'
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
				<Button onClick={handleAdd} size='large' variant='contained' color='primary'>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddProduct
