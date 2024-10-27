import { Add, Close, Delete, Remove } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material'

const BookingDetail = () => {
	const details = [1, 2, 3, 4, 5, 6]
	return (
		<Dialog
			maxWidth
			sx={{
				'& .MuiDialog-paper': {
					width: 'min(900px, 90%)',
				},
			}}
			open={true}
		>
			<DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant='h6'>Table number 1 </Typography>
				<IconButton>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ maxHeight: 300 }}>
				<Stack spacing={2}>
					{details.map((detail) => (
						<Stack direction={'row'} spacing={2}>
							<Avatar sx={{ width: 50, height: 50 }} variant='rounded' />
							<Stack flexGrow={1}>
								<Stack direction={'row'} spacing={1}>
									<Typography>Product Name</Typography>
									<Divider
										sx={{ bgcolor: 'gray', width: 2 }}
										variant='middle'
										orientation='vertical'
									/>
									<Typography>Category / Subcategory</Typography>
								</Stack>
								<Typography>$0</Typography>
							</Stack>
							<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
								<Typography variant='h6'>$0</Typography>
								<ButtonGroup>
									<IconButton onClick={null}>
										<Remove />
									</IconButton>
									<Button disabled>
										<Typography variant='body1' color='textPrimary'>
											{0}
										</Typography>
									</Button>
									<IconButton onClick={null}>
										<Add />
									</IconButton>
								</ButtonGroup>
							</Stack>
							<Button variant='contained' startIcon={<Delete />}>
								Delete
							</Button>
						</Stack>
					))}
				</Stack>
			</DialogContent>
			<Divider />
			<DialogActions>
				<Stack alignItems={'start'} width={'100%'}>
					<Typography variant='h6'>Total dishes: 4</Typography>
					<Typography variant='h6'>Total price: $20</Typography>
					<Stack direction={'row'} width={'100%'} spacing={2}>
						<Button variant='contained' color='primary' size='large' fullWidth>
							Add new product
						</Button>
						<Button variant='contained' color='success' size='large' fullWidth>
							Pay booking
						</Button>
					</Stack>
				</Stack>
			</DialogActions>
		</Dialog>
	)
}

export default BookingDetail
