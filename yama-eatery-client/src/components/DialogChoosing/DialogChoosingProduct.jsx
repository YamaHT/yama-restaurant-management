import { BookingManagementService } from '@/services/BookingManagementService'
import { ProductService } from '@/services/ProductService'
import { AssetImages } from '@/utilities/AssetImages'
import { Close } from '@mui/icons-material'
import {
	Avatar,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid2,
	IconButton,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const DialogChoosingProduct = ({ open, handleClose, handleSelectProduct }) => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		async function fetchProducts() {
			const data = await ProductService.GET_ALL()
			if (data) {
				setProducts(data)
			}
		}
		fetchProducts()
	}, [open])

	const handleClick = (id) => {
		handleSelectProduct(id)
		handleClose()
	}

	const filteredProducts = products
		.filter((product) => product.stockQuantity !== 0)
		.sort((a, b) => a?.subCategory.category.name.localeCompare(b?.subCategory.category.name))

	return (
		<Dialog
			open={open}
			maxWidth
			onClose={handleClose}
			PaperProps={{ sx: { bgcolor: '#eee', width: '100%' } }}
		>
			<DialogTitle display={'flex'} alignItems={'center'}>
				<Typography variant='h6' flexGrow={1}>
					List available product
				</Typography>
				<IconButton onClick={() => handleClose()}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				{filteredProducts && filteredProducts.length > 0 ? (
					<Grid2 container spacing={2}>
						{filteredProducts.map((product) => (
							<Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={product.id}>
								<Card>
									<CardActionArea onClick={() => handleClick(product.id)}>
										<CardMedia
											component={() => (
												<Avatar
													src={AssetImages.ProductImage(product.image?.[0])}
													variant='square'
													sx={{
														width: '100%',
														height: 150,
														objectFit: 'cover',
													}}
												/>
											)}
											sx={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										/>
										<CardContent
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
												flexDirection: 'column',
											}}
										>
											<Typography variant='subtitle1'>Price: ${product.price}</Typography>
											<Typography variant='subtitle1'>Quantity: {product.stockQuantity}</Typography>
											<Typography variant='subtitle1' noWrap>
												Category: {product.subCategory.name}
											</Typography>
											<Typography align='center' variant='h5' fontWeight={'bold'}>
												{product.name}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid2>
						))}
					</Grid2>
				) : (
					<Typography variant='subtitle1'>No products are available</Typography>
				)}
			</DialogContent>
			<DialogActions>
				<Button color='inherit' onClick={handleClose}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DialogChoosingProduct
