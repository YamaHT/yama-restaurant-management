import React from 'react'
import { Container, Typography, Box, Avatar, ImageList, ImageListItem, Grid2 } from '@mui/material'

const AboutUs = () => {
	const images = [
		'https://tonywedding.vn/wp-content/uploads/2022/12/291610733_5402986359724076_4717512138686002181_n.jpg?x52927',
		'https://th.bing.com/th/id/R.d9f11f93d281de9719dc80c8b9173625?rik=wdD38wA0Oj7b7A&pid=ImgRaw&r=0',
		'https://th.bing.com/th/id/OIP.huskSP6E2BSNvlAOTbuJ7AHaEH?rs=1&pid=ImgDetMain',
		'https://th.bing.com/th/id/OIP.TkRFjiScAdz-x1_DYfOwywHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain',
		'https://th.bing.com/th/id/R.f4b621b29b88d8faf1453dc7998d0770?rik=5qmJvr4mnGVOsg&pid=ImgRaw&r=0',
		'https://th.bing.com/th/id/R.437baaa909bc56e1311f56bf452e2d38?rik=Tu1%2fZtE4S%2byG%2fQ&riu=http%3a%2f%2fnhadepdonga.vn%2fUploads%2fthiet-ke-noi-that-nh-2015111911064522.jpg&ehk=NlG68fNFfQ%2bYlg%2bujavyKYcg1M%2baWrdTZFRxGHOM%2bHY%3d&risl=&pid=ImgRaw&r=0',
	]

	return (
		<Container>
			<Box my={4} textAlign='center'>
				<Typography variant='h3' gutterBottom>
					Yama Restaurant
				</Typography>
				<Typography variant='body1' color='textSecondary'>
					It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum. In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire.
				</Typography>
			</Box>
			<Grid2 container justifyContent='center' alignItems='center'>
				<Grid2 item xs={12} md={8}>
					<img
						alt='Team 6'
						src='https://th.bing.com/th/id/OIP.haSIo4BY9SLJLINLxzquqAHaEK?rs=1&pid=ImgDetMain'
						sx={{ width: '50%', height: 300, mx: 'auto' }} // Increased size for a bigger avatar image
					/>
					<Typography variant='h6' textAlign='center' mt={3}>
					Team 6
					</Typography>
				</Grid2>
			</Grid2>
			<Box my={4}>
				<Typography variant='h4' gutterBottom>
					Our Story
				</Typography>
				<Grid2 container spacing={4} alignItems='stretch'>
					<Grid2 item xs={12} md={6}>
						<Box height='100%' display='flex' flexDirection='row' justifyContent='left'>
							<Typography variant='body1' padding={'2% 2% 2% 2%'}>
								It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum. In the first place we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire.
							</Typography>
						</Box>
					</Grid2>
				</Grid2>
			</Box>
			<Box textAlign='center' my={4}>
				<ImageList variant='masonry' cols={3} gap={8}>
					{images.map((image, index) => (
						<ImageListItem key={index}>
							<img src={image} alt={`Image ${index + 1}`} loading='lazy' style={{ borderRadius: '15px' }} />
						</ImageListItem>
					))}
				</ImageList>
			</Box>
		</Container>
	)
}
export default AboutUs
