import { AssetImages } from '@/utilities/AssetImages'
import { Facebook, GitHub, Instagram, LinkedIn } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, Stack, Typography, Button } from '@mui/material'

const Footer = () => {
	return (
		<Box
			component={'footer'}
			mt={5}
			p={5}
			sx={{
				background: '#04A',
				color: '#e0e0e0',
			}}
		>
			<Stack spacing={2} direction={'row'} alignItems={'center'}>
				<Avatar
					src={AssetImages.SYSTEM_LOGO}
					sx={{ width: 50, height: 50, aspectRatio: 1, objectFit: 'cover' }}
				/>
				<Typography variant='h6' fontWeight={'bold'} flexGrow={1}>
					Yama Restaurant
				</Typography>

				<Stack direction={'row'} spacing={2}>
					<Button variant='text' href='/' color='inherit'>
						Home
					</Button>
					<Button variant='text' href='/product' color='inherit'>
						Service
					</Button>
					<Button variant='text' href='/about' color='inherit'>
						About
					</Button>
					<Button variant='text' href='/contact' color='inherit'>
						Contact
					</Button>
				</Stack>
			</Stack>
			<Divider color='#FFF' sx={{ my: 2 }} />

			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
				<Typography align='center' color='#aaa'>
					Copyright 2024 © Yama Resaurant. All rights reserved.
				</Typography>
				<Stack direction={'row'} spacing={1}>
					<IconButton color='inherit' href='https://facebook.com' target='_blank'>
						<Facebook />
					</IconButton>
					<IconButton color='inherit' href='https://instagram.com' target='_blank'>
						<Instagram />
					</IconButton>
					<IconButton color='inherit' href='https://github.com/YamaHT' target='_blank'>
						<GitHub />
					</IconButton>
					<IconButton color='inherit' href='https://linkedin.com'>
						<LinkedIn />
					</IconButton>
				</Stack>
			</Stack>
		</Box>
	)
}

export default Footer
