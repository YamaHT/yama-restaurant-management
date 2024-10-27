// material-ui
import AnalyticEcommerce from '@/components/Statistics/AnalyticEcommerce'
import MainCard from '@/components/Statistics/MainCard'
import MonthlyBarChart from '@/components/Statistics/MonthlyBarChart'
import OrdersTable from '@/components/Statistics/OrdersTable'
import ReportAreaChart from '@/components/Statistics/ReportAreaChart'
import SaleReportCard from '@/components/Statistics/SaleReportCard'
import UniqueVisitorCard from '@/components/Statistics/UniqueVisitorCard'
import { CardGiftcardOutlined, MessageOutlined, SettingsOutlined } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Grid,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemSecondaryAction,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material'

const avatarSX = {
	width: 36,
	height: 36,
	fontSize: '1rem',
}

const actionSX = {
	mt: 0.75,
	ml: 1,
	top: 'auto',
	right: 'auto',
	alignSelf: 'flex-start',
	transform: 'none',
}

const StatisticsManager = () => {
	return (
		<Grid container rowSpacing={4.5} columnSpacing={2.75}>
			{/* row 1 */}
			<Grid item xs={12} sx={{ mb: -2.25 }}>
				<Typography variant='h5'>Dashboard</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<AnalyticEcommerce
					title='Total Page Views'
					count='4,42,236'
					percentage={59.3}
					extra='35,000'
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<AnalyticEcommerce title='Total Users' count='78,250' percentage={70.5} extra='8,900' />
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<AnalyticEcommerce
					title='Total Order'
					count='18,800'
					percentage={27.4}
					isLoss
					color='warning'
					extra='1,943'
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<AnalyticEcommerce
					title='Total Sales'
					count='$35,078'
					percentage={27.4}
					isLoss
					color='warning'
					extra='$20,395'
				/>
			</Grid>

			{/* row 2 */}
			<Grid item xs={12} md={7} lg={8}>
				<UniqueVisitorCard />
			</Grid>
			<Grid item xs={12} md={5} lg={4}>
				<Grid container alignItems='center' justifyContent='space-between'>
					<Grid item>
						<Typography variant='h5'>Income Overview</Typography>
					</Grid>
					<Grid item />
				</Grid>
				<MainCard sx={{ mt: 2 }} content={false}>
					<Box sx={{ p: 3, pb: 0 }}>
						<Stack spacing={2}>
							<Typography variant='h6' color='text.secondary'>
								This Week Statistics
							</Typography>
							<Typography variant='h3'>$7,650</Typography>
						</Stack>
					</Box>
					<MonthlyBarChart />
				</MainCard>
			</Grid>

			{/* row 3 */}
			<Grid item xs={12} md={7} lg={8}>
				<Grid container alignItems='center' justifyContent='space-between'>
					<Grid item>
						<Typography variant='h5'>Recent Orders</Typography>
					</Grid>
					<Grid item />
				</Grid>
				<MainCard sx={{ mt: 2 }} content={false}>
					<OrdersTable />
				</MainCard>
			</Grid>
			<Grid item xs={12} md={5} lg={4}>
				<Grid container alignItems='center' justifyContent='space-between'>
					<Grid item>
						<Typography variant='h5'>Analytics Report</Typography>
					</Grid>
					<Grid item />
				</Grid>
				<MainCard sx={{ mt: 2 }} content={false}>
					<List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
						<ListItemButton divider>
							<ListItemText primary='Company Finance Growth' />
							<Typography variant='h5'>+45.14%</Typography>
						</ListItemButton>
						<ListItemButton divider>
							<ListItemText primary='Company Expenses Ratio' />
							<Typography variant='h5'>0.58%</Typography>
						</ListItemButton>
						<ListItemButton>
							<ListItemText primary='Business Risk Cases' />
							<Typography variant='h5'>Low</Typography>
						</ListItemButton>
					</List>
					<ReportAreaChart />
				</MainCard>
			</Grid>

			{/* row 4 */}
			<Grid item xs={12} md={7} lg={8}>
				<SaleReportCard />
			</Grid>
			<Grid item xs={12} md={5} lg={4}>
				<Grid container alignItems='center' justifyContent='space-between'>
					<Grid item>
						<Typography variant='h5'>Transaction History</Typography>
					</Grid>
					<Grid item />
				</Grid>
				<MainCard sx={{ mt: 2 }} content={false}>
					<List
						component='nav'
						sx={{
							px: 0,
							py: 0,
							'& .MuiListItemButton-root': {
								py: 1.5,
								'& .MuiAvatar-root': avatarSX,
								'& .MuiListItemSecondaryAction-root': {
									...actionSX,
									position: 'relative',
								},
							},
						}}
					>
						<ListItemButton divider>
							<ListItemAvatar>
								<Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
									<CardGiftcardOutlined />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={<Typography variant='subtitle1'>Order #002434</Typography>}
								secondary='Today, 2:00 AM'
							/>
							<ListItemSecondaryAction>
								<Stack alignItems='flex-end'>
									<Typography variant='subtitle1' noWrap>
										+ $1,430
									</Typography>
									<Typography variant='h6' color='secondary' noWrap>
										78%
									</Typography>
								</Stack>
							</ListItemSecondaryAction>
						</ListItemButton>
						<ListItemButton divider>
							<ListItemAvatar>
								<Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
									<MessageOutlined />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={<Typography variant='subtitle1'>Order #984947</Typography>}
								secondary='5 August, 1:45 PM'
							/>
							<ListItemSecondaryAction>
								<Stack alignItems='flex-end'>
									<Typography variant='subtitle1' noWrap>
										+ $302
									</Typography>
									<Typography variant='h6' color='secondary' noWrap>
										8%
									</Typography>
								</Stack>
							</ListItemSecondaryAction>
						</ListItemButton>
						<ListItemButton>
							<ListItemAvatar>
								<Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
									<SettingsOutlined />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={<Typography variant='subtitle1'>Order #988784</Typography>}
								secondary='7 hours ago'
							/>
							<ListItemSecondaryAction>
								<Stack alignItems='flex-end'>
									<Typography variant='subtitle1' noWrap>
										+ $682
									</Typography>
									<Typography variant='h6' color='secondary' noWrap>
										16%
									</Typography>
								</Stack>
							</ListItemSecondaryAction>
						</ListItemButton>
					</List>
				</MainCard>
			</Grid>
		</Grid>
	)
}

export default StatisticsManager
