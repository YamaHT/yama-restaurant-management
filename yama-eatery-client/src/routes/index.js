import WeatherList from '@/pages/WeatherList'
import HomePage from '@/pages/Home'
import CrudManagement from '@/pages/Crud Management/CrudManagement'

const publicRoutes = [
	{ path: '/', component: CrudManagement },
	{ path: '/weather', component: WeatherList },
]

export { publicRoutes }
