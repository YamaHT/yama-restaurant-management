import { Close, FileUpload } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Snackbar,
	Stack,
	TextField,
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useRef, useState } from 'react'

export default function CrudUpdate({ open, handleClose, currentProduct, onUpdate }) {
	const fileRef = useRef(null)
	const [imageBase64, setImageBase64] = useState([])
	const [values, setValues] = useState({
		tableId: currentProduct?.tableId || '',
		type: currentProduct?.type || '',
		floor: currentProduct?.floor || '',
		images: currentProduct?.images || [],
	})
	const [openSnackbar, setOpenSnackbar] = useState(false)

	const handleValueChange = (e) => {
		const { name, value } = e.target
		setValues((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files)

		if (files.length + values.images.length > 5) {
			alert('You can only upload a maximum of 5 images.')
			return
		}

		files.forEach((file) => {
			const reader = new FileReader()
			reader.onload = () => {
				setImageBase64((prev) => [...prev, reader.result]) // Cập nhật hình ảnh đã tải lên
				setValues((prev) => ({
					...prev,
					images: [...prev.images, file.name],
				}))
			}
			reader.readAsDataURL(file)
		})
	}

	const removeImageInput = (index) => {
		const updatedImages = values.images.filter((_, i) => i !== index)
		const updatedImageBase64 = imageBase64.filter((_, i) => i !== index)
		setValues((prev) => ({ ...prev, images: updatedImages }))
		setImageBase64(updatedImageBase64)
	}

	const handleUpdateProduct = async () => {
		const updatedProductData = {
			...values,
		}

		onUpdate(updatedProductData)
		setOpenSnackbar(true)
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Update Table</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					{imageBase64.length > 0 ? (
						<Stack direction='row' spacing={1} flexWrap='wrap'>
							{' '}
							{imageBase64.map((image, index) => (
								<Stack key={index} spacing={1} alignItems='center'>
									<img
										src={image}
										style={{
											width: 100,
											height: 100,
											borderRadius: '10px',
											objectFit: 'cover',
											cursor: 'pointer',
										}}
										alt={`Uploaded ${index + 1}`}
									/>
									<IconButton onClick={() => removeImageInput(index)} size='small'>
										<Close />
									</IconButton>
								</Stack>
							))}
						</Stack>
					) : (
						<Skeleton animation={false} height={200} variant='rounded' />
					)}

					<TextField
						label='Table ID'
						name='tableId'
						variant='filled'
						value={values.tableId}
						InputProps={{ readOnly: true }}
					/>
					<TextField
						label='Type'
						name='type'
						variant='filled'
						value={values.type}
						onChange={handleValueChange}
					/>
					<TextField
						label='Floor'
						name='floor'
						variant='filled'
						value={values.floor}
						onChange={handleValueChange}
					/>
					<TextField
						label='Images'
						variant='filled'
						value={values.images.join(', ')}
						InputProps={{
							endAdornment: (
								<>
									{values.images.length > 0 && (
										<IconButton onClick={() => setValues((prev) => ({ ...prev, images: [] }))}>
											<Close />
										</IconButton>
									)}
									<input
										accept='image/*'
										type='file'
										hidden
										ref={fileRef}
										multiple
										onChange={handleImageChange}
									/>
									<IconButton onClick={() => fileRef.current.click()}>
										<FileUpload />
									</IconButton>
								</>
							),
						}}
					/>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
				<Button onClick={handleClose} variant='outlined' color='inherit'>
					Close
				</Button>
				<Button onClick={handleUpdateProduct} size='large' variant='contained' color='primary'>
					Update
				</Button>
			</DialogActions>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
				message='Table updated successfully'
			/>
		</Dialog>
	)
}
