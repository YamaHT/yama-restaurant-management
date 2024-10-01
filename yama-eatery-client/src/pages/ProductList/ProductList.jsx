import React, { useEffect, useState } from "react"
import {
	Box,
	Typography,
	Toolbar,
	Button,
	Select,
	MenuItem,
	Slider,
	Pagination,
	Stack,
	Rating,
	CssBaseline,
	Divider,
	Drawer,
	AppBar,
	IconButton,
	TextField,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { products } from "../FakeData/FakeData"
import { useNavigate } from "react-router-dom"
const drawerWidth = 240

export default function ProductList(props) {
	const [priceRange, setPriceRange] = useState([0, 1000])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [filterOption, setFilterOption] = useState("") // For category filtering
	const [sortOption, setSortOption] = useState("") // For sorting
	const [currentPage, setCurrentPage] = useState(1)
	const [mobileOpen, setMobileOpen] = useState(false)
	const [productsPerPage] = useState(8)
	const [searchTerm, setSearchTerm] = useState("") // For search

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const handleShowAll = () => {
		setFilterOption("")
		setPriceRange([0, 1000])
		setSortOption("")
		setSearchTerm("")
	}

	useEffect(() => {
		let filtered = products.filter(
			(product) => product.price >= priceRange[0] && product.price <= priceRange[1]
		)

		// Apply category filter
		if (filterOption) {
			filtered = filtered.filter((product) => product.category === filterOption)
		}

		// Apply search filter
		if (searchTerm) {
			filtered = filtered.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		// Apply sorting
		switch (sortOption) {
			case "low-to-high":
				filtered = filtered.sort((a, b) => a.price - b.price)
				break
			case "high-to-low":
				filtered = filtered.sort((a, b) => b.price - a.price)
				break
			case "a-to-z":
				filtered = filtered.sort((a, b) => a.name.localeCompare(b.name))
				break
			case "z-to-a":
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

	const handlePageChange = (value) => {
		setCurrentPage(value) // Set the page correctly
	}

	const drawer = (
		<Box>
			<Toolbar />
			<Button variant='contained' onClick={handleShowAll} sx={{ m: 2 }}>
				All Products
			</Button>

			<Box sx={{ p: 2 }}>
				<Typography variant='h6'>Filter by Price</Typography>
				<Slider
					value={priceRange}
					onChange={(e, newValue) => setPriceRange(newValue)}
					valueLabelDisplay='auto'
					min={0}
					max={1000}
				/>
				<Typography>
					Price Range: ${priceRange[0]} - ${priceRange[1]}
				</Typography>
			</Box>

			<Box sx={{ p: 2 }}>
				<Typography variant='h6'>Sort Options</Typography>
				<Select
					variant='outlined'
					sx={{ borderRadius: "15px", width: "100%" }}
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
					displayEmpty
				>
					<MenuItem value=''>Sort by</MenuItem>
					<MenuItem value='low-to-high'>Price: Low to High</MenuItem>
					<MenuItem value='high-to-low'>Price: High to Low</MenuItem>
					<MenuItem value='a-to-z'>Name: A-Z</MenuItem>
					<MenuItem value='z-to-a'>Name: Z-A</MenuItem>
				</Select>
			</Box>

			<Box sx={{ p: 2 }}>
				<Typography variant='h6'>Category</Typography>
				<Select
					variant='outlined'
					sx={{ borderRadius: "15px", width: "100%" }}
					value={filterOption}
					onChange={(e) => setFilterOption(e.target.value)}
					displayEmpty
				>
					<MenuItem value=''>Filter by</MenuItem>
					<MenuItem value='drink'>Category: Drink</MenuItem>
					<MenuItem value='dessert'>Category: Dessert</MenuItem>
					<MenuItem value='food'>Category: Food</MenuItem>
					<MenuItem value='snack'>Category: Snack</MenuItem>
				</Select>
			</Box>
		</Box>
	)

	const navigate = useNavigate();

	const handleClick = (id) => {
	  navigate(`/Product/Detail/${id}`);
	};
	

	const container = props.window !== undefined ? () => props.window().document.body : undefined

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor: "white", // Set background color to white
					color: "black", // Set text color to black
				}}
			>
				<Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
							Product List
						</Typography>
					</Box>
					<Box sx={{ ml: "auto", width: 300 }}>
						<form
							onSubmit={(e) => e.preventDefault()} // Prevent form submission
							style={{ display: "flex", gap: "8px" }}
						>
							<TextField
								type='search'
								variant='outlined'
								placeholder='Search'
								fullWidth
								onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
							/>
						</form>
					</Box>
				</Toolbar>
			</AppBar>

			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'
			>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>

				<Drawer
					variant='permanent'
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>

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
						<Grid2 container spacing={3}>
							{currentProducts.map((product) => (
								<Grid2 item xs={12} sm={6} md={4} lg={3} key={product.id}>
									<Box
										onClick={() => handleClick(product.id)}
										sx={{
											backgroundColor: "gray.50",
											boxShadow: 2,
											borderRadius: 2,
											cursor: "pointer",
											"&:hover": { transform: "translateY(-8px)" },
											transition: "all 0.3s ease-in-out",
										}}
									>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												height: 260,
												padding: 2,
												backgroundColor: "gray.100",
											}}
										>
											<img
												src={product.imgSrc}
												alt={product.name}
												style={{
													objectFit: "contain",
													maxHeight: "100%",
													maxWidth: "100%",
												}}
											/>
										</Box>
										<Box sx={{ p: 3, backgroundColor: "white" }}>
											<Stack
												direction={"row"}
												alignItems={"center"}
												justifyContent={"space-between"}
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
												direction={"row"}
												alignItems={"center"}
												justifyContent={"space-between"}
											>
												<Typography
													variant='h6'
													fontWeight='bold'
													sx={{ mt: 1, color: "gray.800" }}
												>
													${product.price}
												</Typography>
												<Typography
													variant='overline'
													color={product.quantity > 0 ? "green" : "error"}
													sx={{ mt: 1 }}
												>
													{product.quantity > 0 ? "In stock" : "Out of stock"}
												</Typography>
											</Stack>
										</Box>
									</Box>
								</Grid2>
							))}
						</Grid2>
						<Divider />
						<Pagination
							count={Math.ceil(filteredProducts.length / productsPerPage)} // Total pages
							page={currentPage} // Current page
							onChange={(event, value) => handlePageChange(value)} // Handle page change
							color='primary'
							sx={{ display: "flex", justifyContent: "center", my: 3 }}
						/>
					</>	
				)}
			</Box>
		</Box>
	)
}
