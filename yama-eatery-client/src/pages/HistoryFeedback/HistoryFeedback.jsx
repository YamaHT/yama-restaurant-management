import * as React from 'react'
import {
	Box,
	Container,
	Typography,
	Divider,
	Rating,
	MenuItem,
	Pagination,
	Stack,
	createTheme,
	TableContainer,
	Table,
	TableBody,
	TableCell,
	IconButton,
	Select,
	TableHead,
	TableRow,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import LaunchIcon from '@mui/icons-material/Launch'

const theme = createTheme({
	palette: {
		background: {
			default: 'default',
			paper: 'default',
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#B0BEC5',
		},
		warning: {
			main: '#FF9800',
		},
	},
})

const StyledDivider = styled(Divider)(({ theme }) => ({
	margin: '2% 0',
	backgroundColor: theme.palette.divider,
}))

const StyledRating = styled(Rating)(({ theme }) => ({
	'& .MuiRating-iconFilled': {
		color: theme.palette.warning.main,
	},
}))

const ReviewItem = ({ rating }) => (
	<Box sx={{ padding: 0 }}>
		<StyledRating value={rating} readOnly />
	</Box>
)

const HistoryFeedback = () => {
	const [reviewType, setReviewType] = React.useState('All reviews')
	const [currentPage, setCurrentPage] = React.useState(1)
	const reviewsPerPage = 7

	const handleReviewTypeChange = (event) => {
		setReviewType(event.target.value)
		setCurrentPage(1)
	}

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	const reviews = [
		{
			UserId: 1,
			ProductId: 101,
			product: 'Apple ',
			message:
				'It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.',
			rating: 5,
		},
		{
			UserId: 2,
			product: 'Apple ',
			ProductId: 102,
			product: 'Apple ',
			message:
				'Elegant look, exceptional keyboard, and well-matched accessories. Lightning-quick speed.',
			rating: 4,
		},
		{
			UserId: 3,
			ProductId: 103,
			product: 'Apple ',
			message:
				'It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.',
			rating: 3,
		},
		{
			UserId: 4,
			ProductId: 104,
			product: 'Apple ',
			message:
				'The DualSense controller enhances gameplay with immersive feedback, making it a must-have.',
			rating: 5,
		},
		{
			UserId: 5,
			ProductId: 105,
			product: 'Apple ',
			message:
				'Elegant and refined, with well-chosen accessories. Quick response, durable battery.',
			rating: 2,
		},
		{
			UserId: 1,
			ProductId: 101,
			product: 'Apple ',
			message:
				'It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.',
			rating: 5,
		},
		{
			UserId: 2,
			product: 'Apple ',
			ProductId: 102,
			product: 'Apple ',
			message:
				'Elegant look, exceptional keyboard, and well-matched accessories. Lightning-quick speed.',
			rating: 4,
		},
		{
			UserId: 3,
			ProductId: 103,
			product: 'Apple ',
			message:
				'It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.',
			rating: 3,
		},
		{
			UserId: 4,
			ProductId: 104,
			product: 'Apple ',
			message:
				'The DualSense controller enhances gameplay with immersive feedback, making it a must-have.',
			rating: 5,
		},
		{
			UserId: 5,
			ProductId: 105,
			product: 'Apple ',
			message:
				'Elegant and refined, with well-chosen accessories. Quick response, durable battery.',
			rating: 2,
		},
	]

	const filteredReviews = reviews.filter((review) => {
		if (reviewType === 'All reviews') return true
		return review.rating === parseInt(reviewType.charAt(0))
	})

	const indexOfLastReview = currentPage * reviewsPerPage
	const indexOfFirstReview = indexOfLastReview - reviewsPerPage
	const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview)
	const pageCount = Math.ceil(filteredReviews.length / reviewsPerPage)

	return (
		<Box
			sx={{
				padding: 4,
				backgroundColor: '#ffffff',
				width: '100%',
				boxShadow: 3,
				borderRadius: '8px',
			}}
		>
			<Container maxWidth='lg'>
				<Stack
					direction='row'
					spacing={2}
					alignItems='center'
					justifyContent='space-between'
					sx={{ marginBottom: 3 }}
				>
					<Typography variant='h4' fontFamily={'monospace'} textTransform={'uppercase'}>
						Feedback
					</Typography>
					<Select value={reviewType} onChange={handleReviewTypeChange}>
						<MenuItem value='All reviews'>All Reviews</MenuItem>
						<MenuItem value='5 Stars'>5 Stars</MenuItem>
						<MenuItem value='4 Stars'>4 Stars</MenuItem>
						<MenuItem value='3 Stars'>3 Stars</MenuItem>
						<MenuItem value='2 Stars'>2 Stars</MenuItem>
						<MenuItem value='1 Stars'>1 Star</MenuItem>
					</Select>
				</Stack>
				<StyledDivider />
				<Box>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell
										component={'th'}
										sx={{ width: '20%', textAlign: 'center', fontSize: '1.25rem' }}
									>
										Name
									</TableCell>
									<TableCell
										component={'th'}
										sx={{ width: '60%', textAlign: 'center', fontSize: '1.25rem' }}
									>
										Description
									</TableCell>
									<TableCell
										component={'th'}
										sx={{ width: '15%', textAlign: 'center', fontSize: '1.25rem' }}
									>
										Rating
									</TableCell>
									<TableCell component={'th'} sx={{ width: '5%' }} />
								</TableRow>
							</TableHead>
							<TableBody>
								{currentReviews.length > 0 ? (
									currentReviews.map((review, index) => (
										<TableRow key={index}>
											<TableCell>{review.product}</TableCell>
											<TableCell>{review.message}</TableCell>
											<TableCell>
												<ReviewItem rating={review.rating} />
											</TableCell>
											<TableCell>
												<IconButton>
													<LaunchIcon sx={{ color: 'black' }} />
												</IconButton>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={4}>
											<Typography variant='body2' color='text.secondary' align='center'>
												No reviews found.
											</Typography>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<Pagination
						count={pageCount}
						page={currentPage}
						onChange={handlePageChange}
						color='primary'
						sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
					/>
				</Box>
			</Container>
		</Box>
	)
}
export default HistoryFeedback
