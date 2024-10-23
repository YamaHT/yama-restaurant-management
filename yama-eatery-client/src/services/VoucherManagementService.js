import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'
import axiosFormData from '@/utilities/axiosFormData'

export const VoucherManagementService = {
	VIEW_ALL_VOUCHER_MANAGEMENT: async () => {
		return await axiosFormBody
			.get(ApiRequest.VoucherManagementRequest.VIEW_ALL_VOUCHER_MANAGEMENT)
			.then((response) => {
				return response.data
			})
	},

	UPDATE_VOUCHER: async (id, data) => {
		return await axiosFormData
			.post(ApiRequest.VoucherManagementRequest.UPDATE_VOUCHER(id), data)
			.then((response) => {
				return response.data
			})
	},

	ADD_VOUCHER: async (data) => {
		return await axiosFormData
			.post(ApiRequest.VoucherManagementRequest.ADD_VOUCHER, data)
			.then((response) => {
				return response.data
			})
	},

	REMOVE_VOUCHER: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.VoucherManagementRequest.DELETE_VOUCHER, id )
			.then((response) => {
				return response.data
			})
	},
}
