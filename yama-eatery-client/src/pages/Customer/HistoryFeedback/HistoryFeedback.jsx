import { UserService } from '@/services/UserService'
import LaunchIcon from '@mui/icons-material/Launch'
import {
	Box,
	Divider,
	FormControl,
	Grid2,
	IconButton,
	InputLabel,
	MenuItem,
	Pagination,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const REVIEWS_PER_PAGE = 5

function HistoryFeedback() {
	const [reviews, setReviews] = useState([])
	const [filteredReviews, setFilteredReviews] = useState([])
	const [selectedRating, setSelectedRating] = useState('All reviews')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const navigate = useNavigate()
	const handleIconClick = (productId) => {
		navigate(`/product/detail/:${productId}`)
	}

	useEffect(() => {
		const fetchFeedback = async () => {
			try {
				const data = await UserService.HISTORY_FEEDBACK()
				console.log(data)
				setReviews(data)
				applyFilters(selectedRating, data)
			} catch (error) {
				console.error('Error fetching feedback:', error)
			}
		}
		fetchFeedback()
	}, [])

	useEffect(() => {
		applyFilters(selectedRating, reviews)
	}, [reviews, selectedRating])

	useEffect(() => {
		const startIndex = (page - 1) * REVIEWS_PER_PAGE
		const endIndex = startIndex + REVIEWS_PER_PAGE
		const paginatedReviews = filteredReviews.slice(startIndex, endIndex)
		setTotalPages(Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE))
		setFilteredReviews(paginatedReviews)
	}, [filteredReviews, page])

	const handleRatingChange = (event) => {
		const value = event.target.value
		setSelectedRating(value)
		setPage(1)
	}

	const applyFilters = (rating, reviewsToFilter) => {
		let filteredReview = reviewsToFilter || reviews
		if (rating && rating !== 'All reviews') {
			filteredReview = filteredReview.filter(
				(review) => review.rating === parseInt(rating.charAt(0), 10)
			)
		}
		const startIndex = (page - 1) * REVIEWS_PER_PAGE
		const endIndex = startIndex + REVIEWS_PER_PAGE
		const paginatedReviews = filteredReview.slice(startIndex, endIndex)
		setFilteredReviews(paginatedReviews)
		setTotalPages(Math.ceil(filteredReview.length / REVIEWS_PER_PAGE))
	}

	const handlePageChange = (event, value) => {
		setPage(value)
		window.scrollTo(0, 0)
	}

	return (
		<Grid2 size={{ p: '5% 0' }}>
			<Grid2 xs={12}>
				<Stack
					direction='row'
					spacing={2}
					alignItems='center'
					justifyContent='space-between'
					sx={{ marginBottom: 3 }}
				>
					<Typography variant='h4' fontFamily={'sans-serif'} textTransform={'uppercase'}>
						Feedback
					</Typography>
					<FormControl>
						<InputLabel>Filter by Rating</InputLabel>
						<Select value={selectedRating} label='Filter by Rating' onChange={handleRatingChange}>
							<MenuItem value='All reviews'>All Reviews</MenuItem>
							<MenuItem value='5 Stars'>5 Stars</MenuItem>
							<MenuItem value='4 Stars'>4 Stars</MenuItem>
							<MenuItem value='3 Stars'>3 Stars</MenuItem>
							<MenuItem value='2 Stars'>2 Stars</MenuItem>
							<MenuItem value='1 Star'>1 Star</MenuItem>
						</Select>
					</FormControl>
				</Stack>
				<Divider />
			</Grid2>
			<Grid2 size={{ xs: 12 }}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
								<TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredReviews.length > 0 ? (
								filteredReviews.map((review, index) => (
									<TableRow key={index}>
										<TableCell>{review.product.name}</TableCell>
										<TableCell>{review.message}</TableCell>
										<TableCell>{review.rating}</TableCell>
										<TableCell>
											<IconButton onClick={() => handleIconClick(review.product.id)}>
												<LaunchIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={4}>
										<Typography variant='body2' color='text.secondary' align='center'>
											No reviews found for the selected filters.
										</Typography>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid2>
			<Grid2 size={{ xs: 12 }}>
				<Box mt={4} display='flex' justifyContent='center'>
					<Pagination
						count={totalPages || 1}
						page={page}
						onChange={handlePageChange}
						color='primary'
					/>
				</Box>
			</Grid2>
		</Grid2>
	)
}

export default HistoryFeedback
