import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Card,
	CardMedia,
	Chip,
	Divider,
	Grid2,
	IconButton,
	Rating,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { calculateAverageRating } from '../ProductList/ProductList'
import { ProductService } from '@/services/ProductService'
import { AssetImages } from '@/utilities/AssetImages'
import ReviewProgressBar from '@/components/Product/ReviewProgressBar'
import { FeedbackRequest } from '@/requests/FeedbackRequest'

export default function ProductDetail() {
	const { id } = useParams()
	const navigate = useNavigate()

	const [product, setProduct] = useState(null)
	const [recommendedProducts, setRecommendedProducts] = useState([])
	const [feedback, setFeedbackProduct] = useState()

	const [selectedImage, setSelectedImage] = useState('')
	const [showAllReviews, setShowAllReviews] = useState(false)
	const [userRating, setUserRating] = useState(0)
	const [userReview, setUserReview] = useState('')
	const [isBeginning, setIsBeginning] = useState(true)
	const [isEnd, setIsEnd] = useState(false)
	const prevRef = useRef(null)
	const nextRef = useRef(null)
	const swiperRef = useRef(null)

	useEffect(() => {
		async function fetchProductDetail() {
			const data = await ProductService.GET_PRODUCT_DETAIL(id)
			if (data) {
				setProduct(data)
			}
		}
		fetchProductDetail()
	}, [id])

	useEffect(() => {
		if (product) {
			async function fetchSimilarProduct() {
				const data = await ProductService.GET_ALL_SIMILAR(product.subCategory.category.name)
				if (data) {
					setRecommendedProducts(data)
				}
			}
			fetchSimilarProduct()
			setSelectedImage(AssetImages.ProductImage(product?.image[0]))
		}
	}, [product])


	useEffect(() => {
		const initializeSwiperNavigation = () => {
			if (swiperRef.current && prevRef.current && nextRef.current) {
				swiperRef.current.params.navigation.prevEl = prevRef.current
				swiperRef.current.params.navigation.nextEl = nextRef.current
				swiperRef.current.navigation.init()
				swiperRef.current.navigation.update()
			}
		}

		setTimeout(initializeSwiperNavigation, 100)

		return () => {
			if (swiperRef.current && swiperRef.current.navigation) {
				swiperRef.current.navigation.destroy()
			}
		}
	}, [recommendedProducts])

	const handleSlideChange = () => {
		if (swiperRef.current) {
			setIsBeginning(swiperRef.current.isBeginning)
			setIsEnd(swiperRef.current.isEnd)
		}
	}

	if (!product) {
		return (
			<Box sx={{ fontFamily: 'sans-serif', p: 4, maxWidth: '1200px', mx: 'auto' }}>
				<Typography variant='h4' textAlign='center'>
					Product not found
				</Typography>
			</Box>
		)
	}

	const averageRating = calculateAverageRating(product.feedbacks)

	const ratingCount = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	}

	product.feedbacks.forEach((review) => {
		ratingCount[review.rating]++
	})

	const totalReviews = product.feedbacks.length

	const ratingPercentage = {
		1: totalReviews > 0 ? (ratingCount[1] / totalReviews) * 100 : 0,
		2: totalReviews > 0 ? (ratingCount[2] / totalReviews) * 100 : 0,
		3: totalReviews > 0 ? (ratingCount[3] / totalReviews) * 100 : 0,
		4: totalReviews > 0 ? (ratingCount[4] / totalReviews) * 100 : 0,
		5: totalReviews > 0 ? (ratingCount[5] / totalReviews) * 100 : 0,
	}

	const reviewsToShow = showAllReviews ? product.feedbacks : product.feedbacks.slice(0, 3)

	const handleRatingChange = (newValue) => {
		setUserRating(newValue)
	}

	const handleReviewChange = (event) => {
		setUserReview(event.target.value)
	}

	const handleSubmit = () => {
		setUserRating(0)
		setUserReview('')
	}

	const handleClick = (id) => {
		window.scrollTo({ top: 0, behavior: 'smooth' })

		navigate(`/Product/Detail/${id}`)
	}

	return (
		<Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
			<Grid2 container spacing={3}>
				<Grid2 size={{ xs: 12, lg: 7 }}>
					<Card
						sx={{
							minHeight: 500,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							background: 'linear-gradient(to top right, #F8C794, #FFE0B5, #FFF2D7)',
							p: 4,
						}}
					>
						<CardMedia
							component='img'
							src={selectedImage}
							alt={product.name}
							sx={{ height: 500, objectFit: 'cover', borderRadius: 1, mb: 4 }}
						/>
						<Divider sx={{ width: '100%', my: 4 }} />
						<Grid2 container spacing={2} justifyContent='center'>
							{product.image?.map((img, index) => (
								<Grid2 item key={index}>
									<CardMedia
										component='img'
										src={AssetImages.ProductImage(img)}
										alt={`Product thumbnail ${index + 1}`}
										sx={{ width: 80, height: 80, borderRadius: 2, cursor: 'pointer' }}
										onClick={() => setSelectedImage(AssetImages.ProductImage(img))}
									/>
								</Grid2>
							))}
						</Grid2>
					</Card>
				</Grid2>
				<Grid2 size={{ xs: 12, lg: 5 }} sx={{ maxHeight: 800, overflow: 'auto' }}>
					<Typography variant='h4' fontWeight='bold' color='textPrimary'>
						{product.name}
					</Typography>
					<Box mt={2} display='flex' gap={2}>
						<Typography variant='h5' fontWeight='bold' color='textPrimary'>
							${product.price}
						</Typography>
					</Box>
					<Stack direction='row' spacing={1} my={2}>
						<Chip label={product.subCategory.category.name} variant='outlined' />
						<Chip label={product.subCategory.name} variant='outlined' />
					</Stack>
					<Rating value={averageRating} precision={0.1} readOnly />
					<Typography variant='h6' fontWeight='bold' color='textPrimary' mt={3}>
						About the {product.name}
					</Typography>
					<Typography variant='body1' color='textPrimary' mt={4}>
						{product.description}
					</Typography>
				</Grid2>
			</Grid2>
			<Box>
				<Typography variant='h6' fontWeight='bold' color='textPrimary' mt={3}>
					Reviews ({totalReviews})
				</Typography>
				{[5, 4, 3, 2, 1].map((star) => (
					<Stack key={star} direction={'row'} spacing={1} alignItems='center' mt={1}>
						<Typography variant='body2' fontWeight='bold' width={'4%'}>
							{star} stars
						</Typography>
						<Rating value={star} readOnly size='medium' sx={{ width: '16%' }} />
						<Box width={'80%'}>
							<ReviewProgressBar value={ratingPercentage[star]} />
						</Box>
					</Stack>
				))}

				{reviewsToShow.map((feedbacks, index) => (
					<Grid2 container sx={{ width: '100%' }} alignItems='flex-start' mt={4} key={index}>
						<Grid2 size={0.5}>
							<Avatar src={feedbacks.avatar} alt={feedbacks.reviewer} />
						</Grid2>
						<Grid2 size={11.5}>
							<Stack direction='row' alignItems='center' justifyContent='space-between'>
								<Typography variant='subtitle2' fontWeight='bold' sx={{ mr: 3 }}>
									{feedbacks.user.name}
								</Typography>

								<Typography variant='caption' color='textSecondary'>
									{new Date(feedbacks.creationDate).toLocaleDateString()}
								</Typography>
							</Stack>
							<Rating value={feedbacks.rating} readOnly size='small' sx={{ mt: 0.5 }} />

							<Typography variant='body2' color='textSecondary' mt={1}>
								{feedbacks.message}
							</Typography>
						</Grid2>
					</Grid2>
				))}
				{totalReviews > 3 && (
					<Button
						variant='outlined'
						sx={{ mt: 4, width: '100%' }}
						size='large'
						onClick={() => setShowAllReviews(!showAllReviews)}
					>
						{showAllReviews ? 'Show less reviews' : 'Read all reviews'}
					</Button>
				)}
				<Box mt={4}>
					<Typography variant='h6' fontWeight='bold' color='textPrimary'>
						Leave a Rating and Review
					</Typography>

					<Grid2 container sx={{ width: '100%' }} alignItems='flex-start' mt={4}>
						<Grid2 size={0.5}>
							<Avatar src={feedback.Avatar} alt={feedback.Avatar} />
						</Grid2>
						<Grid2 size={11.5}>
							<Stack direction='row' alignItems='center' justifyContent='space-between'>
								<Typography variant='subtitle2' fontWeight='bold' sx={{ mr: 3 }}>
									{feedback.message}
								</Typography>

								<Typography variant='caption' color='textSecondary'>
									{new Date(feedback.creationDate).toLocaleDateString()}
								</Typography>
							</Stack>
							<Rating value={feedback.rating} readOnly size='small' sx={{ mt: 0.5 }} />

							<Typography variant='body2' color='textSecondary' mt={1}>
								{feedback.message}
							</Typography>
						</Grid2>
					</Grid2>

					<Rating
						name='user-rating'
						value={userRating}
						onChange={(event, newValue) => handleRatingChange(newValue)}
						size='large'
						sx={{ mt: 2 }}
					/>
					<TextField
						fullWidth
						label='Your Review'
						multiline
						rows={4}
						value={userReview}
						onChange={handleReviewChange}
						sx={{ mt: 2 }}
					/>
					<Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			</Box>
			{recommendedProducts.length > 0 && (
				<Box mt={4}>
					<Typography variant='h6' fontWeight='bold' color='textPrimary' gutterBottom>
						Recommended Products
					</Typography>
					<Box sx={{ position: 'relative' }}>
						<Swiper
							modules={[Navigation]}
							navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
							onBeforeInit={(swiper) => (swiperRef.current = swiper)}
							spaceBetween={16}
							slidesPerView={2}
							onSlideChange={handleSlideChange}
							breakpoints={{
								640: {
									slidesPerView: 2,
								},
								768: {
									slidesPerView: 3,
								},
								1024: {
									slidesPerView: 4,
								},
							}}
						>
							{recommendedProducts.map((recommendedProduct) => (
								<SwiperSlide key={recommendedProduct.id}>
									<Box
										sx={{
											cursor: 'pointer',
											transition: 'all 0.3s ease-in-out',
											'&:hover': { transform: 'translateY(-8px)' },
										}}
										onClick={() => handleClick(recommendedProduct.id)}
									>
										<Card
											sx={{
												height: '100%',
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											<CardMedia
												component='img'
												src={AssetImages.ProductImage(recommendedProduct.image[0])}
												alt={recommendedProduct.name}
												sx={{ height: 200, objectFit: 'cover' }}
											/>
											<Box sx={{ p: 2, flexGrow: 1 }}>
												<Typography variant='subtitle1' fontWeight='bold'>
													{recommendedProduct.name}
												</Typography>
												<Typography variant='body2' color='textSecondary'>
													${recommendedProduct.price}
												</Typography>
											</Box>
											<Box sx={{ p: 2 }}>
												<Rating
													value={calculateAverageRating(recommendedProduct.reviews)}
													precision={0.1}
													readOnly
													size='small'
												/>
											</Box>
										</Card>
									</Box>
								</SwiperSlide>
							))}
						</Swiper>
						<IconButton
							size='large'
							ref={prevRef}
							sx={{
								position: 'absolute',
								top: '50%',
								left: 0,
								transform: 'translateY(-50%)',
								zIndex: 10,
								backgroundColor: 'rgba(0,0,0,0.5)',
								color: 'white',
								'&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
								display: isBeginning || recommendedProducts.length <= 4 ? 'none' : 'flex',
								borderRadius: '0 50% 50% 0',
								width: '40px',
								height: '80px',
							}}
						>
							<ChevronLeft />
						</IconButton>
						<IconButton
							size='large'
							ref={nextRef}
							sx={{
								position: 'absolute',
								top: '50%',
								right: 0,
								transform: 'translateY(-50%)',
								zIndex: 10,
								backgroundColor: 'rgba(0,0,0,0.5)',
								color: 'white',
								'&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
								display: isEnd || recommendedProducts.length <= 4 ? 'none' : 'flex',
								borderRadius: '50% 0 0 50%',
								width: '40px',
								height: '80px',
							}}
						>
							<ChevronRight />
						</IconButton>
					</Box>
				</Box>
			)}
		</Box>
	)
}
