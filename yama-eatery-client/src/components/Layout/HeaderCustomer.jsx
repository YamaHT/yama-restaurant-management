import { AssetImages } from '@/utilities/AssetImages'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import {
	AppBar,
	Avatar,
	Button,
	Collapse,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
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
		value: 'Voucher',
		link: '/voucher',
	},
	{
		value: 'More',
		childrens: [
			{
				value: 'About Us',
				link: '/about',
			},
			{
				value: 'Contact Us',
				link: '/contact',
			},
		],
	},
]

const HeaderCustomer = () => {
	const navigate = useNavigate()

	const [openMore, setOpenMore] = useState(false)

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
					<Stack direction={'row'} spacing={5} alignItems={'center'}>
						{menuItems.map((item) => (
							<Button
								variant='text'
								onMouseEnter={item.childrens ? () => setOpenMore(true) : null}
								onMouseLeave={item.childrens ? () => setOpenMore(false) : null}
								disableTouchRipple={!!item.childrens}
								disableElevation={!!item.childrens}
								onClick={() => navigate(item.link)}
								endIcon={item.childrens ? !openMore ? <ArrowDropDown /> : <ArrowDropUp /> : null}
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
									{item.childrens && (
										<>
											{}
											<Collapse
												sx={{ position: 'absolute', width: 'max-content', top: '100%' }}
												unmountOnExit
												in={openMore}
											>
												<List component={Paper} disablePadding>
													{item.childrens.map((child) => (
														<ListItem sx={{ p: 0, ':hover': { color: 'primary.light' } }}>
															<ListItemButton component={'a'} href={child.link}>
																<ListItemText primary={child.value} />
															</ListItemButton>
														</ListItem>
													))}
												</List>
											</Collapse>
										</>
									)}
								</Typography>
							</Button>
						))}
					</Stack>
					<Button
						variant='outlined'
						onClick={() => navigate('/user/profile')}
						sx={{
							borderWidth: 2,
							textTransform: 'none',
							p: '8px 1.5%',
							width: 250,
							gap: 2,
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ width: 30, height: 30 }}>D</Avatar>
						<Typography
							fontWeight={700}
							variant='body1'
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								textWrap: 'nowrap',
							}}
						>
							Le Phuoc Duy
						</Typography>
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

export default HeaderCustomer