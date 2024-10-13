import { Login, MenuSharp, Person } from '@mui/icons-material'
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const menuItems = [
	{
		value: 'Home',
		link: '/',
	},
	{
		value: 'Product',
		link: '/product',
	},
	{
		value: 'Table',
		link: '/table',
	},
	{
		value: 'About Us',
		link: '/about',
	},
	{
		value: 'Contact Us',
		link: '/contact',
	},
]

const HeaderGuest = () => {
	const navigate = useNavigate()

	return (
		<AppBar position='sticky' color='inherit'>
			<Toolbar>
				<Stack
					width={'100%'}
					alignItems={'center'}
					justifyContent={'space-between'}
					direction={'row'}
					p={'5px 5%'}
				>
					<Avatar onClick={() => navigate('/')} sx={{ cursor: 'pointer', width: 60, height: 60 }} />
					<Stack direction={'row'} spacing={5}>
						{menuItems.map((item) => (
							<Typography
								key={item.value}
								variant='h6'
								fontWeight={'600'}
								onClick={() => navigate(item.link)}
								sx={{
									cursor: 'pointer',
									position: 'relative',
									':hover': {
										color: 'primary.light',
										'::after': {
											content: '""',
											width: '100%',
											height: 2,
											bgcolor: 'primary.light',
											position: 'absolute',
											left: 0,
											bottom: 0,
										},
									},
								}}
							>
								{item.value}
							</Typography>
						))}
					</Stack>
					<Button variant='outlined' size='large' endIcon={<Login />}>
						Sign in
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

export default HeaderGuest
