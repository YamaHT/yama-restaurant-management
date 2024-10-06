import CategorySection from '@/components/Home/CategorySection'
import FeatureSection from '@/components/Home/FeatureSection'
import HeroSection from '@/components/Home/HeroSection'
import ProductIntroSection from '@/components/Home/ProductIntroSection'
import StandardSection from '@/components/Home/StandardSection'
import { Divider, Stack } from '@mui/material'

const Home = () => {
	return (
		<Stack spacing={10}>
			<HeroSection />
			<CategorySection />
			<FeatureSection />
			<StandardSection />
			<ProductIntroSection />
		</Stack>
	)
}

export default Home
