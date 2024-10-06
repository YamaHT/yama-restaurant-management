import { GppGood, Groups, LiveHelp } from '@mui/icons-material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Box, Grid2, Typography } from '@mui/material'

const features = [
	{
		icon: <Groups fontSize='large' />,
		title: 'Communication',
		description: 'Tailor our product to suit your needs Seamless communication for your team.',
	},
	{
		icon: <GppGood fontSize='large' />,
		title: 'Security',
		description: 'Your data is protected by the latest security measures.',
	},
	{
		icon: <LiveHelp fontSize='large' />,
		title: 'Support',
		description:
			'Tailor our product to suit your needs 24/7 customer support for all your inquiries.',
	},
]

const FeatureSection = () => {
	return (
		<Box sx={{ flexGrow: 1, p: 4 }}>
			<Typography variant='h4' textAlign={'center'} fontWeight={'bold'}>
				Discover Our Exclusive Features
			</Typography>
			<Grid2 container spacing={4}>
				{features.map((feature, index) => (
					<Grid2 item size={{ xs: 12, md: 4 }} key={index}>
						<Box
							elevation={3}
							sx={{
								p: 4,
								textAlign: 'center',
								height: '100%',
								borderRadius: 1.5,
								backgroundColor: 'transparent',
								transition: 'transform 0.3s, box-shadow 0.3s',
								'&:hover': {
									boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
									backgroundColor: '#fff',
									color: '#6A1B9A',
								},
							}}
						>
							{feature.icon}
							<Typography variant='h6' gutterBottom>
								{feature.title}
							</Typography>
							<Typography variant='body2'>{feature.description}</Typography>
						</Box>
					</Grid2>
				))}
			</Grid2>
		</Box>
	)
}

export default FeatureSection
