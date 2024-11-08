import Footer from '@/components/Layout/Footer'
import HeaderCustomer from '@/components/Layout/HeaderCustomer'
import { Box } from '@mui/material'
import React from 'react'

const LayoutCustomer = ({ children }) => {
	return (
		<Box display='flex' flexDirection='column' minHeight='100vh'>
			<HeaderCustomer />
			<Box flexGrow={1} mx='auto' width={'100%'}>
				{children}
			</Box>
			<Footer />
		</Box>
	)
}

export default LayoutCustomer
