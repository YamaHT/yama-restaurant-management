import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const VoucherService = {
	VIEW_ALL_VOUCHER: async () => {
		return await axiosFormBody
			.get(ApiRequest.VoucherRequest.VIEW_ALL_VOUCHER)
			.then((response) => response.data)
	},
	RECEIVE_VOUCHER: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.VoucherRequest.RECEIVE_VOUCHER, id)
			.then((response) => response.data)
	},
}
