import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { AssetImages } from '@/utilities/AssetImages'
import { Add, Close } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	Stack,
	Typography
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import { useEffect, useRef, useState } from 'react'

const UpdateProduct = ({ tableTypes, open, handleClose, existingTable, handleUpdateTable }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})

	const [imagePresentations, setImagePresentations] = useState([])
	const [deletedImages, setDeletedImages] = useState([])
	const [imageFiles, setImageFiles] = useState([])
	const [values, setValues] = useState({
		type: '',
		floor: '',
		image: [],
	})

	const [error, setError] = useState('')

	useEffect(() => {
		if (existingTable) {
			setValues({
				id: existingTable.id || '',
				image: existingTable.image || [],
				floor: existingTable.floor?.toString() || '',
				type: existingTable.type || '',
			})
		}
	}, [existingTable])

	const handleValueChange = (e) => {
		const { name, value } = e.target

		setValues((prev) => ({
			...prev,
			[name]: value,
		}))
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

	const handleUpdate = () => {
		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			var formData = new FormData()
			formData.append('tableId', values.id)
			values.image.forEach((remainImage) => {
				formData.append('remainImages', remainImage)
			})
			deletedImages.forEach((deletedImage) => {
				formData.append('deletedImages', deletedImage)
			})
			imageFiles.forEach((file) => {
				formData.append(`ImageFiles`, file)
			})
			formData.append('floor', parseInt(values.floor))
			formData.append('type', values.type)

			handleUpdateTable(formData)
			enqueueSnackbar('Update Table Sucessfully', { variant: 'success' })
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
			<DialogTitle>Update Table</DialogTitle>
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
										<Avatar
											variant='rounded'
											src={AssetImages.TableImage(image)}
											sx={{
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
