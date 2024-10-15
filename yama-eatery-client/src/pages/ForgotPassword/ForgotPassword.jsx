import React, { useRef, useState } from 'react'
import { Box, Button, TextField, Typography, Paper, InputAdornment, Input } from '@mui/material'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { Email } from '@mui/icons-material'

export default function ForgotPassword() {
	const [email, setEmail] = useState('')

	const emailRef = useRef(null)

	const handleSubmit = (e) => {
		const isValid = emailRef.current?.validate()
		if (isValid) {
		}
	}

	return (
		<Box
			component={Paper}
			elevation={5}
			sx={{
				maxWidth: '500px',
				padding: '30px',
				margin: '100px auto',
				textAlign: 'center',
				borderRadius: '10px',
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
			}}
		>
			<Typography variant='h4'>Reset Account Password</Typography>
			<Typography variant='body1' align='left'>
				Please enter your email address. You will receive an OTP message to create a new password.
			</Typography>
			<Box>
				<ValidationTextField
					ref={(el) => (emailRef.current = el)}
					label='Email Address'
					name='email'
					type='email'
					variant='outlined'
					fullWidth
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position='start'>
									<Email color='inherit' />
								</InputAdornment>
							),
						},
					}}
				/>
				<Button onClick={handleSubmit} color='primary' variant='contained' sx={{ mt: 2 }} fullWidth>
					Submit
				</Button>
			</Box>
		</Box>
	)
}
