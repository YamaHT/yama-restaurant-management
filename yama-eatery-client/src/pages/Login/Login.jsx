import LoginBackground from '@/assets/img/general/LoginBackground.jpg'
import PasswordTextField from '@/components/CustomTextField/PasswordTextField'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import LayoutLogin from '@/components/LayoutLogin/LoginLayout'
import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)

	const navigate = useNavigate()

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
				<Stack direction={'row'} justifyContent={'space-between'}>
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
					<Button onClick={() => navigate('/auth/forgot-password')}>
						<Typography textTransform={'none'}>Forgot Password?</Typography>
					</Button>
				</Stack>
				<Box mt={4} mb={1}>
					<Button onClick={handleSubmit} variant='contained' color='info' size='large' fullWidth>
						Login
					</Button>
				</Box>
				<Box mt={3} textAlign='center'>
					<Typography color='text' fontWeight={500}>
						Don&apos;t have an account?
						<Button onClick={() => navigate('/auth/register')}>
							<Typography textTransform={'none'}>Register Now</Typography>
						</Button>
					</Typography>
				</Box>
			</Box>
		</LayoutLogin>
	)
}

export default Login
