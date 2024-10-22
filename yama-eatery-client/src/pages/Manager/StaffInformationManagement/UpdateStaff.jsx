import ValidationSelect from '@/components/CustomTextField/ValidationSelect'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { Close, FileUpload } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	Stack,
	TextField,
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useRef, useState } from 'react'

export default function AddStaff({ open, handleClose, currentStaff, onUpdate }) {
	const fileRef = useRef(null)
	const fieldsRef = useRef({})
	const [imageBase64, setImageBase64] = useState([])
	const [values, setValues] = useState({
		id: currentStaff?.id || '',
		email: currentStaff?.email || '',
		password: currentStaff?.password || '',
		name: currentStaff?.name || '',
		birthday: currentStaff?.birthday || '',
		phone: currentStaff?.phone || '',
		gender: currentStaff?.gender || '',
		images: currentStaff?.images || [],
	})
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [inputError, setInputError] = useState('')
	const emailRegex = /^[a-zA-Z]+[-.]?[\w]+@(([\w]+-?[\w]+)+\.)+[\w]{2,4}$/
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$/

	const validatePassword = () => {
		if (!passwordRegex.test(values.password)) {
			setPasswordError(
				'Password must have at least 8 characters, including at least one number, one lowercase letter, one uppercase letter, and one special character.'
			)
			return false
		} else {
			setPasswordError('')
			return true
		}
	}

	const validateInput = () => {
		const { birthday, gender, name, phone, images, password, email } = values
		if (!birthday || !gender || images.length === 0 || !name || !phone || !password || !email) {
			setInputError('All fields are required')
			return false
		} else {
			setInputError('')
			return true
		}
	}

	const validateEmail = () => {
		if (!emailRegex.test(values.email)) {
			setEmailError('Invalid email format. Ex: example@example.com')
			return false
		} else {
			setEmailError('')
			return true
		}
	}

	const handleValueChange = (e) => {
		const { name, value } = e.target
		if (name === 'email') {
			validateEmail(value)
		}
		if (name === 'password') {
			validatePassword(value)
		}
		setValues((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files)
		if (files.length + values.images.length > 1) {
			alert('You can only upload a maximum of 1 image.')
			return
		}

		files.forEach((file) => {
			const reader = new FileReader()
			reader.onload = () => {
				setImageBase64((prev) => [...prev, reader.result])
				setValues((prev) => ({
					...prev,
					images: [...prev.images, file.name],
				}))
			}
			reader.readAsDataURL(file)
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
			const newProduct = {
				id: Date.now(),
				images: values.images,
				imageBase64Array: imageBase64,
				name: values.name,
				price: parseFloat(values.price),
				description: values.description,
				category: values.category,
				quantity: 0,
				isDeleted: false,
			}
			AddStaff(newProduct)
			handleClose()
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add New Staff</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					{imageBase64.length > 0 ? (
						<Stack direction='row' spacing={1} flexWrap='wrap' justifyContent={'center'}>
							{imageBase64.map((image, index) => (
								<Stack key={index} spacing={1}>
									<img
										src={image}
										style={{
											width: 200,
											height: 200,
											borderRadius: '10px',
											objectFit: 'fill',
											cursor: 'pointer',
										}}
										alt={`Uploaded ${index + 1}`}
									/>
								</Stack>
							))}
						</Stack>
					) : (
						<Skeleton animation={false} height={200} variant='rounded' />
					)}
					<ValidationTextField
						disabled
						label='ID'
						name='id'
						variant='filled'
						value={values.id}
						onChange={handleValueChange}
					/>

					<ValidationTextField
						label='Email'
						name='email'
						variant='filled'
						value={values.email}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						label='Password'
						name='password'
						variant='filled'
						value={values.password}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						label='Name'
						name='name'
						variant='filled'
						value={values.name}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						label='Birthday'
						name='birthday'
						variant='filled'
						value={values.birthday}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						label='Phone'
						name='phone'
						variant='filled'
						value={values.phone}
						onChange={handleValueChange}
					/>

					<ValidationSelect
						variant='filled'
						value={values.gender}
						label='Gender'
						onChange={handleValueChange}
						name='gender'
					>
						<MenuItem value='Male'>Male</MenuItem>
						<MenuItem value='Female'>Female</MenuItem>
					</ValidationSelect>

					<ValidationTextField
						label='Images'
						variant='filled'
						value={values.images.join(', ')}
						InputProps={{
							endAdornment: (
								<>
									{values.images.length > 0 && (
										<IconButton
											onClick={() => {
												setImageBase64([])
												setValues((prev) => ({ ...prev, images: [] }))
											}}
										>
											<Close />
										</IconButton>
									)}
									<input
										accept='image/*'
										type='file'
										hidden
										ref={fileRef}
										multiple
										onChange={handleImageChange}
									/>
									<IconButton onClick={() => fileRef.current.click()}>
										<FileUpload />
									</IconButton>
								</>
							),
						}}
					/>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
				<Button onClick={handleClose} variant='outlined' color='inherit' size='large'>
					Close
				</Button>
				<Button onClick={handleAdd} variant='contained' color='primary' size='large'>
					Add
				</Button>
			</DialogActions>
			<Snackbar
				enqueueSnackbar
				open={openSnackbar}
				autoHideDuration={1000}
				onClose={() => setOpenSnackbar(false)}
				message='Staff added successfully'
			/>
		</Dialog>
	)
}
