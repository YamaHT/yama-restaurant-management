import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const BookingManagementService = {
	GET_ALL: async (dayPart) => {
		return await axiosFormBody
			.get(ApiRequest.BookingManagementRequest.GET_ALL + `?dayPart=${dayPart}`)
			.then((response) => response.data)
	},
	GET_TABLES_NOT_BOOKED: async (dayPart) => {
		return await axiosFormBody
			.get(ApiRequest.BookingManagementRequest.GET_TABLES_NOT_BOOKED + `?dayPart=${dayPart}`)
			.then((response) => response.data)
	},
	GET_DETAIL: async (id) => {
		return await axiosFormBody
			.get(ApiRequest.BookingManagementRequest.GET_DETAIL + `?id=${id}`)
			.then((response) => response.data)
	},
	ADD_BOOKING: async (formData) => {
		return await axiosFormBody
			.post(ApiRequest.BookingManagementRequest.ADD_BOOKING, formData)
			.then((response) => response.data)
	},
	ADD_BOOKING_DETAIL: async (formData) => {
		return await axiosFormBody
			.post(ApiRequest.BookingManagementRequest.ADD_BOOKING_DETAIL, formData)
			.then((response) => response.data)
	},
	UPDATE_BOOKING_DETAIL: async (formData) => {
		return await axiosFormBody
			.post(ApiRequest.BookingManagementRequest.UPDATE_BOOKING_DETAIL, formData)
			.then((response) => response.data)
	},
	DELETE_BOOKING_DETAIL: async (formData) => {
		return await axiosFormBody
			.post(ApiRequest.BookingManagementRequest.DELETE_BOOKING_DETAIL, formData)
			.then((response) => response.data)
	},
	PAY_BOOKING: async (bookingId) => {
		return await axiosFormBody
			.post(ApiRequest.BookingManagementRequest.PAY_BOOKING, { bookingId })
			.then((response) => response.data)
	},
}
