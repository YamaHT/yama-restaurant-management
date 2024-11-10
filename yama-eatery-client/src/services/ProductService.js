import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const ProductService = {
	GET_ALL: async () => {
		return await axiosFormBody
			.get(ApiRequest.ProductRequest.GET_ALL)
			.then((response) => response.data)
	},
	GET_PRODUCT_DETAIL: async (id) => {
		return await axiosFormBody
			.get(ApiRequest.ProductRequest.GET_PRODUCT_DETAIL(id))
			.then((response) => response.data)
	},
	GET_ALL_SIMILAR: async (categoryName) => {
		return await axiosFormBody
			.get(ApiRequest.ProductRequest.GET_ALL_SIMILAR(categoryName))
			.then((response) => response.data)
	},
	GET_PRICE_RANGE: async () => {
		return await axiosFormBody
			.get(ApiRequest.ProductRequest.GET_PRICE_RANGE)
			.then((response) => response.data)
	},
	GET_POPULAR_PRODUCT: async () => {
		return await axiosFormBody
			.get(ApiRequest.ProductRequest.GET_POPULAR_PRODUCT)
			.then((response) => response.data)
	},
}
