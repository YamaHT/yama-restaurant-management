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
import { calculateAverageRating } from '../ProductList/ProductList'
import { products } from '../ProductMockData/ProductMockData'

import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function ProductDetail() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [product, setProduct] = useState(null)
	const [selectedImage, setSelectedImage] = useState('')
	const [showAllReviews, setShowAllReviews] = useState(false)
	const [userRating, setUserRating] = useState(0)
	const [userReview, setUserReview] = useState('')
	const [recommendedProducts, setRecommendedProducts] = useState([])
	const [isBeginning, setIsBeginning] = useState(true)
	const [isEnd, setIsEnd] = useState(false)

	const prevRef = useRef(null)
	const nextRef = useRef(null)
	const swiperRef = useRef(null)

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

	useEffect(() => {
		const productDetail = products.find((item) => item.id === parseInt(id))
		setProduct(productDetail)

		if (productDetail) {
			const recommendations = products.filter(
				(item) => item.category === productDetail.category && item.id !== productDetail.id
			)
			setRecommendedProducts(recommendations.slice(0, 10))
		}
	}, [id])

	const handleSlideChange = () => {
		if (swiperRef.current) {
			setIsBeginning(swiperRef.current.isBeginning)
			setIsEnd(swiperRef.current.isEnd)
		}
	}
	useEffect(() => {
		const productDetail = products.find((item) => item.id === parseInt(id))
		setProduct(productDetail)

		if (productDetail) {
			setSelectedImage(productDetail.img[0])
		}
	}, [id])

	if (!product) {
		return (
			<Box sx={{ fontFamily: 'sans-serif', p: 4, maxWidth: '1200px', mx: 'auto' }}>
				<Typography variant='h4' textAlign='center'>
					Product not found
				</Typography>
			</Box>
		)
	}

	const averageRating = calculateAverageRating(product.reviews)

	const ratingCount = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
	}

	product.reviews.forEach((review) => {
		ratingCount[review.rating]++
	})

	const totalReviews = product.reviews.length

	const ratingPercentage = {
		1: totalReviews > 0 ? (ratingCount[1] / totalReviews) * 100 : 0,
		2: totalReviews > 0 ? (ratingCount[2] / totalReviews) * 100 : 0,
		3: totalReviews > 0 ? (ratingCount[3] / totalReviews) * 100 : 0,
		4: totalReviews > 0 ? (ratingCount[4] / totalReviews) * 100 : 0,
		5: totalReviews > 0 ? (ratingCount[5] / totalReviews) * 100 : 0,
	}

	const reviewsToShow = showAllReviews ? product.reviews : product.reviews.slice(0, 3)

	const handleRatingChange = (newValue) => {
		setUserRating(newValue)
	}

	const handleReviewChange = (event) => {
		setUserReview(event.target.value)
	}

	const handleSubmit = () => {
		console.log('User rating submitted:', userRating)
		console.log('User review submitted:', userReview)
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
				<Grid2 item xs={12} lg={7}>
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
							sx={{ width: '40%', objectFit: 'cover', borderRadius: 1, mb: 4 }}
						/>
						<Divider sx={{ width: '100%', my: 4 }} />
						<Grid2 container spacing={2} justifyContent='center'>
							{product.img?.map((img, index) => (
								<Grid2 item key={index}>
									<CardMedia
										component='img'
										src={img}
										alt={`Product thumbnail ${index + 1}`}
										sx={{ width: 80, height: 80, borderRadius: 2, cursor: 'pointer' }}
										onClick={() => setSelectedImage(img)}
									/>
								</Grid2>
							))}
						</Grid2>
					</Card>
				</Grid2>
				<Grid2 item xs={12} lg={5}>
					<Typography variant='h4' fontWeight='bold' color='textPrimary'>
						{product.name}
					</Typography>

					<Box mt={2} display='flex' gap={2}>
						<Typography variant='h5' fontWeight='bold' color='textPrimary'>
							${product.price}
						</Typography>
					</Box>
					<Stack direction='row' spacing={1} my={2}>
						<Chip label='Bét Choi' variant='outlined' />
						<Chip label='Giga Chát' variant='outlined' />
						<Chip label={product.category} variant='outlined' />
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
					<Box key={star} display='flex' alignItems='center' mt={1}>
						<Typography variant='body2' fontWeight='bold' sx={{ mr: 1, minWidth: '50px' }}>
							{star} stars
						</Typography>
						<Rating value={star} readOnly size='small' />
						<Box sx={{ flexGrow: 1, mx: 2 }}>
							<Box
								sx={{
									backgroundColor: 'gray',
									borderRadius: 1,
									height: 8,
									width: '100%',
									position: 'relative',
								}}
							>
								<Box
									sx={{
										width: `${ratingPercentage[star]}%`,
										backgroundColor: 'orange',
										borderRadius: 1,
										height: '100%',
									}}
								/>
							</Box>
						</Box>
						<Typography variant='body2' fontWeight='bold'>
							{`${ratingPercentage[star].toFixed(1)}%`}
						</Typography>
					</Box>
				))}

				{reviewsToShow.map((review, index) => (
					<Grid2 container sx={{ width: '100%' }} alignItems='flex-start' mt={4} key={index}>
						<Grid2 size={0.5}>
							<Avatar src={review.avatar} alt={review.reviewer} />
						</Grid2>

						<Grid2 size={11.5}>
							<Stack direction='row' alignItems='center' justifyContent='space-between'>
								<Typography variant='subtitle2' fontWeight='bold' sx={{ mr: 3 }}>
									{review.reviewer}
								</Typography>

								<Typography variant='caption' color='textSecondary'>
									{new Date(review.date).toLocaleDateString()}
								</Typography>
							</Stack>
							<Rating value={review.rating} readOnly size='small' sx={{ mt: 0.5 }} />

							<Typography variant='body2' color='textSecondary' mt={1}>
								{review.comment}
							</Typography>
						</Grid2>
					</Grid2>
				))}
				<Button
					variant='outlined'
					sx={{ mt: 4, width: '100%' }}
					size='large'
					onClick={() => setShowAllReviews(!showAllReviews)}
				>
					{showAllReviews ? 'Show less reviews' : 'Read all reviews'}
				</Button>
				<Box mt={4}>
					<Typography variant='h6' fontWeight='bold' color='textPrimary'>
						Leave a Rating and Review
					</Typography>
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
												image={recommendedProduct.img[0]}
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
								borderRadius: '0 50% 50% 0', // Semi-circle on the left
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
								borderRadius: '50% 0 0 50%', // Semi-circle on the right
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
