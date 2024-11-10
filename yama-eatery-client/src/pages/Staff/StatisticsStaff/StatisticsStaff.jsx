// material-ui
import LineChart from '@/components/Statistics/LineChart'
import MainCard from '@/components/Statistics/MainCard'
import WeeklyBarChart from '@/components/Statistics/WeeklyBarChart'
import { Box, Grid2, Stack, Typography } from '@mui/material'

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

const StatisticsStaff = () => {
	return (
		<Grid2 container rowSpacing={4.5} columnSpacing={2.75}>
			<Grid2 size={{ xs: 12, md: 7, lg: 8 }}>
				<LineChart label={'Weekly Booking Servings'} slot={'week'} data={[1, 2, 3, 4, 5, 6, 7]} />
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
							<Typography variant='h3'>$7,650</Typography>
						</Stack>
					</Box>
					<WeeklyBarChart data={[1, 2, 3, 4, 5, 6, 7]} />
				</MainCard>
			</Grid2>
		</Grid2>
	)
}

export default StatisticsStaff
