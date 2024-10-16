import TableMenu from '@/components/TableMenu/TableMenu'
import { TableRequest } from '@/requests/TableRequest'
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
import { TableService } from '@/services/TableService'
import { AssetImages } from '@/utilities/AssetImages'


export default function TableList() {
	const [filteredTables, setFilteredTables] = useState([])
	const [filterOption, setFilterOption] = useState('')
	const [sortOption, setSortOption] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [tablesPerPage] = useState(8)

	const [tables, setTables] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		async function fetchTables() {
			const data = await TableService.GET_ALL()
			if (data) {
				setTables(data)
				console.log(data)
			}
		}
		fetchTables()
	}, [])

	useEffect(() => {
		let filtered = tables
		if (filterOption) {
			filtered = filtered.filter((table) => table.tableType === filterOption)
		}
		switch (sortOption) {
			case 'low-to-high':
				filtered = filtered.sort((a, b) => b.floor - a.floor)
				break
			case 'high-to-low':
				filtered = filtered.sort((a, b) => a.floor - b.floor)
				break
			default:
				break
		}
	
		setFilteredTables(filtered)
	}, [filterOption, sortOption, tables])
	

	const indexOfLastTable = currentPage * tablesPerPage
	const indexOfFirstTable = indexOfLastTable - tablesPerPage
	const currentTables = filteredTables.slice(indexOfFirstTable, indexOfLastTable)
	const handleShowAll = () => {
		setFilterOption('')
		setSortOption('')
	}

	const handlePageChange = (event, value) => {
		setCurrentPage(value)	
	}

	const handleClick = (id) => {
		navigate(`/table/detail/${id}`)
	}

	return (
		<Grid2 container spacing={2} p={'5%'}>
			<Grid2 size={3}>
				<TableMenu
					handleShowAll={handleShowAll}
					filterOption={filterOption}
					sortOption={sortOption}
					setFilterOption={setFilterOption}
					setSortOption={setSortOption}
				/>
			</Grid2>
			<Grid2 size={9}>
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
									onClick={() => handleClick(table.id)}
								>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
											height: 260,
											backgroundColor: 'gray.100',
										}}
									>
										<img
											src={AssetImages.TableImage(table.image[0])}
											alt={table.tableType}
											style={{
												objectFit: 'fill',
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
							count={Math.ceil(filteredTables.length / tablesPerPage)}
							page={currentPage}
							onChange={handlePageChange}
							color='primary'
							sx={{ display: 'flex', justifyContent: 'center', my: 3 }}
							disabled={filteredTables.length <= tablesPerPage}
						/>
					</>
				)}
			</Grid2>
		</Grid2>
	)
}
