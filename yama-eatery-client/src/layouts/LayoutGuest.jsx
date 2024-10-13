import Footer from '@/components/Footer'
import HeaderCustomer from '@/components/Layout/HeaderCustomer'
import HeaderGuest from '@/components/Layout/HeaderGuest'
import { Box } from '@mui/material'
import React from 'react'

const LayoutGuest = ({ children }) => {
	return (
		<>
			<HeaderCustomer />
			<Box mx={'auto'}>{children}</Box>
			<Footer />
		</>
	)
}

export default LayoutGuest
