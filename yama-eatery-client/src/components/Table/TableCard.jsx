import { AssetImages } from '@/utilities/AssetImages'
import { Box, Grid2, Stack, Typography } from '@mui/material'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const TableCard = ({table}) => {
	const navigate = useNavigate()

    const handleClick = (id) => {
		navigate(`/table/detail/${id}`)
	}

	return (
		<Grid2
			xs={12}
			sm={4}
			md={3}
			key={table.id}
			onClick={() => handleClick(table.id)}
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
						{table.type} Table
					</Typography>
				</Stack>
			</Box>
		</Grid2>
	)
}

export default TableCard
