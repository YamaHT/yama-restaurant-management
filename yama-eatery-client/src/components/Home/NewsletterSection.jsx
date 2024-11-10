import { Box, Button, InputBase, Paper, Typography } from '@mui/material'
import React from 'react'

const NewsletterSection = () => {
	return (
		<Box bgcolor='white' py={4}>
			<Box textAlign='center'>
				<Typography variant='h3' fontWeight='bold'>
					Subscribe
				</Typography>
				<Typography variant='body1' mt={2}>
					Subscribe to our newsletter and stay up to date with the latest news, updates, and
					exclusive offers. Get valuable insights. Join our community today!
				</Typography>
			</Box>
			<Box maxWidth='sm' mx='auto' mt={3}>
				<Paper
					component='form'
					sx={{
						display: 'flex',
						alignItems: 'center',
						p: 1,
						bgcolor: 'grey.100',
						borderRadius: '50px',
						border: '1px solid transparent',
						'&:focus-within': {
							borderColor: 'blue',
							bgcolor: 'transparent',
						},
					}}
				>
					<InputBase
						placeholder='Enter your email'
						sx={{
							flex: 1,
							color: 'grey.800',
							fontSize: '0.875rem',
							px: 2,
						}}
						type='email'
					/>
					<Button
						variant='contained'
						color='primary'
						sx={{
							borderRadius: '50px',
							px: 4,
							textTransform: 'none',
							fontWeight: 'semibold',
							py: 1,
						}}
					>
						Submit
					</Button>
				</Paper>
			</Box>
		</Box>
	)
}

export default NewsletterSection
