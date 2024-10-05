import CrudManagement from '@/pages/Crud Management/CrudManagement'
import WeatherList from '@/pages/WeatherList'

const publicRoutes = [
	{ path: '/', component: CrudManagement },
	{ path: '/weather', component: WeatherList },
]

export { publicRoutes }
