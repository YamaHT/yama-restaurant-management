import { Close, FileUpload } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { VoucherManagementService } from '@/services/VoucherManagementService'
import { enqueueSnackbar } from 'notistack'

const VoucherAdd = ({ open, handleClose, onSuccess }) => {
	const fileRef = useRef(null)
	const [imageBase64, setImageBase64] = useState('')
	const [values, setValues] = useState({
		image: '',
		name: '',
		description: '',
		expiredDate: '',
		reducedPercent: '',
		maxReducing: '',
		quantity: '',
	})

	const [errors, setErrors] = useState({
		image: '',
		name: '',
		description: '',
		expiredDate: '',
		reducedPercent: '',
		maxReducing: '',
		quantity: '',
	})

	const handleValueChange = (e) => {
		const { name, value } = e.target
		setValues((prev) => ({ ...prev, [name]: value }))
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setImageBase64(reader.result)
				setValues((prev) => ({ ...prev, image: file }))
			}
			reader.readAsDataURL(file)
		}
	}

	const removeImageInput = () => {
		setValues((prev) => ({ ...prev, image: '' }))
		setImageBase64('')
	}

	const handleAddVoucher = async () => {
		const newErrors = {
			image: values.image === '' ? 'Field image is required' : '',
			name: values.name === '' ? 'Field name is required' : '',
			description: values.description === '' ? 'Field description is required' : '',
			expiredDate: values.expiredDate === '' ? 'Field expiredDate is required' : '',
			reducedPercent: values.reducedPercent === '' ? 'Field reducedPercent is required' : '',
			maxReducing: values.maxReducing === '' ? 'Field maxReducing is required' : '',
			quantity: values.quantity === '' ? 'Field quantity is required' : '',
		}

		setErrors(newErrors)
		const formHasError = Object.values(newErrors).some((error) => error !== '')

		if (formHasError) {
			return
		}

		try {
			const formData = new FormData()
			formData.append('name', values.name)
			formData.append('description', values.description)
			formData.append('expiredDate', values.expiredDate)
			formData.append('reducedPercent', values.reducedPercent)
			formData.append('maxReducing', values.maxReducing)
			formData.append('quantity', values.quantity)
			if (values.image) {
				formData.append('image', values.image)
			}
			const newVoucherData = await VoucherManagementService.ADD_VOUCHER(formData)
			console.log('Added Voucher Data: ', newVoucherData)
			enqueueSnackbar('Add Success', {variant: 'success'})
            handleClose()
			onSuccess()
	
		} catch (error) {
			console.error('Error adding voucher: ', error)
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
			<DialogTitle>
				Add New Voucher
				<IconButton
					aria-label='close'
					onClick={handleClose}
					sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
				>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3}>
					<TextField
						label='Voucher Name'
						variant='outlined'
						name='name'
						value={values.name}
						onChange={handleValueChange}
						error={!!errors.name}
						helperText={errors.name}
						required
					/>
					<TextField
						label='Description'
						variant='outlined'
						name='description'
						value={values.description}
						onChange={handleValueChange}
						error={!!errors.description}
						helperText={errors.description}
						required
					/>
					<TextField
						label='Expiration Date'
						variant='outlined'
						type='date'
						name='expiredDate'
						value={values.expiredDate}
						onChange={handleValueChange}
						error={!!errors.expiredDate}
						helperText={errors.expiredDate}
						InputLabelProps={{ shrink: true }}
						required
					/>
					<TextField
						label='Reduced Percent (%)'
						variant='outlined'
						name='reducedPercent'
						value={values.reducedPercent}
						onChange={handleValueChange}
						error={!!errors.reducedPercent}
						helperText={errors.reducedPercent}
						required
					/>
					<TextField
						label='Max Reducing (VND)'
						variant='outlined'
						name='maxReducing'
						value={values.maxReducing}
						onChange={handleValueChange}
						error={!!errors.maxReducing}
						helperText={errors.maxReducing}
						required
					/>
					<TextField
						label='Quantity'
						variant='outlined'
						name='quantity'
						value={values.quantity}
						onChange={handleValueChange}
						error={!!errors.quantity}
						helperText={errors.quantity}
						required
					/>
					{values.image ? (
						<Button
							onClick={removeImageInput}
							variant='contained'
							color='error'
							startIcon={<Close />}
							fullWidth
						>
							Remove Image
						</Button>
					) : (
						<Button variant='contained' component='label' startIcon={<FileUpload />} fullWidth>
							Upload Image
							<input
								hidden
								accept='image/*'
								type='file'
								onChange={handleImageChange}
								ref={fileRef}
							/>
						</Button>
					)}
					{imageBase64 && (
						<img
							src={imageBase64}
							alt='Voucher preview'
							style={{ width: '100%', height: 'auto' }}
						/>
					)}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' color='primary' onClick={handleAddVoucher}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default VoucherAdd
