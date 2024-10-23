import { AuthService } from '@/services/AuthService'
import { ApiRequest } from '@/utilities/ApiRequest'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

export default function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	const emailRegex = /^[a-zA-Z]+[-.]?[\w]+@(([\w]+-?[\w]+)+\.)+[\w]{2,4}$/

	const validateEmail = () => {
		if (!email) {
			setEmailError('Email is required')
			return false
		} else if (!emailRegex.test(email)) {
			setEmailError('Invalid email format. Ex: example@example.com')
			return false
		} else {
			setEmailError('')
			return true
		}
	}
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!validateEmail()) {
			return
		}
		const isExisted = await AuthService.CHECK_EMAIL_EXISTED({ email })

		if (isExisted) {
			const otp = Math.floor(100000 + Math.random() * 900000).toString()
			const expirationTime = Date.now() + 1000 * 60 * 5

			secureLocalStorage.setItem(
				'requestData',
				JSON.stringify({
					URL: ApiRequest.AuthRequest.FORGOT_PASSWORD,
					formData: email,
					email: email,
					otp: otp,
					expirationTime: expirationTime,
				})
			)

			await AuthService.SEND_MAIL_OTP({ email: email, otp: otp })

			enqueueSnackbar('OTP will be sent to your email', {
				variant: 'success',
				autoHideDuration: 1000,
			})

			setTimeout(() => {
				navigate('/auth/otp-verification')
			}, 1000)
		}
	}

	return (
		<Box
			component={Paper}
			elevation={5}
			sx={{
				maxWidth: '500px',
				margin: '100px auto',
				padding: '30px',
				textAlign: 'center',
				borderRadius: '10px',
			}}
		>
			<Typography variant='h4' gutterBottom>
				Reset Account Password
			</Typography>
			<Typography variant='body1' gutterBottom>
				Please enter your email address. You will receive an OTP message to create a new password.
			</Typography>
			<Box component='form' onSubmit={handleSubmit}>
				<TextField
					label='Email Address'
					variant='outlined'
					fullWidth
					margin='normal'
					error={Boolean(emailError)}
					helperText={emailError}
					InputLabelProps={{
						style: {
							fontWeight: 'bold',
						},
					}}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onBlur={() => validateEmail(email)}
				></TextField>

				<Button type='submit' color='primary' variant='contained' sx={{ mt: 2 }} fullWidth>
					Submit
				</Button>
			</Box>
		</Box>
	)
}
