import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosConfig'

export const VoucherService = {
	VIEW_ALL_VOUCHER: async () => {
		return await axiosFormBody.get(ApiRequest.VoucherRequest.VIEW_ALL_VOUCHER).then((response) => {
			return response.data
		})
	},
}
