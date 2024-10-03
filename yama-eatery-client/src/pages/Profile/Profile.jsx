import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'

const fieldRow = [
	{ name: 'name', label: 'Name', type: 'text' },
	{ name: 'email', label: 'Email', type: 'text' },
	{ name: 'address', label: 'Address', type: 'text' },
	{ name: 'phone', label: 'Phone', type: 'text' },
	{ name: 'birthday', label: 'Birthday', type: 'date' },
]

const Profile = () => {
	const [isEditing, setIsEditing] = useState(false)
	const [profile, setProfile] = useState({
		image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_68.jpg',
		name: 'Yasuo',
		email: '123@example.com',
		address: '96 Bùi Thị Xuân',
		phone: '0918881266',
		birthday: '2015-09-06',
	})

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			const imageUrl = URL.createObjectURL(file)
			setEditableProfile({ ...editableProfile, image: imageUrl })
		}
	}
	const [editableProfile, setEditableProfile] = useState({ ...profile })

	const handleEdit = () => setIsEditing(true)

	const handleCancel = () => {
		setEditableProfile({ ...profile })
		setIsEditing(false)
	}
	const handleSave = () => {
		setProfile({ ...editableProfile })
		setIsEditing(false)
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === 'name' && !/^[\p{L}\s]*$/gu.test(value)) return
		if (name === 'address' && !/^[\p{L}\d\s]*$/gu.test(value)) return
		if (name === 'phone' && !/^\d*$/.test(value)) return
		setEditableProfile({ ...editableProfile, [name]: value })
	}

	return (
		<Box>
			<Typography
				variant='h2'
				textAlign={'center'}
				m={3}
				textTransform={'uppercase'}
				fontFamily={'cursive'}
			>
				Profile
			</Typography>
			<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={'0% 5%'}>
				<Box
					width={'45%'}
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					justifyContent={'space-between'}
					p={'2%'}
					sx={{
						position: 'relative',
						':hover img': {
							filter: 'brightness(0.5)',
						},
						':hover .editIcon': {
							opacity: 1,
						},
					}}
				>
					<img
						style={{
							width: '100%',
							objectFit: 'cover',
							aspectRatio: 1 / 1,
							clipPath: 'circle(50%)',
							position: 'relative',
							transition: 'filter 0.3s ease',
						}}
						alt={'yasuo'}
						src={editableProfile.image}
					/>
					<IconButton
						className='editIcon'
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							color: 'white',
							zIndex: 2,
							opacity: 0,
							transition: 'opacity 0.3s ease',
						}}
						onClick={() => document.getElementById('file-input').click()}
					>
						<EditIcon />
						<input
							id='file-input'
							type='file'
							style={{ display: 'none' }}
							accept='image/*'
							onChange={handleImageChange}
						/>
					</IconButton>
				</Box>
				<Box width={'50%'}>
					{fieldRow.map((field) => (
						<Box
							display={'flex'}
							flexDirection={'row'}
							alignItems={'center'}
							justifyContent={'space-between'}
							p={'2%'}
							width={'100%'}
						>
							<Typography variant='h6'>{field.label}:</Typography>
							<TextField
								variant='outlined'
								sx={{ width: '80%' }}
								name={field.name}
								value={editableProfile[field.name]}
								onChange={handleChange}
								InputProps={{ readOnly: !isEditing || field.name === 'email' }}
								type={field.type}
							/>
						</Box>
					))}
					<Box
						display={'flex'}
						flexDirection={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						mt={2}
					>
						{isEditing ? (
							<>
								<Button
									type='reset'
									sx={{ width: '44%' }}
									variant='contained'
									color='inherit'
									onClick={handleCancel}
								>
									Cancel
								</Button>
								<Button
									sx={{ width: '44%' }}
									color='success'
									variant='contained'
									onClick={handleSave}
								>
									Save
								</Button>
							</>
						) : (
							<>
								<Button
									type='reset'
									color='primary'
									sx={{ width: '44%' }}
									variant='contained'
									onClick={handleEdit}
								>
									Edit
								</Button>
								<Button color='secondary' sx={{ width: '44%' }} variant='contained'>
									Change Password
								</Button>
							</>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Profile
