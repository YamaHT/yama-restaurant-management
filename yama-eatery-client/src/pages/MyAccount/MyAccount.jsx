import { AssetImages } from '@/utilities/AssetImages'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { Bookmarks, Event, Forum, LocalOffer, LockReset, Person } from '@mui/icons-material'
import {
	Avatar,
	Divider,
	Grid2,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Paper,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import HistoryFeedback from '../HistoryFeedback/HistoryFeedback'
import HistoryBooking from '../HistoryBooking/HistoryBooking'
import Membership from '../Membership/Membership'
import MyVoucher from '../MyVoucher/MyVoucher'
import ChangePassword from '../ChangePassword/ChangePassword'
import Profile from './Profile/Profile'

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
				<Paper sx={{ p: '5%', mt: '10%' }}>
					<List subheader={<ListSubheader>Account Setting</ListSubheader>}>
						{accountPages.map((accountPage) => (
							<ListItemButton key={accountPage} onClick={() => setSelectPage(accountPage)}>
								<ListItemIcon>{accountPage.icon}</ListItemIcon>
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
