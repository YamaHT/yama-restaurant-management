import { AssetImages } from '@/utilities/AssetImages'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

const VoucherUpdate = ({ open, handleClose, selectedVoucher, handleUpdate }) => {
	const [imagePreview, setImagePreview] = useState('')
	const [errors, setErrors] = useState({})

	const [data, setData] = useState({
		id: 0,
		name: '',
		description: '',
		expiredDate: '',
		reducedPercent: '',
		maxReducing: '',
		quantity: '',
		image: null,
	})

	useEffect(() => {
		if (selectedVoucher) {
			setData({
				id: selectedVoucher.id,
				name: selectedVoucher.name,
				description: selectedVoucher.description,
				expiredDate: selectedVoucher.expiredDate,
				reducedPercent: selectedVoucher.reducedPercent,
				maxReducing: selectedVoucher.maxReducing,
				quantity: selectedVoucher.quantity,
				image: selectedVoucher.image,
			})
			if (selectedVoucher.image) {
				setImagePreview(AssetImages.VoucherImage(selectedVoucher.image))
			}
		}
	}, [selectedVoucher])

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

		const formData = new FormData()

		formData.append('id', data.id)
		formData.append('name', data.name)
		formData.append('description', data.description)
		formData.append('expiredDate', data.expiredDate)
		formData.append('reducedPercent', data.reducedPercent)
		formData.append('maxReducing', data.maxReducing)
		formData.append('quantity', data.quantity)
		if (data.image) {
			formData.append('image', data.image)
		}
		console.log(formData)
		handleUpdate(formData)
		handleClose()
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
					label='Max Reducing (USD)'
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
							border: '1px solid',
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
