import { API_REQUEST } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const EnumService = {
	getAllCategory: async () => {
		return await axiosConfig
			.get(API_REQUEST.EnumRequest.getAllCategory)
			.then((response) => {
				return response.data
			})
			.catch((error) => {
				throw error
			})
	},
}
