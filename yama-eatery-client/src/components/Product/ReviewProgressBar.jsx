import { Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'

const ReviewProgressBar = (props) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1, color: '#FAAF00' }}>
				<LinearProgress
					sx={{ height: 7, borderRadius: 2 }}
					variant='determinate'
					color='inherit'
					{...props}
				/>
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	)
}

export default ReviewProgressBar
