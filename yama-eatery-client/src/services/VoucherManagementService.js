import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'
export const VoucherManagementService = {
	VIEW_ALL_VOUCHER_MANAGEMENT: async () => {
		return await axiosFormBody
			.get(ApiRequest.VoucherManagementRequest.VIEW_ALL_VOUCHER_MANAGEMENT)
			.then((response) => {
				return response.data
			})
	},

	UPDATE_VOUCHER: async (id, data) => {
		return await axiosFormBody
		.post(ApiRequest.VoucherManagementRequest.UPDATE_VOUCHER(id), data)
		.then((response) => {
				return response.data
		})
	},
}
