import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

/**
 * @typedef {Object} CustomProps
 * @property {string} label
 * @property {string|number} value
 * @property {function} onChange
 * @property {string} [regex]
 * @property {string} [regexErrorText]
 */

/**
 * @param {import('@mui/material').SelectProps & CustomProps} props
 * @param {React.Ref} ref
 */
const ValidationSelect = forwardRef(({ label, value, onChange, children, ...props }, ref) => {
	const [error, setError] = useState('')

	const validateInput = () => {
		if (!value) {
			setError('This field is required')
			return false
		}

		setError('')
		return true
	}

	useImperativeHandle(ref, () => ({
		validate: () => validateInput(),
	}))

	return (
		<FormControl fullWidth variant='filled'>
			<InputLabel id={label} error={!!error}>
				{label}
			</InputLabel>
			<Select
				labelId={label}
				value={value}
				error={!!error}
				onChange={onChange}
				onBlur={validateInput}
				required
				{...props}
			>
				{children}
			</Select>
			<FormHelperText sx={{ color: 'red' }}>{error ? error : ''}</FormHelperText>
		</FormControl>
	)
})

export default ValidationSelect
