import { AuthRequest } from '@/requests/AuthRequest'
import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosConfig'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

export const AuthService = {
	LOGIN: async (formData) => {
		return await axiosFormBody
			.post(ApiRequest.AuthRequest.LOGIN, formData)
			.then((response) => response.data)
	},
	SEND_MAIL_OTP: async (formData) => {
		return await axiosFormBody
			.post(ApiRequest.AuthRequest.SEND_MAIL_OTP, formData)
			.then((response) => response.data)
	},
	FORGOT_PASSWORD: async ({ email }) => {
		return await axiosFormBody
			.post(ApiRequest.AuthRequest.FORGOT_PASSWORD, email)
			.then((response) => response.data)
	},
	CHECK_EMAIL_EXISTED: async ({ email }) => {
		return await axiosFormBody
			.get(ApiRequest.AuthRequest.CHECK_EMAIL_EXIST + `?email=${email}`)
			.then((response) => response.data)
	},
	LOGOUT: () => {
		localStorage.removeItem('token')
		secureLocalStorage.removeItem('role')
		window.dispatchEvent(new Event('roleChange'))
		window.location.href = '/'
	},
	GET_LOGIN_PROFILE: async (token) => {
		return await axios
			.get(AuthRequest.GET_LOGIN_PROFILE + token, {
				headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
			})
			.then((response) => response.data)
	},
	LOGIN_WITH_GOOGLE: async (formData) => {
		return await axiosFormBody
			.post(AuthRequest.LOGIN_WITH_GOOGLE, formData)
			.then((response) => response.data)
	},
}
