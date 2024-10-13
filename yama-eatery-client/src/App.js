import { publicRoutes } from '@/routes'
import { Fragment } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LayoutGuest from './layouts/LayoutGuest'

function App() {
	let routes = publicRoutes
	return (
		<Router>
			<div className='App'>
				<Routes>
					{routes.map((route, index) => {
						let Layout = LayoutGuest
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
