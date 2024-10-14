import { API_REQUEST } from '@/utilities/ApiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const ProductService = {
	getAll: async () => {
		return await axiosConfig
			.get(API_REQUEST.ProductRequest.getAll)
			.then((response) => {
				return response.data
			})
			.catch((error) => {
				throw error
			})
	},
}
