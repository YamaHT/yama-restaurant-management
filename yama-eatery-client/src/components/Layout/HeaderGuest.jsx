import { AssetImages } from '@/utilities/AssetImages'
import { Login } from '@mui/icons-material'
import { AppBar, Avatar, Button, Stack, Toolbar, Typography } from '@mui/material'
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
					<Avatar
						src={AssetImages.SYSTEM_LOGO}
						onClick={() => navigate('/')}
						sx={{ cursor: 'pointer', width: 60, height: 60 }}
					/>
					<Stack direction={'row'} spacing={5}>
						{menuItems.map((item) => (
							<Button
								variant='text'
								disableTouchRipple={!!item.childrens}
								disableElevation={!!item.childrens}
								onClick={() => navigate(item.link)}
								sx={{
									cursor: 'pointer',
									position: 'relative',
									textTransform: 'none',
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
								<Typography key={item.value} variant='h6' fontWeight={'600'}>
									{item.value}
								</Typography>
							</Button>
						))}
					</Stack>
					<Button
						variant='outlined'
						size='large'
						onClick={() => navigate('/auth/login')}
						endIcon={<Login />}
					>
						Sign in
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

export default HeaderGuest
