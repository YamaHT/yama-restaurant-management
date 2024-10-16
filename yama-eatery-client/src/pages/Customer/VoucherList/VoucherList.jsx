import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, Button, Pagination, Grid2, Stack, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { VoucherService } from '@/services/VoucherService' // Import vouchers service
import { VoucherRequest } from '@/requests/VoucherRequest'

const VOUCHERS_PER_PAGE = 4

function VoucherList() {
	const [vouchers, setVouchers] = useState([])
	const [filteredVouchers, setFilteredVouchers] = useState([]) // State to store filtered vouchers
	const [filterValue, setFilterValue] = useState('') // State for the search input
	const [selectedDiscount, setSelectedDiscount] = useState('') // State for the selected discount
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [displayedVouchers, setDisplayedVouchers] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		const fetchVouchers = async () => {
			try {
				const data = await VoucherService.VIEW_ALL_VOUCHER()
				setVouchers(data)
				setFilteredVouchers(data) 
			} catch (error) {
				console.error('Error fetching vouchers: ', error)
			}
		}
		fetchVouchers()
	}, [])
	useEffect(() => {
		const startIndex = (page - 1) * VOUCHERS_PER_PAGE
		const endIndex = startIndex + VOUCHERS_PER_PAGE // Ensure endIndex is calculated correctly

		setTotalPages(filteredVouchers.length > 0 ? Math.ceil(filteredVouchers.length / VOUCHERS_PER_PAGE) : 1)
		setDisplayedVouchers(filteredVouchers.slice(startIndex, endIndex))
	}, [filteredVouchers, page])

	const handleSearchChange = (e) => {
		const value = e.target.value
		setFilterValue(value)
		applyFilters(value, selectedDiscount) // Apply filters whenever search input changes
		setPage(1) // Reset page to 1 when searching
	}

	const handleDiscountChange = (e) => {
		const value = e.target.value
		setSelectedDiscount(value)
		applyFilters(filterValue, value) // Apply filters whenever discount selection changes
		setPage(1) // Reset page to 1 when filtering
	}

	const applyFilters = (nameSearch, discount) => {
		let filtered = vouchers

		// Filter by discount percentage if selected (>= condition)
		if (discount) {
			const numericDiscount = parseInt(discount, 10)
			filtered = filtered.filter((voucher) => voucher.reducedPercent >= numericDiscount)
		}

		// Filter by name search
		if (nameSearch) {
			filtered = filtered.filter((voucher) => voucher.name.toLowerCase().includes(nameSearch.toLowerCase()))
		}

		setFilteredVouchers(filtered)
	}

	const handlePageChange = (event, value) => {
		setPage(value) // Update current page
		window.scrollTo(0, 0) // Scroll to the top when changing page
	}

	return (
		<Grid2 container justifyContent='center'>
			<Box width={'100%'} p={'2% 5%'}>
				{/* Search and Filter Inputs */}
				<Box display='flex' justifyContent='center' mb={3} gap={2}>
					<Grid2 xs={12} md={6} display='flex' justifyContent='center'>
						<TextField
							label='Search by Name'
							variant='outlined'
							value={filterValue}
							onChange={handleSearchChange}
							fullWidth // Chiếm toàn bộ chiều rộng
						/>
					</Grid2>
					<Grid2 xs={12} md={6} display='flex' justifyContent='center'>
						<FormControl variant='outlined' fullWidth>
							<InputLabel id='discount-select-label'>Filter by Discount (%)</InputLabel>
							<Select
								labelId='discount-select-label'
								value={selectedDiscount}
								onChange={handleDiscountChange}
								label='Filter by Discount (%)'
								sx={{ minWidth: 250 }} // Điều chỉnh chiều rộng tối thiểu nếu cần
							>
								{[10, 20, 30, 40, 50].map((percent) => (
									<MenuItem key={percent} value={percent}>
										{percent}%
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid2>
				</Box>

				<Grid2 container spacing={2} mt={4} justifyContent='center'>
					{displayedVouchers.length > 0 ? (
						displayedVouchers.map((voucher) => (
							<Grid2 item size={{ xs: 12, sm: 6 }} justifyContent={'center'} key={voucher.id}>
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
											backgroundPosition: 'center',
											backgroundSize: 'cover',
											backgroundRepeat: 'no-repeat',
										}}
										style={{ backgroundImage: `url(${voucher.image})` }}
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
											{voucher.name}
										</Typography>
										<Stack direction='row' justifyContent='space-between'>
											<Typography variant='h6'>{voucher.reducedPercent}% OFF</Typography>
											<Typography variant='h6'>Max Reduce: {voucher.maxReducing} $</Typography>
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
											{voucher.description}
										</Typography>
										<Stack direction='row' justifyContent='space-between'>
											<Typography variant='subtitle2' fontWeight='bold'>
												Expired Date: {voucher.expiredDate}
											</Typography>
											<Typography fontWeight='bold' variant='subtitle2'>
												Remaining: {voucher.quantity}
											</Typography>
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
