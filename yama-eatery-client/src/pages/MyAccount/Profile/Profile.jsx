import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { AssetImages } from '@/utilities/AssetImages'
import { Edit } from '@mui/icons-material'
import {
	Paper,
	IconButton,
	Box,
	Stack,
	TextField,
	RadioGroup,
	FormLabel,
	Radio,
	FormControl,
	FormControlLabel,
	Avatar,
	Typography,
} from '@mui/material'
import { useState } from 'react'

const Profile = () => {
	const [profile, setProfile] = useState({
		name: 'Le Phuoc Duy',
		birthday: '2004-10-30',
		phone: '0123123123',
		gender: 0,
		membership: {
			membershipStatus: 'active',
			rank: 'Silver',
			memberScore: 5,
		},
		creationDate: '2024-10-14T21:34:13',
	})

	const formattedDate = new Date(profile.creationDate).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	})

	const [isEditting, setIsEditting] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setProfile((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<Paper sx={{ p: '2% 5%', display: 'flex', justifyContent: 'space-between', gap: 5 }}>
			<Box width={'30%'}>
				<Box>
					<Avatar
						src={AssetImages.BACKGROUND.HOME_HERO}
						sx={{ width: '100%', height: '100%', aspectRatio: 1, objectFit: 'cover' }}
					/>
				</Box>
				<Stack>
					<Typography>Enrolled on: {formattedDate}</Typography>
					<Typography>Membership: {profile.membership.rank}</Typography>
				</Stack>
			</Box>

			<Stack spacing={3} width={'70%'}>
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
						<FormControlLabel value={0} control={<Radio />} label='Male' />
						<FormControlLabel value={1} control={<Radio />} label='Female' />
					</RadioGroup>
				</FormControl>
			</Stack>
		</Paper>
	)
}

export default Profile
