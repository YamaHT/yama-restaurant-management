import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Stack,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useRef, useState } from 'react'

const formatTime = (timeString) => {
	const [hours, minutes] = timeString.split(':')
	return `${hours}:${minutes}`
}

export default function UpdateStaffAttendance({
	open,
	handleClose,
	currentStaffAttendance,
	onUpdate,
}) {
	const [values, setValues] = useState({
		id: currentStaffAttendance?.id || 0,
		checkInTime: formatTime(currentStaffAttendance?.checkInTime) || '',
		checkOutTime: formatTime(currentStaffAttendance?.checkOutTime) || '',
		lateArrival: currentStaffAttendance?.lateArrival || false,
		earlyLeave: currentStaffAttendance?.earlyLeave || false,
	})

	const fieldsRef = useRef({})

	const handleValueChange = (e) => {
		const { name, type, checked, value } = e.target
		setValues((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	const handleUpdateStaffAttendance = async () => {
		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		const checkInTime = new Date(`1970-01-01T${values.checkInTime}:00`)
		const checkOutTime = new Date(`1970-01-01T${values.checkOutTime}:00`)

		if (checkOutTime < checkInTime) {
			isValid = false
			enqueueSnackbar("Check Out Time can't be earlier than Check In Time", { variant: 'error' })
		}

		if (isValid) {
			console.log(values)
			onUpdate(values)
			handleClose()
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Update Staff Attendance</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['checkIn'] = el)}
						label='Check In Time'
						name='checkInTime'
						type='time'
						variant='filled'
						value={values.checkInTime}
						onChange={handleValueChange}
						slotProps={{
							inputLabel: { shrink: true },
						}}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['checkOut'] = el)}
						label='Check Out Time'
						name='checkOutTime'
						type='time'
						variant='filled'
						value={values.checkOutTime}
						onChange={handleValueChange}
						slotProps={{
							inputLabel: { shrink: true },
						}}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={values.lateArrival}
								name={'lateArrival'}
								onChange={handleValueChange}
							/>
						}
						label='Late Arrival'
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={values.earlyLeave}
								name={'earlyLeave'}
								onChange={handleValueChange}
							/>
						}
						label='Early Departure'
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
