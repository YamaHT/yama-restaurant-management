import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
const clientId = '583430965775-dile22k90cgqijab92ojtnmujtjl4mjc.apps.googleusercontent.com'

root.render(
	<GoogleOAuthProvider clientId={clientId}>
		<App />
	</GoogleOAuthProvider>
)
