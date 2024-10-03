import { Close, FileUpload } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Skeleton,
	Stack,
	TextField,
} from '@mui/material'
import React, { useRef, useState } from 'react'

const CrudAdd = ({ open, handleClose }) => {
	const fileRef = useRef(null)

	const [image, setImage] = useState({ name: '', base64: '' })
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState(null)

	const handleImageChange = (event) => {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setImage({ name: file.name, base64: reader.result })
			}
			reader.readAsDataURL(file)
		}
	}

	const handleAddProduct = async () => {
		const productData = {
			image: image.name,
			name,
			price: parseFloat(price),
			description,
			category,
		}
		console.log(productData)
		handleClose()
	}

	//#region customInputImageProperties
	const customInputImageProperties = {
		inputLabel: {
			style: { color: 'gray' },
		},
		input: {
			disabled: true,
			style: { backgroundColor: 'rgba(0, 0, 0, 0.06' },
			endAdornment: (
				<>
					{image.name && (
						<IconButton onClick={() => setImage({ name: '', base64: '' })}>
							<Close />
						</IconButton>
					)}

					<input accept='image/*' type='file' hidden ref={fileRef} onChange={handleImageChange} />
					<IconButton onClick={() => fileRef.current.click()}>
						<FileUpload />
					</IconButton>
				</>
			),
		},
	}
	//#endregion

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add New Product</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					{image.base64 ? (
						<img
							src={image.base64}
							style={{
								minHeight: 200,
								maxHeight: 400,
								borderRadius: '10px',
								objectFit: 'fill',
								aspectRatio: 1,
							}}
						/>
					) : (
						<Skeleton animation={false} height={200} variant='rounded' />
					)}
					<TextField
						label='Image'
						variant='filled'
						name='image'
						value={image.name}
						slotProps={customInputImageProperties}
					/>
					<TextField
						label='Name'
						name='name'
						variant='filled'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						label='Price'
						name='price'
						type='number'
						variant='filled'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<Stack direction={'row'} alignItems={'center'}>
						<TextField
							fullWidth
							label='Description'
							name='description'
							variant='filled'
							multiline
							minRows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Stack alignItems={'center'} padding={'0 1%'} spacing={1}>
							<TextField size='small' variant='outlined' label={'(Optional)'} />
							<Button fullWidth variant='contained' color='info'>
								Auto Generate
							</Button>
						</Stack>
					</Stack>
					<FormControl variant='filled'>
						<InputLabel id='category-label'>Category</InputLabel>
						<Select
							labelId='category-label'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<MenuItem value={1}>dsa</MenuItem>
							<MenuItem value={2}>dsa</MenuItem>
							<MenuItem value={3}>dsa</MenuItem>
						</Select>
					</FormControl>
				</Stack>
			</DialogContent>
			<DialogActions
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: 2,
				}}
			>
				<Button onClick={handleClose} variant='outlined' color='inherit'>
					Close
				</Button>
				<Button onClick={handleAddProduct} size='large' variant='contained' color='primary'>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CrudAdd
