import TableMenu from '@/components/TableMenu/TableMenu'
import {
	Box,
	CssBaseline,
	Divider,
	Grid2,
	Pagination,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tables } from '../TableMockData/TableMockData'

const drawerWidth = 240

export default function TableList() {
	const [filteredTables, setFilteredTables] = useState([]) // State for filtered tables
	const [filterOption, setFilterOption] = useState('') // For table type filtering
	const [sortOption, setSortOption] = useState('') // For sorting
	const [currentPage, setCurrentPage] = useState(1) // Current page state
	const [tablesPerPage] = useState(8) // Tables per page

	const navigate = useNavigate() // Initialize the useNavigate hook for navigation

	const handleShowAll = () => {
		setFilterOption('')
		setSortOption('')
	}

	useEffect(() => {
		let filtered = tables // Use imported tables

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

		setFilteredTables(filtered) // Set filtered tables state
	}, [filterOption, sortOption])

	// Pagination logic
	const indexOfLastTable = currentPage * tablesPerPage
	const indexOfFirstTable = indexOfLastTable - tablesPerPage
	const currentTables = filteredTables.slice(indexOfFirstTable, indexOfLastTable)

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	const handleClick = (id) => {
		navigate(`/Table/Detail/${id}`)
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
									xs: 'repeat(1, 1fr)',
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
									onClick={() => handleClick(table.id)} // Handle click event
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
											<Typography variant='body1' align='right' color='gray.800'>
												{`Floor ${table.floor}`}
											</Typography>
											<Typography variant='body1' fontWeight='bold' color='gray.800'>
												{table.tableType} Table
											</Typography>
										</Stack>
									</Box>
								</Box>
							))}
						</Grid2>
						<Divider sx={{ mt: 2 }} />
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
