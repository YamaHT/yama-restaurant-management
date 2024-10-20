import ProductCard from '@/components/Product/ProductCard'
import ProductDrawer from '@/components/Product/ProductMenu'
import ProductSearch from '@/components/Product/ProductSearch'
import { ProductService } from '@/services/ProductService'
import { calculateAverageRating } from '@/utilities/Calculate'
import { Box, Grid2, Pagination, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function ProductList() {
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [priceRange, setPriceRange] = useState([])
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(0)
	const [sortOption, setSortOption] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategories, setSelectedCategories] = useState({})

	const productsPerPage = 8
	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

	useEffect(() => {
		async function fetchProducts() {
			const data = await ProductService.GET_ALL()
			if (data) {
				setProducts(data.products)
				setMinPrice(data.minPrice)
				setMaxPrice(data.maxPrice)
				setPriceRange([data.minPrice, data.maxPrice])
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
		setCurrentPage(1)
		setFilteredProducts(filtered)
	}, [priceRange, selectedCategories, sortOption, searchTerm, products])

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	return (
		<Grid2 container p={'5%'} spacing={2}>
			<Grid2 size={{ xs: 12, md: 3 }}>
				<ProductDrawer
					products={products}
					priceRange={priceRange}
					sortOption={sortOption}
					setSearchTerm={setSearchTerm}
					minPrice={minPrice}
					maxPrice={maxPrice}
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
									return <ProductCard product={product} />
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
