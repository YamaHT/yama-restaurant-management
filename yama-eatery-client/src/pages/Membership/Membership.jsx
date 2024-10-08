import React from 'react'
import { Box, Typography, Button, LinearProgress, Grid2, Card, CardContent, Chip, Paper, Stack } from '@mui/material'

const Membership = () => {
	const progress = 50 

	return (
		<Paper
			width={'100%'}
			sx={{
				
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				minHeight: '100vh', 
				borderRadius: 4,
				padding: '2%',
				margin: '2%',
				boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
			}}
		>
			<Typography variant='h4' fontWeight='bold' gutterBottom>
				Membership Progress
			</Typography>
			<Typography variant='body1' gutterBottom>
				Keep shopping to unlock more rewards and exclusive benefits as you progress through the membership ranks.
			</Typography>
			<Box sx={{ marginY: 2, width: '100%' }}>
				<Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
					<Typography variant='body1'>Money spent ($500/2000)</Typography>
					<Typography variant='body1'>{progress}%</Typography>
				</Stack>

				<LinearProgress variant='determinate' value={progress} sx={{ height: 10, borderRadius: 1, marginY: 1 }} />
			</Box>
			<Grid2 container spacing={3} justifyContent='center'>
				<Grid2 item xs={12} sm={4}>
					<Card
						variant='outlined'
						sx={{
							borderRadius: 3,
							boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', 
							transition: 'transform 0.2s',
							'&:hover': {
								transform: 'scale(1.05)',
							},
						}}
					>
						<CardContent sx={{backgroundImage:'url(https://th.bing.com/th?id=OIP.0USMIJfUmVmCPt98Te3rkAHaJ5&w=216&h=289&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2)'}}>
							<Typography variant='h6' fontWeight='bold'>
								Rank 1
							</Typography>
							<Typography variant='h5' fontWeight='bold' color='gray'>
								Silver
							</Typography>
							<ul style={{ textAlign: 'left', padding: '10px' }}>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>and more</li>
							</ul>
							<Button variant='contained' color='success' disableElevation disableRipple disableFocusRipple disableTouchRipple>
								Reached
							</Button>
						</CardContent>
					</Card>
				</Grid2>
				<Grid2 item xs={12} sm={4}>
					<Card
						variant='outlined'
						sx={{
							borderRadius: 3,
							boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
							transition: 'transform 0.2s',
							'&:hover': {
								transform: 'scale(1.05)',
							},
						}}
					>
						<CardContent  sx={{ backgroundImage:'url(https://th.bing.com/th?id=OIP.kqtTXgDakdM-fN6yBcejDgHaG1&w=260&h=240&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2)'}}>
							<Typography variant='h6' fontWeight='bold'>
								Rank 2
							</Typography>
							<Typography variant='h5' fontWeight='bold' color='white'>
								Gold
							</Typography>
							<ul style={{ textAlign: 'left', padding: '10px' }}>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>and more</li>
							</ul>
							<Button variant='contained' color='primary' disableElevation disableRipple disableFocusRipple disableTouchRipple>
								On Going
							</Button>
						</CardContent>
					</Card>
				</Grid2>
				<Grid2 item xs={12} sm={4}>
					<Card
						variant='outlined'
						sx={{
							borderRadius: 3,
							boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3 )',
							transition: 'transform 0.2s',
							'&:hover': {
								transform: 'scale(1.05)',
							},
						}}
					>
						<CardContent sx={{backgroundImage:'url(https://i.ytimg.com/vi/klePi2Askzg/maxresdefault.jpg)'}}>
							<Typography variant='h6' fontWeight='bold'>
								Rank 3
							</Typography>
							<Typography variant='h5' fontWeight='bold' color='white'>
								Platinum
							</Typography>
							<ul style={{ textAlign: 'left', padding: '10px' }}>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>and more</li>
							</ul>
							<Button variant='contained' color='primary' disableElevation disableRipple disableFocusRipple disableTouchRipple>
								On Going
							</Button>
						</CardContent>
					</Card>
				</Grid2>
			</Grid2>
			<Button variant='contained' color='error' sx={{ marginTop: 3 }}>
				Cancel membership registration
			</Button>
		</Paper>
	)
}
export default Membership
