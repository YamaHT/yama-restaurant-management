import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import {
	AppBar,
	Avatar,
	Box,
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
					<Avatar onClick={() => navigate('/')} sx={{ cursor: 'pointer', width: 60, height: 60 }} />
					<Stack direction={'row'} spacing={5} alignItems={'center'}>
						{menuItems.map((item) => (
							<Typography
								key={item.value}
								variant='h6'
								fontWeight={'600'}
								onClick={() => navigate(item.link)}
								onMouseEnter={item.childrens ? () => setOpenMore(true) : null}
								onMouseLeave={item.childrens ? () => setOpenMore(false) : null}
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
								{item.childrens && (
									<>
										{!openMore ? <ArrowDropDown /> : <ArrowDropUp />}
										<Collapse unmountOnExit in={openMore}>
											<List
												component={Paper}
												disablePadding
												sx={{ position: 'absolute', width: 'max-content' }}
											>
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
						))}
					</Stack>
					<Button variant='contained' sx={{ gap: 2, alignItems: 'center' }}>
						<Avatar sx={{ width: 30, height: 30 }} />
						<Typography>Le Duy</Typography>
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	)
}

export default HeaderCustomer
