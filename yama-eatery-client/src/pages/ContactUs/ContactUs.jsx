import React, { useState } from 'react'
import { Stack, Button, Typography, TextField, Box } from '@mui/material'
import { LanguageSharp, MailSharp, PhoneSharp } from '@mui/icons-material'
const ContactUs = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})

	const commonTextFieldStyles = {
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.5)',
		},
		border: 'none',
		'& fieldset': { border: 'none' },
	}

	const contactDetails = [
		{
			icon: <LanguageSharp sx={{ fontSize: '3.25rem', color: 'blue', width: '15%' }} />,
			title: 'Our address:',
			content: '600, Nguyen Van Cu Street, An Binh Ward, Ninh Kieu District, Can Tho City',
			link: 'https://www.google.com/',
		},
		{
			icon: <MailSharp sx={{ width: '15%', fontSize: '3.25rem', color: 'blue' }} />,
			title: 'Our Mailbox:',
			content: 'DuyLPCE181153@fpt.edu.vn',
			link: 'mailto:DuyLPCE181153@fpt.edu.vn',
		},
		{
			icon: <PhoneSharp sx={{ width: '15%', fontSize: '3.25rem', color: 'blue' }} />,
			title: 'Our Phone:',
			content: '123-456-7890',
			link: '#',
		},
	]

	const contactFields = [
		{ label: 'Your name', name: 'name', type: 'text', value: formData.name },
		{ label: 'Your email', name: 'email', type: 'email', value: formData.email },
		{
			label: 'Message',
			name: 'message',
			type: 'text',
			value: formData.message,
			multiline: true,
			minRows: 5,
		},
	]

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData({
			...formData,
			[name]: value,
		})
	}
	return (
		<Box>
			<Stack>
				<img
					src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg'
					alt='logo'
					style={{ width: '100%', aspectRatio: 5 / 1, objectFit: 'cover' }}
				/>
			</Stack>
			<Stack direction='row' padding={'3%'} justifyContent={'space-between'}>
				<Stack direction='column' spacing={3} textAlign={'left'} width={'48%'}>
					<Typography
						variant='h6'
						textTransform={'uppercase'}
						color='secondary'
						fontWeight={'bold'}
					>
						\\ CONTACT DETAIL
					</Typography>
					<Typography variant='h4' fontWeight={'bold'} mt={1} color='black'>
						Contact us
					</Typography>
					<Typography variant='subtitle2' color='textSecondary'>
						Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours
						on business days. We will be happy to answer your questions.
					</Typography>

					{contactDetails.map(({ icon, title, content, link }, index) => (
						<Stack
							key={index}
							component='a'
							href={link}
							target='_blank'
							direction='row'
							padding='4% 1%'
							sx={{
								textDecoration: 'none',
								cursor: 'pointer',
								transition: 'transform 0.3s, box-shadow 0.3s',
								':hover': {
									transform: 'translateY(-5px)',
									boxShadow: '0 5px 10px #AAA',
								},
							}}
						>
							{icon}
							<Stack width='85%' direction='column'>
								<Typography variant='body1' fontWeight='bold' color='black'>
									{title}
								</Typography>
								<Typography variant='body2' color='grey'>
									{content}
								</Typography>
							</Stack>
						</Stack>
					))}
				</Stack>
				<Stack
					direction='column'
					justifyContent={'space-between'}
					sx={{
						background: 'linear-gradient(45deg, #00E0FF 0.35%, #9633D3)',
						color: 'white',
					}}
					width={'50%'}
					p={'2%'}
				>
					<Box>
						<Typography variant='h3' textTransform={'capitalize'} fontFamily={'cursive'}>
							Ready to get started ?
						</Typography>
						<Typography variant='body1' textAlign={'left'} fontFamily={'cursive'}>
							Your email address will not be published. Required fields are marked *
						</Typography>
					</Box>
					{contactFields.map((field, index) => (
						<TextField
							key={index}
							variant='outlined'
							margin='normal'
							fullWidth
							required
							{...field}
							onChange={handleChange}
							sx={commonTextFieldStyles}
							InputProps={{
								disableUnderline: true,
							}}
						/>
					))}
					<Button
						type='submit'
						variant='contained'
						color='secondary'
						sx={{
							fontWeight: 'bold',
							fontSize: '1.25rem',
							width: '50%',
							padding: '2% 0',
						}}
					>
						Send Message
					</Button>
				</Stack>
			</Stack>
		</Box>
	)
}

export default ContactUs
