import { ApiRequest } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const FeedbackService = {
	GET_FEEDBACK: async (id) => {
		return await axiosConfig.get(ApiRequest.FeedbackRequest.GET_FEEDBACK(id)).then((response) => {
			return response.data
		})
	},
	ADD_FEEDBACK: async () => {
		return await axiosConfig
			.get(ApiRequest.FeedbackRequest.GET_PRODUCT_DETAIL(productId))
			.then((response) => {
				return response.data
			})
	},
}
