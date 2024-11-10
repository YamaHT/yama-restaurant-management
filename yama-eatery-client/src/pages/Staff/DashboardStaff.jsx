import DrawerStaff from '@/components/Layout/DrawerStaff'
import HeaderStaff from '@/components/Layout/HeaderStaff'
import { Box, Stack } from '@mui/material'
import { useState } from 'react'
import StatisticsStaff from './StatisticsStaff/StatisticsStaff'

const DashboardStaff = () => {
	const [selectedPage, setSelectedPage] = useState(<StatisticsStaff />)
	const [selectedPageKey, setSelectedPageKey] = useState('StatisticsStaff')
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
			<DrawerStaff
				openDrawer={openDrawer}
				selectedPageKey={selectedPageKey}
				handleSelectPage={handleSelectPage}
			/>
			<Box width={'100%'}>
				<HeaderStaff handleOpenDrawer={handleOpenDrawer} />
				<Box p={3} bgcolor={'#f0f2f5'} minHeight={'90vh'}>
					{selectedPage}
				</Box>
			</Box>
		</Stack>
	)
}

export default DashboardStaff
