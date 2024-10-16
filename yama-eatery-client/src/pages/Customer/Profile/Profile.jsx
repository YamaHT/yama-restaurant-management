import { UserService } from '@/services/UserService'
import { AssetImages } from '@/utilities/AssetImages'
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
import { useEffect, useRef, useState } from 'react'

const Profile = () => {
	const [profile, setProfile] = useState({
		name: 'Le Phuoc Duy',
		image: 'hmm.jpg',
		birthday: '2004-10-30',
		phone: '0123123123',
		gender: 'Male',
		membership: {
			membershipStatus: 'active',
			rank: 'Silver',
			memberScore: 5,
		},
		creationDate: '2024-10-14T21:34:13',
	})

	const [profilePresentation, setProfilePresentation] = useState([])
	const [isEditting, setIsEditting] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const imageRef = useRef(null)

	const [imagePresentation, setImagePresentation] = useState(null)

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
		const formattedDate = new Date(profile.creationDate).toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		})

		setProfilePresentation([
			`Enrolled on: ${formattedDate}`,
			`Membership: ${profile.membership?.rank}`,
			`Name: ${profile.name}`,
			`Birthday: ${profile.birthday}`,
			`Phone: ${profile.phone}`,
			`Gender: ${profile.gender ? profile.gender : 'Not Specified'}`,
		])
	}, [profile])

	const handleChange = (e) => {
		const { name, value } = e.target
		setProfile((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e) => {
		console.log('helloworld')
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			const imageUrl = URL.createObjectURL(file)
			setImagePresentation(imageUrl)
			setProfile((prev) => ({ ...prev, image: file.name }))
		}
	}

	const handleAvatarClick = () => {
		imageRef.current.click()
	}

	return (
		<Paper sx={{ p: '2% 5%', display: 'flex', justifyContent: 'space-between', gap: 5 }}>
			<Stack width={'30%'} spacing={2}>
				<Box>
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
					</IconButton>
					<input
						ref={imageRef}
						type='file'
						style={{ display: 'none' }}
						accept='image/*'
						onChange={handleImageChange}
					/>
				</Box>
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
								<TimelineDot />
								{index !== profilePresentation.length - 1 ? <TimelineConnector /> : null}
							</TimelineSeparator>
							<TimelineContent>{presentation}</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			</Stack>

			<Stack spacing={3} width={'70%'}>
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
				<TextField
					label={'Name'}
					name='name'
					value={profile.name}
					onChange={handleChange}
					disabled={!isEditting}
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
				<TextField
					label={'Phone'}
					name='phone'
					value={profile.phone}
					onChange={handleChange}
					disabled={!isEditting}
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
						<FormControlLabel value={'Male'} control={<Radio />} label='Male' />
						<FormControlLabel value={'Female'} control={<Radio />} label='Female' />
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
						variant='contained'
						color='success'
						disabled={!isEditting}
						onClick={handleSubmit}
					>
						Update
					</Button>
				</Stack>
			</Stack>
		</Paper>
	)
}

export default Profile
