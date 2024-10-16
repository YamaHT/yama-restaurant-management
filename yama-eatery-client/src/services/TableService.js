import { ApiRequest } from '@/utilities/apiRequest'
import axiosConfig from '@/utilities/axiosConfig'

export const TableService = {
    GET_ALL: async () => {
		return await axiosConfig.get(ApiRequest.TableRequest.GET_ALL).then((response) => {
			return response.data
		})
	},
	DETAIL: async (id) => {
		return await axiosConfig
			.get(ApiRequest.TableRequest.DETAIL(id))
			.then((response) => {
				return response.data
			})
	},
}
