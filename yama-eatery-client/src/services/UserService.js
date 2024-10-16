import { ApiRequest } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const UserService = {
	CHANGE_PASSWORD: async ({ password, newPassword }) => {
		return await axiosConfig
			.post(ApiRequest.UserRequest.CHANGE_PASSWORD, { password, newPassword })
			.then((response) => response.data)
	},
	MY_VOUCHER: async () => {
		return await axiosConfig
			.post(ApiRequest.UserRequest.MY_VOUCHERS)
			.then((response) => response.data)
	},
	HISTORY_FEEDBACK: async () => {
		return await axiosConfig
			.get(ApiRequest.UserRequest.HISTORY_FEEDBACK)
			.then((response) => response.data)
	},
	HISTORY_BOOKING: async () => {
		return await axiosConfig
			.post(ApiRequest.UserRequest.HISTORY_BOOKING)
			.then((response) => response.data)
	},
	CANCEL_BOOKING: async (id) => {
		return await axiosConfig
			.post(ApiRequest.UserRequest.CANCEL_BOOKING, id)
			.then((response) => response.data)
	},
	GET_PROFILE: async () => {
		return await axiosConfig.get(ApiRequest.UserRequest.PROFILE).then((response) => response.data)
	},
}
