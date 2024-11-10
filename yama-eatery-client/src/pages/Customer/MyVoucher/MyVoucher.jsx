import {
	Box,
	Chip,
	FormControl,
	Grid2,
	InputLabel,
	MenuItem,
	Pagination,
	Paper,
	Select,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { UserService } from '@/services/UserService'
import { AssetImages } from '@/utilities/AssetImages'
import CrudTabs from '@/components/Crud Components/CrudTabs'
const VOUCHERS_PER_PAGE = 4

function MyVoucher() {
	const [filterValue, setFilterValue] = useState('')
	const [selectedDiscount, setSelectedDiscount] = useState('')
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const [tabValue, setTabValue] = useState(0)
	const [vouchers, setVouchers] = useState([])
	const [filteredVouchers, setFilteredVouchers] = useState([])
	const today = new Date()

	useEffect(() => {
		const fetchVoucherData = async () => {
			const data = await UserService.MY_VOUCHER()
			if (data) {
				setVouchers(data)
				setFilteredVouchers(data)
			}
		}
		fetchVoucherData()
	}, [])

	const applyFilters = () => {
		const filtered = vouchers.filter((voucher) => {
			const voucherDate = new Date(voucher.voucher.expiredDate)
			const isExpired = voucherDate < today

			const passesTabFilter =
				tabValue === 0 ||
				(tabValue === 1 && voucher.isUsed) ||
				(tabValue === 2 && isExpired) ||
				(tabValue === 3 && !isExpired && !voucher.isUsed)

			const voucherName = voucher.voucher.name ? voucher.voucher.name.toLowerCase() : ''
			const isDiscountValid = selectedDiscount
				? voucher.voucher.reducedPercent >= parseInt(selectedDiscount)
				: true

			return isDiscountValid && voucherName.includes(searchTerm.toLowerCase()) && passesTabFilter
		})
		setFilteredVouchers(filtered)
	}

	useEffect(() => {
		applyFilters()
		setPage(1)
	}, [filterValue, searchTerm, selectedDiscount, tabValue])

	const totalPages = Math.ceil(filteredVouchers.length / VOUCHERS_PER_PAGE)
	const displayedVoucherData = filteredVouchers.slice(
		(page - 1) * VOUCHERS_PER_PAGE,
		page * VOUCHERS_PER_PAGE
	)

	const handlePageChange = (event, value) => {
		setPage(value)
		window.scrollTo(0, 0)
	}

	return (
		<Paper sx={{ p: '2%' }}>
			<CrudTabs value={tabValue} handleChange={setTabValue}>
				<Tab label='All' />
				<Tab label='Used' />
				<Tab label='Expired' />
				<Tab label='Valid' />
			</CrudTabs>
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
						<Grid2 size={{ xs: 12, sm: 6 }} justifyContent={'center'} key={voucher.id}>
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
								<img src={AssetImages.VoucherImage(voucher.voucher.image)} alt='' width={'30%'} />
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
										label={
											voucher.isUsed
												? 'Used'
												: new Date(voucher.voucher.expiredDate) < today
												? 'Expired'
												: 'Valid'
										}
										color={
											voucher.isUsed
												? 'error'
												: new Date(voucher.voucher.expiredDate) < today
												? 'secondary'
												: 'primary'
										}
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
		</Paper>
	)
}

export default MyVoucher
