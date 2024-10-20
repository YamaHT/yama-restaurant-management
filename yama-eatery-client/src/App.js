import { publicRoutes } from '@/routes'
import { SnackbarProvider } from 'notistack'
import { Fragment, useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import LayoutCustomer from './layouts/LayoutCustomer'
import LayoutGuest from './layouts/LayoutGuest'

function App() {
	const [role, setRole] = useState(secureLocalStorage.getItem('role'))

	const getLayout = (role) => {
		switch (role) {
			case 'Customer':
				return LayoutCustomer
			default:
				return LayoutGuest
		}
	}

	useEffect(() => {
		const handleRoleChange = () => {
			const updatedRole = secureLocalStorage.getItem('role')
			setRole(updatedRole)
		}

		window.addEventListener('roleChange', handleRoleChange)
		return () => window.removeEventListener('roleChange', handleRoleChange)
	}, [])

	let routes = publicRoutes
	return (
		<Router>
			<div className='App'>
				<Routes>
					{routes.map((route, index) => {
						let Layout = getLayout(role)
						if (route.layout) {
							Layout = route.layout
						} else if (route.layout === null) {
							Layout = Fragment
						}

						const Page = route.component
						return (
							<Route
								key={index}
								path={route.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						)
					})}
				</Routes>
			</div>
		</Router>
	)
}

export default App
