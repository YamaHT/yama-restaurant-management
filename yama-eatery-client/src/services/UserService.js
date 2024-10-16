import { ApiRequest } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const UserService = {
	CHANGE_PASSWORD: async ({ password, newPassword }) => {
		console.log(password, newPassword)
		return await axiosConfig
			.post(ApiRequest.UserRequest.CHANGE_PASSWORD, { password, newPassword })
			.then((response) => response.data)
	},
	CONTACT: async ({ name, title, message }) => {
		console.log(name, title, message)
		return await axiosConfig
			.post(ApiRequest.UserRequest.CONTACT, { name, title, message })
			.then((response) => response.data)
	},
	MEMBERSHIP_REGISTER: async () => {
		console.log()
		return await axiosConfig
			.post(ApiRequest.UserRequest.MEMBERSHIP_REGISTER)
			.then((response) => response.data)
	},
	USER_MEMBERSHIP: async () => {
		console.log()
		return await axiosConfig
			.get(ApiRequest.UserRequest.USER_MEMBERSHIP)
			.then((response) => response.data)
	},
	CANCEL_MEMBERSHIP: async () => {
		console.log()
		return await axiosConfig
			.get(ApiRequest.UserRequest.CANCEL_MEMBERSHIP)
			.then((response) => response.data)
	},
	APPROVE_MEMBERSHIP: async () => {
		console.log()
		return await axiosConfig
			.get(ApiRequest.UserRequest.APRROVE_MEMBERSHIP)
			.then((response) => response.data)
	},
}
