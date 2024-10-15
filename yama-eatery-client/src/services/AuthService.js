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
		console.log(formData)
		return await axiosConfig
			.post(API_REQUEST.AuthRequest.SEND_MAIL_OTP, formData)
			.then((response) => response.data)
	},
}
