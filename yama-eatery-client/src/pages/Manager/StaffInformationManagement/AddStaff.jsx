import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { Add, Close } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid2,
	IconButton,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from '@mui/material'
import { useRef, useState } from 'react'
const AddStaff = ({ open, handleClose, handleAddStaff }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})
	const [imagePresentations, setImagePresentations] = useState([])
	const [imageFiles, setImageFiles] = useState([])
	const [values, setValues] = useState({
		images: [],
		email: '',
		password: '',
		name: '',
		birthday: '',
		phone: '',
		gender: '',
	})

	const [error, setError] = useState('')

	const handleValueChange = (e) => {
		const { name, value } = e.target
		setValues((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageChange = (e) => {
		const files = e.target.files
		if (values.images.length + files.length > 1) {
			setError('You can upload up to 1 images.')
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

	const handleAdd = () => {
		let isValid = true
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
			formData.append('email', values.email)
			formData.append('password', values.password)
			formData.append('birthday', values.birthday)
			formData.append('phone', values.phone)
			formData.append('gender', values.gender)
			handleAddStaff(formData)
			handleClose()
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add New Staff</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<Grid2 container spacing={2} justifyContent={'center'}>
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
						{imagePresentations.length === 0 && (
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
						)}
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
						type='name'
						variant='filled'
						value={values.name}
						onChange={handleValueChange}
					/>

					<ValidationTextField
						ref={(el) => (fieldsRef.current['email'] = el)}
						label='Email'
						name='email'
						variant='filled'
						value={values.email}
						onChange={handleValueChange}
					/>

					<ValidationTextField
						ref={(el) => (fieldsRef.current['password'] = el)}
						label='Password'
						name='password'
						variant='filled'
						value={values.password}
						onChange={handleValueChange}
					/>

					<ValidationTextField
						ref={(el) => (fieldsRef.current['phone'] = el)}
						label='Phone'
						name='phone'
						variant='filled'
						value={values.phone}
						onChange={handleValueChange}
					/>

					<ValidationTextField
						ref={(el) => (fieldsRef.current['birthday'] = el)}
						type='date'
						label={'Birthday'}
						name='birthday'
						variant='filled'
						value={values.birthday}
						onChange={handleValueChange}
						slotProps={{
							inputLabel: { shrink: true },
							input: { inputProps: { max: new Date().toISOString().split('T')[0] } },
						}}
					/>

					<FormControl>
						<FormLabel id='gender'>Gender</FormLabel>
						<RadioGroup
							row
							aria-labelledby='gender'
							name='gender'
							value={values.gender}
							onChange={handleValueChange}
						>
							<FormControlLabel control={<Radio value={'Female'} />} label='Female' />
							<FormControlLabel control={<Radio value={'Male'} />} label='Male' />
						</RadioGroup>
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

				<Button onClick={handleAdd} size='large' variant='contained' color='primary'>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddStaff
