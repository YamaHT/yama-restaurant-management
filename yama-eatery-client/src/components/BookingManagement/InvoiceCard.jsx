import { formatDateWithDateTime } from '@/utilities/FormatUtil'
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'

const InvoiceCard = ({ booking }) => {
	const isDepositTable = booking.depositPrice !== 0

	return (
		<Card
			sx={{
				minHeight: 150,
				bgcolor: isDepositTable ? '#ff04' : '',
			}}
		>
			<CardActionArea sx={{ height: '100%', display: 'flex' }}>
				<CardContent
					sx={{
						width: '100%',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box width={'100%'}>
						<Typography variant='body1'>Total dishes: {booking.bookingDetails.length}</Typography>
						<Typography variant='body1'>
							Payment: ${booking.remainPayment} / {booking.totalPayment}
						</Typography>
						<Typography noWrap variant='body1'>
							Billing: {formatDateWithDateTime(booking.newPaymentDate)}
						</Typography>
					</Box>

					<Typography align='center' variant='h4' fontWeight={'bold'}>
						Table {booking.table.id}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default InvoiceCard
