import { ProductService } from '@/services/ProductService'
import { AssetImages } from '@/utilities/AssetImages'
import { calculateAverageRating } from '@/utilities/Calculate'
import { StarBorderOutlined, StarRounded } from '@mui/icons-material'
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid2,
	Rating,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const ProductCard = ({ product }) => {
	return (
		<Card
			sx={{
				transition: '0.2s linear',
				cursor: 'pointer',
				':hover': { transform: 'translateY(-10px)', boxShadow: '0 2px 10px #aaa' },
			}}
		>
			<CardActionArea href={`/product/detail/${product.id}`}>
				<CardMedia
					sx={{ height: 300 }}
					image={AssetImages.ProductImage(product?.image[0])}
					title='green iguana'
				/>
				<CardContent>
					<Typography gutterBottom variant='h5'>
						{product.name}
					</Typography>
					<Stack direction={'row'} spacing={1}>
						<Rating
							value={calculateAverageRating(product.feedbacks)}
							readOnly
							precision={0.5}
							icon={<StarRounded fontSize='inherit' />}
							emptyIcon={<StarBorderOutlined fontSize='inherit' />}
						/>
						<Typography variant='body1' color='initial'>
							{`(${product.feedbacks.length} reviews)`}
						</Typography>
					</Stack>
					<Typography fontWeight={'bold'} variant='h6'>
						${product.price}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

const ProductIntroSection = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const fetchPopularProducts = async () => {
			const data = await ProductService.GET_POPULAR_PRODUCT()
			if (data) {
				setProducts(data)
			}
		}
		fetchPopularProducts()
	}, [])
	return (
		<Stack mx={'2%'} spacing={4}>
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
