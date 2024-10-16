import {
	Box,
	Button,
	Card,
	CardContent,
	Grid2,
	LinearProgress,
	Paper,
	Stack,
	Typography,
} from '@mui/material'

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
				minHeight: '80vh',
				borderRadius: 4,
				padding: '2%',
				boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
			}}
		>
			<Typography variant='h4' fontWeight='bold' gutterBottom>
				MEMBERSHIP
			</Typography>
			<Typography variant='body1' gutterBottom align='left' fontFamily={'sans-serif'}>
				Membership not only offers attractive privileges such as exclusive offers, special
				discounts, and regular gifts, but also helps you enhance your shopping experience. As a
				member, you will always be prioritized in promotions, have early access to new products, and
				receive dedicated care from the customer support team.
			</Typography>
			<Box sx={{ marginY: 5, width: '100%' }}>
				<Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
					<Typography variant='body1' fontWeight={'bold'}>
						Membership Point ($500/2000)
					</Typography>
					<Typography variant='body1'>{progress}%</Typography>
				</Stack>
				<LinearProgress
					variant='determinate'
					value={progress}
					sx={{ height: 10, borderRadius: 1, marginY: 1 }}
				/>
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
						<CardContent
							sx={{
								p: 3,
								pt: 5,
								height: '270px',
								backgroundImage:
									'url(https://th.bing.com/th?id=OIP.0USMIJfUmVmCPt98Te3rkAHaJ5&w=216&h=289&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2)',
							}}
						>
							<Typography variant='h5' fontWeight='bold' color='gray'>
								Silver
							</Typography>
							<ul style={{ textAlign: 'left', padding: '10px' }}>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>and more</li>
							</ul>
							<Button
								variant='contained'
								color='success'
								disableElevation
								disableRipple
								disableFocusRipple
								disableTouchRipple
								sx={{ marginTop: '30px' }}
							>
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
						<CardContent
							sx={{
								p: 3,
								pt: 5,
								height: '270px',
								backgroundImage: 'url(https://www.backgroundsy.com/file/gold-background.jpg)',
							}}
						>
							<Typography variant='h5' fontWeight='bold'>
								Gold
							</Typography>
							<ul style={{ textAlign: 'left', padding: '10px' }}>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>and more</li>
							</ul>
							<Button
								variant='contained'
								color='primary'
								disableElevation
								disableRipple
								disableFocusRipple
								disableTouchRipple
								sx={{ marginTop: '30px' }}
							>
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
						<CardContent
							sx={{
								p: 3,
								pt: 5,
								height: '270px',
								backgroundImage:
									'url(https://t4.ftcdn.net/jpg/03/78/38/01/360_F_378380115_CHfN9nXkCa2Hnmzu6HhPbIAr6mb3U12W.jpg)',
							}}
						>
							<Typography variant='h5' fontWeight='bold' color='white '>
								Platinum
							</Typography>
							<ul style={{ textAlign: 'left', padding: '10px', color: 'white ' }}>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>Feature text goes here</li>
								<li>and more</li>
							</ul>
							<Button
								variant='contained'
								color='primary'
								disableElevation
								disableRipple
								disableFocusRipple
								disableTouchRipple
								sx={{ marginTop: '30px' }}
							>
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
