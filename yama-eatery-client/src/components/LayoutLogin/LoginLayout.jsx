import { AssetImages } from '@/utilities/AssetImages'
import { Home } from '@mui/icons-material'
import { AppBar, Avatar, Box, Grid2, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LayoutLogin = ({ title, description, isLeftPosition, illustration, children }) => {
	const navigate = useNavigate()
	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<Stack
						width={'100%'}
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<IconButton size='large' color='inherit' onClick={() => navigate('/')}>
							<Home />
						</IconButton>
						<Avatar src={AssetImages.SYSTEM_LOGO} />
						<Box />
					</Stack>
				</Toolbar>
			</AppBar>
			<Grid2 container sx={{ bgcolor: '#6ff1' }} direction={isLeftPosition ? 'row' : 'row-reverse'}>
				<Grid2 size={{ xs: 11, sm: 8, md: 4, lg: 4 }} sx={{ mx: 'auto' }}>
					<Box display='flex' flexDirection='column' justifyContent='center' height='90vh'>
						<Box pt={3} px={3}>
							<Box mb={1}>
								<Typography variant='h4' fontWeight='bold'>
									{title}
								</Typography>
							</Box>
							<Typography variant='body2' fontWeight='regular' color='text'>
								{description}
							</Typography>
						</Box>

						<Box p={3}>{children}</Box>
					</Box>
				</Grid2>

				<Grid2 size={{ xs: 12, md: 6 }}>
					<Box
						display={{ xs: 'none', md: 'flex' }}
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						width='calc(100% - 2rem)'
						height='calc(90vh - 2rem)'
						position='relative'
						borderRadius='lg'
						textAlign='center'
						m={2}
						px={13}
						sx={{ overflow: 'hidden' }}
					>
						<Box
							component='img'
							src={illustration.image}
							width={'100%'}
							height={'100%'}
							position='absolute'
							borderRadius={3}
							top={0}
							left={0}
							draggable={false}
							sx={{ filter: 'blur(1px)' }}
						/>
						<Box position='relative'>
							{illustration.title && (
								<Box mt={6} mb={1}>
									<Typography
										variant='h4'
										color='white'
										fontWeight='bold'
										sx={{ filter: 'drop-shadow(0 0 5px #555)' }}
									>
										{illustration.title}
									</Typography>
								</Box>
							)}
							{illustration.description && (
								<Box mb={1}>
									<Typography
										variant='body2'
										color='white'
										sx={{ filter: 'drop-shadow(0 0 5px #555)' }}
									>
										{illustration.description}
									</Typography>
								</Box>
							)}
						</Box>
					</Box>
				</Grid2>
			</Grid2>
		</>
	)
}

export default LayoutLogin
