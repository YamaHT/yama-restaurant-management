import axios from 'axios'
import { BASE_URL } from './ApiRequest'
import secureLocalStorage from 'react-secure-storage'
import { enqueueSnackbar } from 'notistack'
import { AuthService } from '@/services/AuthService'

const axiosFormData = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'multipart/form-data',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'X-Requested-With',
	},
})

axiosFormData.interceptors.request.use(
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

axiosFormData.interceptors.response.use(
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
				break
			case 403:
				enqueueSnackbar('Access Denied', { variant: 'error', autoHideDuration: 1000 })
				setTimeout(() => {
					AuthService.LOGOUT()
				}, 1000)
				break
			case 422:
				errorMessage.map((error, index) =>
					enqueueSnackbar(error, {
						variant: 'error',
					})
				)
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

export default axiosFormData
