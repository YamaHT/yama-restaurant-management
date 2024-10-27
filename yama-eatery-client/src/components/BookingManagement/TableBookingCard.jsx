import { AssetImages } from '@/utilities/AssetImages'
import {
	Avatar,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Stack,
	Typography,
} from '@mui/material'
import React from 'react'

const TableBookingCard = ({ table }) => {
	return (
		<Card sx={{ height: 150 }}>
			<CardActionArea sx={{ height: '100%', display: 'flex' }}>
				<CardMedia
					component={Avatar}
					variant='square'
					sx={{
						width: '40%',
						height: '100%',
						objectFit: 'cover',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					src={AssetImages.TableImage(table.image?.[0])}
				/>
				<CardContent
					sx={{
						width: '60%',
						height: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'column',
					}}
				>
					<Stack direction={'row'} justifyContent={'space-between'}>
						<Typography variant='subtitle2'>Type: {table.type}</Typography>
						<Typography variant='subtitle2'>Floor: {table.floor}</Typography>
					</Stack>
					<Typography align='center' variant='h4' fontWeight={'bold'}>
						Table {table.id}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default TableBookingCard
