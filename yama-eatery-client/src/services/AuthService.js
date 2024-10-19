import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosConfig'

export const AuthService = {
	LOGIN: async (formData) => {
		return await axiosFormBody
			.post(ApiRequest.AuthRequest.LOGIN, formData)
			.then((response) => response.data)
	},
	SEND_MAIL_OTP: async ({ email, otp }) => {
		const formData = { email: email, otp: otp }
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
}
