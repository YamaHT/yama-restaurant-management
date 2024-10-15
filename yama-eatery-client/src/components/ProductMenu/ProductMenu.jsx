import { EnumService } from '@/services/EnumService'
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Paper,
	Select,
	Slider,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

export default function ProductMenu({
	products,
	priceRange,
	setPriceRange,
	sortOption,
	setSearchTerm,
	setSortOption,
	setSelectedCategories,
}) {
	const [categories, setCategories] = useState([])

	const [checkedCategories, setCheckedCategories] = useState({})

	useEffect(() => {
		const fetchCategories = async () => {
			const data = await EnumService.getAllCategory()
			if (data) {
				setCategories(data)

				const initialCheckedCategories = data.reduce((acc, category) => {
					acc[category.name] = category.subCategories.map(() => false)
					return acc
				}, {})
				setCheckedCategories(initialCheckedCategories)
			}
		}

		fetchCategories()
	}, [])

	useEffect(() => {
		const selectedCategories = {}
	
		Object.keys(checkedCategories).forEach((category) => {
			const subcategories = categories
				.find((cat) => cat.name === category)
				?.subCategories.filter((_, index) => checkedCategories[category][index])
	
			if (subcategories?.length > 0) {
				selectedCategories[category] = subcategories.map((sub) => sub.name) 
			}
		})
	
		setSelectedCategories(selectedCategories)
	}, [checkedCategories, categories])
	

	const handleCategoryChange = (category, index) => (event) => {
		const newChecked = [...checkedCategories[category]]
		newChecked[index] = event.target.checked
		setCheckedCategories({ ...checkedCategories, [category]: newChecked })
	}

	const handleParentCategoryChange = (category) => (event) => {
		const newChecked = Array(checkedCategories[category].length).fill(event.target.checked)
		setCheckedCategories({ ...checkedCategories, [category]: newChecked })
	}

	const renderSubCategories = (category, subcategories) => (
		<FormGroup sx={{ ml: 3 }}>
			{subcategories.map((sub, idx) => (
				<FormControlLabel
					key={sub.id} 
					control={
						<Checkbox
							checked={checkedCategories[category]?.[idx] || false} 
							onChange={handleCategoryChange(category, idx)}
						/>
					}
					label={sub.name} 
				/>
			))}
		</FormGroup>
	)

	const resetCategory = () => {
		const resetCheckedCategories = categories.reduce((acc, category) => {
			acc[category.name] = category.subCategories.map(() => false)
			return acc
		}, {})
		setCheckedCategories(resetCheckedCategories)
	}

	const handleShowAll = () => {
		setPriceRange([0, 1000])
		setSortOption('')
		setSearchTerm('')
		resetCategory()
		setSelectedCategories({})
	}

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
				{categories.map((category) => (
					<Box ml={2} key={category.id}>
						<FormControlLabel
							control={
								<Checkbox
									checked={checkedCategories[category.name]?.every(Boolean) || false}
									indeterminate={
										checkedCategories[category.name]?.some(Boolean) &&
										!checkedCategories[category.name]?.every(Boolean)
									}
									onChange={handleParentCategoryChange(category.name)}
								/>
							}
							label={category.name.charAt(0).toUpperCase() + category.name.slice(1)}
						/>
						{renderSubCategories(category.name, category.subCategories)}
					</Box>
				))}
			</Box>
		</Paper>
	)
}
