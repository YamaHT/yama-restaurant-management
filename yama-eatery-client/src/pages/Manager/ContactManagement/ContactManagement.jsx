import React, { useState } from 'react'
import {
	Box,
	Button,
	Paper,
	TextField,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	AccordionActions,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ContactManagement = () => {
	const [contactList, setContactList] = useState([
		{
			id: 1,
			name: 'Le Phuoc Duy',
			date: '00:00:00 30/04/1945',
			message: 'I want to fire your restaurant',
			details: 'Hello! Your restaurant had an issue during my visit. Please take action.',
			open: false,
			completed: false,
			respond: '',
		},
		{
			id: 2,
			name: 'Jimmy',
			date: '00:00:00 01/05/1945',
			message: 'Please improve your service',
			details: 'The service was unsatisfactory...',
			open: false,
			completed: false,
			respond: '',
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
			prevList.map((contact) => (contact.id === id ? { ...contact, completed: true } : contact))
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
				<Paper
					key={contact.id}
					elevation={3}
					sx={{ width: '70%', margin: '2% auto', borderRadius: 2 }}
				>
					<Accordion expanded={contact.open} onChange={() => toggleContact(contact.id)}>
						<AccordionSummary
							sx={{
								padding: 0,
								margin: 0,
								backgroundColor: 'primary.light',
								borderLeft: contact.open ? 5 : 0,
								borderColor: contact.open ? 'primary.main' : 'transparent',
							}}
						>
							<Box
								display='flex'
								justifyContent='space-between'
								width='100%'
								sx={{ padding: '0 1%' }}
							>
								<Box display='flex' alignItems='center' fontSize='1.5rem'>
									<Typography variant='body1' fontWeight='bold' color='darkslategray'>
										{contact.name}
									</Typography>
									<Typography color='GrayText' ml={1}>
										{contact.date}
									</Typography>
								</Box>
								<Typography
									sx={{
										cursor: 'pointer',
										textDecoration: contact.completed ? 'none' : 'underline',
									}}
									onClick={(e) => {
										e.stopPropagation()
										handleCompleted(contact.id)
									}}
								>
									{contact.completed ? 'Completed' : 'Mark as Completed'}
								</Typography>
							</Box>
						</AccordionSummary>
						<AccordionDetails>
							<Typography color='darkslategray' fontWeight='bold'>
								{contact.message}
							</Typography>
							<Typography color='GrayText' variant='body2'>
								{contact.details}
							</Typography>
							{!contact.completed && (
								<Box display='flex' alignItems='center'>
									<Typography variant='body1' color='darkslategray' fontWeight='bold'>
										Respond:
									</Typography>
									<TextField
										variant='outlined'
										fullWidth
										multiline
										minRows={2}
										sx={{ ml: 2 }}
										value={contact.respond}
										onChange={(e) => handleRespondChange(contact.id, e.target.value)}
										error={respondErrorId === contact.id}
										helperText={respondErrorId === contact.id ? 'Response is required' : ''}
									/>
								</Box>
							)}
						</AccordionDetails>
						<AccordionActions>
							<Button variant='contained' onClick={() => handleRespond(contact.id)}>
								Submit
							</Button>
							<Button
								variant='contained'
								color='inherit'
								onClick={() => handleCancel(contact.id)}
								sx={{ ml: 2 }}
							>
								Cancel
							</Button>
						</AccordionActions>
					</Accordion>
				</Paper>
			))}
		</Box>
	)
}

export default ContactManagement
