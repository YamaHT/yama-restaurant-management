import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const VoucherService = {
	VIEW_ALL_VOUCHER: async () => {
		return await axiosFormBody.get(ApiRequest.VoucherRequest.VIEW_ALL_VOUCHER).then((response) => {
			return response.data
		})
	},
	ADD_MY_VOUCHER: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.VoucherRequest.ADD_MY_VOUCHER(id)) // Pass ID correctly
			.then((response) => {
				return response.data
			})
	},
}
