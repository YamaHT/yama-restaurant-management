import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

export default function ProductSearch({ searchTerm, setSearchTerm }) {
  return (
    <form>
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
