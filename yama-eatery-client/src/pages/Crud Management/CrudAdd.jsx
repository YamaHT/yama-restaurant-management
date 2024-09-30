import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Skeleton,
	Stack,
	TextField,
} from '@mui/material'
import React, { useState } from 'react'

const CrudAdd = ({ open, handleClose }) => {
	const [image, setImage] = useState({ name: '', base64: '' })

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

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			PaperProps={{
				component: 'form',
				onSubmit: (event) => {
					event.preventDefault()
					const formData = new FormData(event.currentTarget)
					const formJson = Object.fromEntries(formData.entries())
					handleClose()
				},
			}}
		>
			<DialogTitle>Add New Product</DialogTitle>
			<DialogContent>
				<FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
						type='file'
						onChange={handleImageChange}
						slotProps={{ inputLabel: { shrink: true } }}
					/>
					<TextField label='Name' name='name' variant='filled' />
					<TextField label='Price' name='price' type='number' variant='filled' />
					<Stack direction={'row'} alignItems={'center'}>
						<TextField
							fullWidth
							label='Description'
							name='description'
							variant='filled'
							multiline
							minRows={3}
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
						<Select labelId='category-label'>
							<MenuItem value={1}>dsa</MenuItem>
							<MenuItem value={2}>dsa</MenuItem>
							<MenuItem value={3}>dsa</MenuItem>
						</Select>
					</FormControl>
				</FormControl>
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
				<Button onClick={handleClose} size='large' variant='contained' color='primary'>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CrudAdd
