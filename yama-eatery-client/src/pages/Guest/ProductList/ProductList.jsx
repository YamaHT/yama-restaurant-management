import ProductDrawer from '@/components/Product/ProductMenu'
import ProductSearch from '@/components/Product/ProductSearch'
import { Dining, StarBorderRounded, StarRounded } from '@mui/icons-material'
import { Box, Chip, Divider, Grid2, Pagination, Rating, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductService } from '@/services/ProductService'
import { AssetImages } from '@/utilities/AssetImages'

export function calculateAverageRating(reviews) {
	if (!reviews || reviews.length === 0) return 0
	const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
	return totalRating / reviews.length
}

export default function ProductList() {
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [priceRange, setPriceRange] = useState([0, 1000])
	const [sortOption, setSortOption] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [hoveredProductId, setHoveredProductId] = useState(0)
	const [hoverTimeout, setHoverTimeout] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategories, setSelectedCategories] = useState({})
	const navigate = useNavigate()

	const productsPerPage = 8
	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

	useEffect(() => {
		async function fetchProducts() {
			const data = await ProductService.GET_ALL()
			if (data) {
				setProducts(data)
			}
		}
		fetchProducts()
	}, [])

	useEffect(() => {
		let filtered = products.filter(
			(product) => product.price >= priceRange[0] && product.price <= priceRange[1]
		)

		if (
			Object.keys(selectedCategories).length > 0 &&
			Object.values(selectedCategories).some((subs) => subs.length > 0)
		) {
			filtered = filtered.filter((product) => {
				const productCategory = product.subCategory.category.name
				const productSubcategory = product.subCategory.name

				if (selectedCategories[productCategory]) {
					return selectedCategories[productCategory].includes(productSubcategory)
				}
				return false
			})
		}

		if (searchTerm) {
			filtered = filtered.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		switch (sortOption) {
			case 'low-to-high':
				filtered = filtered.sort((a, b) => a.price - b.price)
				break
			case 'high-to-low':
				filtered = filtered.sort((a, b) => b.price - a.price)
				break
			case 'a-to-z':
				filtered = filtered.sort((a, b) => a.name.localeCompare(b.name))
				break
			case 'z-to-a':
				filtered = filtered.sort((a, b) => b.name.localeCompare(a.name))
				break
			case 'rating-high-to-low':
				filtered = filtered.sort(
					(a, b) => calculateAverageRating(b.feedbacks) - calculateAverageRating(a.feedbacks)
				)
				break
			case 'rating-low-to-high':
				filtered = filtered.sort(
					(a, b) => calculateAverageRating(a.feedbacks) - calculateAverageRating(b.feedbacks)
				)
				break
			default:
				break
		}

		setFilteredProducts(filtered)
	}, [priceRange, selectedCategories, sortOption, searchTerm, products])

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

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
		<Grid2 container p={'5%'} spacing={2}>
			<Grid2 size={{ xs: 12, md: 3 }}>
				<ProductDrawer
					products={products}
					priceRange={priceRange}
					sortOption={sortOption}
					setSearchTerm={setSearchTerm}
					setPriceRange={setPriceRange}
					setSortOption={setSortOption}
					setSelectedCategories={setSelectedCategories}
				/>
			</Grid2>
			<Grid2 size={{ xs: 12, md: 9 }}>
				<Box>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
						<ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					</Box>

					{filteredProducts.length === 0 ? (
						<Typography variant='h6' align='center' sx={{ mt: 10 }}>
							No products found matching the selected filters or price range.
						</Typography>
					) : (
						<>
							<Grid2 container spacing={2}>
								{currentProducts.map((product) => {
									const averageRating = calculateAverageRating(product.feedbacks)
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
														hoveredProductId === product.id
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
													<Typography
														variant='overline'
														color={product.stockQuantity > 0 ? 'success' : 'error'}
													>
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
								})}
							</Grid2>
							<Pagination
								size='large'
								count={Math.ceil(filteredProducts.length / productsPerPage)}
								page={currentPage}
								onChange={handlePageChange}
								color='primary'
								sx={{ display: 'flex', justifyContent: 'center', my: 3 }}
							/>
						</>
					)}
				</Box>
			</Grid2>
		</Grid2>
	)
}