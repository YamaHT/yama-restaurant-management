import DrawerManager from '@/components/Layout/DrawerManager'
import HeaderManager from '@/components/Layout/HeaderManager'
import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import Statistics from './Statistics/Statistics'

const DashboardManger = () => {
	const [selectedPage, setSelectedPage] = useState(<Statistics />)
	const [openDrawer, setOpenDrawer] = useState(true)

	const handleOpenDrawer = () => {
		setOpenDrawer(!openDrawer)
	}

	const handleSelectPage = (page) => {
		setSelectedPage(page)
	}

	return (
		<Stack direction={'row'}>
			<DrawerManager openDrawer={openDrawer} handleSelectPage={handleSelectPage} />
			<Box width={'100%'}>
				<HeaderManager handleOpenDrawer={handleOpenDrawer} />
				<Box p={3}>{selectedPage}</Box>
			</Box>
		</Stack>
	)
}

export default DashboardManger
