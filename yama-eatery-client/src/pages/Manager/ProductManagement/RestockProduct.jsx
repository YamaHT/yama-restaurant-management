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

	const customInputImageProperties = {
		inputLabel: {
			style: { color: 'gray' },
		},
		input: {
			disabled: true,
			style: { backgroundColor: 'rgba(0, 0, 0, 0.06)' },
			endAdornment: (
				<>
					<input multiple hidden />
				</>
			),
		},
	}

	const handleIncrease = () => {
		if (quantity < 1000) {
			setQuantity((prev) => prev + 1)
			setError('')
		} else {
			setError('Maximum quantity reached.')
		}
	}

	const handleDecrease = () => {
		if (quantity >= 0) {
			setQuantity((prev) => prev - 1)
			setError('')
		} else {
			setError('Quantity cannot be less than 0.')
		}
	}

	const handleInputChange = (e) => {
		const value = e.target.value

		if (value === '') {
			setQuantity('')
			setError('')
			return
		}

		const numericValue = parseInt(value, 10)

		if (!isNaN(numericValue)) {
			setQuantity(numericValue)
			setError('')
		} else {
			setError('Quantity must be a positive integer.')
		}
	}

	const handleConfirm = () => {
		if (quantity >= 0) {
			onRestock(quantity)
			handleClose()
		} else {
			setError('Quantity must be zero or a positive integer.')
		}
	}

	return (
		<Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
			<DialogTitle>Restock Product</DialogTitle>
			<DialogContent>
				<ValidationTextField
					label='Product Name'
					value={productName}
					slotProps={customInputImageProperties}
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
						regex='^(0|[1-9][0-9]{0,2})$' 
						regexErrorText='Quantity must be a positive integer between 0 and 999.'
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
