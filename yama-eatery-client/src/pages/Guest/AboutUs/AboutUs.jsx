import { Box, Container, Grid2, ImageList, ImageListItem, Paper, Typography } from '@mui/material'

const AboutUs = () => {
	const images = [
		'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
		'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600',
		'https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=600',
		'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		'https://images.pexels.com/photos/3252051/pexels-photo-3252051.jpeg?auto=compress&cs=tinysrgb&w=600',
	]

	return (
		<Paper
			sx={{
				backgroundColor: 'white',
			}}
		>
			<Box textAlign='center'>
				<Typography
					variant='h3'
					gutterBottom
					pt={'1%'}
					sx={{
						textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
					}}
				>
					Yama Restaurant
				</Typography>
			</Box>
			<Grid2 container justifyContent='center' alignItems='center'>
				<Grid2 display='flex' justifyContent='center' alignItems='center'>
					<Box
						component='img'
						alt='Team 6'
						src='https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg'
						sx={{ width: '100%', height: '30%', mx: 2, borderRadius: '10px' }}
					/>
				</Grid2>
				<Container>
					<Typography
						variant='body1'
						fontWeight={'bold'}
						fontFamily={'Poppins, sans-serif'}
						align='center'
						py={'1.5%'}
					>
						At Yama Restaurant, we blend culinary expertise with a passion for fine dining to create
						an unforgettable experience for our guests. Situated in the heart of the city, our
						restaurant offers a unique fusion of traditional and contemporary cuisine. Our menu
						features fresh, locally-sourced ingredients crafted into exquisite dishes by our
						talented chefs. The elegant yet cozy ambiance, combined with attentive service, makes
						Yama the perfect destinatiaon for any occasion, from romantic dinners to family
						gatherings. We are committed to sustainability and supporting local communities,
						ensuring a dining experience that is both delightful and responsible.
					</Typography>
				</Container>
			</Grid2>

			<Box sx={{ mx: '2%', py: '1%' }}>
				<Box textAlign='center'>
					<Typography
						variant='h2'
						sx={{
							display: 'inline-block',
							position: 'relative',
							fontWeight: 'bold',
							fontSize: '2rem',
							textTransform: 'uppercase',
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
						OUR STORY
					</Typography>
				</Box>
				<Grid2 container spacing={4} alignItems='stretch'>
					<Grid2 item xs={12} md={6}>
						<Box height='100%' display='flex' flexDirection='row' justifyContent='left'>
							<Typography
								variant='body1'
								fontWeight={'bold'}
								fontFamily={'Poppins, sans-serif'}
								align='center'
								py={'2%'}
							>
								Founded with a vision to bring the best of culinary arts to our community, Yama
								Restaurant has grown into a beloved dining spot for locals and visitors alike. Our
								journey began with a simple idea: to offer exceptional food in a welcoming and
								elegant setting. Over the years, we have stayed true to this mission, continually
								evolving and refining our offerings to meet the highest standards of quality and
								taste.
							</Typography>
						</Box>
					</Grid2>
				</Grid2>
			</Box>
			<Box textAlign='center' my={4}>
				<ImageList variant='masonry' cols={3} gap={8}>
					{images.map((image, index) => (
						<ImageListItem key={index}>
							<img
								src={image}
								alt={`Image ${index + 1}`}
								loading='lazy'
								style={{ borderRadius: '15px' }}
							/>
						</ImageListItem>
					))}
				</ImageList>
			</Box>
		</Paper>
	)
}

export default AboutUs
