import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const ProductManagementService = {
	GET_ALL: async () => {
		return await axiosFormBody.get(ApiRequest.ProductManagementRequest.GET_ALL).then((response) => {
			return response.data
		})
	},
	REMOVE_PRODUCT: async (productId) => {
		return await axiosFormBody
			.post(ApiRequest.ProductManagementRequest.REMOVE_PRODUCT, productId)
			.then((response) => response.data)
	},
}
