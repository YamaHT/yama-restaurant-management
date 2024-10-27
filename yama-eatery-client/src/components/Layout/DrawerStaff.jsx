import StatisticsManager from '@/pages/Manager/StatisticsManager/StatisticsManager'
import BookingManagement from '@/pages/Staff/BookingManagement/BookingManagement'
import { AssetImages } from '@/utilities/AssetImages'
import { Event, Leaderboard } from '@mui/icons-material'
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
				pageKey: 'StatisticsStaff',
				page: <StatisticsManager />,
			},
		],
	},
	{
		title: 'Booking',
		items: [
			{
				icon: <Event />,
				label: 'Booking',
				pageKey: 'Booking',
				page: <BookingManagement />,
			},
		],
	},
]

const DrawerStaff = ({ openDrawer, selectedPageKey, handleSelectPage }) => {
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
					Staff
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
							defaultChecked={<StatisticsManager />}
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

export default DrawerStaff
