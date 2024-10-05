import ProductDrawer from '@/components/ProductMenu/ProductMenu'
import {
	Box,
	CssBaseline,
	Divider,
	Grid2,
	Pagination,
	Rating,
	Stack,
	Toolbar,
	Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../FakeData/FakeData'

const drawerWidth = 240

export default function ProductList(props) {
	const [priceRange, setPriceRange] = useState([0, 1000])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [filterOption, setFilterOption] = useState('') // For category filtering
	const [sortOption, setSortOption] = useState('') // For sorting
	const [currentPage, setCurrentPage] = useState(1)

	const [productsPerPage] = useState(8)
	const [searchTerm, setSearchTerm] = useState('') // For search

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

		if (filterOption) {
			filtered = filtered.filter((product) => product.category === filterOption)
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
			default:
				break
		}

		setFilteredProducts(filtered)
	}, [priceRange, filterOption, sortOption, searchTerm])

	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	const navigate = useNavigate()

	const handleClick = (id) => {
		navigate(`/Product/Detail/${id}`)
	}

	return (
		<Box display={'flex'}>
			<CssBaseline />
			<ProductDrawer
				handleShowAll={handleShowAll}
				filterOption={filterOption}
				priceRange={priceRange}
				sortOption={sortOption}
				setFilterOption={setFilterOption}
				setPriceRange={setPriceRange}
				setSortOption={setSortOption}
			/>
			<Box
				component='main'
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
				<Toolbar />
				{filteredProducts.length === 0 ? (
					<Typography variant='h6' align='center' sx={{ mt: 10 }}>
						No products found matching the selected filters or price range.
					</Typography>
				) : (
					<>
						<Grid2
							container
							sx={{
								display: 'grid',
								gridTemplateColumns: {
									md: 'repeat(1, 1fr)',
									sm: 'repeat(2, 1fr)',
									md: 'repeat(4, 1fr)',
								},
								gap: 3, 
							}}
						>
							{currentProducts.map((product) => (
								<Box
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
								>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
											height: 260,
											padding: 2,
											backgroundColor: 'gray.100',
										}}
									>
										<img
											src={product.img[0]} // Use the first image as the main image
											alt={product.name}
											style={{
												objectFit: 'contain',
												maxHeight: '100%',
												maxWidth: '100%',
											}}
										/>
									</Box>
									<Box sx={{ p: 3, backgroundColor: 'white' }}>
										<Stack
											direction={'row'}
											alignItems={'center'}
											justifyContent={'space-between'}
										>
											<Rating value={3}></Rating>
											<Typography variant='h5' align='right' color='gray.800'>
												{product.category}
											</Typography>
										</Stack>
										<Typography variant='h6' fontWeight='bold' color='gray.800'>
											{product.name}
										</Typography>
										<Stack
											direction={'row'}
											alignItems={'center'}
											justifyContent={'space-between'}
										>
											<Typography
												variant='h6'
												fontWeight='bold'
												sx={{ mt: 1, color: 'gray.800' }}
											>
												${product.price}
											</Typography>
											<Typography
												variant='overline'
												color={product.quantity > 0 ? 'green' : 'error'}
												sx={{ mt: 1 }}
											>
												{product.quantity > 0 ? 'In stock' : 'Out of stock'}
											</Typography>
										</Stack>
									</Box>
								</Box>
							))}
						</Grid2>
						<Divider />
						<Pagination
							size='large'
							count={Math.ceil(filteredProducts.length / productsPerPage)} // Total pages
							page={currentPage} // Current page
							onChange={handlePageChange} // Handle page change
							color='primary'
							sx={{ display: 'flex', justifyContent: 'center', my: 3 }}
							disabled={filteredProducts.length <= productsPerPage} // Disable if there's only one page
						/>
					</>
				)}
			</Box>
		</Box>
	)
}
