import LoginBackground from '@/assets/img/general/LoginBackground.jpg'
import PasswordTextField from '@/components/CustomTextField/PasswordTextField'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import LayoutLogin from '@/components/LayoutLogin/LoginLayout'
import { AuthService } from '@/services/AuthService'
import { Google } from '@mui/icons-material'
import { Box, Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const navigate = useNavigate()
	const fieldsRef = useRef({})

	const login = (data) => {
		enqueueSnackbar('Login succesfully', { variant: 'success', autoHideDuration: 1000 })

		localStorage.setItem('token', data.token)
		secureLocalStorage.setItem('role', data.role)
		window.dispatchEvent(new Event('roleChange'))

		setTimeout(() => {
			if (data.role === 'Manager') {
				navigate('/manager')
			} else if (data.role === 'Staff') {
				navigate('/staff')
			} else {
				navigate('/')
			}
		}, 1000)
	}

	const handleLoginWithGoogle = useGoogleLogin({
		onSuccess: async (res) => {
			const profile = await AuthService.GET_LOGIN_PROFILE(res.access_token)

			const formData = { email: profile.email, name: profile.name, picture: profile.picture }
			const data = await AuthService.LOGIN_WITH_GOOGLE(formData)
			if (data) {
				login(data)
			}
		},
	})

	const handleSubmit = async (e) => {
		e.preventDefault()

		setIsSubmitting(true)

		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			const data = await AuthService.LOGIN({ email, password })
			if (data) {
				login(data)
			}
		}
		setIsSubmitting(false)
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
			<Box component={'form'} noValidate onSubmit={handleSubmit}>
				<Stack spacing={2}>
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
				</Stack>
				<Box my={2}>
					<Button
						disabled={isSubmitting}
						type='submit'
						variant='contained'
						color='info'
						size='large'
						fullWidth
					>
						Login
					</Button>
				</Box>
				<Box textAlign='center'>
					<Typography color='text' fontWeight={500}>
						Don&apos;t have an account?
						<Button onClick={() => navigate('/auth/register')}>
							<Typography textTransform={'none'}>Register Now</Typography>
						</Button>
					</Typography>
				</Box>

				<Button
					onClick={handleLoginWithGoogle}
					variant='contained'
					color='error'
					size='large'
					fullWidth
					startIcon={<Google />}
				>
					Login With Google+
				</Button>
			</Box>
		</LayoutLogin>
	)
}

export default Login
