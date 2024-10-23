import React, { useState, useEffect } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Box,
} from '@mui/material'
import { AssetImages } from '@/utilities/AssetImages'
import { VoucherManagementService } from '@/services/VoucherManagementService'

const VoucherUpdate = ({ open, handleClose, row }) => {
	const [imagePreview, setImagePreview] = useState('')
	const [errors, setErrors] = useState({}) 

	const [data, setData] = useState({
		name: '',
		description: '',
		expiredDate: '',
		reducedPercent: '',
		maxReducing: '',
		quantity: '',
		image: null,
	})

	useEffect(() => {
		if (row) {
			setData({
				name: row.name,
				description: row.description,
				expiredDate: row.expiredDate,
				reducedPercent: row.reducedPercent,
				maxReducing: row.maxReducing,
				quantity: row.quantity,
				image: row.image,
			})
			if (row.image) {
				setImagePreview(AssetImages.VoucherImage(row.image))
			}
		}
	}, [row])

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			setData({ ...data, image: file })
			setImagePreview(URL.createObjectURL(file))
		}
	}

	const validate = () => {
		const newErrors = {}
		if (!data.name) newErrors.name = 'Voucher name is required'
		if (!data.description) newErrors.description = 'Description is required'
		if (!data.expiredDate) newErrors.expiredDate = 'Expiration date is required'
		if (!data.reducedPercent) newErrors.reducedPercent = 'Reduced percent is required'
		if (!data.maxReducing) newErrors.maxReducing = 'Max reducing amount is required'
		if (!data.quantity) newErrors.quantity = 'Quantity is required'
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async () => {
		if (!validate()) {
			return
		}
		try {
			const updatedVoucherData = await VoucherManagementService.UPDATE_VOUCHER(row.id, data)
			console.log('Updated Voucher Data: ', updatedVoucherData)
			handleClose() 
		} catch (error) {
			console.error('Error updating voucher: ', error)
		}
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Update Voucher</DialogTitle>
			<DialogContent>
				<TextField
					name='name'
					label='Voucher Name'
					value={data.name}
					onChange={handleChange}
					fullWidth
					margin='normal'
					error={!!errors.name} 
					helperText={errors.name} 
				/>
				<TextField
					name='description'
					label='Description'
					value={data.description}
					onChange={handleChange}
					fullWidth
					margin='normal'
					error={!!errors.description}
					helperText={errors.description}
				/>
				<TextField
					name='expiredDate'
					label='Expiration Date'
					value={data.expiredDate}
					onChange={handleChange}
					fullWidth
					margin='normal'
					error={!!errors.expiredDate}
					helperText={errors.expiredDate}
				/>
				<TextField
					name='reducedPercent'
					label='Reduced Percent'
					type='number'
					value={data.reducedPercent}
					onChange={handleChange}
					fullWidth
					margin='normal'
					error={!!errors.reducedPercent}
					helperText={errors.reducedPercent}
				/>
				<TextField
					name='maxReducing'
					label='Max Reducing (VND)'
					type='number'
					value={data.maxReducing}
					onChange={handleChange}
					fullWidth
					margin='normal'
					error={!!errors.maxReducing}
					helperText={errors.maxReducing}
				/>
				<TextField
					name='quantity'
					label='Quantity'
					type='number'
					value={data.quantity}
					onChange={handleChange}
					fullWidth
					margin='normal'
					error={!!errors.quantity}
					helperText={errors.quantity}
				/>

				<Box marginTop={2} display='flex' flexDirection='column' alignItems='center'>
					{imagePreview && (
						<Box marginBottom={2}>
							<img
								src={imagePreview}
								alt='Current Voucher'
								style={{
									width: '100%',
									maxHeight: '200px',
									border: '1px solid #ccc',
									borderRadius: '8px',
									objectFit: 'cover',
								}}
							/>
						</Box>
					)}
					<Button
						component='label'
						style={{
							border: '1px ',
							borderRadius: '8px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'white',
							backgroundColor: 'blue',
						}}
					>
						{!imagePreview ? 'Upload Image' : 'Change Image'}
						<input type='file' hidden accept='image/*' onChange={handleImageChange} />
					</Button>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSubmit} color='primary'>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default VoucherUpdate
