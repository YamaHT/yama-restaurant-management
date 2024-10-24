import ContactManagement from '@/pages/Manager/ContactManagement/ContactManagement'
import Statistics from '@/pages/Manager/Statistics/Statistics'
import ProductManagement from '@/pages/Manager/ProductManagement/ProductManagement'
import TableManagement from '@/pages/Manager/TableManagement/TableManagement'
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
import StaffAttendanceManagement from '@/pages/Manager/StaffAttendanceManagement/StaffAttendanceManagement'
import StaffInformationManagement from '@/pages/Manager/StaffInformationManagement/StaffInformationManagement'
import StaffSalaryManagement from '@/pages/Manager/StaffSalaryManagement/StaffSalaryManagement'

const navigations = [
	{
		title: 'Statistics',
		items: [
			{
				icon: <Leaderboard />,
				label: 'Statistics',
				pageKey: 'Statistics',
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
				pageKey: 'Product',
				page: <ProductManagement />,
			},
			{
				icon: <TableRestaurant />,
				label: 'Table',
				pageKey: 'Table',
				page: <TableManagement />,
			},
			{
				icon: <LocalOffer />,
				label: 'Voucher',
				pageKey: 'Voucher',
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
				pageKey: 'Attendance',
				page: <StaffAttendanceManagement />,
			},
			{
				icon: <PermContactCalendar />,
				label: 'Information',
				pageKey: 'Information',
				page: <StaffInformationManagement />,
			},
			{
				icon: <Paid />,
				label: 'Salary',
				pageKey: 'Salary',
				page: <StaffSalaryManagement />,
			},
		],
	},
	{
		title: 'User',
		items: [
			{
				icon: <Person />,
				label: 'Info & Membership',
				pageKey: 'InfoMembership',
				page: <UserManagement />,
			},
			{
				icon: <HelpCenter />,
				label: 'Contact',
				pageKey: 'Contact',
				page: <ContactManagement />,
			},
		],
	},
]

const DrawerManager = ({ openDrawer, selectedPageKey, handleSelectPage }) => {
	return (
		<Drawer
			variant='persistent'
			open={openDrawer}
			sx={{ width: openDrawer ? 250 : 0, transition: '0.3s linear' }}
		>
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
						<ListItemButton
							key={item.pageKey}
							selected={selectedPageKey === item.pageKey}
							defaultChecked={<Statistics />}
							onClick={() => handleSelectPage(item)}
							sx={{
								'&:hover': {
									bgcolor: '#9cf4',
								},
								'&.Mui-selected': {
									bgcolor: '#9cf4',
									borderRight: `2px solid transparent`,
									borderColor: 'primary.light',
									color: 'primary.main',
									'&:hover': {
										color: 'primary.main',
										bgcolor: '#9cf4',
									},
								},
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 40,
									color: selectedPageKey === item.pageKey ? 'primary.main' : 'inherit',
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.label} />
						</ListItemButton>
					))}
				</List>
			))}
		</Drawer>
	)
}

export default DrawerManager
