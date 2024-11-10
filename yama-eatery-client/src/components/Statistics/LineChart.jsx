import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Grid2 } from '@mui/material'
import IncomeAreaChart from './IncomeAreaChart'
import MainCard from './MainCard'

export default function LineChart({ slot, label, data = [] }) {
	const [selectedSlot, setSelectedSlot] = useState(slot || 'month')
	useEffect(() => {}, [data])

	return (
		<>
			<Grid2 container alignItems='center' justifyContent='space-between'>
				<Grid2>
					<Typography variant='h5'>{label}</Typography>
				</Grid2>
				<Grid2>
					<Stack direction='row' alignItems='center' spacing={0}>
						{slot === 'month' && (
							<Button
								size='small'
								onClick={() => setSelectedSlot('month')}
								color={selectedSlot === 'month' ? 'primary' : 'secondary'}
								variant={selectedSlot === 'month' ? 'outlined' : 'text'}
							>
								Month
							</Button>
						)}

						{slot === 'week' && (
							<Button
								size='small'
								onClick={() => setSelectedSlot('week')}
								color={selectedSlot === 'week' ? 'primary' : 'secondary'}
								variant={selectedSlot === 'week' ? 'outlined' : 'text'}
							>
								Week
							</Button>
						)}
					</Stack>
				</Grid2>
			</Grid2>
			<MainCard content={false} sx={{ mt: 1.5 }}>
				<Box sx={{ pt: 1, pr: 2 }}>
					<IncomeAreaChart slot={selectedSlot} label={label} data={data} />
				</Box>
			</MainCard>
		</>
	)
}
