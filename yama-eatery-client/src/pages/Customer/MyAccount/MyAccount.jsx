import { Bookmarks, Event, Forum, LocalOffer, LockReset, Person } from '@mui/icons-material'
import {
	Grid2,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Paper,
} from '@mui/material'
import { useState } from 'react'
import HistoryBooking from '../HistoryBooking/HistoryBooking'
import HistoryFeedback from '../HistoryFeedback/HistoryFeedback'
import Membership from '../Membership/Membership'
import MyVoucher from '../MyVoucher/MyVoucher'
import Profile from '../Profile/Profile'
import ChangePassword from '../ChangePassword/ChangePassword'

const accountPages = [
	{
		icon: <Person />,
		label: 'Profile',
		page: <Profile />,
	},
	{
		icon: <Forum />,
		label: 'History Feedback',
		page: <HistoryFeedback />,
	},
	{
		icon: <Event />,
		label: 'History Booking',
		page: <HistoryBooking />,
	},

	{
		icon: <Bookmarks />,
		label: 'Membership',
		page: <Membership />,
	},
	{
		icon: <LocalOffer />,
		label: 'My Voucher',
		page: <MyVoucher />,
	},
	{
		icon: <LockReset />,
		label: 'Change Password',
		page: <ChangePassword />,
	},
]

const MyAccount = () => {
	const [selectPage, setSelectPage] = useState(accountPages[0])

	return (
		<Grid2 container p={'2% 5%'} spacing={3}>
			<Grid2 size={3}>
				<Paper sx={{ p: '5% 0', mt: '10%' }}>
					<List subheader={<ListSubheader>Account Setting</ListSubheader>}>
						{accountPages.map((accountPage) => (
							<ListItemButton
								key={accountPage}
								sx={
									accountPage === selectPage
										? {
												borderLeft: '5px solid royalblue',
												bgcolor: '#9cf4',
												color: 'royalblue',
												':hover': {},
										  }
										: { borderLeft: '5px solid transparent', bgcolor: 'transparent' }
								}
								onClick={() => setSelectPage(accountPage)}
							>
								<ListItemIcon
									sx={{
										color: accountPage === selectPage ? 'royalblue' : 'inherit',
									}}
								>
									{accountPage.icon}
								</ListItemIcon>
								<ListItemText primary={accountPage.label} />
							</ListItemButton>
						))}
					</List>
				</Paper>
			</Grid2>
			<Grid2 size={9}>{selectPage.page}</Grid2>
		</Grid2>
	)
}

export default MyAccount
