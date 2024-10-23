import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { Add, Close } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	Typography,
	Grid2,
	MenuItem,
	Avatar,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useRef, useState } from 'react'

const AddTable = ({ tableTypes, open, handleClose, handleAddTable }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})
	const [imagePresentations, setImagePresentations] = useState([])
	const [imageFiles, setImageFiles] = useState([])
	const [values, setValues] = useState({
		type: '',
		floor: '',
		images: [],
	})
	const [floorError, setFloorError] = useState('')
	const [typeError, setTypeError] = useState('')
	const [imageError, setImageError] = useState('')

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
			setImageError('You can only upload up to 5 images.')
			return
		} else {
			setImageError('')
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

	const handleAdd = () => {
		let isValid = true

		setFloorError('')
		setTypeError('')
		setImageError('')

		if (!values.floor) {
			isValid = false
		}

		if (!values.type) {
			isValid = false
		}

		if (values.images.length === 0) {
			setImageError('You must upload at least 1 image.')
			isValid = false
		}

		if (isValid) {
			const formData = new FormData()
			imageFiles.forEach((file) => {
				formData.append('ImageFiles', file)
			})
			formData.append('floor', parseInt(values.floor))
			formData.append('type', values.type)

			handleAddTable(formData)
			enqueueSnackbar('Add Table Successfully', { variant: 'success' })
			handleClose()
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add New Table</DialogTitle>
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
											variant='rounded'
											src={base64}
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
					<Stack spacing={2}>
						{floorError && <Typography color='error'>{floorError}</Typography>}
						{typeError && <Typography color='error'>{typeError}</Typography>}
						{imageError && <Typography color='error'>{imageError}</Typography>}
					</Stack>

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
						ref={(el) => (fieldsRef.current['floor'] = el)}
						label='Floor'
						name='floor'
						type='number'
						variant='filled'
						value={values.floor}
						onChange={handleValueChange}
						regex='^(0|1|2|3)$'
						regexErrorText='Floor must be 0, 1, 2, or 3.'
					/>

					<ValidationSelect
						ref={(el) => (fieldsRef.current['type'] = el)}
						label='Table Type'
						name='type'
						value={values.type}
						onChange={handleValueChange}
						variant='filled'
					>
						{tableTypes.map((type) => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</ValidationSelect>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
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

export default AddTable
