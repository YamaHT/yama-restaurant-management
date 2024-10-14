import { API_REQUEST } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const AuthService = {
	login: async (formData) => {
		return await axiosConfig
			.post(API_REQUEST.AuthRequest.LOGIN, formData)
			.then((response) => response.data)
	},
}
