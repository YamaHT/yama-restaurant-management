import ContactManagement from '@/pages/Manager/ContactManagement/ContactManagement'
import Statistics from '@/pages/Manager/Statistics/Statistics'
import ProductManagement from '@/pages/Manager/ProductManagement/ProductManagement'
import TableManagement from '@/pages/Manager/TableManagement/TableManagemen'
import UserManagement from '@/pages/Manager/UserManagement/UserManagement'
import VoucherManagement from '@/pages/Manager/VoucherManagement/VoucherManagement'
import { AssetImages } from '@/utilities/AssetImages'
import {
	AccessAlarm,
	Category,
	HelpCenter,
	Leaderboard,
	LocalOffer,
	Paid,
	PermContactCalendar,
	Person,
	TableRestaurant,
} from '@mui/icons-material'
import {
	Avatar,
	Button,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Stack,
	Typography,
} from '@mui/material'

const navigations = [
	{
		title: 'Statistics',
		items: [
			{
				icon: <Leaderboard />,
				label: 'Statistics',
				page: <Statistics />,
			},
		],
	},
	{
		title: 'Materials',
		items: [
			{
				icon: <Category />,
				label: 'Product',
				page: <ProductManagement />,
			},
			{
				icon: <TableRestaurant />,
				label: 'Table',
				page: <TableManagement />,
			},
			{
				icon: <LocalOffer />,
				label: 'Voucher',
				page: <VoucherManagement />,
			},
		],
	},
	{
		title: 'Staff',
		items: [
			{
				icon: <AccessAlarm />,
				label: 'Attendance',
				page: <UserManagement />,
			},
			{
				icon: <PermContactCalendar />,
				label: 'Information',
				page: <UserManagement />,
			},
			{
				icon: <Paid />,
				label: 'Salary',
				page: <UserManagement />,
			},
		],
	},
	{
		title: 'User',
		items: [
			{
				icon: <Person />,
				label: 'Info & Membership',
				page: <UserManagement />,
			},
			{
				icon: <HelpCenter />,
				label: 'Contact',
				page: <ContactManagement />,
			},
		],
	},
]

const DrawerManager = ({ openDrawer, handleSelectPage }) => {
	return (
		<Drawer variant='permanent' sx={{ width: openDrawer ? 250 : 0 }}>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
				<Avatar src={AssetImages.SYSTEM_LOGO} sx={{ width: 70, height: 70 }} />
				<Typography variant='h5' fontWeight={'bold'}>
					Yama
				</Typography>
				<Button
					variant='outlined'
					color='error'
					sx={{ py: 0, textTransform: 'none', pointerEvents: 'none' }}
				>
					Manager
				</Button>
			</Stack>
			{navigations.map((nav) => (
				<List
					sx={{ width: 250 }}
					subheader={<ListSubheader sx={{ lineHeight: 3 }}>{nav.title}</ListSubheader>}
				>
					{nav.items.map((item) => (
						<ListItemButton onClick={() => handleSelectPage(item.page)}>
							<ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
							<ListItemText primary={item.label} />
						</ListItemButton>
					))}
				</List>
			))}
		</Drawer>
	)
}

export default DrawerManager
