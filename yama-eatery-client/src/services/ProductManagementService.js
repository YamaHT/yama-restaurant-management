import { ApiRequest } from '@/utilities/dsa'
import axiosFormBody from '@/utilities/axiosConfig'

export const ProductManagementService = {
	GET_ALL: async () => {
		return await axiosFormBody.get(ApiRequest.ProductManagementRequest.GET_ALL).then((response) => {
			return response.data
		})
	},
}
