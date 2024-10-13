import Footer from '@/components/Footer'
import HeaderCustomer from '@/components/Layout/HeaderCustomer'
import { Box } from '@mui/material'
import React from 'react'

const LayoutCustomer = () => {
	return (
		<>
			<HeaderCustomer />
			<Box mx={'auto'}>{children}</Box>
			<Footer />
		</>
	)
}

export default LayoutCustomer
