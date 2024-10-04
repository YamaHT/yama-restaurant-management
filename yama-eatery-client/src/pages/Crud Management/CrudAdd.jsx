import axiosConfig from '@/utilities/axiosConfig'
import { DescriptionGenerator } from '@/utilities/DescriptionGenerator'
import { Close, FileUpload } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Skeleton,
	Stack,
	TextField,
} from '@mui/material'
import React, { useRef, useState } from 'react'

const CrudAdd = ({ open, handleClose }) => {
	const fileRef = useRef(null)

	const [imageBase64, setImageBase64] = useState('')
	const [values, setValues] = useState({
		image: '',
		name: '',
		price: '',
		description: '',
		category: '',
	})

	const [errors, setErrors] = useState({
		image: '',
		name: '',
		price: '',
		description: '',
		category: '',
	})

	const [generatorOption, setGeneratorOption] = useState('')

	const handleValueChange = (e) => {
		const { name, value } = e.target
		setValues((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setImageBase64(reader.result)
				setValues((prev) => ({ ...prev, image: file.name }))
			}
			reader.readAsDataURL(file)
		}
	}

	const removeImageInput = () => {
		setValues((prev) => ({ ...prev, image: '' }))
		setImageBase64(null)
	}

	const handleDescriptionGenerator = async () => {
		try {
			const descriptionGenerated = await DescriptionGenerator(
				'Product',
				values.name,
				generatorOption
			)
			if (descriptionGenerated != 404) {
				setValues((prev) => ({ ...prev, description: descriptionGenerated }))
			}
			console.log(descriptionGenerated)
		} catch (error) {
			setValues((prev) => ({ ...prev, description: '' }))
		}
	}

	const handleAddProduct = async () => {
		const newErrors = {
			image: values.image === '' ? 'Field image is required' : '',
			name: values.name === '' ? 'Field name is required' : '',
			price:
				values.price === ''
					? 'Field price is required'
					: isNaN(values.price)
					? 'Price must be a number'
					: '',
			description: values.description === '' ? 'Field description is required' : '',
			category: values.category === '' ? 'Field category is required' : '',
		}
		setErrors(newErrors)

		if (Object.values(newErrors).some((err) => err !== '')) {
			return
		}

		const productData = {
			image: values.image,
			name: values.name,
			price: parseFloat(values.price),
			description: values.description,
			category: values.category,
		}

		console.log(productData)
		handleClose()
	}

	//#region customInputImageProperties
	const customInputImageProperties = {
		inputLabel: {
			style: { color: 'gray' },
		},
		input: {
			disabled: true,
			style: { backgroundColor: 'rgba(0, 0, 0, 0.06' },
			endAdornment: (
				<>
					{values.image && (
						<IconButton onClick={removeImageInput}>
							<Close />
						</IconButton>
					)}

					<input accept='image/*' type='file' hidden ref={fileRef} onChange={handleImageChange} />
					<IconButton onClick={() => fileRef.current.click()}>
						<FileUpload />
					</IconButton>
				</>
			),
		},
	}
	//#endregion

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add New Product</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					{imageBase64 ? (
						<img
							src={imageBase64}
							style={{
								minHeight: 200,
								maxHeight: 400,
								borderRadius: '10px',
								objectFit: 'fill',
								aspectRatio: 1,
							}}
						/>
					) : (
						<Skeleton animation={false} height={200} variant='rounded' />
					)}
					<TextField
						label='Image'
						variant='filled'
						name='image'
						value={values.image}
						error={Boolean(errors.image)}
						helperText={errors.image}
						slotProps={customInputImageProperties}
					/>
					<TextField
						label='Name'
						name='name'
						variant='filled'
						value={values.name}
						error={Boolean(errors.name)}
						helperText={errors.name}
						onChange={handleValueChange}
					/>
					<TextField
						label='Price'
						name='price'
						type='number'
						variant='filled'
						value={values.price}
						error={Boolean(errors.price)}
						helperText={errors.price}
						onChange={handleValueChange}
					/>
					<Stack direction={'row'} alignItems={'center'}>
						<TextField
							fullWidth
							label='Description'
							name='description'
							variant='filled'
							multiline
							minRows={3}
							value={values.description}
							error={Boolean(errors.description)}
							helperText={errors.description}
							onChange={handleValueChange}
						/>
						<Stack alignItems={'center'} padding={'0 1%'} spacing={1}>
							<TextField
								size='small'
								variant='outlined'
								label={'(Optional)'}
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
					<FormControl variant='filled'>
						<InputLabel id='category-label' error={Boolean(errors.category)}>
							Category
						</InputLabel>
						<Select
							labelId='category-label'
							name='category'
							value={values.category}
							error={Boolean(errors.category)}
							onChange={handleValueChange}
						>
							<MenuItem value={1}>Category 1</MenuItem>
							<MenuItem value={2}>Category 2</MenuItem>
							<MenuItem value={3}>Category 3</MenuItem>
						</Select>
						<FormHelperText sx={{ color: 'red' }}>
							{errors.category ? errors.category : ''}
						</FormHelperText>
					</FormControl>
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

export default CrudAdd
