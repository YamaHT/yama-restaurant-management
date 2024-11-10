import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'

// third-party
import ReactApexChart from 'react-apexcharts'

// chart options
const areaChartOptions = {
	chart: {
		height: 450,
		type: 'area',
		toolbar: {
			show: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: 'smooth',
		width: 2,
	},
	grid: {
		strokeDashArray: 0,
	},
}

// ==============================|| INCOME AREA CHART ||============================== //

export default function IncomeAreaChart({ slot, label, data = [] }) {
	const theme = useTheme()

	const { primary, secondary } = theme.palette.text
	const line = theme.palette.divider

	const [options, setOptions] = useState(areaChartOptions)

	useEffect(() => {
		setOptions((prevState) => ({
			...prevState,
			colors: [theme.palette.primary.main, theme.palette.primary[700]],
			xaxis: {
				categories:
					slot === 'month'
						? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
						: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				labels: {
					style: {
						colors: [
							secondary,
							secondary,
							secondary,
							secondary,
							secondary,
							secondary,
							secondary,
							secondary,
							secondary,
							secondary,
							secondary,
							secondary,
						],
					},
				},
				axisBorder: {
					show: true,
					color: line,
				},
				tickAmount: slot === 'month' ? 11 : 7,
			},
			yaxis: {
				labels: {
					style: {
						colors: [secondary],
					},
				},
			},
			grid: {
				borderColor: line,
			},
		}))
	}, [primary, secondary, line, theme, slot])

	return (
		<ReactApexChart
			options={options}
			series={[
				{
					name: label,
					data: data,
				},
			]}
			type='area'
			height={450}
		/>
	)
}

IncomeAreaChart.propTypes = { slot: PropTypes.string }
