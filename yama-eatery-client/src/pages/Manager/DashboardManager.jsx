import DrawerManager from '@/components/Layout/DrawerManager'
import HeaderManager from '@/components/Layout/HeaderManager'
import { Box, Stack, Slider } from '@mui/material'
import React, { useState } from 'react'
import Statistics from './Statistics/Statistics'

const DashboardManager = () => {
	const [selectedPage, setSelectedPage] = useState(<Statistics />)
	const [selectedPageKey, setSelectedPageKey] = useState('Statistics')
	const [openDrawer, setOpenDrawer] = useState(true)

	const handleOpenDrawer = () => {
		setOpenDrawer(!openDrawer)
	}

	const handleSelectPage = (item) => {
		setSelectedPage(item.page)
		setSelectedPageKey(item.pageKey)
	}

	return (
		<Stack direction={'row'}>
			<DrawerManager
				openDrawer={openDrawer}
				selectedPageKey={selectedPageKey}
				handleSelectPage={handleSelectPage}
			/>
			<Box width={'100%'}>
				<HeaderManager handleOpenDrawer={handleOpenDrawer} />
				<Box p={3}>{selectedPage}</Box>
			</Box>
		</Stack>
	)
}

export default DashboardManager
