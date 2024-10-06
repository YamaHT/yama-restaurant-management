import { Box, Button, IconButton, TextField, Typography, Alert, Grow } from '@mui/material'
import {
	Edit,
	Email,
	Home,
	LocalPhone,
	Cake,
	Work,
	Person,
	AccountCircle,
} from '@mui/icons-material'
import React, { useState } from 'react'

const fieldRow = [
	{ name: 'name', label: 'Name', type: 'text' },
	{ name: 'address', label: 'Address', type: 'text' },
	{ name: 'phone', label: 'Phone', type: 'text' },
	{ name: 'birthday', label: 'Birthday', type: 'date' },
]

const profileFields = [
	{ key: 'username', icon: <AccountCircle /> },
	{ key: 'role', icon: <Work /> },
	{ key: 'name', icon: <Person /> },
	{ key: 'email', icon: <Email /> },
	{ key: 'address', icon: <Home /> },
	{ key: 'phone', icon: <LocalPhone /> },
	{ key: 'birthday', icon: <Cake /> },
]

const formatDate = (dateStr) => {
	const date = new Date(dateStr)
	return date.toLocaleDateString('en-GB')
}
const Today = new Date(new Date().setDate(new Date().getDate() - 1)).toJSON().split('T')[0]

const Profile = () => {
	const [alert, setAlert] = useState({ message: '', open: false, severity: '' })
	const [isEditing, setIsEditing] = useState(false)
	const [profile, setProfile] = useState({
		username: 'customer',
		role: 'Customer',
		image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_68.jpg',
		name: 'Yasuo',
		email: '123@example.com',
		address: '96 Bùi Thị Xuân',
		phone: '1234567890',
		birthday: '2001-09-11',
		password: 'asd',
	})
	const [editableProfile, setEditableProfile] = useState({ ...profile })
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
	const [isChangingPass, setIsChangingPass] = useState(false)
	const [validPass, setValidPass] = useState({ oldpass: '', newpass: '', confirmpass: '' })
	const [passError, setPassError] = useState({
		oldpass: false,
		newpass: false,
		confirmpass: false,
	})
	const [passHelperTxt, setPassHelperTxt] = useState({
		oldpass: '',
		newpass: '',
		confirmpass: '',
	})

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			const imageUrl = URL.createObjectURL(file)
			setEditableProfile((prev) => ({ ...prev, image: imageUrl }))
			setProfile((prev) => ({ ...prev, image: imageUrl }))
		}
	}

	const handleCancel = () => {
		setHelperTxt({
			name: '',
			address: '',
			phone: '',
		})
		setEditableProfile({ ...profile })
		setErrors({ name: false, address: false, phone: false })
		setIsEditing(false)
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		let isValid = true,
			txt = ''
		const validators = {
			name: /^[\p{L}\s]*$/gu.test(value),
			address: /^[\p{L}\d\s]*$/gu.test(value),
			phone: /^\d{0,10}$/.test(value),
			birthday: value >= '1900-01-01' && value <= Today,
		}
		if (validators[name] === false) {
			if (name === 'phone') {
				txt = 'Phone must be max 10 digits'
			} else if (name === 'birthday') {
				txt = 'Birthday must be between 01-01-1900 and today'
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
			address: editableProfile.address.trim(),
			phone: editableProfile.phone.trim(),
			birthday: editableProfile.birthday.trim(),
		}
		if (
			![validValue.name, validValue.address, validValue.phone, validValue.birthday].every(
				(value) => value
			)
		) {
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
	}

	const handlePasswordChange = (e) => {
		const { name, value } = e.target
		setValidPass({ ...validPass, [name]: value })
	}

	const handleCancelChange = () => {
		setValidPass({ oldpass: '', newpass: '', confirmpass: '' })
		setPassHelperTxt({ oldpass: '', newpass: '', confirmpass: '' })
		setPassError({ oldpass: false, newpass: false, confirmpass: false })
		setIsChangingPass(false)
	}

	const handlevalidPass = () => {
		let isValid = true
		if (!validPass.oldpass || !validPass.newpass || !validPass.confirmpass) {
			setPassHelperTxt((prev) => ({
				...prev,
				oldpass: !validPass.oldpass ? 'Please enter your old password' : '',
				newpass: !validPass.newpass ? 'Please enter a new password' : '',
				confirmpass: !validPass.confirmpass ? 'Please confirm your new password' : '',
			}))
			setPassError({
				oldpass: !validPass.oldpass,
				newpass: !validPass.newpass,
				confirmpass: !validPass.confirmpass,
			})
			isValid = false
		}

		if (validPass.oldpass !== profile.password) {
			setPassHelperTxt((prev) => ({ ...prev, oldpass: 'Incorrect old password' }))
			setPassError((prev) => ({ ...prev, oldpass: true }))
			isValid = false
		}

		if (validPass.newpass === validPass.oldpass) {
			setPassHelperTxt((prev) => ({
				...prev,
				newpass: 'New password must be different from old password',
			}))
			setPassError((prev) => ({ ...prev, newpass: true }))
			isValid = false
		}

		if (validPass.newpass !== validPass.confirmpass) {
			setPassHelperTxt((prev) => ({ ...prev, confirmpass: 'Confirm password do not match' }))
			setPassError((prev) => ({ ...prev, confirmpass: true }))
			isValid = false
		}

		if (isValid) {
			setAlert({ message: 'Password changed successfully!', open: true, severity: 'success' })
			setTimeout(() => setAlert({ ...alert, open: false }), 3000)
			setValidPass({ oldpass: '', newpass: '', confirmpass: '' })
			setPassHelperTxt({ oldpass: '', newpass: '', confirmpass: '' })
			setPassError({ oldpass: false, newpass: false, confirmpass: false })
			setIsChangingPass(false)
		} else {
			setAlert({
				message: 'Please enter your password.',
				open: true,
				severity: 'error',
			})
			setTimeout(() => setAlert({ ...alert, open: false }), 2000)
		}
	}

	return (
		<Box>
			<Typography variant='h2' textAlign='center' m={3} textTransform='uppercase'>
				Profile
			</Typography>
			{/* Info */}
			<Box display='flex' justifyContent='space-between' p='0% 5%'>
				<Box width={'20%'}>
					<Box
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
								aspectRatio: 7 / 6,
								transition: 'filter 0.3s ease',
							}}
							alt={'yasuo'}
							src={editableProfile.image ? editableProfile.image : '/logo192.png'}
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
					{profileFields.map((field, index) => (
						<Box key={index} display='flex' p='2% 0' alignItems={'center'}>
							{field.icon}
							<Typography ml={2} variant='body2'>
								{field.key === 'birthday' ? formatDate(profile[field.key]) : profile[field.key]}
							</Typography>
						</Box>
					))}
				</Box>
				<Box width='75%' position='relative' p={'2%'} border={1}>
					<Box display={'flex'} justifyContent={'end'}>
						<Grow
							timeout={500}
							in={alert.open}
							style={{ width: '95%', top: '2%', left: '3%', position: 'absolute' }}
						>
							<Alert variant='filled' severity={alert.severity}>
								{alert.message}
							</Alert>
						</Grow>
						<Edit />
					</Box>
					{/* Changing pass */}
					<Grow in={isChangingPass} timeout={1000}>
						<Box display={isChangingPass ? 'block' : 'none'} mt={2} p={'2%'} position={'relative'}>
							<TextField
								name='oldpass'
								type='password'
								label='Old Password'
								value={validPass.oldpass}
								onChange={handlePasswordChange}
								error={passError.oldpass}
								helperText={passHelperTxt.oldpass}
								sx={{ width: '100%', pb: '3%', paddingRight: '5%' }}
							/>
							<TextField
								name='newpass'
								type='password'
								label='New Password'
								value={validPass.newpass}
								onChange={handlePasswordChange}
								error={passError.newpass}
								helperText={passHelperTxt.newpass}
								sx={{ width: '100%', pb: '3%', paddingRight: '5%' }}
							/>
							<TextField
								name='confirmpass'
								type='password'
								label='Confirm New Password'
								value={validPass.confirmpass}
								onChange={handlePasswordChange}
								error={passError.confirmpass}
								helperText={passHelperTxt.confirmpass}
								sx={{ width: '100%', pb: '3%', paddingRight: '5%' }}
							/>
							<Box display={'flex'} justifyContent={'space-between'} mr={'5%'}>
								<Button
									variant='contained'
									color='inherit'
									sx={{ width: '40%' }}
									onClick={handleCancelChange}
								>
									Cancel
								</Button>
								<Button
									variant='contained'
									color='success'
									sx={{ width: '40%' }}
									onClick={handlevalidPass}
								>
									Change Password
								</Button>
							</Box>
						</Box>
					</Grow>
					{/* Changing profile */}
					<Grow in={!isChangingPass} timeout={1000}>
						<Box display={!isChangingPass ? 'block' : 'none'}>
							{fieldRow.map((field) => (
								<Box
									key={field.name}
									display={'flex'}
									flexDirection={'row'}
									alignItems={'center'}
									justifyContent={'space-between'}
									position={'relative'}
									p={'2%'}
								>
									<Typography variant='h6'>{field.label}:</Typography>
									<TextField
										variant='outlined'
										sx={{ width: '85%', pr: '5%' }}
										name={field.name}
										value={editableProfile[field.name]}
										onChange={handleChange}
										InputProps={{
											disabled: !isEditing,
										}}
										type={field.type}
										inputProps={
											field.name === 'birthday'
												? {
														max: Today,
														min: '1900-01-01',
												  }
												: ''
										}
										error={errors[field.name]}
										helperText={helperTxt[field.name]}
									/>
								</Box>
							))}
							<Box display={'flex'} justifyContent={'space-between'} padding={'0 7% 0 2%'}>
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
											onClick={() => setIsEditing(true)}
										>
											Edit
										</Button>
										<Button
											variant='contained'
											color='secondary'
											sx={{ width: '40%' }}
											onClick={() => setIsChangingPass(true)}
										>
											Change Password
										</Button>
									</>
								)}
							</Box>
						</Box>
					</Grow>
				</Box>
			</Box>
		</Box>
	)
}

export default Profile
