import { AssetImages } from '@/utilities/AssetImages'
import { Box, Grid2, Stack, Typography } from '@mui/material'

const StandardComponent = ({ image, description }) => {
	return (
		<Stack spacing={3} alignItems={'center'}>
			<Box
				component={'img'}
				src={image}
				draggable={false}
				sx={{ width: 150, height: 150, aspectRatio: 1, objectFit: 'contain' }}
			/>
			<Typography variant='h6' color='#444' textTransform={'uppercase'} fontWeight={'bold'}>
				{description}
			</Typography>
		</Stack>
	)
}

const standards = [
	{
		description: 'No Chemicals',
	},
	{
		description: 'Natural Products',
	},
	{
		description: 'GMO Free',
	},
	{
		description: 'No Additives',
	},
]

const StandardSection = () => {
	return (
		<Stack spacing={4}>
			<Box textAlign={'center'}>
				<Typography
					variant='h2'
					sx={{
						display: 'inline-block',
						position: 'relative',
						fontWeight: 'bold',
						fontSize: '2rem',
						textTransform: 'uppercase',
						textAlign: 'center',
						color: '#444',
						'&::after': {
							content: '""',
							position: 'absolute',
							width: '70%',
							height: '4px',
							left: 0,
							right: 0,
							bottom: '-8px',
							margin: 'auto',
							backgroundColor: '#EC4899',
							borderRadius: 2,
						},
					}}
				>
					Our Standards
				</Typography>
			</Box>
			<Grid2 container px={5}>
				{standards.map((standard, index) => (
					<Grid2 size={3}>
						<StandardComponent
							image={AssetImages.HomeStandard(index)}
							description={standard.description}
						/>
					</Grid2>
				))}
			</Grid2>
		</Stack>
	)
}

export default StandardSection
