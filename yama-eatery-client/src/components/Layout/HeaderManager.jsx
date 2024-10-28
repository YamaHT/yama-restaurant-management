import { AuthService } from '@/services/AuthService'
import { EmployeeService } from '@/services/EmployeeService'
import { AssetImages } from '@/utilities/AssetImages'
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
import { useEffect } from 'react'
import { useState } from 'react'

const HeaderManager = ({ handleOpenDrawer }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [employeeProfile, setEmployeeProfile] = useState({})
	const open = Boolean(anchorEl)

	useEffect(() => {
		const fetchProfile = async () => {
			const data = await EmployeeService.GET_PROFILE()
			if (data) {
				setEmployeeProfile(data)
			}
		}

		fetchProfile()
	}, [])

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
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
						<Avatar
							src={AssetImages.EmployeeImage(employeeProfile.image)}
							sx={{ fontSize: '0.875rem', width: 32, height: 32 }}
						/>
						<Typography fontWeight={550} variant='body1' sx={{ textTransform: 'capitalize' }}>
							{employeeProfile.name}
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
					<MenuItem onClick={AuthService.LOGOUT} sx={{ py: 2 }}>
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
