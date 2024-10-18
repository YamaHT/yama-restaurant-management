import { useState } from 'react'

// material-ui
import { Grid, MenuItem, TextField, Typography } from '@mui/material'

// project import
import SalesChart from './SalesChart'

// sales report status
const status = [
	{
		value: 'today',
		label: 'Today',
	},
	{
		value: 'month',
		label: 'This Month',
	},
	{
		value: 'year',
		label: 'This Year',
	},
]

// ==============================|| DEFAULT - SALES REPORT ||============================== //

export default function SaleReportCard() {
	const [value, setValue] = useState('today')

	return (
		<>
			<Grid container alignItems='center' justifyContent='space-between'>
				<Grid item>
					<Typography variant='h5'>Sales Report</Typography>
				</Grid>
				<Grid item>
					<TextField
						id='standard-select-currency'
						size='small'
						select
						value={value}
						onChange={(e) => setValue(e.target.value)}
						sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem' } }}
					>
						{status.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
			</Grid>
			<SalesChart />
		</>
	)
}
