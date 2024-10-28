import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { DescriptionGenerator } from '@/utilities/DescriptionGenerator'
import { Add, Close } from '@mui/icons-material'
import {
	Avatar,
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

	const [isGenerating, setIsGenerating] = useState(false)

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
			enqueueSnackbar(`You can only upload up to 5 images.`, { variant: 'error' })
			return
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
		if (values.name.trim() === '') {
			enqueueSnackbar('Please enter a name', { variant: 'warning' })
			return
		}

		setIsGenerating(true)

		try {
			const descriptionGenerated = await DescriptionGenerator(
				'Product',
				values.name,
				generatorOption
			)
			if (descriptionGenerated.trim() !== '404') {
				setValues((prev) => ({
					...prev,
					description: descriptionGenerated.trim(),
				}))
			} else {
				enqueueSnackbar('Cant find this food to generate description', { variant: 'warning' })
			}
		} catch (error) {
			setValues((prev) => ({ ...prev, description: '' }))
			enqueueSnackbar('Cant find this food to generate description', { variant: 'warning' })
		} finally {
			setIsGenerating(false)
		}
	}

	const handleAdd = () => {
		let isValid = true

		if (values.images.length === 0) {
			enqueueSnackbar(`Images are required`, { variant: 'error' })
			isValid = false
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
			enqueueSnackbar('Add Product Successfully', { variant: 'success' })
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
										<Avatar
											src={base64}
											variant='rounded'
											sx={{
												width: '100%',
												height: '100%',
												borderRadius: '10px',
												objectFit: 'cover',
											}}
											alt={`Uploaded ${index}`}
										/>
										<IconButton
											sx={{ position: 'absolute', top: 0, right: 0 }}
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

					<ValidationTextField
						ref={(el) => (fieldsRef.current['image'] = el)}
						label='Images'
						variant='filled'
						name='image'
						value={values.images.join(', ')}
						sx={{ display: 'none' }}
						slotProps={{
							inputLabel: {
								sx: { color: 'gray' },
							},
							input: {
								disabled: true,
								sx: { backgroundColor: 'rgba(0, 0, 0, 0.06)' },
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
						maxLength={1000}
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
								disabled={isGenerating}
							>
								{isGenerating ? 'Generating...' : 'Auto Generate'}
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
