import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const ManagerStatisticService = {
	GET_TOTAL_FEEDBACKS: async () =>
		axiosFormBody
			.get(ApiRequest.ManagerStatisticRequest.GET_TOTAL_FEEDBACKS)
			.then((response) => response.data),
	GET_TOTAL_USERS: async () =>
		axiosFormBody
			.get(ApiRequest.ManagerStatisticRequest.GET_TOTAL_USERS)
			.then((response) => response.data),
	GET_TOTAL_BOOKINGS: async () =>
		axiosFormBody
			.get(ApiRequest.ManagerStatisticRequest.GET_TOTAL_BOOKINGS)
			.then((response) => response.data),
	GET_TOTAL_REVENUES: async () =>
		axiosFormBody
			.get(ApiRequest.ManagerStatisticRequest.GET_TOTAL_REVENUES)
			.then((response) => response.data),
	GET_MONTHLY_BOOKINGS: async () =>
		axiosFormBody
			.get(ApiRequest.ManagerStatisticRequest.GET_MONTHLY_BOOKINGS)
			.then((response) => response.data),
	GET_WEEKLY_REVENUES: async () =>
		axiosFormBody
			.get(ApiRequest.ManagerStatisticRequest.GET_WEEKLY_REVENUES)
			.then((response) => response.data),
	GET_RECENT_BOOKINGS: async () =>
		axiosFormBody
			.get(ApiRequest.ManagerStatisticRequest.GET_RECENT_BOOKINGS)
			.then((response) => response.data),
}
