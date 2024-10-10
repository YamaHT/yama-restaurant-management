import {
	Box,
	Button,
	IconButton,
	TextField,
	Typography,
	Alert,
	Grow,
	RadioGroup,
	FormControlLabel,
	Radio,
	Paper,
	Avatar,
	Collapse,
	Slide,
} from '@mui/material'
import {
	Edit,
	Email,
	LocalPhone,
	Cake,
	Work,
	Person,
	Male,
	Female,
	Close,
} from '@mui/icons-material'
import React, { useState } from 'react'

const fieldRow = [
	{ name: 'name', label: 'Name', type: 'text' },
	{ name: 'phone', label: 'Phone', type: 'text' },
	{ name: 'birthday', label: 'Birthday', type: 'date' },
]
const formatDate = (dateStr) => {
	const date = new Date(dateStr)
	return date.toLocaleDateString('en-GB')
}
const Today = new Date(new Date().setDate(new Date().getDate() - 1)).toJSON().split('T')[0]
const Profile = () => {
	const [profile, setProfile] = useState({
		role: 'Customer',
		image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
		name: 'Yasuo',
		email: '123@example.com',
		gender: true,
		phone: '1234567890',
		birthday: '2001-09-11',
		password: 'asd',
	})
	const [editableProfile, setEditableProfile] = useState({ ...profile })
	const [isEditing, setIsEditing] = useState(false)
	const [open, setOpen] = useState(false)
	const [showButton, setShowButton] = useState(false)
	const [alert, setAlert] = useState({ message: '', open: false, severity: '' })
	const [errors, setErrors] = useState({
		name: false,
		address: false,
		phone: false,
	})
	const [helperTxt, setHelperTxt] = useState({
		name: '',
		address: '',
		phone: '',
	})
	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			const imageUrl = URL.createObjectURL(file)
			setEditableProfile((prev) => ({ ...prev, image: imageUrl }))
		}
	}
	const handleCancel = () => {
		setHelperTxt({
			name: '',
			address: '',
			phone: '',
		})
		setEditableProfile({ ...profile, image: profile.image })
		setErrors({ name: false, address: false, phone: false })
		setIsEditing(false)
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		let isValid = true,
			txt = ''

		const validators = {
			name: /^[\p{L}\s]*$/gu.test(value) && value.length <= 50,
			phone: /^\d{0,10}$/.test(value),
			birthday: value >= '1900-01-01' && value <= Today,
		}
		if (name === 'gender') {
			setEditableProfile((prev) => ({ ...prev, gender: value === 'true' }))
			return
		}
		if (validators[name] === false) {
			if (name === 'name') {
				txt = `Name must be less than 50 characters`
			}
			if (name === 'phone') {
				txt = 'Phone must be max 10 digits'
			}
			if (name === 'birthday') {
				txt = 'Birthday must be before today'
			} else {
				txt = `Invalid ${name}`
			}
			isValid = false
		}
		setErrors({ ...errors, [name]: !isValid })
		setHelperTxt({ ...helperTxt, [name]: txt })
		if (isValid) setEditableProfile({ ...editableProfile, [name]: value })
	}
	const handleSave = () => {
		const validValue = {
			name: editableProfile.name.trim(),
			phone: editableProfile.phone.trim(),
			birthday: editableProfile.birthday.trim(),
			gender: editableProfile.gender,
		}
		if (![validValue.name, validValue.phone, validValue.birthday].every((value) => value)) {
			setAlert({ message: 'Please enter valid information!', open: true, severity: 'error' })
			setTimeout(() => setAlert({ ...alert, open: false }), 3000)
			return
		}
		if (validValue.phone.length < 10) {
			setAlert({ message: 'Phone must be max 10 digits!', open: true, severity: 'error' })
			setTimeout(() => setAlert({ ...alert, open: false }), 3000)
			return
		}
		setErrors({ name: false, address: false, phone: false })
		setHelperTxt({
			name: '',
			address: '',
			phone: '',
		})
		setEditableProfile({ ...editableProfile, ...validValue })
		setProfile({ ...editableProfile })
		setIsEditing(false)
		toggleSlide()
	}
	const handleEntered = () => {
		setShowButton(true)
	}
	const toggleSlide = () => {
		handleCancel()
		setShowButton(false)
		setOpen(!open)
	}
	const profileFields = [
		{ key: 'role', icon: <Work fontSize='large' /> },
		{ key: 'name', icon: <Person fontSize='large' /> },
		{ key: 'email', icon: <Email fontSize='large' /> },
		{
			key: 'gender',
			icon: editableProfile.gender ? <Male fontSize='large' /> : <Female fontSize='large' />,
		},
		{ key: 'phone', icon: <LocalPhone fontSize='large' /> },
		{ key: 'birthday', icon: <Cake fontSize='large' /> },
	]
	return (
		<Box p={'0 2%'}>
			<Typography variant='h2' textAlign='center' m={3} textTransform='uppercase'>
				Profile
			</Typography>
			<Collapse
				timeout={500}
				in={!open}
				mountOnEnter
				unmountOnExit
				onEntered={handleEntered}
				appear
			>
				<Box
					display={'flex'}
					justifyContent='space-between'
					alignItems='center'
					component={Paper}
					p='0% 2%'
				>
					<Box width={'25%'} p={'2%'}>
						<Avatar
							variant='rounded'
							src={profile.image}
							alt={profile.name}
							sx={{
								width: '100%',
								height: '100%',
								aspectRatio: 7 / 6,
								objectFit: 'cover',
							}}
						/>
					</Box>
					<Box
						display='grid'
						gridTemplateColumns='repeat(2, 1fr)'
						alignContent='center'
						gap='25% 0'
						width='70%'
						pl='1%'
					>
						{profileFields.map((field, index) => (
							<Box key={index} display='flex' p='2% 0' alignItems='center'>
								{field.icon}
								<Typography variant='h5' pl='1%' textTransform='capitalize' fontWeight={'bold'}>
									{field.key}:
								</Typography>
								<Typography
									mr={'5%'}
									ml={'1%'}
									variant='h5'
									sx={{
										display: '-webkit-box',
										WebkitLineClamp: 1,
										WebkitBoxOrient: 'vertical',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{field.key === 'birthday'
										? formatDate(profile[field.key])
										: field.key === 'gender'
										? profile[field.key]
											? 'Male'
											: 'Female'
										: profile[field.key]}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			</Collapse>
			{showButton && (
				<Button
					variant='text'
					color='inherit'
					onClick={toggleSlide}
					sx={{
						position: 'absolute',
						top: '20%',
						right: '3%',
						zIndex: 2,
					}}
				>
					{open ? <Close fontSize='large' /> : <Edit fontSize='large' />}
				</Button>
			)}
			<Slide
				direction='up'
				timeout={500}
				mountOnEnter
				unmountOnExit
				onEntered={handleEntered}
				in={open}
			>
				<Box display={'flex'} justifyContent='space-between' p='0% 2%' component={Paper}>
					<Box width='25%' p={'1%'}>
						{isEditing ? (
							<Box
								width={'100%'}
								m={'2%'}
								sx={{
									position: 'relative',
									'&:hover .avatar-overlay': {
										opacity: 1,
									},
									'&:hover .avatar-image': {
										filter: 'blur(1px)',
									},
								}}
							>
								<Avatar
									variant='rounded'
									src={editableProfile.image}
									alt={editableProfile.name}
									className='avatar-image'
									sx={{
										width: '100%',
										height: '100%',
										aspectRatio: '7/6',
										objectFit: 'cover',
										transition: 'filter 0.3s ease',
									}}
								/>
								<Box
									className='avatar-overlay'
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										background: 'rgba(0,0,0,0.5)',
										opacity: 0,
										transition: 'opacity 0.3s ease',
									}}
								>
									<IconButton
										onClick={() => document.getElementById('file-input').click()}
										sx={{
											zIndex: 10,
											background: 'rgba(255,255,255,0.8)',
											'&:hover': {
												background: 'rgba(255,255,255,1)',
											},
										}}
									>
										<Edit />
										<input
											id='file-input'
											type='file'
											style={{ display: 'none' }}
											accept='image/*'
											onChange={handleImageChange}
										/>
									</IconButton>
								</Box>
							</Box>
						) : (
							<Box width={'100%'} m={'2%'}>
								<Avatar
									variant='rounded'
									src={editableProfile.image}
									alt={editableProfile.name}
									sx={{
										width: '100%',
										height: '100%',
										aspectRatio: 7 / 6,
										objectFit: 'cover',
									}}
								/>
							</Box>
						)}
						{profileFields.map((field, index) => (
							<Box key={index} display='flex' p='1% 0' alignItems='center'>
								{field.icon}
								<Typography
									ml={2}
									variant='body2'
									sx={{
										display: '-webkit-box',
										WebkitLineClamp: 1,
										WebkitBoxOrient: 'vertical',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{field.key === 'birthday'
										? formatDate(editableProfile[field.key])
										: field.key === 'gender'
										? editableProfile[field.key]
											? 'Male'
											: 'Female'
										: editableProfile[field.key]}
								</Typography>
							</Box>
						))}
					</Box>
					<Box width='75%' position='relative' p='2%' borderRadius={0}>
						<Box display='flex' justifyContent='end'>
							<Grow
								timeout={500}
								in={alert.open}
								style={{ width: '100%', top: '2%', left: '3%', position: 'absolute' }}
							>
								<Alert variant='filled' severity={alert.severity}>
									{alert.message}
								</Alert>
							</Grow>
						</Box>
						{fieldRow.map((field) => (
							<Box
								key={field.name}
								display='flex'
								flexDirection='row'
								alignItems='center'
								justifyContent='space-between'
								position='relative'
								p='2%'
							>
								<Typography variant='h6'>{field.label}:</Typography>
								<TextField
									variant='outlined'
									sx={{ width: '85%', pr: '5%' }}
									name={field.name}
									value={editableProfile[field.name]}
									onChange={handleChange}
									InputProps={{ disabled: !isEditing }}
									type={field.type}
									inputProps={field.name === 'birthday' ? { max: Today, min: '1900-01-01' } : ''}
									error={errors[field.name]}
									helperText={helperTxt[field.name]}
								/>
							</Box>
						))}
						<Box
							display='flex'
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'
							position='relative'
							p='2%'
						>
							<Typography variant='h6'>Gender:</Typography>
							<RadioGroup
								row
								name='gender'
								value={editableProfile.gender}
								onChange={handleChange}
								sx={{ width: '85%' }}
							>
								<FormControlLabel
									value={false}
									disabled={!isEditing}
									control={<Radio />}
									label='Female'
								/>
								<FormControlLabel
									value={true}
									disabled={!isEditing}
									control={<Radio />}
									label='Male'
								/>
							</RadioGroup>
						</Box>
						<Box display='flex' justifyContent='space-between' padding='0 7% 0 2%'>
							{isEditing ? (
								<>
									<Button
										variant='contained'
										color='inherit'
										sx={{ width: '40%' }}
										onClick={handleCancel}
									>
										Cancel
									</Button>
									<Button
										variant='contained'
										color='success'
										sx={{ width: '40%' }}
										onClick={handleSave}
									>
										Save
									</Button>
								</>
							) : (
								<>
									<Button
										variant='contained'
										color='primary'
										sx={{ width: '40%' }}
										onClick={() => setIsEditing((prev) => !prev)}
									>
										Edit
									</Button>
									<Button
										variant='contained'
										color='secondary'
										sx={{ width: '40%' }}
										onClick={() => {}}
									>
										Change Password
									</Button>
								</>
							)}
						</Box>
					</Box>
				</Box>
			</Slide>
		</Box>
	)
}

export default Profile
