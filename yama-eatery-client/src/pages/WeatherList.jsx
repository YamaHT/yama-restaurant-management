import {
	Box,
	Paper,
	Skeleton,
	styled,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableHead,
	TableRow,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { weatherService } from '../services/weatherServices'

const CustomTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 16,
		fontWeight: 'bold',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 16,
	},
}))

const WeatherList = () => {
	const [weathers, setWeathers] = useState([])
	const [error, setError] = useState(null)

	const fetchAPI = async () => {
		try {
			const fetchData = await weatherService.getAllWeather()
			setWeathers(fetchData)
		} catch (error) {
			setError(error.message)
		}
	}

	useEffect(() => {
		fetchAPI()
	}, [])

	return error ? (
		<Skeleton variant='rounded' height={300} sx={{ fontSize: 30 }}>
			{error}
		</Skeleton>
	) : (
		<Box sx={{ margin: '5%' }}>
			<Table stickyHeader component={Paper} sx={{ minWidth: 500 }}>
				<TableHead>
					<TableRow>
						<CustomTableCell>Date</CustomTableCell>
						<CustomTableCell width={'20%'} align='right'>
							Temp C
						</CustomTableCell>
						<CustomTableCell width={'20%'} align='right'>
							Temp F
						</CustomTableCell>
						<CustomTableCell width={'20%'}>Summary</CustomTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{weathers.map((weather) => (
						<TableRow hover>
							<CustomTableCell>{weather.date}</CustomTableCell>
							<CustomTableCell align='right'>
								{weather.temperatureC}
							</CustomTableCell>
							<CustomTableCell align='right'>
								{weather.temperatureF}
							</CustomTableCell>
							<CustomTableCell>{weather.summary}</CustomTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	)
}

export default WeatherList
