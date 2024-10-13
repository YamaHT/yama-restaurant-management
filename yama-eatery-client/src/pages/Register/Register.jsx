import LoginBackground from '@/assets/img/general/LoginBackground.jpg'
import PasswordTextField from '@/components/CustomTextField/PasswordTextField'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import LayoutLogin from '@/components/LayoutLogin/LoginLayout'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const [value, setValue] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
	})

	const navigate = useNavigate()

	const fieldsRef = useRef({})

	const handleChange = (e) => {
		const { name, value } = e.target
		setValue((prevValue) => ({ ...prevValue, [name]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		let isValid = true

		Object.keys(fieldsRef.current).map((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (isValid) {
			console.log('Form submitted:', value)
		} else {
			console.log('Please fill in valid fields.')
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
			<Box>
				<Stack gap={3}>
					<Stack direction={'row'} spacing={2}>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['firstName'] = el)}
							type='text'
							label='First Name'
							name='firstName'
							value={value.firstName}
							onChange={handleChange}
						/>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['lastName'] = el)}
							type='text'
							label='Last Name'
							name='lastName'
							value={value.lastName}
							onChange={handleChange}
						/>
					</Stack>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['phone'] = el)}
						type='tel'
						label='Phone'
						name='phone'
						regex='\d{10}'
						regexErrorText='Phone must be 10 digits'
						value={value.phone}
						onChange={handleChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['email'] = el)}
						type='email'
						label='Email'
						name='email'
						value={value.email}
						onChange={handleChange}
					/>
					<PasswordTextField
						ref={(el) => (fieldsRef.current['password'] = el)}
						label='Password'
						name='password'
						value={value.password}
						onChange={handleChange}
					/>
				</Stack>

				<Box mt={4} mb={1}>
					<Button onClick={handleSubmit} variant='contained' color='info' size='large' fullWidth>
						Register
					</Button>
				</Box>
				<Box mt={3} textAlign='center'>
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
