import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosConfig'

export const ProductManagementService = {
	GET_ALL: async () => {
		return await axiosFormBody.get(ApiRequest.ProductManagementRequest.GET_ALL).then((response) => {
			return response.data
		})
	},
}
