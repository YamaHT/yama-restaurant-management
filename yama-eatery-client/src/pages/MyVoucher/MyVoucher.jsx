import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography, Select, MenuItem, FormControl, InputLabel, Pagination, TextField, Grid2, Stack, Chip, Tabs, Tab } from '@mui/material'
import { VoucherService } from '@/services/VoucherService' // Import vouchers service

const VOUCHERS_PER_PAGE = 4

function MyVoucher() {
	const [vouchers, setVouchers] = useState([]) // Voucher data from API
	const [filteredVouchers, setFilteredVouchers] = useState([])
	const [filter, setFilter] = useState('')
	const [page, setPage] = useState(1)
	const [dateFilter, setDateFilter] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [tabValue, setTabValue] = useState(0)

	const today = new Date()

	useEffect(() => {
		const fetchVouchers = async () => {
			try {
				const data = await VoucherService.VIEW_ALL_VOUCHER()
				setVouchers(data)
				setFilteredVouchers(data) // Initialize filtered vouchers
			} catch (error) {
				console.error('Error fetching vouchers: ', error)
			}
		}
		fetchVouchers()
	}, [])

	const filteredDate = dateFilter ? new Date(dateFilter) : null

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue)
	}

	const applyFilters = () => {
		const filtered = vouchers.filter((voucher) => {
			const voucherDate = new Date(voucher.expiredDate)
			const isExpired = voucherDate < today
			const passesTabFilter = tabValue === 0 || (tabValue === 1 && isExpired) || (tabValue === 2 && !isExpired)

			return voucher.reducedPercent >= (filter ? parseInt(filter) : 0) && (!filteredDate || voucherDate <= filteredDate) && voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) && passesTabFilter
		})
		setFilteredVouchers(filtered)
	}

	useEffect(() => {
		applyFilters()
		setPage(1) // Reset to page 1 when filters change
	}, [filter, searchTerm, dateFilter, tabValue])

	const totalPages = Math.ceil(filteredVouchers.length / VOUCHERS_PER_PAGE)
	const displayedVouchers = filteredVouchers.slice((page - 1) * VOUCHERS_PER_PAGE, page * VOUCHERS_PER_PAGE)

	const handlePageChange = (event, value) => {
		setPage(value)
		window.scrollTo(0, 0) // Scroll to top when changing page
	}

	return (
		<Box width={'100%'} p={'2% 5%'}>
			<Tabs value={tabValue} onChange={handleTabChange} centered>
				<Tab label='All' />
				<Tab label='Expired' />
				<Tab label='Valid' />
			</Tabs>
			<Grid2 container spacing={2} justifyContent='center' mt={2}>
				<Grid2 size={{ xs: 12, md: 3 }}>
					<TextField label='Search by Name' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} fullWidth />
				</Grid2>
				<Grid2 size={{ xs: 12, md: 3 }}>
					<FormControl fullWidth>
						<InputLabel>Filter by Discount (%)</InputLabel>
						<Select value={filter} label='Filter by Discount (%)' onChange={(e) => setFilter(e.target.value)}>
							{[10, 20, 30, 40, 50].map((percent) => (
								<MenuItem key={percent} value={percent}>
									{percent}%
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid2>
				<Grid2 size={{ xs: 12, md: 3 }}>
					<TextField label='Use By (Before)' type='date' value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
				</Grid2>
			</Grid2>
			<Grid2 container spacing={2} mt={4}>
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
										backgroundImage: `url(${voucher.image})`,
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
										{voucher.name}
									</Typography>
									<Stack direction='row' justifyContent='space-between'>
										<Typography variant='h6'>{voucher.reducedPercent}% OFF</Typography>
										<Typography variant='h6'>Max Reduce: {voucher.maxReducing}$</Typography>
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
										<Typography variant='subtitle2'>Remaining: {voucher.quantity}</Typography>
									</Stack>
									<Chip label={new Date(voucher.expiredDate) < today ? 'Expired' : 'Valid'} color={new Date(voucher.expiredDate) < today ? 'secondary' : 'primary'} sx={{ mt: 1 }} />
								</Stack>
							</Paper>
						</Grid2>
					))
				) : (
					<Typography variant='h6' color='textSecondary'>
						No vouchers available for the selected filters.
					</Typography>
				)}
			</Grid2>
			<Box mt={4} display='flex' justifyContent='center'>
				<Pagination count={totalPages} page={page} onChange={handlePageChange} color='primary' />
			</Box>
		</Box>
	)
}

export default MyVoucher
