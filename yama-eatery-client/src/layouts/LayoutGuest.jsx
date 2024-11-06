import Footer from '@/components/Layout/Footer'
import HeaderGuest from '@/components/Layout/HeaderGuest'
import { Box } from '@mui/material'

const LayoutGuest = ({ children }) => {
	return (
		<>
			<HeaderGuest />
			<Box mx={'auto'}>{children}</Box>
			<Footer />
		</>
	)
}

export default LayoutGuest
