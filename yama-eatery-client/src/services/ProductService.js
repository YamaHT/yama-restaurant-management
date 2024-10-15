import { API_REQUEST } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const ProductService = {
	GET_ALL: async () => {
		return await axiosConfig.get(API_REQUEST.ProductRequest.GET_ALL).then((response) => {
			return response.data
		})
	},
	GET_PRODUCT_DETAIL: async (id) => {
		return await axiosConfig
			.get(API_REQUEST.ProductRequest.GET_PRODUCT_DETAIL(id))
			.then((response) => {
				return response.data
			})
	},
	GET_ALL_SIMILAR: async (categoryName) => {
		return await axiosConfig
			.get(API_REQUEST.ProductRequest.GET_ALL_SIMILAR(categoryName))
			.then((response) => {
				return response.data
			})
	},
} 