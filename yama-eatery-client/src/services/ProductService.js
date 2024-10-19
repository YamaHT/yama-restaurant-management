import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosConfig'

export const ProductService = {
	GET_ALL: async () => {
		return await axiosFormBody.get(ApiRequest.ProductRequest.GET_ALL).then((response) => {
			return response.data
		})
	},
	GET_PRODUCT_DETAIL: async (id) => {
		return await axiosFormBody
			.get(ApiRequest.ProductRequest.GET_PRODUCT_DETAIL(id))
			.then((response) => {
				return response.data
			})
	},
	GET_ALL_SIMILAR: async (categoryName) => {
		return await axiosFormBody
			.get(ApiRequest.ProductRequest.GET_ALL_SIMILAR(categoryName))
			.then((response) => {
				return response.data
			})
	},
}
