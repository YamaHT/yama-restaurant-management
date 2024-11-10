import PropTypes from 'prop-types'
// material-ui
import {
	Box,
	Link,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'

import { NumericFormat } from 'react-number-format'

const headCells = [
	{
		align: 'left',
		disablePadding: false,
		label: 'BookingId',
	},
	{
		align: 'left',
		disablePadding: true,
		label: 'Table number',
	},
	{
		align: 'right',
		disablePadding: false,
		label: 'Total Dishes',
	},
	{
		align: 'left',
		disablePadding: false,
		label: 'Status',
	},
	{
		align: 'right',
		disablePadding: false,
		label: 'Total Payment',
	},
]

// ==============================|| ORDER TABLE - HEADER ||============================== //

function RecentBookingTableHead() {
	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						align={headCell.align}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sx={{ fontWeight: 'bolder' }}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

function BookingStatus({ status }) {
	let color

	switch (status) {
		case 'Undeposit':
			color = 'error'
			break
		case 'Booking':
			color = 'warning'
			break
		case 'Completed':
			color = 'success'
			break
		default:
			color = 'primary'
	}

	return (
		<Stack direction='row' spacing={1} alignItems='center'>
			<Typography color={color}>{status}</Typography>
		</Stack>
	)
}

// ==============================|| ORDER TABLE ||============================== //

export default function RecentBooking({ bookings }) {
	return (
		<Box>
			<TableContainer
				sx={{
					width: '100%',
					overflowX: 'auto',
					position: 'relative',
					display: 'block',
					maxWidth: '100%',
					'& td, & th': { whiteSpace: 'nowrap' },
				}}
			>
				<Table aria-labelledby='tableTitle'>
					<RecentBookingTableHead />
					<TableBody>
						{bookings?.map((booking, index) => {
							const labelId = `enhanced-table-checkbox-${index}`

							return (
								<TableRow
									hover
									role='checkbox'
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									tabIndex={-1}
								>
									<TableCell component='th' id={labelId} scope='row'>
										<Link color='secondary'> {booking.id}</Link>
									</TableCell>
									<TableCell>{booking.table.id}</TableCell>
									<TableCell align='right'>
										{booking.bookingDetails.reduce(
											(sum, bookingDetail) => sum + bookingDetail.quantity,
											0
										)}
									</TableCell>
									<TableCell>
										<BookingStatus status={booking.bookingStatus} />
									</TableCell>
									<TableCell align='right'>
										<NumericFormat
											value={booking.totalPayment}
											displayType='text'
											thousandSeparator
											prefix='$'
										/>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

RecentBookingTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string }

BookingStatus.propTypes = { status: PropTypes.number }
