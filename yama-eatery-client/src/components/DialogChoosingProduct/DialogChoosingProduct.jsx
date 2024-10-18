import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid2,
	Stack,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ProductService } from '@/services/ProductService'
import { AssetImages } from '@/utilities/AssetImages'
import { CenterFocusStrong } from '@mui/icons-material'

const DialogChoosingProduct = ({ open, handleClose, handleAddProduct }) => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		async function fetchProducts() {
			const data = await ProductService.GET_ALL()
			if (data) {
				setProducts(data)
			}
		}
		fetchProducts()
	}, [])

	const handleProductClick = (product) => {
		handleAddProduct(product.id)
		handleClose()
	}

	return (
		<Dialog open={open} maxWidth={'lg'} onClose={handleClose}>
			<DialogTitle>List Product</DialogTitle>
			<DialogContent>
				<Grid2 container spacing={2}>
					{products.map((product) => {
						return (
							<Grid2
								size={{ xs: 12, sm: 4, md: 3 }}
								key={product.id}
								sx={{
									backgroundColor: 'gray.50',
									boxShadow: 2,
									borderRadius: 2,
									cursor: 'pointer',
									'&:hover': { transform: 'translateY(-8px)' },
									transition: 'all 0.3s ease-in-out',
								}}
								onClick={() => handleProductClick(product)}
							>
								<Avatar
									src={AssetImages.ProductImage(product.image[0])}
									alt={product.name}
									variant='rounded'
									style={{
										objectFit: 'fill',
										width: '100%',
										height: '100%',
										transition: 'all 0.3s ease-in-out',
									}}
								/>
							</Grid2>
						)
					})}
				</Grid2>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DialogChoosingProduct
