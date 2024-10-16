import CategorySection from '@/components/Home/CategorySection'
import FeatureSection from '@/components/Home/FeatureSection'
import HeroSection from '@/components/Home/HeroSection'
import NewsletterSection from '@/components/Home/NewsletterSection'
import ProductIntroSection from '@/components/Home/ProductIntroSection'
import StandardSection from '@/components/Home/StandardSection'
import { Stack } from '@mui/material'
import { Fade } from 'react-awesome-reveal'

const Home = () => {
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
