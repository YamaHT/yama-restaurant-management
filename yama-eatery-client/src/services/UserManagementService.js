import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosConfig'

export const UserManagementService = {
	VIEW_MEMBERSHIP_REQUEST: async () => {
		console.log()
		return await axiosFormBody
			.get(ApiRequest.UserManagementRequest.VIEW_MEMBERSHIP_REGISTER)
			.then((response) => response.data)
	},
	APPROVE_MEMBERSHIP: async (id) => {
		console.log()
		return await axiosFormBody
			.get(ApiRequest.UserManagementRequest.APPROVE_MEMBERSHIP(id))
			.then((response) => response.data)
	},
	DENY_MEMBERSHIP: async (id) => {
		console.log()
		return await axiosFormBody
			.get(ApiRequest.UserManagementRequest.DENY_MEMBERSHIP(id))
			.then((response) => response.data)
	},

	VIEW_USER_LIST: async () => {
		console.log()
		return await axiosFormBody
			.get(ApiRequest.UserManagementRequest.VIEW_USER_LIST)
			.then((response) => response.data)
	},
}
