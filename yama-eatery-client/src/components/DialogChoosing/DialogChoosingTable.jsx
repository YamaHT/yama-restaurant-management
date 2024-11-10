import { BookingManagementService } from '@/services/BookingManagementService'
import { AssetImages } from '@/utilities/AssetImages'
import { Close } from '@mui/icons-material'
import {
	Avatar,
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid2,
	IconButton,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const DialogChoosingTable = ({ open, date, dayPart, handleClose, handleSelectTable }) => {
	const [tables, setTables] = useState([])

	useEffect(() => {
		async function fetchTables() {
			const data = await BookingManagementService.GET_TABLES_NOT_BOOKED(date, dayPart)
			if (data) {
				setTables(data)
			}
		}
		fetchTables()
	}, [open, date, dayPart])

	const handleClick = (tableId) => {
		handleSelectTable(tableId)
		handleClose()
	}

	return (
		<Dialog
			open={open}
			maxWidth
			onClose={handleClose}
			PaperProps={{ sx: { bgcolor: '#eee', width: '100%' } }}
		>
			<DialogTitle display={'flex'} alignItems={'center'}>
				<Typography variant='h6' flexGrow={1}>
					List available table
				</Typography>
				<IconButton onClick={() => handleClose()}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				{tables && tables.length > 0 ? (
					<Grid2 container spacing={2}>
						{tables.map((table) => (
							<Grid2 size={{ xs: 6, sm: 3, md: 2 }} key={table.id}>
								<Card>
									<CardActionArea onClick={() => handleClick(table.id)}>
										<CardMedia
											component={() => (
												<Avatar
													src={AssetImages.TableImage(table.image?.[0])}
													variant='square'
													sx={{
														width: '100%',
														height: 150,
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
												display: 'flex',
												justifyContent: 'space-between',
												flexDirection: 'column',
											}}
										>
											<Stack direction={'row'} justifyContent={'space-between'}>
												<Typography variant='subtitle1'>Type: {table.type}</Typography>
												<Typography variant='subtitle1'>Floor: {table.floor}</Typography>
											</Stack>
											<Typography align='center' variant='h5' fontWeight={'bold'}>
												Table {table.id}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid2>
						))}
					</Grid2>
				) : (
					<Typography variant='subtitle1'>No tables are available</Typography>
				)}
			</DialogContent>
			<DialogActions>
				<Button color='inherit' onClick={handleClose}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DialogChoosingTable
