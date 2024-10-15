import { API_REQUEST } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const ProductService = {
	GET_FEEDBACK: async (id) => {
		return await axiosConfig.get(API_REQUEST.FeedbackRequest.GET_FEEDBACK(id)).then((response) => {
			return response.data
		})
	},
	ADD_FEEDBACK: async () => {
		return await axiosConfig
			.get(API_REQUEST.FeedbackRequest.GET_PRODUCT_DETAIL(productId))
			.then((response) => {
				return response.data
			})
	},
}
