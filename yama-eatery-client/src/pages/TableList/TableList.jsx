import TableMenu from '@/components/TableMenu/TableMenu'
import {
	Box,
	Button,
	CssBaseline,
	Divider,
	Grid2,
	Pagination,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const drawerWidth = 240

export default function TableList() {
	const [filteredTables, setFilteredTables] = useState([])
	const [filterOption, setFilterOption] = useState('') // For table type filtering
	const [sortOption, setSortOption] = useState('') // For sorting
	const [currentPage, setCurrentPage] = useState(1)

	const [tablesPerPage] = useState(8)
	const mockTables = [
		{
			id: 1,
			floor: 1,
			tableType: 'Small',
			img: ['https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg'], // Wooden table image
		},
		{
			id: 2,
			floor: 2,
			tableType: 'Large',
			img: ['https://images.pexels.com/photos/668982/pexels-photo-668982.jpeg'], // Large dining table image
		},
		{
			id: 3,
			floor: 1,
			tableType: 'Round',
			img: ['https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg'], // Round dining table
		},
		{
			id: 4,
			floor: 2,
			tableType: 'Private',
			img: ['https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg'], // Private dining area
		},
		{
			id: 5,
			floor: 1,
			tableType: 'Large',
			img: ['https://images.pexels.com/photos/3184190/pexels-photo-3184190.jpeg'], // Long dining table
		},
		{
			id: 6,
			floor: 3,
			tableType: 'Round',
			img: ['https://images.pexels.com/photos/842528/pexels-photo-842528.jpeg'], // Round wooden table
		},
		{
			id: 7,
			floor: 2,
			tableType: 'Small',
			img: ['https://images.pexels.com/photos/1344969/pexels-photo-1344969.jpeg'], // Small wooden table
		},
		{
			id: 8,
			floor: 1,
			tableType: 'Private',
			img: ['https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg'], // Private cabin table
		},
		{
			id: 9,
			floor: 3,
			tableType: 'Large',
			img: ['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'], // Large modern table
		},
		{
			id: 10,
			floor: 2,
			tableType: 'Round',
			img: ['https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg'], // Round cafe table
		},
		{
			id: 11,
			floor: 1,
			tableType: 'Private',
			img: ['https://images.pexels.com/photos/709817/pexels-photo-709817.jpeg'], // Private dining setup
		},
		{
			id: 12,
			floor: 3,
			tableType: 'Small',
			img: ['https://images.pexels.com/photos/599799/pexels-photo-599799.jpeg'], // Small square table
		},
		{
			id: 13,
			floor: 1,
			tableType: 'Large',
			img: ['https://images.pexels.com/photos/461429/pexels-photo-461429.jpeg'], // Large wooden dining table
		},
		{
			id: 14,
			floor: 2,
			tableType: 'Round',
			img: ['https://images.pexels.com/photos/3739407/pexels-photo-3739407.jpeg'], // Round modern table
		},
		{
			id: 15,
			floor: 3,
			tableType: 'Private',
			img: ['https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg'], // Private wooden table
		},
		{
			id: 16,
			floor: 2,
			tableType: 'Small',
			img: ['https://images.pexels.com/photos/1484518/pexels-photo-1484518.jpeg'], // Small round table
		},
		{
			id: 17,
			floor: 1,
			tableType: 'Large',
			img: ['https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg'], // Large family table
		},
		{
			id: 18,
			floor: 3,
			tableType: 'Round',
			img: ['https://images.pexels.com/photos/3739417/pexels-photo-3739417.jpeg'], // Round stone table
		},
		{
			id: 19,
			floor: 2,
			tableType: 'Private',
			img: ['https://images.pexels.com/photos/545045/pexels-photo-545045.jpeg'], // Private glass table
		},
		{
			id: 20,
			floor: 3,
			tableType: 'Small',
			img: ['https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg'], // Small cozy table
		},
	]

	const handleShowAll = () => {
		setFilterOption('')
		setSortOption('')
	}

	useEffect(() => {
		let filtered = mockTables

		// Filter by table type if an option is selected
		if (filterOption) {
			filtered = filtered.filter((table) => table.tableType === filterOption)
		}

		// Sorting based on user selection (floor sorting)
		switch (sortOption) {
			case 'low-to-high':
				filtered = filtered.sort((a, b) => a.floor - b.floor)
				break
			case 'high-to-low':
				filtered = filtered.sort((a, b) => b.floor - a.floor)
				break
			default:
				break
		}

		setFilteredTables(filtered)
	}, [filterOption, sortOption])

	const indexOfLastTable = currentPage * tablesPerPage
	const indexOfFirstTable = indexOfLastTable - tablesPerPage
	const currentTables = filteredTables.slice(indexOfFirstTable, indexOfLastTable)

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	return (
		<Box display={'flex'}>
			<CssBaseline />
			<TableMenu
				handleShowAll={handleShowAll}
				filterOption={filterOption}
				sortOption={sortOption}
				setFilterOption={setFilterOption}
				setSortOption={setSortOption}
			/>
			<Box
				component='main'
				sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
			>
				<Toolbar />
				{filteredTables.length === 0 ? (
					<Typography variant='h6' align='center' sx={{ mt: 10 }}>
						No tables found matching the selected filters.
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
							{currentTables.map((table) => (
								<Box
									key={table.id}
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
											src={table.img[0]} // Use the first image as the main image
											alt={table.tableType}
											style={{
												objectFit: 'contain',
												maxHeight: '100%',
												maxWidth: '100%',
											}}
										/>
									</Box>

									<Box sx={{ p: 3, backgroundColor: 'white' }}>
										<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
											<Typography variant='p' align='right' color='gray.800'>
												{`Floor ${table.floor}`}
											</Typography>
											<Typography variant='p' fontWeight='bold' color='gray.800'>
												{table.tableType} Table
											</Typography>
										</Stack>
										<Stack>
											<Button sx={{mt: 2}} variant='outlined' >
												Book
											</Button>
										</Stack>
									</Box>
								</Box>
							))}
						</Grid2>
						<Divider />
						<Pagination
							size='large'
							count={Math.ceil(filteredTables.length / tablesPerPage)} // Total pages
							page={currentPage} // Current page
							onChange={handlePageChange} // Handle page change
							color='primary'
							sx={{ display: 'flex', justifyContent: 'center', my: 3 }}
							disabled={filteredTables.length <= tablesPerPage} // Disable if there's only one page
						/>
					</>
				)}
			</Box>
		</Box>
	)
}
