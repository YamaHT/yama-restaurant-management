import { API_REQUEST } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const EnumService = {
	GET_ALL_CATEGORY: async () => {
		return await axiosConfig
			.get(API_REQUEST.EnumRequest.GET_ALL_CATEGORY )
			.then((response) => {
				return response.data
			})
			.catch((error) => {
				throw error
			})
	},
}
