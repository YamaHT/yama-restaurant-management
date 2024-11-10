import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { UserService } from '@/services/UserService'
import { AssetImages } from '@/utilities/AssetImages'
import { formatDateWithLetterMonth } from '@/utilities/FormatUtil'
import { Edit, PhotoCamera } from '@mui/icons-material'
import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	timelineItemClasses,
	TimelineSeparator,
} from '@mui/lab'
import {
	Avatar,
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Paper,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'

const Profile = () => {
	const [profile, setProfile] = useState({
		name: null,
		image: null,
		birthday: null,
		phone: null,
		gender: '',
		membership: {
			membershipStatus: null,
			rank: null,
			memberScore: 0,
		},
		creationDate: null,
	})
	const [imageFile, setImageFile] = useState(null)

	const [profilePresentation, setProfilePresentation] = useState([])
	const [imagePresentation, setImagePresentation] = useState(null)
	const [isEditting, setIsEditting] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

	const imageRef = useRef(null)
	const fieldsRef = useRef({})

	useEffect(() => {
		const fetchUserProfile = async () => {
			const data = await UserService.GET_PROFILE()
			if (data) {
				setProfile(data)
			}
		}
		fetchUserProfile()
	}, [])

	useEffect(() => {
		const formattedDate = formatDateWithLetterMonth(profile.creationDate)

		setProfilePresentation([
			`Enrolled on: ${formattedDate}`,
			`Membership: ${profile.membership?.rank}`,
			`Name: ${profile.name}`,
			`Birthday: ${profile.birthday}`,
			`Phone: ${profile.phone}`,
			`Gender: ${profile.gender && profile.gender !== 'null' ? profile.gender : 'Not Specified'}`,
		])
	}, [profile])

	const handleChange = (e) => {
		const { name, value } = e.target
		setProfile((prev) => ({ ...prev, [name]: value }))
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setImagePresentation(reader.result)
			}
			setImageFile(file)
			reader.readAsDataURL(file)
		}
	}

	const handleAvatarClick = () => {
		imageRef.current.click()
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		let isValid = true
		Object.keys(fieldsRef.current).forEach((key) => {
			if (!fieldsRef.current[key]?.validate()) {
				isValid = false
			}
		})
		if (!isValid) return

		const formData = new FormData()
		formData.append('name', profile.name)
		formData.append('birthday', profile.birthday)
		formData.append('phone', profile.phone)
		formData.append('gender', profile.gender)
		formData.append('imageFile', imageFile)

		const data = await UserService.UPDATE_PROFILE(formData)
		if (data) {
			setIsEditting(false)
			enqueueSnackbar(data.success, { variant: 'success' })
			window.dispatchEvent(new Event('profileChange'))
		}
	}

	return (
		<Paper sx={{ p: '2% 5%', display: 'flex', justifyContent: 'space-between', gap: 5 }}>
			<Stack width={'30%'} spacing={2}>
				<IconButton
					sx={{
						position: 'relative',
						p: 0,
						transition: 'transform 0.3s ease-in-out',
					}}
					onClick={isEditting ? handleAvatarClick : null}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<Avatar
						src={
							imagePresentation
								? imagePresentation
								: profile.image
								? AssetImages.UserImage(profile.image)
								: ''
						}
						sx={{ width: '100%', height: '100%', aspectRatio: 1, objectFit: 'cover' }}
					/>
					{isHovered && isEditting && (
						<Box
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								borderRadius: '50%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								color: 'white',
							}}
						>
							<PhotoCamera sx={{ fontSize: 40 }} />
						</Box>
					)}
					<input
						ref={imageRef}
						type='file'
						style={{ display: 'none' }}
						accept='image/*'
						onChange={handleImageChange}
					/>
				</IconButton>
				<Timeline
					sx={{
						[`& .${timelineItemClasses.root}:before`]: {
							flex: 0,
							padding: 0,
						},
					}}
				>
					{profilePresentation.map((presentation, index) => (
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color='primary' />
								{index !== profilePresentation.length - 1 ? (
									<TimelineConnector sx={{ bgcolor: 'primary.main' }} />
								) : null}
							</TimelineSeparator>
							<TimelineContent>{presentation}</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			</Stack>

			<Stack component={'form'} onSubmit={handleSubmit} spacing={3} width={'70%'}>
				<Typography textAlign={'center'} variant='h4' fontWeight={'bold'}>
					YOUR PROFILE
				</Typography>
				<Button
					fullWidth
					color='secondary'
					variant='outlined'
					startIcon={<Edit />}
					onClick={() => setIsEditting(true)}
					disabled={isEditting}
				>
					CHANGE PROFILE INFORMATION
				</Button>
				<ValidationTextField
					ref={(el) => (fieldsRef.current['name'] = el)}
					label={'Name'}
					name='name'
					value={profile.name}
					onChange={handleChange}
					disabled={!isEditting}
					slotProps={{ inputLabel: { shrink: true } }}
				/>
				<TextField
					type='date'
					label={'Birthday'}
					name='birthday'
					value={profile.birthday}
					onChange={handleChange}
					disabled={!isEditting}
					slotProps={{
						inputLabel: { shrink: true },
						input: { inputProps: { max: new Date().toISOString().split('T')[0] } },
					}}
				/>
				<ValidationTextField
					ref={(el) => (fieldsRef.current['phone'] = el)}
					label={'Phone'}
					name='phone'
					value={profile.phone}
					onChange={handleChange}
					regex='^\d{10}$'
					regexErrorText='Please enter valid phone with 10 digits'
					disabled={!isEditting}
					slotProps={{ inputLabel: { shrink: true } }}
				/>
				<FormControl disabled={!isEditting}>
					<FormLabel id='gender'>Gender</FormLabel>
					<RadioGroup
						row
						aria-labelledby='gender'
						name='gender'
						value={profile.gender}
						onChange={handleChange}
					>
						<FormControlLabel control={<Radio value={'Female'} />} label='Female' />
						<FormControlLabel control={<Radio value={'Male'} />} label='Male' />
						<FormControlLabel control={<Radio value={'null'} />} label='Not Specified' />
					</RadioGroup>
				</FormControl>
				<Stack direction={'row'} spacing={5}>
					<Button
						fullWidth
						variant='contained'
						color='inherit'
						disabled={!isEditting}
						onClick={() => setIsEditting(false)}
					>
						Cancel
					</Button>
					<Button
						fullWidth
						type='submit'
						variant='contained'
						color='success'
						disabled={!isEditting}
					>
						Update
					</Button>
				</Stack>
			</Stack>
		</Paper>
	)
}

export default Profile
