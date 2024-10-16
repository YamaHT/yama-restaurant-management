import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

const VoucherUpdate = ({ open, handleClose, row }) => {
	const [data, setData] = useState({
		name: '',
		expiredDate: '',
		reducedPercent: '',
		maxReducing: '',
		quantity: ''
	})

	useEffect(() => {
		if (row) {
			setData({
				name: row.name,
				expiredDate: row.expiredDate,
				reducedPercent: row.reducedPercent,
				maxReducing: row.maxReducing,
				quantity: row.quantity
			})
		}
	}, [row])

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const handleSubmit = () => {
		console.log('Updated Voucher Data: ', data)
		handleClose()
	}
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Update Voucher</DialogTitle>
			<DialogContent>
				<TextField
					name="name"
					label="Voucher Name"
					value={data.name}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					name="expiredDate"
					label="Expiration Date"
					value={data.expiredDate}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					name="reducedPercent"
					label="Reduced Percent"
					type="number"
					value={data.reducedPercent}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					name="maxReducing"
					label="Max Reducing (VND)"
					type="number"
					value={data.maxReducing}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<TextField
					name="quantity"
					label="Quantity"
					type="number"
					value={data.quantity}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSubmit} color="primary">Update</Button>
			</DialogActions>
		</Dialog>
	)
}
export default VoucherUpdate
