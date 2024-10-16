import {
	Box,
	Divider,
	Grid2,
	Pagination,
	Stack,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { useEffect, useState } from 'react'
import { UserService } from '@/services/UserService'

const REVIEWS_PER_PAGE = 7 // For pagination logic
export function calculateAverageRating(reviews) {
	if (!reviews || reviews.length === 0) return 0
	const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
	return totalRating / reviews.length
}

export default function ReviewList() {
	const [reviews, setReviews] = useState([])
	const [filteredReviews, setFilteredReviews] = useState([])
	const [selectedRating, setSelectedRating] = useState('All reviews')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const REVIEWS_PER_PAGE = 5 // Adjust the number as needed

	useEffect(() => {
		const fetchFeedback = async () => {
			try {
				const data = await UserService.HISTORY_FEEDBACK()
				setReviews(data)
				console.log(data)
				// setFilteredReviews(data)
			} catch (error) {
				console.error('Error fetching feedback:', error)
			}
		}
		fetchFeedback()
	}, [])

	useEffect(() => {
		const startIndex = (page - 1) * REVIEWS_PER_PAGE
		const endIndex = startIndex + REVIEWS_PER_PAGE
		const paginatedReviews = filteredReviews.slice(startIndex, endIndex)
		setTotalPages(Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE))
		setFilteredReviews(paginatedReviews)
	}, [filteredReviews, page])

	// Handle rating filter change
	const handleRatingChange = (event) => {
		const value = event.target.value
		setSelectedRating(value)
		setPage(1) // Reset to page 1
		applyFilters(value) // Apply filters
	}

	// Apply filters for reviews
	const applyFilters = (rating) => {
		let filteredReview = reviews
		if (rating && rating !== 'All reviews') {
			filteredReview = filteredReview.filter(
				(review) => review.rating === parseInt(rating.charAt(0), 10)
			)
		}
		setFilteredReviews(filteredReview)
	}

	const handlePageChange = (event, value) => {
		setPage(value)
		window.scrollTo(0, 0)
	}

	return (
		<Grid2 container p={'5%'} spacing={2}>
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

			<Grid2 xs={12}>
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
							{filteredReviews || filteredReviews.length > 0 ? (
								filteredReviews.map((review, index) => (
									<TableRow key={index}>
										<TableCell>{review.product}</TableCell>
										<TableCell>{review.message}</TableCell>
										<TableCell>{review.rating}</TableCell>
										<TableCell>
											<IconButton>
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

				{/* Pagination control */}
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
