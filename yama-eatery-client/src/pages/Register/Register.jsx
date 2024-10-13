import LoginBackground from '@/assets/img/general/LoginBackground.jpg'
import PasswordTextField from '@/components/CustomTextField/PasswordTextField'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import LayoutLogin from '@/components/LayoutLogin/LoginLayout'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const Register = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

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
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<ValidationTextField
							ref={(el) => (fieldsRef.current['lastName'] = el)}
							type='text'
							label='Last Name'
							name='lastName'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</Stack>
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
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Stack>

				<Box mt={4} mb={1}>
					<Button onClick={handleSubmit} variant='contained' color='info' size='large' fullWidth>
						Register
					</Button>
				</Box>
				<Box mt={3} textAlign='center'>
					<Typography variant='button' color='text' fontWeight='regular'>
						Already have an account?{' '}
						<Link href='/authentication/sign-up' fontWeight='medium' underline='hover'>
							Login Here
						</Link>
					</Typography>
				</Box>
			</Box>
		</LayoutLogin>
	)
}

export default Register
