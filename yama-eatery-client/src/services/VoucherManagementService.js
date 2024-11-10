import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'
import axiosFormData from '@/utilities/axiosFormData'

export const VoucherManagementService = {
	GET_ALL: async () => {
		return await axiosFormBody
			.get(ApiRequest.VoucherManagementRequest.GET_ALL)
			.then((response) => response.data)
	},
	UPDATE_VOUCHER: async (data) => {
		return await axiosFormData
			.post(ApiRequest.VoucherManagementRequest.UPDATE_VOUCHER, data)
			.then((response) => response.data)
	},
	ADD_VOUCHER: async (data) => {
		return await axiosFormData
			.post(ApiRequest.VoucherManagementRequest.ADD_VOUCHER, data)
			.then((response) => response.data)
	},
	DELETE_VOUCHER: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.VoucherManagementRequest.DELETE_VOUCHER, id)
			.then((response) => response.data)
	},
	RESTORE_VOUCHER: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.VoucherManagementRequest.RESTORE_VOUCHER, id)
			.then((response) => response.data)
	},
}
