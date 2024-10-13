import LoginBackground from '@/assets/img/general/LoginBackground.jpg'
import PasswordTextField from '@/components/CustomTextField/PasswordTextField'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import LayoutLogin from '@/components/LayoutLogin/LoginLayout'
import { Box, Button, Checkbox, FormControlLabel, Link, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)

	const fieldsRef = useRef({})

	const handleSubmit = (e) => {
		e.preventDefault()

		let isValid = true

		Object.keys(fieldsRef.current).map((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			console.log('Form submitted:', { email, password })
		} else {
			console.log('Please fill in valid fields.')
		}
	}

	return (
		<LayoutLogin
			title='Sign In'
			description='Enter your email and password to sign in'
			isLeftPosition={true}
			illustration={{
				image: LoginBackground,
				title: '"Attention is the new currency"',
				description:
					'The more effortless the writing looks, the more effort the writer actually put into the process.',
			}}
		>
			<Box>
				<Stack gap={3} mb={2}>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['email'] = el)}
						type='email'
						label='Email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<PasswordTextField
						ref={(el) => (fieldsRef.current['password'] = el)}
						label='Password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Stack>
				<FormControlLabel
					label='Remember me'
					control={
						<Checkbox
							color='primary'
							title='Remember me'
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
						/>
					}
				/>
				<Box mt={4} mb={1}>
					<Button onClick={handleSubmit} variant='contained' color='info' size='large' fullWidth>
						Login
					</Button>
				</Box>
				<Box mt={3} textAlign='center'>
					<Typography variant='button' color='text' fontWeight='regular'>
						Don&apos;t have an account?{' '}
						<Link href='/authentication/sign-up' underline='hover' fontWeight='medium'>
							Register Now
						</Link>
					</Typography>
				</Box>
			</Box>
		</LayoutLogin>
	)
}

export default Login
