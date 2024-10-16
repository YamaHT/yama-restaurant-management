import { UserService } from '@/services/UserService'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
export default function ChangePassword() {
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [showOldPassword, setShowOldPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [oldPasswordError, setOldPasswordError] = useState('')
	const [newPasswordError, setNewPasswordError] = useState('')
	const [confirmPasswordError, setConfirmPasswordError] = useState('')

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

	const handleSubmit = async (event) => {
		event.preventDefault()

		validateOldPassword()
		validateNewPassword()
		validateConfirmPassword()
		if (oldPasswordError || newPasswordError || confirmPasswordError) {
			enqueueSnackbar('Please correct the errors before submitting.', {
				variant: 'error',
				autoHideDuration: 1000,
			})

			return
		}

		if (!oldPassword || !newPassword || !confirmPassword) {
			enqueueSnackbar('Please fill in all required fields', {
				variant: 'error',
				autoHideDuration: 1000,
			})
			return
		}

		const data = await UserService.CHANGE_PASSWORD({
			password: oldPassword,
			newPassword: newPassword,
		})

		console.log(data)
		if (data?.success) {
			enqueueSnackbar(data.success, { variant: 'success', autoHideDuration: 1000 })
		}
	}

	return (
		<Box
			component={Paper}
			elevation={5}
			fullWidth
			sx={{
				padding: '20px',
				textAlign: 'center',
				borderRadius: '10px',
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
			</Box>
		</Box>
	)
}
