import { AuthService } from '@/services/AuthService'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { BASE_URL } from './ApiRequest'

const axiosFormBody = axios.create({
	baseURL: BASE_URL,
	headers: {
		'content-type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'X-Requested-With',
	},
})

axiosFormBody.interceptors.request.use(
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

axiosFormBody.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		const status = error.response?.status
		const errorMessage = error.response?.data?.error || 'Internal Server Error'
		switch (status) {
			case 401:
				enqueueSnackbar('Unauthorized', { variant: 'warning', autoHideDuration: 1000 })
				setTimeout(() => {
					AuthService.LOGOUT()
				}, 1000)
			case 403:
				enqueueSnackbar('Access Denied', { variant: 'error', autoHideDuration: 1000 })
				setTimeout(() => {
					AuthService.LOGOUT()
				}, 1000)
				break
			case 422:
				errorMessage.forEach((error, index) => {
					setTimeout(() => {
						enqueueSnackbar(error, { variant: 'error' })
					}, index * 500)
				})
				break
			case 400:
			case 404:
			case 409:
			case 500:
				enqueueSnackbar(errorMessage, { variant: 'error' })
				break

			default:
				enqueueSnackbar('Internal Server Error', { variant: 'error' })
				break
		}
		return error
	}
)

export default axiosFormBody
