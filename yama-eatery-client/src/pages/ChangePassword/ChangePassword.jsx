import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Alert,
	Box,
	Button,
	IconButton,
	InputAdornment,
	Paper,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'
export default function ChangePassword() {
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [otp, setOtp] = useState('')
	const [gemerateOtp, setGenerateOtp] = useState(null)

	const [showOldPassword, setShowOldPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [oldPasswordError, setOldPasswordError] = useState('')
	const [newPasswordError, setNewPasswordError] = useState('')
	const [confirmPasswordError, setConfirmPasswordError] = useState('')

	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')
	const [snackbarSeverity, setSnackbarSeverity] = useState('success')
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$/

	const validateOldPassword = () => {
		if (!oldPassword) {
			setOldPasswordError('Old password is required')
		} else if (!passwordRegex.test(oldPassword)) {
			setOldPasswordError(
				'Password must have at least 8 characters, including at least one number, one lowercase letter, one uppercase letter, and one special character.'
			)
		} else {
			setOldPasswordError('')
		}
	}

	const validateConfirmPassword = () => {
		if (!confirmPassword) {
			setConfirmPasswordError('Confirm password is required')
		} else if (!passwordRegex.test(confirmPassword)) {
			setConfirmPasswordError(
				'Password must have at least 8 characters, including at least one number, one lowercase letter, one uppercase letter, and one special character.'
			)
		} else if (newPassword !== confirmPassword) {
			setConfirmPasswordError('New password and confirm password do not match.')
		} else {
			setConfirmPasswordError('')
		}
	}

	const validateNewPassword = () => {
		if (!newPassword) {
			setNewPasswordError('New password is required')
		} else if (!passwordRegex.test(newPassword)) {
			setNewPasswordError(
				'Password must have at least 8 characters, including at least one number, one lowercase letter, one uppercase letter, and one special character.'
			)
		} else {
			setNewPasswordError('')
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		validateOldPassword()
		validateNewPassword()
		validateConfirmPassword()
		if (oldPasswordError || newPasswordError || confirmPasswordError) {
			setSnackbarMessage('Please correct the errors before submitting.')
			setSnackbarOpen(true)
			setSnackbarSeverity('error')
			return
		}

		if (!oldPassword || !newPassword || !confirmPassword) {
			setSnackbarMessage('Please fill in all required fields')
			setSnackbarOpen(true)
			setSnackbarSeverity('error')
			return
		}
	}
	const generateOtp = () => {
		const otp = Math.floor(100000 + Math.random() * 90000)
		setGenerateOtp(otp)
		//Gửi email cho người dùng ở backend sau khi đã tạo
	}

	return (
		<Box
			component={Paper}
			elevation={15}
			sx={{
				maxWidth: '400px',
				margin: '100px auto',
				padding: '20px',
				marginLeft: '410px',
				textAlign: 'center',
				borderRadius: '10px',
				marginTop: '30px',
			}}
		>
			<Typography variant='h4'>Change Account Password</Typography>
			<Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
				<TextField
					label='Old Password'
					type={showOldPassword ? 'text' : 'password'}
					fullWidth
					margin='normal'
					error={Boolean(oldPasswordError)}
					helperText={oldPasswordError}
					InputLabelProps={{
						style: {
							fontWeight: 'bold',
						},
					}}
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
					onBlur={() => validateOldPassword()}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge='end'>
									{showOldPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<TextField
					label='New Password'
					type={showNewPassword ? 'text' : 'password'}
					fullWidth
					margin='normal'
					error={Boolean(newPasswordError)}
					helperText={newPasswordError}
					InputLabelProps={{
						style: {
							fontWeight: 'bold',
						},
					}}
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					onBlur={() => validateNewPassword()}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge='end'>
									{showNewPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<TextField
					label='Confirm Password'
					type={showConfirmPassword ? 'text' : 'password'}
					fullWidth
					margin='normal'
					error={Boolean(confirmPasswordError)}
					helperText={confirmPasswordError}
					InputLabelProps={{
						style: {
							fontWeight: 'bold',
						},
					}}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					onBlur={() => validateConfirmPassword()}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge='end'>
									{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<Button type='submit' variant='contained' color='primary' sx={{ mt: 2, width: '100%' }}>
					Change Password
				</Button>
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={3000}
					onClose={() => setSnackbarOpen(false)}
					sx={{ marginBottom: '500px', marginLeft: '1000px' }}
				>
					<Alert
						onClose={() => setSnackbarOpen(false)}
						severity={snackbarSeverity}
						sx={{ width: '100%' }}
					>
						{snackbarMessage}
					</Alert>
				</Snackbar>
			</Box>
		</Box>
	)
}
