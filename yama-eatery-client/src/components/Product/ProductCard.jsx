import { AssetImages } from '@/utilities/AssetImages'
import { calculateAverageRating } from '@/utilities/Calculate'
import { Dining, StarBorderRounded, StarRounded } from '@mui/icons-material'
import { Box, Chip, Grid2, Rating, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
	const [hoveredProductId, setHoveredProductId] = useState(0)
	const [hoverTimeout, setHoverTimeout] = useState(null)

	const navigate = useNavigate()

	const averageRating = calculateAverageRating(product.feedbacks)

	const handleClick = (id) => {
		navigate(`/product/detail/${id}`)
	}

	const handleMouseEnter = (id) => {
		if (hoverTimeout) clearTimeout(hoverTimeout)
		const timeoutId = setTimeout(() => {
			setHoveredProductId(id)
		}, 250)
		setHoverTimeout(timeoutId)
	}

	const handleMouseLeave = () => {
		if (hoverTimeout) clearTimeout(hoverTimeout)
		setHoveredProductId(null)
	}

	return (
		<Grid2
			size={{ xs: 12, sm: 4, md: 3 }}
			key={product.id}
			onClick={() => handleClick(product.id)}
			sx={{
				backgroundColor: 'gray.50',
				boxShadow: 2,
				borderRadius: 2,
				cursor: 'pointer',
				'&:hover': { transform: 'translateY(-8px)' },
				transition: 'all 0.3s ease-in-out',
			}}
			onMouseEnter={() => handleMouseEnter(product.id)}
			onMouseLeave={handleMouseLeave}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					height: 260,
					backgroundColor: 'gray.100',
				}}
			>
				<img
					src={
						product.image.length == 1
							? AssetImages.ProductImage(product.image[0])
							: hoveredProductId === product.id
							? AssetImages.ProductImage(product.image[1])
							: AssetImages.ProductImage(product.image[0])
					}
					alt={product.name}
					style={{
						objectFit: 'fill',
						maxHeight: '100%',
						maxWidth: '100%',
						transition: 'all 0.3s ease-in-out',
					}}
				/>
			</Box>
			<Box sx={{ p: 3, backgroundColor: 'white' }}>
				<Typography
					variant='h5'
					fontWeight='bold'
					color='gray.800'
					sx={{
						WebkitLineClamp: 1,
						textWrap: 'nowrap',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
					}}
				>
					{product.name}
				</Typography>
				<Chip
					variant='outlined'
					label={`${product.subCategory.category.name} / ${product.subCategory.name}`}
					icon={<Dining />}
					sx={{
						fontFamily: 'sans-serif',
						width: '100%',
					}}
				/>
				<Stack
					sx={{ my: 1 }}
					direction={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Typography variant='h6' fontWeight='bold' sx={{ color: 'gray.800' }}>
						${product.price}
					</Typography>
					<Typography variant='overline' color={product.stockQuantity > 0 ? 'success' : 'error'}>
						{product.stockQuantity > 0 ? 'In stock' : 'Out of stock'}
					</Typography>
				</Stack>
				<Rating
					value={averageRating}
					precision={0.5}
					readOnly
					icon={<StarRounded />}
					emptyIcon={<StarBorderRounded />}
				/>
			</Box>
		</Grid2>
	)
}

export default ProductCard
