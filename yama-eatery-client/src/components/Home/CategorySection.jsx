import { AssetImage } from '@/utilities/AssetImage'
import { Box, Typography, Grid, Card, CardMedia, CardContent, Divider, Grid2 } from '@mui/material'
import React from 'react'

const CategorySection = () => {
	const categories = [
		{
			title: 'Starter',
			description:
				'Enjoy our tempting starters, the perfect beginning to a flavorful meal. Crispy, fresh, and full of taste!',
		},
		{
			title: 'Main Courses',
			description:
				'Savor our main courses, featuring bold flavors and fresh ingredients. A satisfying experience awaits!',
		},
		{
			title: 'Beverages',
			description: 'Enjoy our selection of beverages, perfect for pairing with your meal!',
		},
		{
			title: 'Desserts',
			description:
				'Savor our desserts, the perfect sweet finale to your meal. Rich flavors in every bite!',
		},
	]

	return (
		<Box sx={{ mx: 'auto' }}>
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
					OUR CATEGORY
				</Typography>
			</Box>

			<Grid2 container spacing={4} mt={5} justifyContent='center'>
				{categories.map((category, index) => (
					<Grid2 size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
						<Card
							sx={{
								cursor: 'pointer',
								borderRadius: 2,
								overflow: 'hidden',
								boxShadow: '0px 2px 10px -3px rgba(6,81,237,0.3)',
								position: 'relative',
								'&:hover .content': {
									height: '4rem',
									mt: 1,
								},
								transition: 'all 0.3s ease',
							}}
						>
							<CardMedia
								component='img'
								image={AssetImage.HomeCategoryImage(index)}
								sx={{ height: 400, objectFit: 'cover' }}
							/>
							<CardContent
								sx={{
									position: 'absolute',
									bottom: 0,
									left: 0,
									right: 0,
									backgroundColor: '#FBBF24',
									opacity: 0.8,
									padding: 3,
								}}
							>
								<Typography variant='body2' textTransform={'uppercase'}>
									Stage 0{index + 1} | BY YMRS
								</Typography>
								<Typography variant='h6' fontWeight={'bold'}>
									{category.title}
								</Typography>
								<Box
									className='content'
									sx={{
										height: 0,
										overflow: 'hidden',
										transition: 'all 0.3s ease',
									}}
								>
									<Typography
										variant='body2'
										sx={{
											textOverflow: 'ellipsis',
											display: '-webkit-box',
											WebkitBoxOrient: 'vertical',
											WebkitLineClamp: 3,
										}}
									>
										{category.description}
									</Typography>
								</Box>
							</CardContent>
						</Card>
					</Grid2>
				))}
			</Grid2>
		</Box>
	)
}

export default CategorySection
