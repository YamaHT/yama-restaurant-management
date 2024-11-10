import PropTypes from 'prop-types'
import { Chip, Grid, Stack, Typography, Box } from '@mui/material'
import MainCard from './MainCard'
import { TrendingDownSharp, TrendingUpSharp } from '@mui/icons-material'

const iconSX = {
	fontSize: '0.75rem',
	color: 'inherit',
	marginLeft: 0,
	marginRight: 0,
}

export default function AnalyticEcommerce({ title, count, percentage, isLoss, extra }) {
	return (
		<MainCard contentSX={{ p: 2.25 }}>
			<Stack spacing={0.5}>
				<Typography variant='h6' color='text.secondary'>
					{title}
				</Typography>
				<Grid container alignItems='center'>
					<Grid item>
						<Typography variant='h4' color='inherit'>
							{count}
						</Typography>
					</Grid>
					<Grid item>
						<Chip
							variant='filled'
							color={isLoss ? 'warning' : 'primary'}
							icon={
								isLoss ? <TrendingDownSharp style={iconSX} /> : <TrendingUpSharp style={iconSX} />
							}
							label={`${percentage}%`}
							sx={{ ml: 1.25, pl: 1 }}
							size='small'
						/>
					</Grid>
				</Grid>
			</Stack>
			<Box sx={{ pt: 2.25 }}>
				<Typography variant='caption' color='text.secondary'>
					You made an extra{' '}
					<Typography variant='caption' sx={{ color: isLoss ? 'warning.main' : 'primary.main' }}>
						{extra}
					</Typography>{' '}
					this month
				</Typography>
			</Box>
		</MainCard>
	)
}

AnalyticEcommerce.propTypes = {
	color: PropTypes.string,
	title: PropTypes.string,
	count: PropTypes.string,
	percentage: PropTypes.number,
	isLoss: PropTypes.bool,
	extra: PropTypes.string,
}
