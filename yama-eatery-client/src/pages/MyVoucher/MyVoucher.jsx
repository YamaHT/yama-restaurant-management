import React, { useState } from 'react'
import {
	Box,
	Paper,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Pagination,
	TextField,
	Grid2,
	Stack,
	Chip,
	Tabs,
	Tab,
} from '@mui/material'

const vouchers = [
	{
		id: 1,
		image:
			'https://th.bing.com/th/id/OIP.nERqFvU2EjT69-juJkgQzAHaKX?pid=ImgDet&w=184&h=258&c=7&dpr=1.3',
		name: 'Voucher Black Friday',
		description: 'Giảm giá Black Friday lên đến 50%',
		expiredDate: '2024-11-25',
		reducedPercent: 50,
		maxReducing: 200,
		quantity: 100,
	},
	{
		id: 2,
		image:
			'https://th.bing.com/th/id/OIP.nERqFvU2EjT69-juJkgQzAHaKX?pid=ImgDet&w=184&h=258&c=7&dpr=1.3',
		name: 'Voucher Cyber Monday',
		description: 'Ưu đãi Cyber Monday ',
		expiredDate: '2024-12-02',
		reducedPercent: 30,
		maxReducing: 150,
		quantity: 200,
	},
	{
		id: 3,
		image:
			'https://th.bing.com/th/id/OIP.nERqFvU2EjT69-juJkgQzAHaKX?pid=ImgDet&w=184&h=258&c=7&dpr=1.3',
		name: 'Voucher Giáng Sinh',
		description: 'Giảm giá đặc biệt cho mùa lễ Giáng Sinh',
		expiredDate: '2024-12-25',
		reducedPercent: 40,
		maxReducing: 300,
		quantity: 50,
	},
	{
		id: 4,
		image:
			'https://th.bing.com/th/id/OIP.nERqFvU2EjT69-juJkgQzAHaKX?pid=ImgDet&w=184&h=258&c=7&dpr=1.3',
		name: 'Voucher Mùa Xuân',
		description: 'Chương trình khuyến mãi mùa xuân',
		expiredDate: '2024-04-10',
		reducedPercent: 20,
		maxReducing: 100,
		quantity: 150,
	},
]

const VOUCHERS_PER_PAGE = 4

function MyVoucher() {
	const [filter, setFilter] = useState('')
	const [page, setPage] = useState(1)
	const [dateFilter, setDateFilter] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [tabValue, setTabValue] = useState(0)

	const today = new Date()

	const filteredDate = dateFilter ? new Date(dateFilter) : null

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue)
	}

	const filteredVouchers = vouchers.filter((voucher) => {
		const voucherDate = new Date(voucher.expiredDate)
		const isExpired = voucherDate < today
		const passesTabFilter =
			tabValue === 0 || (tabValue === 1 && isExpired) || (tabValue === 2 && !isExpired)

		return (
			voucher.reducedPercent >= (filter ? parseInt(filter) : 0) &&
			(!filteredDate || voucherDate <= filteredDate) &&
			voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			passesTabFilter
		)
	})

	const totalPages = Math.ceil(filteredVouchers.length / VOUCHERS_PER_PAGE)
	const displayedVouchers = filteredVouchers.slice(
		(page - 1) * VOUCHERS_PER_PAGE,
		page * VOUCHERS_PER_PAGE
	)

	const handlePageChange = (event, value) => {
		setPage(value)
	}

	return (
		<Box width={'100%'} p={'2% 5%'}>
			<Tabs value={tabValue} onChange={handleTabChange} centered variant='fullWidth'>
				<Tab label='All' />
				<Tab label='Expired' />
				<Tab label='Valid' />
			</Tabs>
			<Grid2 container spacing={2} justifyContent='center' mt={2}>
				<Grid2 size={{ xs: 12, md: 3 }}>
					<TextField
						label='Search by Name'
						onChange={(e) => setSearchTerm(e.target.value)}
						fullWidth
					/>
				</Grid2>
				<Grid2 size={{ xs: 12, md: 3 }}>
					<FormControl fullWidth>
						<InputLabel>Filter by Discount (%)</InputLabel>
						<Select
							value={filter}
							label='Filter by Discount (%)'
							onChange={(e) => setFilter(e.target.value)}
						>
							{[1, 2, 3, 4, 5].map((percent) => (
								<MenuItem key={percent} value={percent}>
									{percent * 10}%
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid2>
				<Grid2 size={{ xs: 12, md: 3 }} xs={12} md={3}>
					<TextField
						label='Use By (Before)'
						type='date'
						value={dateFilter}
						onChange={(e) => setDateFilter(e.target.value)}
						fullWidth
						InputLabelProps={{ shrink: true }}
					/>
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
									<Chip
										label={new Date(voucher.expiredDate) < today ? 'Expired' : 'Valid'}
										color={new Date(voucher.expiredDate) < today ? 'secondary' : 'primary'}
										sx={{ mt: 1 }}
									/>
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
