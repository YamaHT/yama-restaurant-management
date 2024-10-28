import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const ContactManagementService = {
	GET_ALL: async () => {
		return await axiosFormBody
			.get(ApiRequest.ContactManagementRequest.GET_ALL)
			.then((response) => response.data)
	},
	RESPOND: async (data) => {
		return await axiosFormBody
			.post(ApiRequest.ContactManagementRequest.RESPOND, data)
			.then((response) => response.data)
	},
	IGNORE: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.ContactManagementRequest.IGNORE, id)
			.then((response) => response.data)
	},
}
