import { API_REQUEST } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const VoucherService = {
	VIEW_ALL_VOUCHER: async () => {
		return await axiosConfig.get(API_REQUEST.VoucherRequest.VIEW_ALL_VOUCHER).then((response) => {
			return response.data
		})
	},
}
