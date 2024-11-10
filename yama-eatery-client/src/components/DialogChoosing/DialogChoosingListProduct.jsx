import { ProductService } from '@/services/ProductService'
import { AssetImages } from '@/utilities/AssetImages'
import { Add, Inventory2, Remove } from '@mui/icons-material'
import {
	Avatar,
	Badge,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Chip,
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
import ProductViewDetailDialog from '../ProductViewDetailDialog/ProductViewDetailDialog'

const DialogChoosingListProduct = ({
	open,
	handleClose,
	handleSelectProducts,
	selectedProducts,
}) => {
	const [products, setProducts] = useState([])
	const [selects, setSelects] = useState([])
	const [openDetail, setOpenDetail] = useState(false)
	const [productDetail, setProductDetail] = useState(null)

	useEffect(() => {
		async function fetchProducts() {
			const data = await ProductService.GET_ALL()
			if (data) {
				setProducts(data)
			}
		}
		fetchProducts()
	}, [open])

	useEffect(() => {
		setSelects(selectedProducts)
	}, [selectedProducts])

	const handleProductQuantityChange = (productId, change) => {
		setSelects((prevSelected) => {
			const existingProduct = prevSelected.find(
				(selectedProduct) => selectedProduct.product.id === productId
			)

			if (existingProduct) {
				const updatedQuantity = existingProduct.quantity + change

				const stockQuantity = products.find((product) => product.id === productId).stockQuantity

				if (updatedQuantity <= 0) {
					return prevSelected.filter((selectedProduct) => selectedProduct.product.id !== productId)
				} else if (updatedQuantity > stockQuantity) {
					return prevSelected
				} else {
					return prevSelected.map((selectedProduct) =>
						selectedProduct.product.id === productId
							? { ...selectedProduct, quantity: updatedQuantity }
							: selectedProduct
					)
				}
			} else {
				const product = products.find((product) => product.id === productId)
				const initialQuantity = Math.max(0, change)

				if (initialQuantity > product.stockQuantity) {
					return prevSelected
				}

				return [
					...prevSelected,
					{
						product: product,
						quantity: initialQuantity,
					},
				]
			}
		})
	}

	const handleOpenDetail = (product) => {
		setProductDetail(product)
		setOpenDetail(true)
	}

	const handleSubmitAdd = () => {
		handleSelectProducts(selects.filter((select) => select.quantity !== 0))
		handleClose()
	}

	return (
		<>
			<Dialog
				open={open}
				maxWidth
				onClose={handleClose}
				PaperProps={{ sx: { bgcolor: '#eee', width: '100%' } }}
			>
				<DialogTitle>List Product</DialogTitle>
				<DialogContent>
					<Grid2 container spacing={2}>
						{products.map((product) => {
							const selectedProduct = selects
								? selects.find((item) => item.product.id === product.id)
								: null
							const quantity = selectedProduct ? selectedProduct.quantity : 0
							return (
								<Grid2 size={{ xs: 12, sm: 4, md: 3 }} key={product.id}>
									<Card>
										<CardHeader
											subheader={
												<Button onClick={() => handleOpenDetail(product)}>{product.name}</Button>
											}
											subheaderTypographyProps={{ color: 'primary.main' }}
										/>
										<CardMedia
											component={() => (
												<Avatar
													variant='square'
													sx={{ height: 200, width: '100%', objectFit: 'cover' }}
													src={AssetImages.ProductImage(product.image[0])}
												/>
											)}
										/>
										<CardContent>
											<Stack
												pr={2}
												direction={'row'}
												justifyContent={'space-between'}
												alignItems={'center'}
											>
												<Chip variant='outlined' label={product.subCategory.name} />
												<Badge color='secondary' badgeContent={product.stockQuantity} showZero>
													<Inventory2 />
												</Badge>
											</Stack>
											<Stack
												mt={1}
												direction={'row'}
												justifyContent={'space-between'}
												alignItems={'center'}
											>
												<Typography variant='h6'>${product.price}</Typography>
												<ButtonGroup>
													<IconButton onClick={() => handleProductQuantityChange(product.id, -1)}>
														<Remove />
													</IconButton>
													<Button disabled>
														<Typography variant='body1' color='textPrimary'>
															{quantity}
														</Typography>
													</Button>
													<IconButton onClick={() => handleProductQuantityChange(product.id, 1)}>
														<Add />
													</IconButton>
												</ButtonGroup>
											</Stack>
										</CardContent>
									</Card>
								</Grid2>
							)
						})}
					</Grid2>
				</DialogContent>
				<DialogActions>
					<Button color='inherit' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='contained' onClick={handleSubmitAdd}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
			{openDetail && (
				<ProductViewDetailDialog
					open={openDetail}
					productId={productDetail.id}
					handleClose={() => setOpenDetail(false)}
				/>
			)}
		</>
	)
}

export default DialogChoosingListProduct
