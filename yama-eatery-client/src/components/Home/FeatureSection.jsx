import { GppGood, Groups, LiveHelp } from '@mui/icons-material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Box, Grid2, Stack, Typography } from '@mui/material'

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
		<Stack
			sx={{
				p: 4,
				background: '#FBF8F7',
			}}
			spacing={4}
		>
			<Box textAlign={'center'}>
				<Typography
					variant='h2'
					sx={{
						display: 'inline-block',
						position: 'relative',
						fontWeight: 'bold',
						fontSize: '2rem',
						textTransform: 'uppercase',
						textAlign: 'center',
						color: '#444',
						'&::after': {
							content: '""',
							position: 'absolute',
							width: '70%',
							height: '4px',
							left: 0,
							right: 0,
							bottom: '-8px',
							margin: 'auto',
							backgroundColor: '#EC4899',
							borderRadius: 2,
						},
					}}
				>
					Discover Our Exclusive Features
				</Typography>
			</Box>

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
								userSelect: 'none',
								backgroundColor: 'transparent',
								transition: '0.2s linear, box-shadow 0.3s',
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
		</Stack>
	)
}

export default FeatureSection
