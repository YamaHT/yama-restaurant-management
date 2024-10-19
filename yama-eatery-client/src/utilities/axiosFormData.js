import axios from 'axios'
import { BASE_URL } from './ApiRequest'
import secureLocalStorage from 'react-secure-storage'
import { enqueueSnackbar } from 'notistack'

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
		const role = secureLocalStorage.getItem('role')

		switch (status) {
			case 401:
				window.location.href = '/'
				enqueueSnackbar('Unauthorized', { variant: 'warning' })
				break
			case 403:
				switch (role) {
					case 'Manager':
						window.location.href = '/manager'
						break
					case 'Staff':
						window.location.href = '/staff'
						break
					default:
						window.location.href = '/'
				}
				enqueueSnackbar('Access Denied', { variant: 'error' })
				break
			case 400:
			case 404:
			case 409:
			case 500:
				enqueueSnackbar(errorMessage, { variant: 'error' })
				break
			case 422:
				if (Array.isArray(errorMessage)) {
					const errorList = errorMessage.join('\n')
					enqueueSnackbar(errorList, {
						variant: 'error',
						autoHideDuration: 8000,
					})
				} else {
					enqueueSnackbar(errorMessage, { variant: 'error' })
				}
				break
			default:
				enqueueSnackbar('Internal Server Error', { variant: 'error' })
				break
		}
		return error
	}
)

export default axiosFormData
