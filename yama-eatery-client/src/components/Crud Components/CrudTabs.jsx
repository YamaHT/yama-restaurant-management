import { Tabs } from '@mui/material'
import React from 'react'

const CrudTabs = ({ children, value, handleChange }) => {
	return (
		<Tabs
			variant='scrollable'
			scrollButtons={'auto'}
			textColor='inherit'
			TabIndicatorProps={{
				sx: {
					bgcolor: 'black',
					borderRadius: 5,
					height: 3,
					bottom: 5,
				},
			}}
			sx={{
				padding: '0 5%',
				borderRadius: '8px',
				color: 'black',
				bgcolor: '#fff',
				boxShadow: '0 2px 5px #AAA',
				'& .MuiTab-root': {
					minHeight: 50,
					fontSize: 14,
				},
			}}
			value={value}
			onChange={(e, newValue) => handleChange(newValue)}
		>
			{children}
		</Tabs>
	)
}

export default CrudTabs
