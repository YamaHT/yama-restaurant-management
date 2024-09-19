import axios from 'axios'
import { BASE_URL } from './apiRequest'

const axiosConfig = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
})

axiosConfig.interceptors.request.use(
	(request) => {
		return request
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosConfig.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default axiosConfig
