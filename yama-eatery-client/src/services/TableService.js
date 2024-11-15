import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const TableService = {
	GET_ALL: async () => {
		return await axiosFormBody
			.get(ApiRequest.TableRequest.GET_ALL)
			.then((response) => response.data)
	},
	DETAIL: async (id) => {
		return await axiosFormBody
			.get(ApiRequest.TableRequest.DETAIL(id))
			.then((response) => response.data)
	},
}
