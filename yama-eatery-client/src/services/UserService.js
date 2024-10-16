import { ApiRequest } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const UserService = {
	CHANGE_PASSWORD: async ({ password, newPassword }) => {
		console.log(password, newPassword)
		return await axiosConfig
			.post(ApiRequest.UserRequest.CHANGE_PASSWORD, { password, newPassword })
			.then((respond) => respond.data)
	},
}
