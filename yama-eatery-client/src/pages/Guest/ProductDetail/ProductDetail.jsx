import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import ReviewProgressBar from '@/components/Product/ReviewProgressBar'
import { FeedbackService } from '@/services/FeedbackService'
import { ProductService } from '@/services/ProductService'
import { AssetImages } from '@/utilities/AssetImages'
import { calculateAverageRating } from '@/utilities/Calculate'
import { ChevronLeft, ChevronRight, Delete, Edit } from '@mui/icons-material'
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
	MenuItem,
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

export default function ProductDetail() {
	const { id } = useParams()
	const navigate = useNavigate()

	const [isAuthorized, setIsAuthorized] = useState(false)
	const [product, setProduct] = useState()
	const [recommendedProducts, setRecommendedProducts] = useState([])
	const [feedbackProduct, setFeedbackProduct] = useState()
	const [isEdittingFeedback, setIsEdittingFeedback] = useState(false)
	const [haveUpdated, setHaveUpdated] = useState(false)
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
			} else {
				navigate('/product')
			}
		}

		async function fetchGetFeedbackProduct() {
			if (!localStorage.getItem('token')) return
			setIsAuthorized(true)

			const data = await FeedbackService.GET_FEEDBACK(id)
			if (data) {
				setFeedbackProduct(data)
				setUserRating(data.rating)
				setUserReview(data.message)
			} else {
				setUserRating(0)
				setUserReview('')
			}
		}

		fetchGetFeedbackProduct()
		fetchProductDetail()
	}, [id, haveUpdated])

	useEffect(() => {
		setUserRating(feedbackProduct?.rating || 0)
		setUserReview(feedbackProduct?.message || '')
	}, [isEdittingFeedback])

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

	const handleAddFeedback = async () => {
		const feedbackData = {
			productId: id,
			rating: userRating,
			message: userReview,
		}

		const data = await FeedbackService.ADD_FEEDBACK(feedbackData)
		if (data) {
			setFeedbackProduct(data)
			setHaveUpdated(!haveUpdated)
		}
	}

	const handleUpdateFeedback = async () => {
		const updatedFeedbackData = {
			productId: id,
			rating: userRating,
			message: userReview,
		}

		const data = await FeedbackService.UPDATE_FEEDBACK(updatedFeedbackData)
		if (data) {
			setFeedbackProduct(data)
			setHaveUpdated(!haveUpdated)
			setIsEdittingFeedback(false)
		}
	}

	const handleRemoveFeedback = async () => {
		const ProductId = id
		const data = await FeedbackService.DELETE_FEEDBACK(ProductId)
		if (data) {
			setFeedbackProduct(null)
			setHaveUpdated(!haveUpdated)
		}
	}

	const handleSlideChange = () => {
		if (swiperRef.current) {
			setIsBeginning(swiperRef.current.isBeginning)
			setIsEnd(swiperRef.current.isEnd)
		}
	}

	if (!product) {
		return null
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

	const handleClick = (id) => {
		window.scrollTo({ top: 0, behavior: 'smooth' })

		navigate(`/product/detail/${id}`)
		window.location.reload()
	}

	return product ? (
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
							p: 2,
						}}
					>
						<CardMedia
							component='img'
							src={selectedImage}
							alt={product.name}
							sx={{ height: 500, objectFit: 'cover', borderRadius: 1, mb: 1 }}
						/>
						<Divider sx={{ width: '100%', mb: 1 }} />
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
				<Grid2 size={{ xs: 12, lg: 5 }} sx={{ maxHeight: 600, overflow: 'auto' }}>
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
					<Grid2 container sx={{ width: '100%' }} alignItems='flex-start' mt={4}>
						<Grid2 size={0.5}>
							<Avatar src={AssetImages.UserImage(feedbacks.user.image)} alt={feedbacks.user.name} />
						</Grid2>
						<Grid2 size={11.5}>
							<Stack direction='row' alignItems='center' justifyContent='space-between'>
								<Stack direction='row' alignItems='center'>
									<Typography variant='subtitle2' fontWeight='bold' sx={{ mr: 3 }}>
										{feedbacks.user.name}
									</Typography>
									<Typography variant='caption' color='textSecondary'>
										{new Date(feedbacks.creationDate).toLocaleDateString()}
									</Typography>
								</Stack>
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
				{isAuthorized &&
					(feedbackProduct ? (
						<>
							<Divider sx={{ my: 2 }}>Your Feedbacks</Divider>
							<Grid2 container sx={{ width: '100%' }} alignItems='flex-start' mt={4}>
								<Grid2 size={0.5}>
									<Avatar
										src={AssetImages.UserImage(feedbackProduct.user.image)}
										alt={feedbackProduct.user.name}
									/>
								</Grid2>
								<Grid2 size={11.5}>
									<Stack direction='row' alignItems='center' justifyContent='space-between'>
										<Stack direction='row' alignItems='center'>
											<Typography variant='subtitle2' fontWeight='bold' sx={{ mr: 3 }}>
												{feedbackProduct.user.name}
											</Typography>
											<Typography variant='caption' color='textSecondary'>
												{new Date(feedbackProduct.creationDate).toLocaleDateString()}
											</Typography>
										</Stack>
										<CrudMenuOptions>
											<MenuItem>
												<Button startIcon={<Edit />} onClick={() => setIsEdittingFeedback(true)}>
													Edit
												</Button>
											</MenuItem>
											<MenuItem>
												<CrudConfirmation
													title='Delete Confirmation'
													description='Are you sure you want to delete this?'
													handleConfirm={() => handleRemoveFeedback(id)}
												>
													{(handleOpen) => (
														<Button startIcon={<Delete />} onClick={handleOpen}>
															Delete
														</Button>
													)}
												</CrudConfirmation>{' '}
											</MenuItem>
										</CrudMenuOptions>
									</Stack>

									{isEdittingFeedback ? (
										<>
											<Rating
												name='user-rating'
												value={userRating}
												onChange={(e, newValue) => setUserRating(newValue)}
												size='large'
												sx={{ mt: 2 }}
											/>
											<TextField
												fullWidth
												label='Your Review'
												multiline
												rows={4}
												value={userReview}
												onChange={(e) => setUserReview(e.target.value)}
												sx={{ mt: 2 }}
											/>

											<Button
												variant='contained'
												color='primary'
												sx={{ mt: 2 }}
												onClick={handleUpdateFeedback}
											>
												Submit
											</Button>
											<Button
												variant='contained'
												color='inherit'
												sx={{ mt: 2, ml: 2 }}
												onClick={() => setIsEdittingFeedback(false)}
											>
												Cancel
											</Button>
										</>
									) : (
										<>
											<Rating
												value={feedbackProduct.rating}
												readOnly
												size='small'
												sx={{ mt: 0.5 }}
											/>
											<Typography variant='body2' color='textSecondary' mt={1}>
												{feedbackProduct.message}
											</Typography>
										</>
									)}
								</Grid2>
							</Grid2>
						</>
					) : (
						<Box mt={4}>
							<Typography variant='h6' fontWeight='bold' color='textPrimary'>
								Leave a Rating and Review
							</Typography>

							<Rating
								name='user-rating'
								value={userRating}
								onChange={(e, newValue) => setUserRating(newValue)}
								size='large'
								sx={{ mt: 2 }}
							/>
							<TextField
								fullWidth
								label='Your Review'
								multiline
								rows={4}
								value={userReview}
								onChange={(e) => setUserReview(e.target.value)}
								sx={{ mt: 2 }}
							/>
							<Button
								variant='contained'
								color='primary'
								sx={{ mt: 2 }}
								onClick={handleAddFeedback}
							>
								Submit
							</Button>
						</Box>
					))}
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
												<Typography mb={1} variant='body2' color='textSecondary'>
													${recommendedProduct.price}
												</Typography>

												<Stack direction='row' spacing={1} my={2}>
													<Chip
														label={recommendedProduct.subCategory.category.name}
														variant='outlined'
													/>
													<Chip label={recommendedProduct.subCategory.name} variant='outlined' />
												</Stack>
											</Box>
											<Box sx={{ p: 2 }}>
												<Rating
													value={calculateAverageRating(recommendedProduct.feedbacks)}
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
	) : null
}
