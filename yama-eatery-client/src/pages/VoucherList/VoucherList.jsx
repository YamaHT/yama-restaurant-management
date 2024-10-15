import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, Pagination, Grid2, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { VoucherService } from '@/services/VoucherService' // Import vouchers service

const VOUCHERS_PER_PAGE = 4

function VoucherList() {
	const [vouchers, setVouchers] = useState([null]) // Initialize as null
	const [page, setPage] = useState(1)
	const navigate = useNavigate()

	// useEffect to fetch vouchers
	useEffect(() => {
		const fetchVouchers = async () => {
			try {
				const data = await VoucherService.View_All_Voucher();
				setVouchers(data) // Set fetched vouchers
			} catch (error) {
				console.error('Error fetching vouchers: ', error)
			}
		}

		fetchVouchers()
	}, []) 

	const totalPages = Math.ceil(vouchers.length / VOUCHERS_PER_PAGE)

	const displayedVouchers = vouchers.slice((page - 1) * VOUCHERS_PER_PAGE, page * VOUCHERS_PER_PAGE)

	const handlePageChange = (event, value) => {
		setPage(value)
	}

	return (
		<Grid2 container justifyContent='center'>
			<Box width={'100%'} p={'2% 5%'}>
				<Grid2 container spacing={2} mt={4} justifyContent='center'>
					{displayedVouchers.length > 0 ? (
						displayedVouchers.map((vouchers) => (
							<Grid2 item size={{ xs: 12, sm: 6 }} justifyContent={'center'} key={vouchers.id}>
								<Paper
									elevation={3}
									sx={{
										display: 'flex',
										width: '100%',
										flexDirection: 'row',
										overflow: 'hidden',
										borderRadius: '8px',
									}}
								>
									<Box
										sx={{
											color: 'black',
											p: 3,
											width: '30%',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											// backgroundImage: `url(${vouchers.image})`,
											backgroundPosition: 'center',
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
										}}
									/>
									<Stack
										width={'70%'}
										justifyContent={'center'}
										sx={{
											backgroundColor: '#fff',
											p: 2,
											textAlign: 'left',
											borderLeft: '2px dashed #ccc',
										}}
									>
										<Typography variant='h5' fontWeight='bold'>
											{vouchers.name}
										</Typography>
										<Stack direction='row' justifyContent='space-between'>
											<Typography variant='h6'>{vouchers.reducedPercent}% OFF</Typography>
											<Typography variant='h6'>Max Reduce: {vouchers.maxReducing} $</Typography>
										</Stack>
										<Typography
											variant='body1'
											sx={{
												display: '-webkit-box',
												minHeight: '3rem',
												WebkitLineClamp: 2,
												WebkitBoxOrient: 'vertical',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												width: '100%',
											}}
										>
											{vouchers.description}
										</Typography>
										<Stack direction='row' justifyContent='space-between'>
											<Typography variant='subtitle2' fontWeight='bold'>
												Expired Date: {vouchers.expiredDate}
											</Typography>
											<Typography variant='subtitle2'>Remaining: {vouchers.quantity}</Typography>
										</Stack>
										<Button variant='contained' color='error' sx={{ mt: 1, mb: 1 }}>
											REDEEM
										</Button>
									</Stack>
								</Paper>
							</Grid2>
						))
					) : (
						<Typography variant='h6' color='textSecondary'>
							No vouchers available.
						</Typography>
					)}
				</Grid2>
				<Box mt={4} display='flex' justifyContent='center'>
					<Pagination count={totalPages} page={page} onChange={handlePageChange} color='primary' />
				</Box>
			</Box>
		</Grid2>
	)
}

export default VoucherList
