import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
import React, { useState } from 'react'

const CrudConfirmation = ({ title, description, handleConfirm, children }) => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const confirmRequest = () => {
		handleConfirm()
		handleClose()
	}

	return (
		<>
			{children(handleOpen)}
			{open && (
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>{title}</DialogTitle>
					<DialogContent>
						<DialogContentText>{description}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={confirmRequest} variant='contained' color='primary'>
							Yes
						</Button>
						<Button onClick={handleClose} color='primary'>
							No
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</>
	)
}

export default CrudConfirmation
