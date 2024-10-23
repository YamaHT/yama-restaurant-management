import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'
import axiosFormData from '@/utilities/axiosFormData'

export const TableManagementService = {
	GET_ALL: async () => {
		return await axiosFormBody.get(ApiRequest.TableManagementRequest.GET_ALL).then((response) => {
			return response.data
		})
	},
	REMOVE_TABLE: async (tableId) => {
		return await axiosFormBody  
			.post(ApiRequest.TableManagementRequest.REMOVE_TABLE, tableId)
			.then((response) => response.data)
	},
	ADD_TABLE: async (table) => {
		return await axiosFormData
			.post(ApiRequest.TableManagementRequest.ADD_TABLE, table)
			.then((response) => response.data)
	},
	UPDATE_TABLE: async (table) => {
		return await axiosFormData
			.post(ApiRequest.TableManagementRequest.UPDATE_TABLE, table)
			.then((response) => response.data)
	},
	RESTORE_TABLE: async (tableId) => {
		return await axiosFormBody
			.post(ApiRequest.TableManagementRequest.RESTORE_TABLE, tableId)
			.then((response) => response.data)
	},
}
