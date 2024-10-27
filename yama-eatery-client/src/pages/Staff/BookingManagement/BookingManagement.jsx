import TableBookingCard from '@/components/BookingManagement/TableBookingCard'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import DialogChoosingTable from '@/components/DialogChoosing/DialogChoosingTable'
import { Add } from '@mui/icons-material'
import { Box, Button, Grid2, Typography } from '@mui/material'
import { useState } from 'react'
import BookingDetail from './BookingDetail'

const BookingManagement = () => {
	const [searchNumber, setSearchNumber] = useState(null)
	const [openTableChoosing, setOpenTableChoosing] = useState(false)

	const handleSelectTable = (tableId) => {
		console.log(tableId)
	}

	return (
		<Box>
			<BookingDetail />
			<Typography variant='h5' fontWeight={'bold'}>
				Booking Management
			</Typography>
			<Box my={2}>
				<CrudSearchBar
					listItem={[]}
					widthPercent={50}
					placeholder={'Search table number...'}
					value={searchNumber}
					handleChange={setSearchNumber}
				/>
			</Box>
			<Grid2 container spacing={2}>
				<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
					<Button
						onClick={() => setOpenTableChoosing(true)}
						sx={{
							width: '100%',
							height: 150,
							fontSize: '2rem',
							'& .MuiSvgIcon-root': { fontSize: '2rem' },
						}}
						variant='outlined'
						startIcon={<Add sx={{ bgcolor: 'primary.main', color: 'white' }} />}
					>
						Add new table
					</Button>
					{openTableChoosing && (
						<DialogChoosingTable
							open={openTableChoosing}
							handleClose={() => setOpenTableChoosing(false)}
							handleSelectTable={handleSelectTable}
						/>
					)}
				</Grid2>
				<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
					<TableBookingCard table={{ image: null, floor: 1, id: 1, type: 'private' }} />
				</Grid2>
				<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
					<TableBookingCard table={{ image: null, floor: 1, id: 1, type: 'private' }} />
				</Grid2>
				<Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
					<TableBookingCard table={{ image: null, floor: 1, id: 1, type: 'private' }} />
				</Grid2>
			</Grid2>
		</Box>
	)
}

export default BookingManagement
