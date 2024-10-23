import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { AssetImages } from '@/utilities/AssetImages'
import { Add, Close } from '@mui/icons-material'
import {
	Avatar,
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
import { useEffect, useRef, useState } from 'react'

const UpdateStaff = ({ open, handleClose, existingStaff, handleUpdateStaff }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})
	const [imageFile, setImageFile] = useState(null)
	const [imagePresentation, setImagePresentation] = useState(null)

	const [values, setValues] = useState({
		id: '',
		image: '',
		name: '',
		birthday: '',
		phone: '',
		gender: '',
	})

	const [error, setError] = useState('')

	useEffect(() => {
		if (existingStaff) {
			console.log('existingStaff', existingStaff)
			setValues({
				id: existingStaff.id || '',
				image: existingStaff.image || '',
				name: existingStaff.name || '',
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
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setImagePresentation(reader.result)
			}
			setImageFile(file)
			reader.readAsDataURL(file)
		}
	}
	const removeImage = () => {
		setImagePresentation(null)
		setImageFile(null)
		setValues((prev) => ({
			...prev,
			image: '',
		}))
	}

	const handleUpdate = () => {
		let isValid = true
		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			const formData = new FormData()
			if (imageFile) {
				formData.append('ImageFile', imageFile)
			}
			formData.append('employeeId', values.id)
			formData.append('name', values.name)
			formData.append('birthday', values.birthday)
			formData.append('phone', values.phone)
			formData.append('gender', values.gender)

			handleUpdateStaff(formData)
			handleClose()
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Update Staff</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<Stack direction='row' gap={2} alignItems='center' justifyContent={'center'}>
						{imagePresentation || values.image ? (
							<Grid2
								sx={{
									width: 160,
									height: 130,
									borderRadius: '10px',
									position: 'relative',
								}}
							>
								<Avatar
									src={
										imagePresentation ? imagePresentation : AssetImages.EmployeeImage(values.image)
									}
									alt='Staff'
									variant='rounded'
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
									}}
								/>

								<IconButton
									style={{ position: 'absolute', top: 0, right: 0 }}
									onClick={removeImage}
								>
									<Close />
								</IconButton>
							</Grid2>
						) : (
							<IconButton
								sx={{
									width: 160,
									height: 130,
									border: '1px dashed gray',
									borderRadius: '10px',
								}}
								onClick={() => fileRef.current.click()}
							>
								<Add sx={{ fontSize: 50 }} />
							</IconButton>
						)}

						<input accept='image/*' type='file' hidden ref={fileRef} onChange={handleImageChange} />
					</Stack>
					{error && <Typography color='error'>{error}</Typography>}
					<ValidationTextField
						disabled
						autoFocus
						ref={(el) => (fieldsRef.current['id'] = el)}
						label='Employee ID'
						name='id'
						variant='filled'
						value={values.id}
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
						ref={(el) => (fieldsRef.current['birthday'] = el)}
						type='date'
						label='Birthday'
						name='birthday'
						value={values.birthday}
						onChange={handleValueChange}
						InputLabelProps={{ shrink: true }}
						inputProps={{ max: new Date().toISOString().split('T')[0] }}
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
							<FormControlLabel control={<Radio value='Female' />} label='Female' />
							<FormControlLabel control={<Radio value='Male' />} label='Male' />
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

export default UpdateStaff
