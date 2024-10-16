import { ApiRequest } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const FeedbackService = {
	GET_FEEDBACK: async (id) => {
		return await axiosConfig
			.get(ApiRequest.FeedbackRequest.GET_FEEDBACK(id))
			.then((response) => {
				return response.data
			})
	},
  ADD_FEEDBACK: async (feedbackData) => {
    return await axiosConfig
      .post(ApiRequest.FeedbackRequest.ADD_FEEDBACK, feedbackData)
      .then((response) => {
        return response.data;
      });
  },
  UPDATE_FEEDBACK: async (updatedFeedback) => {
    return await axiosConfig
      .post(ApiRequest.FeedbackRequest.UPDATE_FEEDBACK, updatedFeedback)  
      .then((response) => response.data);
  },
  DELETE_FEEDBACK: async (productId) => {
    return await axiosConfig
      .post(ApiRequest.FeedbackRequest.DELETE_FEEDBACK, productId)  
      .then((response) => response.data);
  },
}
