import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack } from '@mui/material'

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
		<Paper sx={{ py: 4, px: 2 }}>
			<Stack spacing={4}>
				<FormControl fullWidth variant='outlined'>
					<InputLabel id='table-type' sx={{ bgcolor: 'white' }}>
						Table Type
					</InputLabel>
					<Select
						labelId='table-type'
						value={filterOption}
						onChange={(e) => setFilterOption(e.target.value)}
					>
						{tableTypes.map((type) => (
							<MenuItem key={type.value} value={type.value}>
								{type.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth variant='outlined'>
					<InputLabel id='sort-table' sx={{ bgcolor: 'white' }}>
						Sort By
					</InputLabel>
					<Select
						labelId='sort-table'
						value={sortOption}
						onChange={(e) => setSortOption(e.target.value)}
					>
						{sortOptions.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button variant='outlined' color='primary' fullWidth onClick={handleShowAll}>
					Clear Filters
				</Button>
			</Stack>
		</Paper>
	)
}
