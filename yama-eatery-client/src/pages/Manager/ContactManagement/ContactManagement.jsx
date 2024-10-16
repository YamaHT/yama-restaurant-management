import { Box, Button, Collapse, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const ContactManagement = () => {
	const [contactList, setContactList] = useState([
		{
			id: 1,
			name: 'Le Phuoc Duy',
			date: '00:00:00 30/04/1945',
			message: 'I want to fire your restaurant',
			details:
				'Hello! Your testaurant have a shit while i am eating.Need to remove some fucking employee.As they shoule be.',
			open: false,
			completed: false,
			respond: '',
		},
		{
			id: 2,
			name: 'Jimmy',
			date: '00:00:00 01/05/1945',
			message: 'Please improve your service',
			details: 'The service is disaster...',
			open: false,
			completed: false,
			respond: '',
		},
		{
			id: 3,
			name: 'Batman',
			date: '00:00:00 01/05/1945',
			message: 'Please improve your service',
			details: 'The service was shit...',
			open: false,
			completed: false,
			respond: '',
		},
		{
			id: 4,
			name: 'Johnny',
			date: '00:00:00 01/05/1945',
			message: 'Please improve your service',
			details: 'The service was shit...',
			open: false,
			completed: false,
			respond: '',
		},
		{
			id: 5,
			name: 'Spiderman',
			date: '00:00:00 01/05/1945',
			message: 'Please improve your service',
			details: 'The service was shit...',
			open: false,
			completed: true,
			respond: 'Ok',
		},
	])
	const [respondErrorId, setRespondErrorId] = useState(null)
	const toggleContact = (id) => {
		setContactList((prevList) =>
			prevList.map((contact) => (contact.id === id ? { ...contact, open: !contact.open } : contact))
		)
	}
	const handleCompleted = (id) => {
		setContactList((prevList) =>
			prevList.map((contact) =>
				contact.id === id ? { ...contact, completed: true, respond: null } : contact
			)
		)
	}
	const handleRespondChange = (id, value) => {
		setContactList((prevList) =>
			prevList.map((contact) => (contact.id === id ? { ...contact, respond: value } : contact))
		)
	}
	const handleRespond = (id) => {
		const contact = contactList.find((contact) => contact.id === id)
		if (contact.respond.trim() === '') {
			setRespondErrorId(id)
			return
		}
		setContactList((prevList) =>
			prevList.map((contact) => (contact.id === id ? { ...contact, completed: true } : contact))
		)
	}
	const handleCancel = (id) => {
		setContactList((prevList) =>
			prevList.map((contact) =>
				contact.id === id ? { ...contact, open: !contact.open, respond: '' } : contact
			)
		)
		setRespondErrorId(null)
	}
	return (
		<Box>
			{contactList.map((contact) => (
				<Box key={contact.id} component={Paper} width={'70%'} m={'2% auto'} borderRadius={0} dia>
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						borderLeft={contact.open ? 5 : 0}
						onClick={() => toggleContact(contact.id)}
						sx={{
							background: 'lightgray',
							cursor: 'pointer',
							opacity: contact.completed ? 0.5 : 1,
						}}
					>
						<Box
							maxWidth={'50%'}
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
							m={'1%'}
							ml={'1%'}
							fontSize={'1.5rem'}
						>
							<Typography variant='body1' fontWeight={'bold'} color={'darkslategray'}>
								{contact.name}
							</Typography>
							|<Typography color={'GrayText'}>{contact.date}</Typography>
						</Box>
						<Box m={'auto 0%'} pr='1%'>
							<Typography
								textAlign={'right'}
								sx={{
									':hover': {
										textDecoration: 'underline',
									},
								}}
								onClick={(e) => {
									e.stopPropagation()
									handleCompleted(contact.id)
								}}
							>
								{contact.completed ? 'Completed' : 'Mark as Completed'}
							</Typography>
						</Box>
					</Box>
					<Collapse direction='down' in={contact.open} unmountOnExit>
						<Box p={'1%'}>
							<Typography color={'darkslategray'} fontWeight={'bold'}>
								{contact.message}
							</Typography>
							<Typography color={'GrayText'} variant='body2'>
								{contact.details}
							</Typography>
							{!contact.completed && (
								<>
									<Box display={'flex'} mt={'1%'} alignItems={'flex-start'}>
										<Typography variant='body1' color={'darkslategray'} fontWeight={'bold'}>
											Respond:
										</Typography>
										<TextField
											variant='outlined'
											color='info'
											type='text'
											fullWidth
											multiline
											minRows={2}
											sx={{ pl: '1%', pr: '1%', mt: '0.5%' }}
											value={contact.respond}
											onChange={(e) => handleRespondChange(contact.id, e.target.value)}
											error={respondErrorId === contact.id}
											helperText={respondErrorId === contact.id ? 'Response is required' : ''}
										/>
									</Box>
									<Box display={'flex'} pr={'1%'} justifyContent={'end'} mt={'1%'}>
										<Button
											variant='contained'
											sx={{
												width: '10%',
												p: '0 2%',
												bgcolor: 'tomato',
												textTransform: 'capitalize',
												':hover': { bgcolor: '#d32f2f' },
											}}
											onClick={() => handleRespond(contact.id)}
										>
											Submit
										</Button>
										<Button
											variant='contained'
											color='inherit'
											onClick={() => handleCancel(contact.id)}
											sx={{ width: '10%', p: '0 2%', textTransform: 'capitalize', ml: '5%' }}
										>
											Cancel
										</Button>
									</Box>
								</>
							)}
						</Box>
					</Collapse>
				</Box>
			))}
		</Box>
	)
}

export default ContactManagement
