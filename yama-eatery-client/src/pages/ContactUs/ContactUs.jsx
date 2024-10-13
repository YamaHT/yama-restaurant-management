import contactBanner from '@/assets/img/general/ContactBanner.jpg'
import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { Language, Mail, Phone } from '@mui/icons-material'
import { Avatar, Box, Button, FormLabel, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'

const ContactCard = ({ icon, title, description, link }) => {
	return (
		<Stack
			flexDirection={'row'}
			justifyContent={'space-between'}
			component={'a'}
			href={link}
			target='_blank'
			gap={2}
			sx={{
				textDecoration: 'none',
				m: '2%',
				p: '2% 1%',
				transition: '.2s linear',
				cursor: 'pointer',
				':hover': {
					transform: 'translateY(-5px)',
					boxShadow: '0 2px 10px #AAA',
				},
			}}
		>
			{icon}
			<Stack gap={2} width={'90%'}>
				<Typography variant='body1' fontWeight={'bold'} color='black'>
					{title}
				</Typography>
				<Typography variant='body1' color='grey'>
					{description}
				</Typography>
			</Stack>
		</Stack>
	)
}

const contactInfo = [
	{
		icon: <Language sx={{ width: '10%', color: 'royalblue', fontSize: '2.5rem' }} />,
		title: 'Our address:',
		description: '600, Nguyen Van Cu Street, An Binh Ward, Ninh Kieu District, Can Tho City',
		href: 'https://maps.app.goo.gl/7iAuVaaPNRk1aGbJ9',
	},
	{
		icon: <Mail sx={{ width: '10%', color: 'royalblue', fontSize: '2.5rem' }} />,
		title: 'Our Mailbox:',
		description: 'DuyLPCE181153@fpt.edu.vn',
		href: 'mailto:DuyLPCE181153@fpt.edu.vn',
	},
	{
		icon: <Phone sx={{ width: '10%', color: 'royalblue', fontSize: '2.5rem' }} />,
		title: 'Our Phone:',
		description: '0123123123',
		href: 'tel:0123123123',
	},
]

const ContactUs = () => {
	const [value, setValue] = useState({
		name: '',
		title: '',
		message: '',
	})
	const fieldsRef = useRef([])

	const handleSubmit = () => {
		let isValid = true

		Object.keys(fieldsRef.current).map((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (!isValid) {
			return
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setValue((prevValue) => ({
			...prevValue,
			[name]: value,
		}))
	}

	return (
		<Box minWidth={500}>
			<Avatar
				variant='square'
				src={contactBanner}
				sx={{ width: '100%', height: 400, objectFit: 'cover' }}
			/>
			<Stack
				justifyContent={'space-between'}
				alignItems={'center'}
				padding={'2%'}
				direction={{ sm: 'column', md: 'row' }}
				spacing={5}
				flexWrap={true}
			>
				<Box width={{ sm: '100%', md: '50%' }}>
					<Typography
						variant='h6'
						textTransform={'uppercase'}
						color='secondary'
						fontWeight={'bold'}
					>
						// contact details
					</Typography>
					<Box>
						<Typography variant='h4' fontWeight={'bold'} mt={3} color='black'>
							Contact us
						</Typography>
						<Typography variant='body1' color='grey' textAlign={'justify'}>
							Give us a call or drop by anytime, we endeavour to answer all enquiries within 24
							hours on business days. We will be happy to answer your questions
						</Typography>
					</Box>
					<Stack direction={'column'} spacing={3} mt={2}>
						{contactInfo.map((info) => (
							<ContactCard
								icon={info.icon}
								title={info.title}
								description={info.description}
								link={info.href}
							/>
						))}
					</Stack>
				</Box>
				<Box
					width={{ sm: '100%', md: '50%' }}
					padding={'3%'}
					sx={{
						background: 'linear-gradient(90deg, #3DBEFFEE 0%, #9955ffEE 100%)',
					}}
				>
					<Stack spacing={2}>
						<FormLabel>
							<Typography
								variant='h3'
								color='white'
								fontWeight={'bold'}
								textTransform={'capitalize'}
								letterSpacing={1}
							>
								Ready to get started?
							</Typography>
							<Typography variant='body2' color='white'>
								Your email address will not be published. Required fields are marked *
							</Typography>
						</FormLabel>
						<Stack spacing={2}>
							<ValidationTextField
								ref={(el) => (fieldsRef.current['name'] = el)}
								variant='filled'
								label='Your name'
								name='name'
								color='secondary'
								value={value.name}
								onChange={handleChange}
								maxLength={255}
							/>
							<ValidationTextField
								ref={(el) => (fieldsRef.current['title'] = el)}
								variant='filled'
								label='Title'
								name='title'
								color='secondary'
								value={value.title}
								onChange={handleChange}
								maxLength={255}
							/>
							<ValidationTextField
								ref={(el) => (fieldsRef.current['message'] = el)}
								variant='filled'
								label='Your message'
								name='message'
								multiline
								rows={4}
								color='secondary'
								value={value.message}
								onChange={handleChange}
								maxLength={1000}
							/>
						</Stack>
						<Button
							variant='contained'
							type='button'
							size='large'
							sx={{
								color: 'black',
								bgcolor: 'white',
								fontSize: 20,
								width: '50%',
								fontWeight: 'bold',
							}}
							onClick={handleSubmit}
						>
							Send message
						</Button>
					</Stack>
				</Box>
			</Stack>
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0533542574994!2d105.72985131022457!3d10.01245179005225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0890033b0a4d5%3A0x5360c94ba9e67842!2zNjAwIE5ndXnhu4VuIFbEg24gQ-G7qyBO4buRaSBEw6BpLCBBbiBCw6xuaCwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEgOTAwMDAwLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1723875797178!5m2!1sen!2s'
				width='100%'
				height='450'
				loading='lazy'
				style={{ border: 'none' }}
				referrerpolicy='no-referrer-when-downgrade'
			></iframe>
		</Box>
	)
}

export default ContactUs
