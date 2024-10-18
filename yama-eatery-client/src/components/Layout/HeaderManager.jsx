import { Logout, MenuSharp } from '@mui/icons-material'
import {
	Avatar,
	ButtonBase,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const HeaderManager = ({ handleOpenDrawer }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const navigate = useNavigate()

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		secureLocalStorage.removeItem('role')

		const event = new Event('roleChange')
		window.dispatchEvent(event)

		navigate('/')
	}

	return (
		<AppBar
			position='sticky'
			color='inherit'
			elevation={0}
			sx={{ borderBottom: '1px solid #4445' }}
		>
			<Toolbar>
				<IconButton edge={'start'} onClick={handleOpenDrawer}>
					<MenuSharp />
				</IconButton>
				<Typography variant='h6' sx={{ flexGrow: 1, textTransform: 'capitalize' }}>
					Manager Management
				</Typography>
				<ButtonBase
					onClick={handleClick}
					sx={{
						p: 0.25,
						bgcolor: 'transparent',
						borderRadius: 1,
						'&:hover': { bgcolor: '#AAA4' },
					}}
				>
					<Stack direction={'row'} flexGrow={1} spacing={1.25} alignItems='center' sx={{ p: 0.5 }}>
						<Avatar sx={{ fontSize: '0.875rem', width: 32, height: 32 }} />
						<Typography fontWeight={550} variant='body1' sx={{ textTransform: 'capitalize' }}>
							Le Phuoc Duy
						</Typography>
					</Stack>
				</ButtonBase>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					slotProps={{
						paper: { sx: { minWidth: 200 } },
					}}
					MenuListProps={{ sx: { p: 0 } }}
				>
					<MenuItem onClick={handleLogout} sx={{ py: 2 }}>
						<ListItemIcon>
							<Logout fontSize='small' />
						</ListItemIcon>
						<ListItemText>Logout</ListItemText>
					</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	)
}

export default HeaderManager
