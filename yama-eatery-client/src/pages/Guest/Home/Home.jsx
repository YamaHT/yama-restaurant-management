import CategorySection from '@/components/Home/CategorySection'
import FeatureSection from '@/components/Home/FeatureSection'
import HeroSection from '@/components/Home/HeroSection'
import NewsletterSection from '@/components/Home/NewsletterSection'
import ProductIntroSection from '@/components/Home/ProductIntroSection'
import StandardSection from '@/components/Home/StandardSection'
import { BookingService } from '@/services/BookingService'
import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { Fade } from 'react-awesome-reveal'
import { useLocation } from 'react-router-dom'

const Home = () => {
	const location = useLocation()

	useEffect(() => {
		async function VerifyBooking(bookingId) {
			const data = await BookingService.VERIFY_BOOKING(bookingId)
			if (data) {
				console.log(data)
			}
		}

		const bookingId = new URLSearchParams(location.search).get('bookingId')
		if (bookingId) {
			VerifyBooking(bookingId)
		}
	}, [location])

	return (
		<Stack spacing={10}>
			<HeroSection />
			<Fade triggerOnce direction='up' duration={2000}>
				<CategorySection />
			</Fade>
			<Fade triggerOnce direction='up' duration={2000}>
				<FeatureSection />
			</Fade>
			<Fade triggerOnce direction='up' duration={2000}>
				<StandardSection />
			</Fade>
			<Fade triggerOnce direction='up' duration={2000}>
				<ProductIntroSection />
			</Fade>
			<Fade triggerOnce direction='up' duration={2000}>
				<NewsletterSection />
			</Fade>
		</Stack>
	)
}

export default Home
