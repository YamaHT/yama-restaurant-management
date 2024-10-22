import MoreHoriz from '@mui/icons-material/MoreHoriz'
import { IconButton, Menu } from '@mui/material'
import React from 'react'

const CrudMenuOptions = ({ children }) => {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<IconButton onClick={handleClick}>
				<MoreHoriz />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'& .MuiMenuItem-root': {
								transition: 'none',
								'&:hover': { backgroundColor: 'white' },
								'&:focus': { backgroundColor: 'white' },
								'& .MuiTouchRipple-root': { display: 'none', cursor: 'pointer' },
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{children}
			</Menu>
		</>
	)
}

export default CrudMenuOptions
