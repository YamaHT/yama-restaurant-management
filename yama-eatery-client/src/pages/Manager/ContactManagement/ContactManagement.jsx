import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { ContactManagementService } from '@/services/ContactManagementService'
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Button,
	Divider,
	Stack,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const ContactManagement = () => {
	const [contacts, setContacts] = useState([])
	const [openIndex, setOpenIndex] = useState(0)

	useEffect(() => {
		const fetchContact = async () => {
			const data = await ContactManagementService.GET_ALL()
			if (data) {
				setContacts(data)
			}
		}
		fetchContact()
	}, [])

	const handleChangeOpenIndex = (id) => (e, isExpand) => {
		setOpenIndex(isExpand ? id : false)
	}

	const handleResponseChange = (id, newResponse) => {
		setContacts((prevContacts) =>
			prevContacts.map((contact) =>
				contact.id === id ? { ...contact, response: newResponse } : contact
			)
		)
	}

	const handleResponse = async (id, respond) => {
		var formData = { id: id, respond: respond }
		const data = await ContactManagementService.RESPOND(formData)
		if (data) {
			setContacts(data)
		}
	}

	const handleIgnore = async (id) => {
		const data = await ContactManagementService.IGNORE(id)
		if (data) {
			setContacts(data)
		}
	}

	return (
		<Stack spacing={2}>
			<Typography variant='h5' fontWeight={'bold'}>
				Contact Management
			</Typography>
			{contacts.length > 0 ? (
				contacts.map((contact) => (
					<Accordion
						key={contact.id}
						expanded={contact.id === openIndex}
						onChange={handleChangeOpenIndex(contact.id)}
					>
						<AccordionSummary
							sx={{
								backgroundColor: '#9cf4',
								borderLeft: '5px solid transparent',
								borderColor: 'primary.main',
								transition: '0.3s ease',
								'& .MuiAccordionSummary-content': { m: 0, '&.Mui-expanded': { m: 0 } },
							}}
						>
							<Stack
								direction={'row'}
								alignItems={'center'}
								justifyContent={'flex-start'}
								spacing={1}
								width={'100%'}
							>
								<Typography variant='body1' fontWeight={'bold'}>
									{contact.fullName}
								</Typography>
								<Divider orientation='vertical' sx={{ bgcolor: 'black', py: 1 }} flexItem />
								<Typography variant='body1' flexGrow={1}>
									{contact.creationDate?.replace('T', ' ')}
								</Typography>
								<Button
									disableRipple={true}
									onClick={() => handleIgnore(contact.id)}
									color='inherit'
									sx={{ fontWeight: 'bold', ':hover': { textDecoration: 'underline' } }}
								>
									Mark as complete
								</Button>
							</Stack>
						</AccordionSummary>
						<AccordionDetails>
							<Stack spacing={2}>
								<Typography variant='h6' fontWeight={'bold'}>
									{contact.title}
								</Typography>
								<Typography variant='body1'>{contact.message}</Typography>
								<Stack direction={'row'} spacing={2}>
									<Typography fontWeight={'bold'} variant='body1'>
										Respond:
									</Typography>
									<ValidationTextField
										multiline
										minRows={3}
										value={contact.response}
										onChange={(e) => handleResponseChange(contact.id, e.target.value)}
									/>
								</Stack>
							</Stack>
						</AccordionDetails>
						<AccordionActions>
							<Button
								variant='contained'
								onClick={() => handleResponse(contact.id, contact.response)}
							>
								Submit
							</Button>
							<Button
								variant='contained'
								onClick={() => {
									handleResponseChange(contact.id, '')
									setOpenIndex(0)
								}}
								color='inherit'
								sx={{ ml: 2 }}
							>
								Cancel
							</Button>
						</AccordionActions>
					</Accordion>
				))
			) : (
				<Typography variant='body1'>No contacts available</Typography>
			)}
		</Stack>
	)
}

export default ContactManagement
