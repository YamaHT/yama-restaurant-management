import { VerifiedUser } from '@mui/icons-material'
import { Alert, Box, Button, Link, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const OTPVerification = () => {
	const [otp, setOtp] = useState(['', '', '', '', '', ''])
	const [isButtonActive, setIsButtonActive] = useState(false)
	const [countdown, setCountdown] = useState(0)

	const handleOtpChange = (value, index) => {
		if (!/^\d*$/.test(value)) {
			return
		}

		const newOtp = [...otp]
		newOtp[index] = value
		setOtp(newOtp)

		if (index < otp.length - 1 && value) {
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
	}

	const handlePaste = (event) => {
		event.preventDefault()
		const pasteData = event.clipboardData.getData('text').slice(0, otp.length)
		if (!/^\d+$/.test(pasteData)) {
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
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		// const otpFromUser = otp.join('')
	}

	useEffect(() => {
		if (countdown > 0) {
			const timerId = setTimeout(() => setCountdown(countdown - 1), 1000)
			return () => clearTimeout(timerId)
		}
	}, [countdown])

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
							slotProps={{
								input: {
									inputProps: {
										maxLength: 1,
										style: { fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'center' },
									},
								},
							}}
							value={value}
							onChange={(e) => handleOtpChange(e.target.value, index)}
							onKeyDown={(e) => handleBackspace(e, index)}
							onPaste={handlePaste}
						/>
					))}
				</Box>
				<Button onClick={handleSubmit} variant='contained' fullWidth disabled={!isButtonActive}>
					Verify OTP
				</Button>
				<Typography variant='body1'>
					Didn't receive OTP code?{' '}
					{countdown > 0 ? (
						<Typography fontWeight={'bold'} display={'inline'}>
							{countdown}s
						</Typography>
					) : (
						<Button onClick={handleResendOtp}>Resend</Button>
					)}
				</Typography>
			</Box>
		</Box>
	)
}

export default OTPVerification
