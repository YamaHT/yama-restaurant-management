import { TextField } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

/**
 * @typedef {Object} CustomProps
 * @property {string} label
 * @property {string|number} value
 * @property {function} onChange
 * @property {number} [maxLength]
 * @property {string} [regex]
 * @property {string} [regexErrorText]
 */

/**
 * @param {import('@mui/material').TextFieldProps & CustomProps} props
 * @param {React.Ref} ref
 *
 */
const ValidationTextField = (
	{ label, type = 'text', value, onChange, maxLength, regex, regexErrorText, ...props },
	ref
) => {
	const [error, setError] = useState('')

	const validateInput = () => {
		if (!value) {
			setError('This field is required')
			return false
		}

		if (regex && !new RegExp(regex).test(value)) {
			setError(regexErrorText)
			return false
		}

		if (type === 'number' && isNaN(Number(value))) {
			setError('Please enter a valid number')
			return false
		}
		if (type === 'name') {
			const namePattern = /^[\p{L}]+(?:\s+[\p{L}]+)+$/u

			if (!value) {
				setError('Name is required.')
				return false
			}

			if (!namePattern.test(value)) {
				setError(
					'Invalid name. Please enter a valid name with at least two words, e.g., "Quách Khang".'
				)
				return false
			}
		}

		if (type === 'email' && !/^[a-zA-Z]+[-.]?\w+@([\w-]+\.)+[\w]{2,}$/.test(value)) {
			setError('Please enter a valid email address')
			return false
		}

		if (maxLength) {
			if (type === 'number' && value > maxLength) {
				setError(`Number input can't greater than ${maxLength}`)
				return false
			}
			if (value.length > maxLength) {
				setError(`This field can't exceed ${maxLength} characters`)
				return false
			}
		}

		setError('')
		return true
	}

	useImperativeHandle(ref, () => ({
		validate: () => validateInput(),
	}))

	return (
		<TextField
			label={label}
			value={value}
			onChange={onChange}
			onBlur={validateInput}
			error={!!error}
			helperText={error}
			type={type}
			required
			fullWidth
			variant='outlined'
			{...props}
		/>
	)
}

export default forwardRef(ValidationTextField)
