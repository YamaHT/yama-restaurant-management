import React, { forwardRef, useState } from 'react'
import ValidationTextField from './ValidationTextField'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

/**
 * @param {import('@mui/material').TextFieldProps} props
 * @param {string} props.label
 * @param {string} props.name
 * @param {string} props.value
 * @param {function} props.onChange
 * @param {React.Ref} ref
 *
 */
const PasswordTextField = forwardRef(({ label, name, value, onChange, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<ValidationTextField
			ref={ref}
			type={showPassword ? 'text' : 'password'}
			label={label}
			name={name}
			value={value}
			onChange={onChange}
			regex='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$'
			regexErrorText='Password must at least 8 characters and contains UPPERCASE, lowercase, number and special characters'
			slotProps={{
				input: {
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton onClick={() => setShowPassword(!showPassword)} edge='end' color='default'>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					),
				},
			}}
			{...props}
		/>
	)
})

export default PasswordTextField
