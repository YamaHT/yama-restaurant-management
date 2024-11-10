import Footer from '@/components/Layout/Footer'
import HeaderGuest from '@/components/Layout/HeaderGuest'
import { Box } from '@mui/material'

const LayoutGuest = ({ children }) => {
	return (
		<Box display='flex' flexDirection='column' minHeight='100vh'>
			<HeaderGuest />
			<Box flexGrow={1} mx={'auto'} width={'100%'} bgcolor={'#f0f2f5'}>
				{children}
			</Box>
			<Footer />
		</Box>
	)
}

export default LayoutGuest
