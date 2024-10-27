import PasswordTextField from '@/components/CustomTextField/PasswordTextField'
import { UserService } from '@/services/UserService'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useRef } from 'react'
import { useState } from 'react'

export default function ChangePassword() {
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const fieldsRef = useRef({})

	const handleSubmit = async (e) => {
		e.preventDefault()
		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (confirmPassword !== newPassword) {
			enqueueSnackbar('Confirm password is not matched with new password', { variant: 'error' })
			isValid = false
		}

		if (isValid) {
			console.log(isValid)
			const data = await UserService.CHANGE_PASSWORD({
				password: oldPassword,
				newPassword: newPassword,
			})

			if (data) {
				enqueueSnackbar(data.success, { variant: 'success' })
				setOldPassword('')
				setNewPassword('')
				setConfirmPassword('')
				fieldsRef.current['confirm']?.focus()
			}
		}
	}

	return (
		<Box
			component={Paper}
			fullWidth
			sx={{
				padding: '2%',
				textAlign: 'center',
			}}
		>
			<Typography variant='h4'>Change Account Password</Typography>
			<Stack component='form' noValidate onSubmit={handleSubmit} spacing={2} mt={2}>
				<PasswordTextField
					ref={(el) => (fieldsRef.current['Old'] = el)}
					label='Old Password'
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
				/>

				<PasswordTextField
					ref={(el) => (fieldsRef.current['New'] = el)}
					label='New Password'
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>

				<PasswordTextField
					ref={(el) => (fieldsRef.current['Confirm'] = el)}
					label='Confirm Password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				<Button type='submit' variant='contained' color='primary' sx={{ mt: 2, width: '100%' }}>
					Change Password
				</Button>
			</Stack>
		</Box>
	)
}
