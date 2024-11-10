import { useEffect, useState } from 'react'

// material-ui
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// third-party
import ReactApexChart from 'react-apexcharts'

// chart options
const barChartOptions = {
	chart: {
		type: 'bar',
		height: 365,
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			columnWidth: '45%',
			borderRadius: 4,
		},
	},
	dataLabels: {
		enabled: false,
	},
	xaxis: {
		categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
	},
	yaxis: {
		show: false,
		labels: {
			formatter: (value) => `$${value}`,
		},
	},
	grid: {
		show: false,
	},
}

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function WeeklyBarChart({ data = [] }) {
	const theme = useTheme()

	const { primary, secondary } = theme.palette.text
	const info = theme.palette.info.light

	const [options, setOptions] = useState(barChartOptions)
	useEffect(() => {
		setOptions((prevState) => ({
			...prevState,
			colors: [info],
			xaxis: {
				labels: {
					style: {
						colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary],
					},
				},
			},
		}))
	}, [primary, info, secondary])

	return (
		<Box id='chart' sx={{ bgcolor: 'transparent' }}>
			<ReactApexChart
				options={options}
				series={[{ name: '', data: data }]}
				type='bar'
				height={365}
			/>
		</Box>
	)
}
