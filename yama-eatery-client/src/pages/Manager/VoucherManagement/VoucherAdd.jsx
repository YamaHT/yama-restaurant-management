import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
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
import { enqueueSnackbar } from 'notistack'
import { useRef, useState } from 'react'

const VoucherAdd = ({ open, handleClose, handleAdd }) => {
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

	const fieldsRef = useRef({})

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
		let isValid = true

		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})

		if (!values.image) {
			enqueueSnackbar('Image is required', { variant: 'error' })
		}

		if (!isValid) {
			return
		}

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

		handleAdd(formData)
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add New Voucher</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3}>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['name'] = el)}
						label='Voucher Name'
						variant='filled'
						name='name'
						value={values.name}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['description'] = el)}
						label='Description'
						variant='filled'
						name='description'
						value={values.description}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['expiredDate'] = el)}
						label='Expiration Date'
						variant='filled'
						type='date'
						name='expiredDate'
						value={values.expiredDate}
						onChange={handleValueChange}
						slotProps={{
							inputLabel: { shrink: true },
							input: { inputProps: { min: new Date().toISOString().split('T')[0] } },
						}}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['reducedPercent'] = el)}
						label='Reduced Percent (%)'
						variant='filled'
						name='reducedPercent'
						value={values.reducedPercent}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['maxReducing'] = el)}
						label='Max Reducing (VND)'
						variant='filled'
						name='maxReducing'
						value={values.maxReducing}
						onChange={handleValueChange}
					/>
					<ValidationTextField
						ref={(el) => (fieldsRef.current['quantity'] = el)}
						label='Quantity'
						variant='filled'
						name='quantity'
						value={values.quantity}
						onChange={handleValueChange}
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
				<Button variant='text' color='inherit' onClick={handleClose}>
					Cancel
				</Button>
				<Button variant='contained' color='primary' onClick={handleAddVoucher}>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default VoucherAdd
