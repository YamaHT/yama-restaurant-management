import React, { forwardRef, useState } from 'react'
import ValidationTextField from './ValidationTextField'

/**
 * @param {import('@mui/material').TextFieldProps} props
 * @param {string} props.label
 * @param {string} props.name
 * @param {string} props.value
 * @param {function} props.onChange
 * @param {React.Ref} ref
 *
 */
const NameTextField = forwardRef(({ label, name, value, onChange, ...props }, ref) => {
	const [error, setError] = useState('')

	const handleNameChange = (e) => {
		const nameValue = e.target.value
		const namePattern = /^[a-z]{2,}( [a-z]+)*?( [a-z]{2,}){1,}$/i

		if (!namePattern.test(nameValue)) {
			setError(
				'Invalid name. Please enter a valid name with first name and last name, e.g., "Quach Khang".'
			)
		} else {
			setError('')
		}
		onChange(e)
	}

	return (
		<ValidationTextField
			ref={ref}
			type='text'
			label={label}
			name={name}
			value={value}
			onChange={handleNameChange}
			error={!!error}
			helperText={error}
			maxLength={30}
			{...props}
		/>
	)
})

export default NameTextField
