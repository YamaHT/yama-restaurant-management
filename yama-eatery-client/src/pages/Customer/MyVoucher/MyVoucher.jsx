import React, { useEffect, useState } from 'react'
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
import { UserService } from '@/services/UserService'

const VOUCHERS_PER_PAGE = 4

function MyVoucher() {
	const [voucherData, setVoucherData] = useState([])
	const [filteredVoucherData, setFilteredVoucherData] = useState([]) 
	const [filterValue, setFilterValue] = useState('') 
	const [selectedDiscount, setSelectedDiscount] = useState('') 
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('') 
	const [tabValue, setTabValue] = useState(0) 
	const today = new Date()

	useEffect(() => {
		const fetchVoucherData = async () => {
			try {
				const data = await UserService.MY_VOUCHER()
				console.log(data)
				setVoucherData(data)
				setFilteredVoucherData(data)
			} catch (error) {
				console.error('Lỗi khi lấy dữ liệu voucher: ', error)
			}
		}
		fetchVoucherData()
	}, [])

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue)
		if (newValue === 0) {
			setFilterValue('')
			setSearchTerm('') 
		}
	}

	const applyFilters = () => {
		const filtered = voucherData.filter((voucher) => {
			const voucherDate = new Date(voucher.expiredDate)
			const isExpired = voucherDate < today
			const passesTabFilter =
				tabValue === 0 || (tabValue === 1 && isExpired) || (tabValue === 2 && !isExpired)

			const voucherName = voucher.voucher.name ? voucher.voucher.name.toLowerCase() : '' 

			const isDiscountValid = selectedDiscount
				? voucher.voucher.reducedPercent >= parseInt(selectedDiscount)
				: true

			return (
				isDiscountValid && 
				voucherName.includes(searchTerm.toLowerCase()) && 
				passesTabFilter 
			)
		})
		setFilteredVoucherData(filtered)
	}

	useEffect(() => {
		applyFilters()
		setPage(1)
	}, [filterValue, searchTerm, selectedDiscount, tabValue]) 

	const totalPages = Math.ceil(filteredVoucherData.length / VOUCHERS_PER_PAGE)
	const displayedVoucherData = filteredVoucherData.slice(
		(page - 1) * VOUCHERS_PER_PAGE,
		page * VOUCHERS_PER_PAGE
	)

	const handlePageChange = (event, value) => {
		setPage(value)
		window.scrollTo(0, 0)
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
							value={selectedDiscount}
							label='Filter by Discount (%)'
							onChange={(e) => setSelectedDiscount(e.target.value)}
						>
							<MenuItem value=''>All</MenuItem> 
							{[10, 20, 30, 40, 50].map((percent) => (
								<MenuItem key={percent} value={percent}>
									{percent}%
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid2>
			</Grid2>
			<Grid2 container spacing={2} mt={4}>
				{displayedVoucherData.length > 0 ? (
					displayedVoucherData.map((voucher) => (
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
										{voucher.voucher.name}
									</Typography>
									<Stack direction='row' justifyContent='space-between'>
										<Typography variant='h6'>{voucher.voucher.reducedPercent}% OFF</Typography>
										<Typography variant='h6'>Max Reduce: {voucher.voucher.maxReducing}$</Typography>
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
										{voucher.voucher.description}
									</Typography>
									<Stack direction='row' justifyContent='space-between'>
										<Typography variant='subtitle2' fontWeight='bold'>
											Expired Date: {voucher.voucher.expiredDate}
										</Typography>
										<Typography variant='subtitle2'>
											Remaining: {voucher.voucher.quantity}
										</Typography>
									</Stack>
									<Chip
										label={new Date(voucher.voucher.expiredDate) < today ? 'Expired' : 'Valid'}
										color={new Date(voucher.voucher.expiredDate) < today ? 'secondary' : 'primary'}
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
