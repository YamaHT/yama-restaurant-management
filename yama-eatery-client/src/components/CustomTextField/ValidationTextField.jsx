import { TextField } from '@mui/material'
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
 * @param {import('@mui/material').TextFieldProps & CustomProps} props
 * @param {React.Ref} ref
 *
 */
const ValidationTextField = (
	{ label, type = 'text', value, onChange, regex, regexErrorText, ...props },
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

		if (type === 'email' && !/^[a-zA-Z]+[-.]?\w+@([\w-]+\.)+[\w]{2,}$/.test(value)) {
			setError('Please enter a valid email address')
			return false
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
