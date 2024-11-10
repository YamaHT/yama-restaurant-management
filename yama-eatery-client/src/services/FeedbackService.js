import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const FeedbackService = {
	GET_FEEDBACK: async (id) => {
		return await axiosFormBody
			.get(ApiRequest.FeedbackRequest.GET_FEEDBACK(id))
			.then((response) => response.data)
	},
	ADD_FEEDBACK: async (feedbackData) => {
		return await axiosFormBody
			.post(ApiRequest.FeedbackRequest.ADD_FEEDBACK, feedbackData)
			.then((response) => response.data)
	},
	UPDATE_FEEDBACK: async (updatedFeedback) => {
		return await axiosFormBody
			.post(ApiRequest.FeedbackRequest.UPDATE_FEEDBACK, updatedFeedback)
			.then((response) => response.data)
	},
	DELETE_FEEDBACK: async (productId) => {
		return await axiosFormBody
			.post(ApiRequest.FeedbackRequest.DELETE_FEEDBACK, productId)
			.then((response) => response.data)
	},
}
