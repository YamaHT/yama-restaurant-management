import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const EnumService = {
	GET_ALL_CATEGORY: async () => {
		return await axiosFormBody
			.get(ApiRequest.EnumRequest.GET_ALL_CATEGORY)
			.then((response) => response.data)
	},
	GET_ALL_TABLE_TYPE: async () => {
		return await axiosFormBody
			.get(ApiRequest.EnumRequest.GET_ALL_TABLE_TYPE)
			.then((response) => response.data)
	},
}
