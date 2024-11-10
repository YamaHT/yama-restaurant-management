import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const StaffStatisticService = {
	GET_WEEKLY_BOOKING_SERVING: async () =>
		await axiosFormBody
			.get(ApiRequest.StaffStatisticRequest.GET_WEEKLY_BOOKING_SERVING)
			.then((response) => response.data),
	GET_WEEKLY_REVENUES: async () =>
		await axiosFormBody
			.get(ApiRequest.StaffStatisticRequest.GET_WEEKLY_REVENUES)
			.then((response) => response.data),
}
