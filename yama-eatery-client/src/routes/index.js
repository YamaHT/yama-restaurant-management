import CrudManagement from '@/pages/Crud Management/CrudManagement'
import Login from '@/pages/Login/Login'
import Register from '@/pages/Register/Register'
import WeatherList from '@/pages/WeatherList'

const publicRoutes = [
	{ path: '/', component: CrudManagement },
	{ path: '/weather', component: WeatherList },
]

export { publicRoutes }
