import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import styles from './TabPanel.module.scss'

const TabPanel = ({ children, value, index, ...other }) => {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

export default TabPanel
