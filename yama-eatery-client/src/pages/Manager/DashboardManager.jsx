import DrawerManager from '@/components/Layout/DrawerManager'
import HeaderManager from '@/components/Layout/HeaderManager'
import { Box, Stack } from '@mui/material'
import { useState } from 'react'
import StatisticsManager from './StatisticsManager/StatisticsManager'

const DashboardManager = () => {
	const [selectedPage, setSelectedPage] = useState(<StatisticsManager />)
	const [selectedPageKey, setSelectedPageKey] = useState('StatisticsManager')
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
				<Box p={3} bgcolor={'#f0f2f5'} minHeight={'90vh'}>
					{selectedPage}
				</Box>
			</Box>
		</Stack>
	)
}

export default DashboardManager
