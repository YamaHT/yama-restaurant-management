import ValidationTextField from '@/components/CustomTextField/ValidationTextField'
import { Add, Remove } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	Typography,
} from '@mui/material'
import { useRef, useState } from 'react'

const RestockProduct = ({ open, handleClose, currentQuantity, productName, onRestock }) => {
	const [quantity, setQuantity] = useState(currentQuantity)
	const [error, setError] = useState('')
	const quantityFieldRef = useRef(null)

	const handleIncrease = () => {
		if (quantity < 1000) {
			// Assuming a maximum limit for quantity
			setQuantity((prev) => prev + 1)
			setError('') // Clear error if there was any
		} else {
			setError('Maximum quantity reached.')
		}
	}

	const handleDecrease = () => {
		if (quantity > 0) {
			setQuantity((prev) => prev - 1)
			setError('') // Clear error if there was any
		}
	}

	const handleInputChange = (e) => {
		const value = e.target.value

		if (value === '') {
			setQuantity('') // Allow empty input for clearing
			setError('') // Clear error while editing
			return
		}

		const numericValue = parseInt(value, 10)
			setQuantity(numericValue)
	
	}

	const handleConfirm = () => {
		if (quantityFieldRef.current.validate()) {
			onRestock(quantity)
			handleClose()
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
			<DialogTitle>Restock Product</DialogTitle>
			<DialogContent>
				{/* Show the product name in a read-only text field */}
				<ValidationTextField
					label='Product Name'
					value={productName}
					InputProps={{
						readOnly: true,
					}}
					fullWidth
					margin='dense'
				/>

				<Stack
					direction='row'
					alignItems='center'
					spacing={2}
					justifyContent='center'
					marginTop={2}
				>
					<IconButton onClick={handleDecrease}>
						<Remove />
					</IconButton>
					<ValidationTextField
						ref={quantityFieldRef}
						label='Quantity'
						type='number'
						value={quantity}
						onChange={handleInputChange}
						inputProps={{ min: 0 }}
						fullWidth={false}
						regex='^[0-9]*$' // Allows empty or positive integer numbers
						regexErrorText='Quantity must be a positive integer.'
						requiredErrorText='Quantity is required.'
						sx={{ width: '200px', textAlign: 'center' }}
					/>
					<IconButton onClick={handleIncrease}>
						<Add />
					</IconButton>
				</Stack>

				{error && (
					<Typography color='error' align='center' marginTop={2}>
						{error}
					</Typography>
				)}

				<Typography align='center' marginTop={2}>
					Current Quantity: {currentQuantity}
				</Typography>
			</DialogContent>

			<DialogActions sx={{ justifyContent: 'center' }}>
				<Button onClick={handleClose} variant='outlined' color='inherit'>
					Cancel
				</Button>
				<Button onClick={handleConfirm} variant='contained' color='primary'>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default RestockProduct
