import TableCard from '@/components/Table/TableCard'
import TableMenu from '@/components/Table/TableMenu'
import { TableService } from '@/services/TableService'
import { Box, Grid2, Pagination, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TableList() {
	const [filteredTables, setFilteredTables] = useState([])
	const [filterOption, setFilterOption] = useState('')
	const [sortOption, setSortOption] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [tablesPerPage] = useState(8)
	const [tables, setTables] = useState([])

	const indexOfLastTable = currentPage * tablesPerPage
	const indexOfFirstTable = indexOfLastTable - tablesPerPage
	const currentTables = filteredTables.slice(indexOfFirstTable, indexOfLastTable)

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
			filtered = filtered.filter((table) => table.type === filterOption)
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
		setCurrentPage(1)
		setFilteredTables(filtered)
	}, [filterOption, sortOption, tables])

	const handleShowAll = () => {
		setFilterOption('')
		setSortOption('')
	}

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	return (
		<Grid2 container p={'5%'} spacing={2}>
			<Grid2 size={{ xs: 12, md: 3 }}>
				<TableMenu
					handleShowAll={handleShowAll}
					filterOption={filterOption}
					sortOption={sortOption}
					setFilterOption={setFilterOption}
					setSortOption={setSortOption}
				/>
			</Grid2>

			<Grid2 size={{ xs: 12, md: 9 }}>
				<Box>
					{filteredTables.length === 0 ? (
						<Typography variant='h6' align='center' sx={{ mt: 10 }}>
							No tables found matching the selected filters.
						</Typography>
					) : (
						<>
							<Grid2 container spacing={2}>
								{currentTables.map((table) => {
									return <TableCard table={table} />
								})}
							</Grid2>

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
				</Box>
			</Grid2>
		</Grid2>
	)
}
