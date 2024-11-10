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

const TableBookingCard = ({ booking }) => {
	const isDepositTable = booking.depositPrice !== 0
	const isTroubleTable = booking.bookingDetails.some(
		(bookingDetail) => bookingDetail.cookingStatus === 'InTrouble'
	)

	return (
		<Card
			sx={{
				height: 150,
				bgcolor: isTroubleTable
					? isDepositTable
						? '#F004'
						: '#F908'
					: isDepositTable
					? '#FF04'
					: 'default',
			}}
		>
			<CardActionArea sx={{ height: '100%', display: 'flex' }}>
				<CardMedia
					component={() => (
						<Avatar
							src={AssetImages.TableImage(booking.table.image?.[0])}
							variant='square'
							sx={{
								width: '40%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
					)}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
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
						<Typography variant='subtitle2'>Type: {booking.table.type}</Typography>
						<Typography variant='subtitle2'>Floor: {booking.table.floor}</Typography>
					</Stack>
					<Typography align='center' variant='h4' fontWeight={'bold'}>
						Table {booking.table.id}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default TableBookingCard
