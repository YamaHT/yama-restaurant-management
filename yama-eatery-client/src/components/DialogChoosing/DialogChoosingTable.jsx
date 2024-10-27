import { TableService } from '@/services/TableService'
import { AssetImages } from '@/utilities/AssetImages'
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
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const DialogChoosingTable = ({ open, handleClose, handleSelectTable }) => {
	const [tables, setTables] = useState([])

	useEffect(() => {
		async function fetchProducts() {
			const data = await TableService.GET_ALL()
			if (data) {
				setTables(data)
			}
		}
		fetchProducts()
	}, [open])

	const handleClick = (tableId) => {
		handleSelectTable(tableId)
		handleClose()
	}

	return (
		<Dialog open={open} maxWidth onClose={handleClose} PaperProps={{ sx: { bgcolor: '#eee' } }}>
			<DialogTitle>List available table</DialogTitle>
			<DialogContent>
				{tables && tables.length > 0 ? (
					<Grid2 container spacing={2}>
						{tables.map((table) => (
							<Grid2 size={{ xs: 6, sm: 3, md: 2 }} key={table.id}>
								<Card>
									<CardActionArea onClick={() => handleClick(table.id)}>
										<CardMedia
											component={Avatar}
											variant='square'
											src={AssetImages.ProductImage(table.image?.[0])}
											sx={{
												width: '100%',
												height: 150,
												objectFit: 'cover',
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
