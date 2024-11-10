import { AuthService } from '@/services/AuthService'
import { UserService } from '@/services/UserService'
import { AssetImages } from '@/utilities/AssetImages'
import { ArrowDropDown, ArrowDropUp, Logout } from '@mui/icons-material'
import {
	AppBar,
	Avatar,
	Button,
	Collapse,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

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
	const [openMore, setOpenMore] = useState(false)
	const [userImage, setUserImage] = useState(null)
	const [userName, setUserName] = useState(null)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchUserProfile = async () => {
			const data = await UserService.GET_PROFILE()
			if (data) {
				setUserImage(data.image)
				setUserName(data.name)
			}
		}
		fetchUserProfile()
		window.addEventListener('profileChange', fetchUserProfile)

		return () => window.removeEventListener('profileChange', fetchUserProfile)
	}, [])

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
										<Collapse
											sx={{ position: 'absolute', width: 'max-content', top: '100%' }}
											unmountOnExit
											in={openMore}
										>
											<List component={Paper} disablePadding>
												{item.childrens.map((child, index) => (
													<ListItem key={index} sx={{ p: 0, ':hover': { color: 'primary.light' } }}>
														<ListItemButton component={Link} href={child.link}>
															<ListItemText primary={child.value} />
														</ListItemButton>
													</ListItem>
												))}
											</List>
										</Collapse>
									)}
								</Typography>
							</Button>
						))}
					</Stack>
					<Stack direction={'row'} spacing={2}>
						<Button
							variant='outlined'
							onClick={() => navigate('/user')}
							sx={{
								borderWidth: 2,
								textTransform: 'none',
								p: '5px 1.5%',
								width: 250,
								gap: 2,
								alignItems: 'center',
							}}
						>
							<Avatar
								src={userImage ? AssetImages.UserImage(userImage) : null}
								sx={{ width: 30, height: 30 }}
							/>
							<Typography
								fontWeight={700}
								variant='body1'
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									textWrap: 'nowrap',
								}}
							>
								{userName}
							</Typography>
						</Button>
						<IconButton color='primary' onClick={AuthService.LOGOUT}>
							<Logout />
						</IconButton>
					</Stack>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

export default HeaderCustomer
