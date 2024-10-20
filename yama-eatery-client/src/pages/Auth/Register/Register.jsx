import LoginBackground from '@/assets/img/general/LoginBackground.jpg'
import PasswordTextField from '@/components/CustomTextField/PasswordTextField'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import LayoutLogin from '@/components/LayoutLogin/LoginLayout'
import { AuthService } from '@/services/AuthService'
import { ApiRequest } from '@/utilities/dsa'
import { Box, Button, Stack, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Register = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const navigate = useNavigate()

	const fieldsRef = useRef({})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevValue) => ({ ...prevValue, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (!isValid) {
			return
		}

		setIsSubmitting(true)

		const isExisted = await AuthService.CHECK_EMAIL_EXISTED({ email: formData.email })
		if (isExisted) {
			enqueueSnackbar('Email is existed', { variant: 'error' })
			setIsSubmitting(false)
			return
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString()
		const expirationTime = Date.now() + 1000 * 60 * 5

		const requestData = {
			URL: ApiRequest.AuthRequest.REGISTER,
			formData: formData,
			email: formData.email,
			otp: otp,
			expirationTime: expirationTime,
		}

		const data = await AuthService.SEND_MAIL_OTP({ email: formData.email, otp: otp })
		if (data?.success) {
			enqueueSnackbar(data.success, { variant: 'success', autoHideDuration: 1000 })
			secureLocalStorage.setItem('requestData', JSON.stringify(requestData))

			setTimeout(() => {
				navigate('/auth/otp-verification')
			}, 1000)
		}
	}

	return (
		<LayoutLogin
			title='Register'
			description='Please provide your information for us to register your account'
			isLeftPosition={false}
			illustration={{
				image: LoginBackground,
				title: '"Attention is the new currency"',
				description:
					'The more effortless the writing looks, the more effort the writer actually put into the process.',
			}}
		>
			<Box component={'form'} noValidate onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<Stack direction={'row'} spacing={2}>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['firstName'] = el)}
							type='text'
							label='First Name'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
						/>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['lastName'] = el)}
							type='text'
							label='Last Name'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
						/>
					</Stack>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['phone'] = el)}
						type='tel'
						label='Phone'
						name='phone'
						regex='^\d{10}$'
						regexErrorText='Phone must be 10 digits'
						value={formData.phone}
						onChange={handleChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['email'] = el)}
						type='email'
						label='Email'
						name='email'
						value={formData.email}
						onChange={handleChange}
					/>
					<PasswordTextField
						ref={(el) => (fieldsRef.current['password'] = el)}
						label='Password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</Stack>

				<Box my={2}>
					<Button
						type='submit'
						variant='contained'
						color='info'
						size='large'
						disabled={isSubmitting}
						fullWidth
					>
						Register
					</Button>
				</Box>
				<Box textAlign='center'>
					<Typography color='text' fontWeight={500}>
						Already have an account?{' '}
						<Button onClick={() => navigate('/auth/login')}>
							<Typography textTransform={'none'}>Login Here</Typography>
						</Button>
					</Typography>
				</Box>
			</Box>
		</LayoutLogin>
	)
}

export default Register
