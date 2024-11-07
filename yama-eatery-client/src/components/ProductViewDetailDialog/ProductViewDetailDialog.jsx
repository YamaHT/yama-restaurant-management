import { ProductService } from '@/services/ProductService'
import { AssetImages } from '@/utilities/AssetImages'
import { calculateAverageRating } from '@/utilities/Calculate'
import { Close } from '@mui/icons-material'

import {
	Avatar,
	Box,
	Card,
	CardMedia,
	Chip,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid2,
	IconButton,
	Rating,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const ProductViewDetailDialog = ({ open, handleClose, productId }) => {
	const [product, setProduct] = useState(null)

	console.log(productId)

	useEffect(() => {
		async function fetchProducts() {
			const data = await ProductService.GET_PRODUCT_DETAIL(productId)
			if (data) {
				setProduct(data)
			}
		}
		fetchProducts()
	}, [productId, open])

	const averageRating = calculateAverageRating(product?.feedbacks || 0)
	return (
		<Dialog open={open} maxWidth onClose={handleClose} PaperProps={{ sx: { bgcolor: '#eee' } }}>
			<DialogTitle display={'flex'}>
				<Typography variant='h5' flexGrow={1}>
					Product Detail
				</Typography>
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Grid2 container spacing={3}>
					<Grid2 size={{ xs: 12, lg: 7 }}>
						<Card>
							<CardMedia
								component={() => (
									<Avatar
										src={AssetImages.ProductImage(product?.image?.[0])}
										sx={{ height: 500, width: '100%', objectFit: 'cover', borderRadius: 2, mb: 1 }}
									/>
								)}
							/>
						</Card>
					</Grid2>
					<Grid2 size={{ xs: 12, lg: 5 }} sx={{ maxHeight: 600, overflow: 'auto' }}>
						<Typography variant='h4' fontWeight='bold' color='textPrimary'>
							{product?.name}
						</Typography>
						<Box mt={2} display='flex' gap={2}>
							<Typography variant='h5' fontWeight='bold' color='textPrimary'>
								${product?.price}
							</Typography>
						</Box>
						<Stack direction='row' spacing={1} my={2}>
							<Chip label={product?.subCategory.category.name} variant='outlined' />
							<Chip label={product?.subCategory.name} variant='outlined' />
						</Stack>
						<Rating value={averageRating} precision={0.1} readOnly />
						<Typography variant='h6' fontWeight='bold' color='textPrimary' mt={3}>
							About the {product?.name}
						</Typography>
						<Typography variant='body1' color='textPrimary' mt={4}>
							{product?.description}
						</Typography>
					</Grid2>
				</Grid2>
			</DialogContent>
		</Dialog>
	)
}

export default ProductViewDetailDialog
