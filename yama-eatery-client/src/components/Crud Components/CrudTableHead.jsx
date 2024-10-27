import {
	Box,
	styled,
	TableCell,
	tableCellClasses,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import React from 'react'

const CustomTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
		fontWeight: '500',
		fontSize: 16,
	},
}))

const CrudTableHead = ({ order, orderBy, onRequestSort, headCells }) => {
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<CustomTableCell
						key={headCell.name}
						align={headCell.numeric ? 'right' : 'left'}
						sortDirection={orderBy === headCell.orderData ? order : false}
						width={headCell.widthPercent + '%'}
						sx={{ textTransform: 'capitalize' }}
					>
						{headCell.name && headCell.orderData ? (
							<TableSortLabel
								active={orderBy === headCell.orderData}
								direction={orderBy === headCell.orderData ? order : 'asc'}
								onClick={createSortHandler(headCell.orderData)}
								sx={{
									'& .MuiTableSortLabel-icon': {
										color: 'white !important', // Force icon to stay white
									},
									'&.Mui-active .MuiTableSortLabel-icon': {
										color: 'white !important', // Ensure active icon is white
									},
									color: 'inherit',
									'&:hover': {
										color: 'inherit',
									},
									'&.Mui-active': {
										color: 'inherit',
									},
								}}
							>
								{headCell.name}
								{orderBy === headCell.orderData ? (
									<Box component='span' sx={visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						) : (
							headCell.name
						)}
					</CustomTableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default CrudTableHead
