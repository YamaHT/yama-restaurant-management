import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert } from '@mui/material'

export default function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	const emailRegex = /^[a-zA-Z]+[-.]?[\w]+@(([\w]+-?[\w]+)+\.)+[\w]{2,4}$/;


	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')
	const [snackbarSeverity, setSnackbarSeverity] = useState('error')
	const validateEmail = () => {
		if (!email) {
			setEmailError('Email is required')
			return false;
		} else if (!emailRegex.test(email)) {
			setEmailError('Invalid email format. Ex: example@example.com')
			return false;
			
		}
		else {
			setEmailError('');
			return true;
		}
	}
	const handleSubmit = (event) => {
		event.preventDefault();

			if (!validateEmail()) {
				return 
			}
	
		fetch('https://example.com/send-otp', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json', 
			},
			body: JSON.stringify({ email: email }), 
		})
			.then((response) => response.json()) 
			.then((data) => {
				if (data.success) {
					setSnackbarMessage('OTP has been sent to your email address.')
					setSnackbarOpen(true)
					setSnackbarSeverity('success')
				} else {
					setSnackbarMessage('An error occurred. Please try again.')
					setSnackbarOpen(true)
					setSnackbarSeverity('error')
				}
			})
			.catch((error) => {
				console.error('Error:', error) 
				setSnackbarMessage('An error occurred while sending the request.')
				setSnackbarOpen(true)
				setSnackbarSeverity('error')
			})
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
				marginLeft: '350px',
				marginTop: '30px',
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
	)
}
