import WeatherList from '@/pages/WeatherList'
import CrudManagement from '@/pages/Crud Management/CrudManagement'

const publicRoutes = [
	{ path: '/', component: CrudManagement },
	{ path: '/weather', component: WeatherList },
]

export { publicRoutes }
