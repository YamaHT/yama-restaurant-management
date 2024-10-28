import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { DescriptionGenerator } from '@/utilities/DescriptionGenerator'
import { Close, FileUpload } from '@mui/icons-material'
import {
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
} from '@mui/material'

import { useRef, useState } from 'react'

const CrudAdd = ({ open, handleClose }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})

	const [imageBase64, setImageBase64] = useState('')
	const [values, setValues] = useState({
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
			reader.onload = async () => {
				setImageBase64(reader.result)
				await new Promise((resolve) => {
					setValues((prev) => {
						resolve()
						return { ...prev, image: file.name }
					})
				})

				fieldsRef.current['image']?.validate()
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
				setValues((prev) => {
					return { ...prev, description: descriptionGenerated.trim() }
				})
			}
		} catch (error) {
			setValues((prev) => ({ ...prev, description: '' }))
		}
	}

	const handleAddProduct = async () => {
		let isValid = true

		Object.keys(fieldsRef.current).map((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			const productData = {
				image: values.image,
				name: values.name,
				price: parseFloat(values.price),
				description: values.description,
				category: values.category,
			}

			handleClose()
		}
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
					<ValidationTextField
						ref={(el) => (fieldsRef.current['image'] = el)}
						label='Image'
						variant='filled'
						name='image'
						value={values.image}
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
					<ValidationSelect
						ref={(el) => (fieldsRef.current['category'] = el)}
						label={'Category'}
						name='category'
						value={values.category}
						onChange={handleValueChange}
						variant='outlined'
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

export default CrudAdd
