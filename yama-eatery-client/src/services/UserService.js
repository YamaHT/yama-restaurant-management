import { API_REQUEST } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const UserService = {
	CHANGE_PASSWORD: async ({ password, newPassword }) => {
		console.log(password, newPassword)
		return await axiosConfig
			.post(API_REQUEST.UserRequest.CHANGE_PASSWORD, { password, newPassword })
			.then((respond) => respond.data)
	},
}
