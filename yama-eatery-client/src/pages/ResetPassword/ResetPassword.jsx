import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert } from '@mui/material'

export default function ResetPassword() {
	const [newPassword, setNewPassword] = useState('')

	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')
	const [snackbarSeverity, setSnackbarSeverity] = useState('error')
	const handleSubmit = (event) => {
		event.preventDefault()

		fetch('https://example.com/update-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password: newPassword }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					setSnackbarMessage('Your password has been successfully updated!')
					setSnackbarOpen(true)
					setSnackbarSeverity('success')
					window.location.href = 'login.html'
				} else {
					setSnackbarMessage('An error occurred while updating the password. Please try again.')
					setSnackbarOpen(true)
					setSnackbarSeverity('error')
				}
			})
			.catch((error) => {
				console.error('Error:', error)
				setSnackbarMessage('An error occurred. Please try again later.')
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
			}}
		>
			<Typography variant='h4' gutterBottom>
				Reset Account Password
			</Typography>
			<Typography variant='body1' gutterBottom>
				Please enter your new password
			</Typography>
			<Box component='form' onSubmit={handleSubmit}>
				<TextField
					label='New Password'
					type='password'
					variant='outlined'
					fullWidth
					margin='normal'
					InputLabelProps={{
						style: {
							fontWeight: 'bold',
						},
					}}
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<Button type='submit' color='primary' variant='contained' fullWidth sx={{ mt: 2 }}>
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
