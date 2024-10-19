import { EnumService } from '@/services/EnumService'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
export default function TableMenu({
	filterOption,
	setFilterOption,
	sortOption,
	setSortOption,
	handleShowAll,
}) {
	const [tableTypes, setTableTypes] = useState([])

	const sortOptions = [
		{ label: 'Floor: Low to High', value: 'low-to-high' },
		{ label: 'Floor: High to Low', value: 'high-to-low' },
	]
	useEffect(() => {
		const fetchTableTypes = async () => {
			const data = await EnumService.GET_ALL_TABLE_TYPE()
			console.log(data)
			if (data) {
				setTableTypes(data)
			}
		}
		fetchTableTypes()
	}, [])

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
							<MenuItem key={type} value={type}>
								{type}
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
				<Button variant='contained' color='primary' fullWidth onClick={handleShowAll}>
					Clear Filters
				</Button>
			</Stack>  
		</Paper>
	)
}
