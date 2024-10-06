import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export default function TableMenu({
	filterOption,
	setFilterOption,
	sortOption,
	setSortOption,
	handleShowAll,
}) {
	// Table type filter options
	const tableTypes = [
		{ label: 'Small', value: 'Small' },
		{ label: 'Large', value: 'Large' },
		{ label: 'Round', value: 'Round' },
		{ label: 'Private', value: 'Private' },
	]

	const sortOptions = [
		{ label: 'Floor: Low to High', value: 'low-to-high' },
		{ label: 'Floor: High to Low', value: 'high-to-low' },
	]

	return (
		<Box sx={{ mt: 8, p: 3, width: 240 }}>
			<FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
				<InputLabel sx={{ ml: 1, backgroundColor: 'rgba(236, 236, 236, 1)', paddingRight: '4px' }}>
					Table Type
				</InputLabel>
				<Select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
					<MenuItem value=''>All</MenuItem>
					{tableTypes.map((type) => (
						<MenuItem key={type.value} value={type.value}>
							{type.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
				<InputLabel sx={{ ml: 1, backgroundColor: 'rgba(236, 236, 236, 1)', paddingRight: '4px' }}>
					Sort By
				</InputLabel>
				<Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
					{sortOptions.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<Button variant='outlined' color='primary' fullWidth onClick={handleShowAll}>
				Reset Filters
			</Button>
		</Box>
	)
}
