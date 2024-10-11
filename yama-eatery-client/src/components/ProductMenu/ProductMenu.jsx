import { Box, Button, MenuItem, Paper, Select, Slider, Toolbar, Typography } from '@mui/material'

export default function ProductMenu({
	handleShowAll,
	priceRange,
	setPriceRange,
	sortOption,
	setSortOption,
	filterOption,
	setFilterOption,
}) {
	return (
		<Paper sx={{ p: 2 }}>
			<Button variant='contained' onClick={handleShowAll} fullWidth>
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
					sx={{ borderRadius: '15px', width: '100%' }}
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
					displayEmpty
				>
					<MenuItem value=''>Sort by</MenuItem>
					<MenuItem value='low-to-high'>Price: Low to High</MenuItem>
					<MenuItem value='high-to-low'>Price: High to Low</MenuItem>
					<MenuItem value='rating-high-to-low'>Rating: High to Low</MenuItem>
					<MenuItem value='rating-low-to-high'>Rating: Low to High</MenuItem>
					<MenuItem value='a-to-z'>Name: A-Z</MenuItem>
					<MenuItem value='z-to-a'>Name: Z-A</MenuItem>
				</Select>
			</Box>
			<Box sx={{ p: 2 }}>
				<Typography variant='h6'>Category</Typography>
				<Select
					variant='outlined'
					sx={{ borderRadius: '15px', width: '100%' }}
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
		</Paper>
	)
}
