import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { AssetImages } from '@/utilities/AssetImages'
import { Restore } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'

const VoucherUpdate = ({ open, handleClose, selectedVoucher, handleUpdate }) => {
	const [imagePreview, setImagePreview] = useState('')
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

	const fieldsRef = useRef({})
	const fileRef = useRef(null)

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

	const handleSubmit = async () => {
		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (!data.image) {
			enqueueSnackbar('Image is required', { variant: 'error' })
		}

		if (!isValid) {
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
		handleUpdate(formData)
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Update Voucher</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3}>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['name'] = el)}
						name='name'
						label='Voucher Name'
						variant='filled'
						value={data.name}
						onChange={handleChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['description'] = el)}
						name='description'
						label='Description'
						variant='filled'
						value={data.description}
						onChange={handleChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['expiredDate'] = el)}
						name='expiredDate'
						label='Expiration Date'
						type='date'
						variant='filled'
						value={data.expiredDate}
						onChange={handleChange}
						slotProps={{
							inputLabel: { shrink: true },
							input: { inputProps: { min: new Date().toISOString().split('T')[0] } },
						}}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['reducedPercent'] = el)}
						name='reducedPercent'
						label='Reduced Percent'
						type='number'
						variant='filled'
						value={data.reducedPercent}
						onChange={handleChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['maxReducing'] = el)}
						name='maxReducing'
						label='Max Reducing (USD)'
						type='number'
						variant='filled'
						value={data.maxReducing}
						onChange={handleChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['quantity'] = el)}
						name='quantity'
						label='Quantity'
						type='number'
						variant='filled'
						value={data.quantity}
						onChange={handleChange}
					/>
					<Box marginTop={2} display='flex' flexDirection='column' alignItems='center'>
						{imagePreview && (
							<Box marginBottom={2} width={'100%'}>
								<Avatar
									src={imagePreview}
									alt='Current Voucher'
									style={{
										width: '100%',
										height: '100%',
										aspectRatio: 16 / 9,
										border: '1px solid #ccc',
										borderRadius: '8px',
										objectFit: 'cover',
									}}
								/>
							</Box>
						)}
						<Button
							fullWidth
							variant='contained'
							color='primary'
							onClick={() => fileRef.current.click()}
							startIcon={<Restore />}
						>
							{!imagePreview ? 'Upload Image' : 'Change Image'}
							<input
								ref={fileRef}
								type='file'
								hidden
								accept='image/*'
								onChange={handleImageChange}
							/>
						</Button>
					</Box>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button variant='text' color='inherit' onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={handleSubmit} variant='contained' color='primary'>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default VoucherUpdate
