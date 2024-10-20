import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const BookingService = {
	GET_BOOKED_DAYPART: async (tableId, date) => {
		return await axiosFormBody
			.get(ApiRequest.BookingRequest.GET_BOOKED_DAYPART(tableId, date))
			.then((response) => response.data)
	},
	GET_VALID_VOUCHER: async () => {
		return await axiosFormBody
			.get(ApiRequest.BookingRequest.GET_VALID_VOUCHER)
			.then((response) => response.data)
	},
}
