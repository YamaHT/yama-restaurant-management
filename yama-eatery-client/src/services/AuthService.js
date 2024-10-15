import { API_REQUEST } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const AuthService = {
	login: async (formData) => {
		return await axiosConfig
			.post(API_REQUEST.AuthRequest.LOGIN, formData)
			.then((response) => response.data)
	},
	sendMailOTP: async ({ email, otp }) => {
		const formData = { email: email, otp: otp }
		return await axiosConfig
			.post(API_REQUEST.AuthRequest.SEND_MAIL_OTP, formData)
			.then((response) => response.data)
	},
	forgotPassword: async ({ email }) => {
		return await axiosConfig
			.post(API_REQUEST.AuthRequest.FORGOT_PASSWORD, email)
			.then((response) => response.data)
	},
	checkEmailExist: async ({ email }) => {
		return await axiosConfig
			.get(API_REQUEST.AuthRequest.CHECK_EMAIL_EXIST + `?email=${email}`)
			.then((response) => response.data)
	},
}
