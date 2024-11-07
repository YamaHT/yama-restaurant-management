import App from '@/App'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root'))
const clientId = '583430965775-dile22k90cgqijab92ojtnmujtjl4mjc.apps.googleusercontent.com'

const theme = createTheme({
	components: {
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontSize: '1rem',
				},
			},
		},
	},
})

root.render(
	<GoogleOAuthProvider clientId={clientId}>
		<SnackbarProvider
			maxSnack={3}
			autoHideDuration={2000}
			style={{ fontFamily: 'Roboto' }}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</SnackbarProvider>
	</GoogleOAuthProvider>
)
