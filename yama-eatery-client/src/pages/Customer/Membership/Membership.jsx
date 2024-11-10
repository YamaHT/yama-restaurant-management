import { UserService } from '@/services/UserService'
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
import { useEffect, useState } from 'react'

const Membership = () => {
	const [membership, setMembership] = useState({
		id: 0,
		membershipStatus: '',
		rank: '',
		memberScore: 0,
	})
	const landmark = [100, 200, 500]

	useEffect(() => {
		const fectchMembershipStatus = async () => {
			const data = await UserService.USER_MEMBERSHIP()
			if (data) {
				setMembership(data)
			}
		}
		fectchMembershipStatus()
	}, [])

	const calculateProgress = (score, landmarks) => {
		for (let i = 0; i < landmarks.length; i++) {
			if (score < landmarks[i]) {
				const previousLandmark = i === 0 ? 0 : landmarks[i - 1]
				const progress = ((score - previousLandmark) / (landmarks[i] - previousLandmark)) * 100
				return { nextLandmark: landmarks[i], progress: progress.toFixed(2) }
			}
		}
		return { nextLandmark: landmarks[landmarks.length - 1], progress: 100 }
	}

	const handleCancelMembership = async () => {
		const data = await UserService.CANCEL_MEMBERSHIP()
		if (data) {
			setMembership(data)
		}
	}

	const handleMembershipRegister = async () => {
		const data = await UserService.REGISTER_MEMBERSHIP()
		if (data) {
			setMembership(data)
		}
	}

	const getTierStatus = (score, tierLandmark) => {
		return score >= tierLandmark ? 'Reached' : 'On Going'
	}

	const { nextLandmark, progress } = calculateProgress(membership.memberScore, landmark)

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
						Membership Points ({membership.memberScore}/{nextLandmark})
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
				<Grid2>
					<Card
						variant='outlined'
						sx={{
							borderRadius: 3,
							boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
						}}
					>
						<CardContent
							sx={{
								pt: 5,
								height: '300px',
								width: '270px',
								backgroundImage:
									'url(https://th.bing.com/th?id=OIP.0USMIJfUmVmCPt98Te3rkAHaJ5&w=216&h=289&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2)',
							}}
						>
							<Typography variant='h5' fontWeight='bold' color='gray'>
								Silver
							</Typography>
							<ul style={{ textAlign: 'left', padding: '10px', fontSize: 13 }}>
								<li>Access to exclusive discounts on select products</li>
								<li>Priority customer support</li>
								<li>Get sale on booking</li>
								<li>Access to members-only events and promotions</li>
							</ul>
							<Button
								variant='contained'
								color={
									getTierStatus(membership.memberScore, 100) === 'Reached' ? 'success' : 'primary'
								}
								disableElevation
								disableTouchRipple
								sx={{ marginTop: '30px', pointerEvents: 'none' }}
							>
								{getTierStatus(membership.memberScore, 100)}
							</Button>
						</CardContent>
					</Card>
				</Grid2>
				<Grid2>
					<Card
						variant='outlined'
						sx={{
							borderRadius: 3,
							boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
						}}
					>
						<CardContent
							sx={{
								pt: 5,
								height: '300px',
								width: '270px',
								backgroundImage: 'url(https://www.backgroundsy.com/file/gold-background.jpg)',
							}}
						>
							<Typography variant='h5' fontWeight='bold'>
								Gold
							</Typography>
							<ul style={{ textAlign: 'left', padding: '10px', fontSize: 13 }}>
								<li>All Silver tier benefits</li>
								<li>Higher discount rates on a wider range of products</li>
								<li>Early access to new product launches</li>
								<li>Personalized shopping assistance</li>
							</ul>
							<Button
								variant='contained'
								color={
									getTierStatus(membership.memberScore, 200) === 'Reached' ? 'success' : 'primary'
								}
								disableElevation
								disableTouchRipple
								sx={{ marginTop: '30px', pointerEvents: 'none' }}
							>
								{getTierStatus(membership.memberScore, 200)}
							</Button>
						</CardContent>
					</Card>
				</Grid2>
				<Grid2>
					<Card
						variant='outlined'
						sx={{
							borderRadius: 3,
							boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3 )',
						}}
					>
						<CardContent
							sx={{
								pt: 5,
								height: '300px',
								width: '270px',
								backgroundImage:
									'url(https://t4.ftcdn.net/jpg/03/78/38/01/360_F_378380115_CHfN9nXkCa2Hnmzu6HhPbIAr6mb3U12W.jpg)',
							}}
						>
							<Typography variant='h5' fontWeight='bold' color='white '>
								Platinum
							</Typography>
							<ul style={{ textAlign: 'left', padding: '10px', color: 'white', fontSize: 13 }}>
								<li>All Gold tier benefits</li>
								<li>Free shipping on all orders</li>
								<li>Exclusive invitations to VIP events and experiences</li>
								<li>Complimentary gift wrapping and special occasions discounts</li>
							</ul>
							<Button
								variant='contained'
								color={
									getTierStatus(membership.memberScore, 500) === 'Reached' ? 'success' : 'primary'
								}
								disableElevation
								disableTouchRipple
								sx={{ marginTop: '30px', pointerEvents: 'none' }}
							>
								{getTierStatus(membership.memberScore, 500)}
							</Button>
						</CardContent>
					</Card>
				</Grid2>
			</Grid2>

			{membership.membershipStatus === 'Inactive' ? (
				<Button
					fullWidth
					variant='contained'
					style={{
						background: 'green',
						textTransform: 'capitalize',
						marginTop: '20px',
					}}
					onClick={handleMembershipRegister}
				>
					Membership Register
				</Button>
			) : membership.membershipStatus === 'Active' ? (
				<Button
					fullWidth
					variant='contained'
					style={{
						background: '#d50000',
						textTransform: 'capitalize',
						marginTop: '20px',
					}}
					onClick={handleCancelMembership}
				>
					Cancel Membership Register
				</Button>
			) : membership.membershipStatus === 'Requesting' ? (
				<Button
					disabled
					fullWidth
					variant='contained'
					style={{
						textTransform: 'capitalize',
						marginTop: '20px',
					}}
				>
					Membership is requesting
				</Button>
			) : null}
		</Paper>
	)
}
export default Membership
