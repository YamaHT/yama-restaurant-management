import ProductDrawer from '@/components/ProductMenu/ProductMenu'
import {
	Avatar,
	Box,
	Chip,
	Divider,
	Grid2,
	Pagination,
	Rating,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../ProductMockData/ProductMockData'
import {
	Dining,
	DiningSharp,
	FoodBank,
	ForkLeft,
	StarBorderRounded,
	StarRounded,
} from '@mui/icons-material'

const drawerWidth = 240

// Function to calculate average rating from reviews
export function calculateAverageRating(reviews) {
	if (!reviews || reviews.length === 0) return 0
	const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
	return totalRating / reviews.length
}

export default function ProductList(props) {
	const [priceRange, setPriceRange] = useState([0, 1000])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [filterOption, setFilterOption] = useState('')
	const [sortOption, setSortOption] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [hoveredProductId, setHoveredProductId] = useState(null)
	const [hoverTimeout, setHoverTimeout] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')

	const productsPerPage = 8

	// Reset filters and sorting
	const handleShowAll = () => {
		setFilterOption('')
		setPriceRange([0, 1000])
		setSortOption('')
		setSearchTerm('')
	}

	useEffect(() => {
		let filtered = products.filter(
			(product) => product.price >= priceRange[0] && product.price <= priceRange[1]
		)

		// Filter by category
		if (filterOption) {
			filtered = filtered.filter((product) => product.category === filterOption)
		}

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		// Sort products based on the selected sort option
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
					(a, b) => calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews)
				)
				break
			case 'rating-low-to-high':
				filtered = filtered.sort(
					(a, b) => calculateAverageRating(a.reviews) - calculateAverageRating(b.reviews)
				)
				break
			default:
				break
		}

		setFilteredProducts(filtered)
	}, [priceRange, filterOption, sortOption, searchTerm])

	// Pagination logic
	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	const navigate = useNavigate()

	// Handle product click to navigate to product detail
	const handleClick = (id) => {
		navigate(`/Product/Detail/${id}`)
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
		<Grid2 container spacing={2}>
			<Grid2 size={3}>
				<ProductDrawer
					handleShowAll={handleShowAll}
					filterOption={filterOption}
					priceRange={priceRange}
					sortOption={sortOption}
					setFilterOption={setFilterOption}
					setPriceRange={setPriceRange}
					setSortOption={setSortOption}
				/>
			</Grid2>
			<Grid2 size={9}>
				<Box>
					{filteredProducts.length === 0 ? (
						<Typography variant='h6' align='center' sx={{ mt: 10 }}>
							No products found matching the selected filters or price range.
						</Typography>
					) : (
						<>
							<Grid2 container spacing={2}>
								{currentProducts.map((product) => {
									const averageRating = calculateAverageRating(product.reviews)
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
													src={hoveredProductId === product.id ? product.img[1] : product.img[0]}
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
												<Typography variant='h5' fontWeight='bold' color='gray.800'>
													{product.name}
												</Typography>
												<Chip
													variant='outlined'
													label={product.category}
													icon={<Dining />}
													sx={{
														fontFamily: 'cursive',
														width: '100%',
													}}
												></Chip>
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
														color={product.quantity > 0 ? 'success' : 'error'}
													>
														{product.quantity > 0 ? 'In stock' : 'Out of stock'}
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
							<Divider />
							<Pagination
								size='large'
								count={Math.ceil(filteredProducts.length / productsPerPage)}
								page={currentPage}
								onChange={handlePageChange}
								color='primary'
								sx={{ display: 'flex', justifyContent: 'center', my: 3 }}
								disabled={filteredProducts.length <= productsPerPage}
							/>
						</>
					)}
				</Box>
			</Grid2>
		</Grid2>
	)
}
