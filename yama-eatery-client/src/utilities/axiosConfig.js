import axios from 'axios'
import { BASE_URL } from './apiRequest'
import { useNavigate } from 'react-router-dom'

const axiosConfig = axios.create({
	baseURL: BASE_URL,
	headers: {
		'content-type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'X-Requested-With',
	},
})

axiosConfig.interceptors.request.use(
	(request) => {
		const token = localStorage.getItem('token')
		if (token) {
			request.headers.Authorization = `Bearer ${token}`
		}
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
		const status = error.response?.status
		const errorMessage = error.response?.data?.error
		const role = localStorage.getItem('role')

		const navigate = useNavigate()

		switch (status) {
			case 401:
				navigate('/')
				break
			case 403:
				switch (role) {
					case 'Manager':
						navigate('/manager')
						break
					case 'Staff':
						navigate('staff')
						break
					default:
						navigate('/')
				}
				break
			case 400:
			case 404:
			case 409:
			case 500:
				console.log(errorMessage)
				break
			case 422:
				console.log(errorMessage)
		}
		return Promise.reject(error)
	}
)

export default axiosConfig
