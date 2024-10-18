import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from '@mui/material'
import { useState } from 'react'

export default function UpdateStaffAttendance({
	open,
	handleClose,
	currentStaffAttendance,
	onUpdate,
}) {
	const [values, setValues] = useState({
		employeeId: currentStaffAttendance?.employeeId || '',
		name: currentStaffAttendance?.name || '',
		checkin: currentStaffAttendance?.checkin || '',
		checkout: currentStaffAttendance?.checkout || '',
		lateOrEarly: currentStaffAttendance?.lateOrEarly || '',
	})

	const handleValueChange = (e) => {
		const { name, value } = e.target
		setValues((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleUpdateStaffAttendance = async () => {
		const addStaffAttendanceData = {
			...values,
		}

		onUpdate(addStaffAttendanceData)
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Update Staff Attendance</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<TextField
						label='Name'
						name='name'
						variant='filled'
						value={values.name}
						onChange={handleValueChange}
					/>
					<TextField
						label='Checkin'
						name='checkin'
						variant='filled'
						value={values.checkin}
						onChange={handleValueChange}
					/>
					<TextField
						label='Checkout'
						name='checkout'
						variant='filled'
						value={values.checkout}
						onChange={handleValueChange}
					/>
					<TextField
						label='LateOrEarly'
						name='lateOrEarly'
						variant='filled'
						value={values.lateOrEarly}
						onChange={handleValueChange}
					/>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
				<Button onClick={handleClose} variant='outlined' color='inherit'>
					Close
				</Button>
				<Button
					onClick={handleUpdateStaffAttendance}
					size='large'
					variant='contained'
					color='primary'
				>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	)
}
