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

export default function UpdateStaff({ open, handleClose, currentProduct, onUpdate }) {
	const fileRef = useRef(null)
	const [imageBase64, setImageBase64] = useState([])
	const [values, setValues] = useState({
		email: currentProduct?.email || '',
		password: currentProduct?.password || '',
		name: currentProduct?.name || '',
		birthday: currentProduct?.birthday || '',
		phone: currentProduct?.phone || '',
		gender: currentProduct?.gender || '',
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
		if (files.length + values.images.length > 1) {
			alert('You can only upload a maximum of 1 images.')
			return
		}

		files.forEach((file) => {
			const reader = new FileReader()
			reader.onload = () => {
				setImageBase64((prev) => [...prev, reader.result])
				setValues((prev) => ({
					...prev,
					images: [...prev.images, file.name],
				}))
			}
			reader.readAsDataURL(file)
		})
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
			<DialogTitle>Update Staff</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					{imageBase64.length > 0 ? (
						<Stack direction='row' spacing={1} flexWrap='wrap'>
							{imageBase64.map((image, index) => (
								<Stack key={index} spacing={1} alignItems={'center'}>
									<img
										src={image}
										style={{
											width: 200,
											height: 200,
											borderRadius: '10px',
											objectFit: 'fill',
											cursor: 'pointer',
										}}
										alt={`Uploaded ${index + 1}`}
									/>
								</Stack>
							))}
						</Stack>
					) : (
						<Skeleton animation={false} height={200} variant='rounded' />
					)}

					<TextField
						label='Email'
						name='email'
						variant='filled'
						value={values.email}
						onChange={handleValueChange}
					/>
					<TextField
						label='Password'
						name='password'
						variant='filled'
						value={values.password}
						onChange={handleValueChange}
					/>
					<TextField
						label='Name'
						name='name'
						variant='filled'
						value={values.name}
						onChange={handleValueChange}
					/>
					<TextField
						label='Birthday'
						name='birthday'
						variant='filled'
						value={values.birthday}
						onChange={handleValueChange}
					/>
					<TextField
						label='Phone'
						name='phone'
						variant='filled'
						value={values.phone}
						onChange={handleValueChange}
					/>
					<TextField
						label='Gender'
						name='gender'
						variant='filled'
						value={values.gender}
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
				enqueueSnackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
				message='Staff update successfully'
			/>
		</Dialog>
	)
}
