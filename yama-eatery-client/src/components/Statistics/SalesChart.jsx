import { useEffect, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
	useMediaQuery,
	Checkbox,
	FormControl,
	FormGroup,
	FormControlLabel,
	Stack,
	Typography,
	Box,
} from '@mui/material'

// project import
import MainCard from './MainCard'

// third-party
import ReactApexChart from 'react-apexcharts'

// chart options
const columnChartOptions = {
	chart: {
		type: 'bar',
		height: 430,
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			columnWidth: '30%',
			borderRadius: 4,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 8,
		colors: ['transparent'],
	},
	xaxis: {
		categories: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
	},
	yaxis: {
		title: {
			text: '$ (thousands)',
		},
	},
	fill: {
		opacity: 1,
	},
	tooltip: {
		y: {
			formatter(val) {
				return `$ ${val} thousands`
			},
		},
	},
	legend: {
		show: false,
	},
	responsive: [
		{
			breakpoint: 600,
			options: {
				yaxis: {
					show: false,
				},
			},
		},
	],
}

// ==============================|| SALES COLUMN CHART ||============================== //

export default function SalesChart({ monthlyTotalPayments, monthlyRemainPayments }) {
	const theme = useTheme()

	const [legend, setLegend] = useState({
		total: true,
		remain: true,
	})

	const { total, remain } = legend

	const { primary, secondary } = theme.palette.text
	const line = theme.palette.divider

	const warning = theme.palette.warning.main
	const primaryMain = theme.palette.primary.main
	const successDark = theme.palette.success.dark

	const [series, setSeries] = useState([
		{
			name: 'Total Payment',
			data: monthlyTotalPayments,
		},
		{
			name: 'Payment Received',
			data: monthlyRemainPayments,
		},
	])

	const handleLegendChange = (event) => {
		setLegend({ ...legend, [event.target.name]: event.target.checked })
	}

	const xsDown = useMediaQuery(theme.breakpoints.down('sm'))
	const [options, setOptions] = useState(columnChartOptions)

	useEffect(() => {
		if (total && remain) {
			setSeries([
				{
					name: 'Total Payment',
					data: monthlyTotalPayments,
				},
				{
					name: 'Payment Received',
					data: monthlyRemainPayments,
				},
			])
		} else if (total) {
			setSeries([
				{
					name: 'Total Payment',
					data: monthlyTotalPayments,
				},
			])
		} else if (remain) {
			setSeries([
				{
					name: 'Payment Received',
					data: monthlyRemainPayments,
				},
			])
		} else {
			setSeries([])
		}
	}, [total, remain])

	useEffect(() => {
		setOptions((prevState) => ({
			...prevState,
			colors: !(total && remain) && remain ? [primaryMain] : [warning, primaryMain],
			xaxis: {
				labels: {
					style: {
						colors: [secondary, secondary, secondary, secondary, secondary, secondary],
					},
				},
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
			plotOptions: {
				bar: {
					columnWidth: xsDown ? '60%' : '30%',
				},
			},
		}))
	}, [primary, secondary, line, warning, primaryMain, successDark, total, remain, xsDown])

	return (
		<MainCard sx={{ mt: 1 }} content={false}>
			<Box sx={{ p: 2.5, pb: 0 }}>
				<Stack direction='row' alignItems='center' justifyContent='space-between'>
					<Stack spacing={1.5}>
						<Typography variant='h6' color='secondary'>
							Net Profit
						</Typography>
						<Typography variant='h4'>
							${monthlyTotalPayments.reduce((sum, payment) => sum + payment, 0)}
						</Typography>
					</Stack>
					<FormControl component='fieldset'>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										color='warning'
										checked={total}
										onChange={handleLegendChange}
										name='total'
									/>
								}
								label='Total Payment'
							/>
							<FormControlLabel
								control={<Checkbox checked={remain} onChange={handleLegendChange} name='remain' />}
								label='Payment Received'
							/>
						</FormGroup>
					</FormControl>
				</Stack>
				<Box id='chart' sx={{ bgcolor: 'transparent' }}>
					<ReactApexChart options={options} series={series} type='bar' height={360} />
				</Box>
			</Box>
		</MainCard>
	)
}
