// material-ui
import AnalyticEcommerce from '@/components/Statistics/AnalyticEcommerce'
import LineChart from '@/components/Statistics/LineChart'
import MainCard from '@/components/Statistics/MainCard'
import RecentBooking from '@/components/Statistics/RecentBooking'
import WeeklyBarChart from '@/components/Statistics/WeeklyBarChart'
import { ManagerStatisticService } from '@/services/ManagerStatisticService'
import { Box, Grid2, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const StatisticsManager = () => {
	const [feedbacks, setFeedbacks] = useState({ count: 0, percentage: 0, extra: 0 })
	const [users, setUsers] = useState({ count: 0, percentage: 0, extra: 0 })
	const [bookings, setBookings] = useState({ count: 0, percentage: 0, extra: 0 })
	const [revenues, setRevenues] = useState({ count: 0, percentage: 0, extra: 0 })

	const [monthlyBooking, setMonthlyBooking] = useState([])
	const [weeklyRevenue, setWeeklyRevenue] = useState({
		total: 0,
		data: [],
	})

	const [recentBookings, setRecentBookings] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const [feedbacks, users, bookings, revenues, monthlyBooking, weeklyRevenue, recentBookings] =
				await Promise.all([
					ManagerStatisticService.GET_TOTAL_FEEDBACKS(),
					ManagerStatisticService.GET_TOTAL_USERS(),
					ManagerStatisticService.GET_TOTAL_BOOKINGS(),
					ManagerStatisticService.GET_TOTAL_REVENUES(),
					ManagerStatisticService.GET_MONTHLY_BOOKINGS(),
					ManagerStatisticService.GET_WEEKLY_REVENUES(),
					ManagerStatisticService.GET_RECENT_BOOKINGS(),
				])
			setFeedbacks(feedbacks)
			setUsers(users)
			setBookings(bookings)
			setRevenues(revenues)
			setMonthlyBooking(monthlyBooking)
			setWeeklyRevenue(weeklyRevenue)
			setRecentBookings(recentBookings)
		}

		fetchData()
	}, [])

	return (
		<Grid2 container rowSpacing={4.5} columnSpacing={2.75}>
			{/* row 1 */}
			<Grid2 size={{ xs: 12 }} sx={{ mb: -2.25 }}>
				<Typography variant='h5'>Dashboard</Typography>
			</Grid2>
			<Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
				<AnalyticEcommerce
					title='Total Feedbacks'
					count={feedbacks?.count}
					percentage={Math.abs(feedbacks?.percentage)}
					extra={feedbacks?.extra}
					isLoss={feedbacks?.percentage < 0}
				/>
			</Grid2>
			<Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
				<AnalyticEcommerce
					title='Total Users Enroll'
					count={users?.count}
					percentage={Math.abs(users?.percentage)}
					extra={users?.extra}
					isLoss={users?.percentage < 0}
				/>
			</Grid2>
			<Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
				<AnalyticEcommerce
					title='Total Bookings'
					count={bookings?.count}
					percentage={Math.abs(bookings?.percentage)}
					extra={bookings?.extra}
					isLoss={bookings?.percentage < 0}
				/>
			</Grid2>
			<Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
				<AnalyticEcommerce
					title='Total Revenues'
					count={`$${revenues?.count}`}
					percentage={Math.abs(revenues?.percentage)}
					extra={`$${revenues?.extra}`}
					isLoss={revenues?.percentage < 0}
				/>
			</Grid2>

			{/* row 2 */}
			<Grid2 size={{ xs: 12, md: 7, lg: 8 }}>
				<LineChart label={'Monthly Bookings'} slot={'month'} data={monthlyBooking} />
			</Grid2>
			<Grid2 size={{ xs: 12, md: 5, lg: 4 }}>
				<Grid2 container alignItems='center' justifyContent='space-between'>
					<Grid2>
						<Typography variant='h5'>Income Overview</Typography>
					</Grid2>
					<Grid2 />
				</Grid2>
				<MainCard sx={{ mt: 2 }} content={false}>
					<Box sx={{ p: 3, pb: 0 }}>
						<Stack spacing={2}>
							<Typography variant='h6' color='text.secondary'>
								This Week Statistics
							</Typography>
							<Typography variant='h3'>${weeklyRevenue?.total}</Typography>
						</Stack>
					</Box>
					<WeeklyBarChart data={weeklyRevenue?.data} />
				</MainCard>
			</Grid2>

			{/* row 3 */}
			<Grid2 size={12}>
				<Grid2 container alignItems='center' justifyContent='space-between'>
					<Grid2>
						<Typography variant='h5'>Recent Orders</Typography>
					</Grid2>
					<Grid2 />
				</Grid2>
				<MainCard sx={{ mt: 2 }} content={false}>
					<RecentBooking bookings={recentBookings} />
				</MainCard>
			</Grid2>
		</Grid2>
	)
}

export default StatisticsManager
