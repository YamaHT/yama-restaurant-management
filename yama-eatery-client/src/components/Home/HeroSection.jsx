import { AssetImage } from '@/utilities/AssetImage'
import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'

const HeroSection = () => {
	return (
		<Box position={'relative'} width={'100%'} height={400}>
			<img
				src={AssetImage.HomeHeroBackgroundImage}
				alt='Background Image'
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
					opacity: 0.5,
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
				<Typography variant='body1' sx={{ color: '#E5E7EB', fontSize: '1.125rem' }}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus
					blandit, metus mi consectetur felis turpis vitae ligula.
				</Typography>
				<Button
					variant='contained'
					sx={{
						m: 'auto',
						mt: 3,
						p: '0.75% 1.5%',
						color: '#FBBF24',
						border: '2px solid #F59E0BC0',
						bgcolor: '#F59E0B50',
						':hover': {
							color: '#FBBF24',
							borderColor: '#FBBF24',
						},
					}}
				>
					Get started
				</Button>
			</Stack>
		</Box>
	)
}

export default HeroSection
