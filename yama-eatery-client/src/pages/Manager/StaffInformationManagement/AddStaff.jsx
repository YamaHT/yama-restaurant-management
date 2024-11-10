import PasswordTextField from '@/components/CustomTextField/PasswordTextField'
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
import { enqueueSnackbar } from 'notistack'
import { useRef, useState } from 'react'
const AddStaff = ({ open, handleClose, handleAddStaff }) => {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})
	const [imagePresentation, setImagePresentation] = useState(null)
	const [imageFile, setImageFile] = useState(null)
	const [values, setValues] = useState({
		email: '',
		password: '',
		name: '',
		birthday: '',
		phone: '',
		gender: '',
	})

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

	const removeImage = (index) => {
		setValues((prev) => ({ ...prev, image: null }))
		setImagePresentation(null)
	}

	const handleAdd = () => {
		let isValid = true
		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (!imageFile) {
			enqueueSnackbar('Image is required', { variant: 'error' })
			isValid = false
		}
		if (isValid) {
			var formData = new FormData()
			formData.append(`imageFile`, imageFile)
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
						{imagePresentation ? (
							<Grid2
								size={4}
								sx={{
									position: 'relative',
									height: 130,
									borderRadius: '10px',
									marginBottom: '8px',
								}}
							>
								<img
									src={imagePresentation}
									style={{
										width: '100%',
										height: '100%',
										borderRadius: '10px',
										objectFit: 'cover',
									}}
								/>
								<IconButton
									style={{ position: 'absolute', top: 0, right: 0 }}
									onClick={() => removeImage()}
								>
									<Close />
								</IconButton>
							</Grid2>
						) : (
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
								<input
									accept='image/*'
									type='file'
									multiple
									hidden
									ref={fileRef}
									onChange={handleImageChange}
								/>
							</Grid2>
						)}
					</Grid2>

					<ValidationTextField
						ref={(el) => (fieldsRef.current['name'] = el)}
						label='Name'
						name='name'
						variant='filled'
						regex={/^[A-Za-z]{2,}( [A-Za-z]+)*?( [A-Za-z]{2,}){1,}$/}
						regexErrorText='Invalid name. Please enter a valid name with first name and last name.'
						value={values.name}
						onChange={handleValueChange}
					/>

					<ValidationTextField
						ref={(el) => (fieldsRef.current['email'] = el)}
						label='Email'
						name='email'
						type='email'
						variant='filled'
						value={values.email}
						onChange={handleValueChange}
					/>

					<PasswordTextField
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
						regex='^\d{10}$'
						regexErrorText='Phone must be 10 digits'
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
