// material-ui
import LineChart from '@/components/Statistics/LineChart'
import MainCard from '@/components/Statistics/MainCard'
import WeeklyBarChart from '@/components/Statistics/WeeklyBarChart'
import { StaffStatisticService } from '@/services/StaffStatisticService'
import { Box, Grid2, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const StatisticsStaff = () => {
	const [weeklyServings, setWeeklyServings] = useState([])
	const [weeklyRevenues, setWeeklyRevenues] = useState({
		total: 0,
		data: [],
	})

	useEffect(() => {
		const fetchData = async () => {
			const [weeklyServings, weeklyRevenues] = await Promise.all([
				StaffStatisticService.GET_WEEKLY_BOOKING_SERVING(),
				StaffStatisticService.GET_WEEKLY_REVENUES(),
			])

			setWeeklyServings(weeklyServings)
			setWeeklyRevenues(weeklyRevenues)
		}

		fetchData()
	}, [])

	return (
		<Grid2 container rowSpacing={4.5} columnSpacing={2.75}>
			<Grid2 size={{ xs: 12, md: 7, lg: 8 }}>
				<LineChart label={'Weekly Booking Servings'} slot={'week'} data={weeklyServings} />
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
							<Typography variant='h3'>${weeklyRevenues?.total}</Typography>
						</Stack>
					</Box>
					<WeeklyBarChart data={weeklyRevenues?.data} />
				</MainCard>
			</Grid2>
		</Grid2>
	)
}

export default StatisticsStaff
