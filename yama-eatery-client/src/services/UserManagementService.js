import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const UserManagementService = {
	GET_MEMBERSHIP_REQUEST: async () => {
		return await axiosFormBody
			.get(ApiRequest.UserManagementRequest.GET_MEMBERSHIP_REGISTER)
			.then((response) => response.data)
	},
	APPROVE_MEMBERSHIP: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.UserManagementRequest.APPROVE_MEMBERSHIP, id)
			.then((response) => response.data)
	},
	DENY_MEMBERSHIP: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.UserManagementRequest.DENY_MEMBERSHIP, id)
			.then((response) => response.data)
	},
	VIEW_USER_LIST: async () => {
		return await axiosFormBody
			.get(ApiRequest.UserManagementRequest.GET_ALL_USER)
			.then((response) => response.data)
	},
}
