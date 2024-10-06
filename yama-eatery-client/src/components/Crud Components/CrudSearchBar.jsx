import { Search } from '@mui/icons-material'
import { Autocomplete, InputAdornment, TextField } from '@mui/material'

const CrudSearchBar = ({ listItem, widthPercent, value, handleChange }) => {
	return (
		<Autocomplete
			size='small'
			options={listItem}
			value={value}
			onChange={handleChange}
			freeSolo
			sx={{ width: widthPercent + '%' || '100%' }}
			renderInput={(params) => (
				<>
					<TextField
						{...params}
						slotProps={{
							input: {
								...params.InputProps,
								startAdornment: (
									<InputAdornment position='start'>
										<Search />
									</InputAdornment>
								),
							},
						}}
						placeholder='Search...'
					/>
				</>
			)}
		/>
	)
}

export default CrudSearchBar
