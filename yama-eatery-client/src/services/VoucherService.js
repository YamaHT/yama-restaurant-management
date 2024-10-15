import { API_REQUEST } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const VoucherService = {
	View_All_Voucher: async () => {
		return await axiosConfig
			.get(API_REQUEST.VoucherRequest.VIEW_ALL_VOUCHER)
			.then((response) => {
				return response.data
			})
			.catch((error) => {
				throw error
			})
	},
	CANCEL_BOOKING: async(Id)=>
	{
		return await axiosConfig
		.post(API_REQUEST.VoucherRequest.CancelBooking, Id)
		.then((response) => {
			return response.data
		})
		.catch((error) => {
			throw error
		})
	},
	VIEW_ALL_FEEDBACK: async () => {
		return await axiosConfig
			.get(API_REQUEST.VoucherRequest.getAllFeedback)
			.then((response) => {
				return response.data
			})
			.catch((error) => {
				throw error
			})
	},
	VIEW_ALL_HISTORYBOOKING: async (Id) => {
		return await axiosConfig
			.get(API_REQUEST.VoucherRequest.getHistoryBooking,Id)
			.then((response) => {
				return response.data
			})
			.catch((error) => {
				throw error
			})
	},
	VIEW_ALL_MYVOUCHER: async (Id) => {
		return await axiosConfig
			.get(API_REQUEST.VoucherRequest.getMyVoucher, Id)
			.then((response) => {
				return response.data
			})
			.catch((error) => {
				throw error
			})
	},


}