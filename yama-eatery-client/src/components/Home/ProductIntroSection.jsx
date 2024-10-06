import { StarBorderOutlined, StarRounded } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Grid2, Rating, Stack, Typography } from '@mui/material'
import React from 'react'

const products = [
	{
		image: 'https://readymadeui.com/images/food1.webp',
		name: 'Spicy Veg Burger',
		rating: 4.5,
		totalReviews: 128,
		price: 99.99,
	},
	{
		image: 'https://readymadeui.com/images/food5.webp',
		name: 'Burgers with fries',
		rating: 4.7,
		totalReviews: 345,
		price: 699.99,
	},
	{
		image: 'https://readymadeui.com/images/food8.webp',
		name: 'Vegetable Food',
		rating: 4.3,
		totalReviews: 214,
		price: 11,
	},
	{
		image: 'https://readymadeui.com/images/food3.webp',
		name: 'Pasta with meatballs',
		rating: 4.6,
		totalReviews: 89,
		price: 15,
	},
]

const ProductCard = ({ product }) => {
	return (
		<Card>
			<CardMedia sx={{ height: 300 }} image={product.image} title='green iguana' />
			<CardContent>
				<Typography gutterBottom variant='h5'>
					{product.name}
				</Typography>
				<Stack direction={'row'} spacing={1}>
					<Rating
						value={product.rating}
						readOnly
						icon={<StarRounded fontSize='inherit' />}
						emptyIcon={<StarBorderOutlined fontSize='inherit' />}
					/>
					<Typography variant='body1' color='initial'>
						{`(${product.totalReviews})`}
					</Typography>
				</Stack>
				<Typography fontWeight={'bold'} variant='h6'>
					${product.price}
				</Typography>
			</CardContent>
		</Card>
	)
}

const ProductIntroSection = () => {
	return (
		<Stack spacing={4}>
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
					Popular Right Now
				</Typography>
			</Box>
			<Grid2 container spacing={3}>
				{products.map((product) => (
					<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
						<ProductCard product={product} />
					</Grid2>
				))}
			</Grid2>
		</Stack>
	)
}

export default ProductIntroSection
