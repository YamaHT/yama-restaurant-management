import { AssetImages } from '@/utilities/AssetImages'
import { Avatar, Box, Stack, Typography } from '@mui/material'

const HeroSection = () => {
	return (
		<Box position={'relative'} width={'100%'} height={400}>
			<Avatar
				variant='square'
				src={AssetImages.BACKGROUND.HOME_HERO}
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					inset: 0,
					backgroundColor: 'black',
					opacity: 0.6,
					zIndex: 1,
				}}
			/>
			<Stack
				position={'absolute'}
				zIndex={2}
				width={'max-content'}
				gap={2}
				textAlign={'center'}
				sx={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
			>
				<Typography
					variant='h2'
					sx={{
						color: 'white',
						fontWeight: 'bold',
						fontSize: { xs: '3rem', md: '5rem' },
					}}
				>
					Welcome to <span style={{ color: '#FBBF24' }}>Yama</span>
				</Typography>
				<Typography
					variant='body1'
					sx={{ color: '#E5E7EB', fontSize: '1.25rem', filter: 'drop-shadow(0 2px 5px #444)' }}
				>
					Experience Fine Dining and Effortless Table Booking at Yama Restaurant – Where Exquisite
					Cuisine Meets Seamless Service.
				</Typography>
			</Stack>
		</Box>
	)
}

export default HeroSection
