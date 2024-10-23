import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { AssetImages } from '@/utilities/AssetImages'
import { Add, Close } from '@mui/icons-material'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from '@mui/material'

import { useEffect, useRef, useState } from 'react'

const UpdateProduct = ({ categories, open, handleClose, existingStaff, handleUpdateStaff }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})
	const [imageFiles, setImageFiles] = useState([])
	const [imagePresentations, setImagePresentations] = useState([])
	const [deletedImages, setDeletedImages] = useState([])
	const [values, setValues] = useState({
		id: '',
		image: [],
		password: '',
		name: '',
		birthday: '',
		phone: '',
		gender: '',
	})

	const [error, setError] = useState('')

	useEffect(() => {
		if (existingStaff) {
			console.log(existingStaff)
			setValues({
				id: existingStaff.id || '',
				image: existingStaff.image || [],
				name: existingStaff.name || '',
				password: existingStaff.password || '',
				birthday: existingStaff.birthday || '',
				phone: existingStaff.phone || '',
				gender: existingStaff.gender || '',
			})
		}
	}, [existingStaff])

	const handleValueChange = (e) => {
		const { name, value } = e.target
		setValues((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageChange = (e) => {
		const files = e.target.files
		if (values.image.length + files.length > 1) {
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
					images: [...prev.image, ...newImages],
				}))
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

	const handleUpdate = () => {
		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			const updatedStaffData = {
				...existingStaff,
				images: values.image,
				imageBase64Array: imagePresentations,
				email: values.email,
				name: values.name,
				password: values.password,
				birthday: values.birthday,
				phone: values.phone,
				gender: values.gender,
			}

			handleUpdateStaff(updatedStaffData)
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
			<DialogTitle>Update Staff</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<Stack direction='row' gap={2} style={{ flexWrap: 'wrap' }} justifyContent={'center'}>
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
						ref={(el) => (fieldsRef.current['email'] = el)}
						label='Email'
						name='email'
						variant='filled'
						value={values.email}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['birthday'] = el)}
						fullWidth
						label='Birthday'
						name='birthday'
						variant='filled'
						value={values.birthday}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['phone'] = el)}
						fullWidth
						label='Phone'
						name='phone'
						variant='filled'
						value={values.phone}
						onChange={handleValueChange}
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
				<Button onClick={handleUpdate} size='large' variant='contained' color='primary'>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UpdateProduct
