import { VerifiedUser } from '@mui/icons-material'
import { Alert, Box, Button, Link, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function OTPVerification() {
	const [otp, setOtp] = useState(['', '', '', '', '', ''])
	const [isButtonActive, setIsButtonActive] = useState(false)
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')
	const [snackbarSeverity, setSnackbarSeverity] = useState('error')
	const [countdown, setCountdown] = useState(0)

	const [generateOtp, setGenerateOtp] = useState(null)

	useEffect(() => {
		createOtp()
	}, [])

	const handleOtpChange = (value, index) => {
		if (isNaN(value)) return
		const newOtp = [...otp]
		newOtp[index] = value
		setOtp(newOtp)
		if (index < otp.length - 1 && value !== '') {
			document.getElementById(`otp-input-${index + 1}`).focus()
		}
		setIsButtonActive(newOtp.every((val) => val !== ''))
	}

	const handleBackspace = (event, index) => {
		if (event.key === 'Backspace' && otp[index] === '') {
			if (index > 0) {
				document.getElementById(`otp-input-${index - 1}`).focus()
			}
		}
	}

	const handleResendOtp = (event) => {
		event.preventDefault()
		createOtp()
		setCountdown(60)
		setSnackbarMessage('OTP will be resent!')
		setSnackbarOpen(true)
		setSnackbarSeverity('info')
	}
	const handlePaste = (event) => {
		event.preventDefault()
		const pasteData = event.clipboardData.getData('text').slice(0, otp.length)
		const pasteRegex = /\d{6}/
		if (!pasteRegex.test(pasteData)) {
			return
		}
		const newOtp = [...otp]
		for (let i = 0; i < pasteData.length; i++) {
			newOtp[i] = pasteData[i]
		}
		setOtp(newOtp)
		setIsButtonActive(newOtp.every((val) => val !== ''))
	}
	const createOtp = () => {
		const otp = Math.floor(100000 + Math.random() * 900000)
		setGenerateOtp(otp)
		
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const otpFromUser = otp.join('')
		if (String(generateOtp) !== otpFromUser) {
			setSnackbarMessage('Invalid OTP. Please try again.')
			setSnackbarOpen(true)
			setSnackbarSeverity('error')
			setOtp(['', '', '', '', '', ''])
			setIsButtonActive(false)
			return
		} else {
			setSnackbarMessage(
				'Password reset successfully. Please check your email and change your password.'
			)
			setSnackbarOpen(true)
			setSnackbarSeverity('success')
		}
	}

	useEffect(() => {
		if (countdown > 0) {
			const timerId = setTimeout(() => setCountdown(countdown - 1), 1000)
			return () => clearTimeout(timerId)
		}
	}, [countdown])

	useEffect(() => {
		document.getElementById('otp-input-0').focus()
	}, [])

	return (
		<Box
			component={Paper}
			elevation={15}
			sx={{
				maxWidth: 500,
				margin: '100px auto',
				padding: '30px',
				textAlign: 'center',
				borderRadius: '10px',
				marginLeft: '380px',
				marginTop: '30px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					rowGap: 2,
				}}
			>
				<VerifiedUser
					sx={{
						fontSize: 60,
						color: '#4070f4',
						backgroundColor: '#81d4fa',
						borderRadius: '50%',
						padding: '10px',
						boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
					}}
				/>
				<Typography variant='h4'>Enter OTP Code</Typography>
				<form onSubmit={handleSubmit}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							columnGap: 2,
						}}
					>
						{otp.map((value, index) => (
							<TextField
								key={index}
								id={`otp-input-${index}`}
								type='text'
								variant='outlined'
								value={value}
								onChange={(e) => handleOtpChange(e.target.value, index)}
								onKeyDown={(e) => handleBackspace(e, index)}
								onPaste={handlePaste}
								inputProps={{
									maxLength: 1,
									style: { textAlign: 'center' },
									inputMode: 'numeric',
									pattern: '[0-9]*',
								}}
								sx={{
									width: 50,
									'& input[type=number]': {
										'-moz-appearance': 'textfield',
									},
									'& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
										{
											'-webkit-appearance': 'none',
											margin: 0,
										},
								}}
							/>
						))}
					</Box>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						fullWidth
						disabled={!isButtonActive}
						sx={{ mt: 3 }}
					>
						Verify OTP
					</Button>
				</form>
				<Typography variant='body1' sx={{ mt: 2 }}>
					Didn't receive OTP code?{' '}
					{countdown > 0 ? (
						<Typography variant='body2'>Resend available in {countdown}s</Typography>
					) : (
						<Link href='#' onClick={handleResendOtp}>
							Resend
						</Link>
					)}
				</Typography>
			</Box>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
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
