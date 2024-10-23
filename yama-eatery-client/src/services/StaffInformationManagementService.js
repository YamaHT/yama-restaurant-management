import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'
import axiosFormData from '@/utilities/axiosFormData'

export const StaffInformationManagementService = {
	GET_ALL_STAFF: async () => {
		return await axiosFormBody
			.get(ApiRequest.StaffInformationManagementRequest.GET_ALL_STAFF)
			.then((response) => response.data)
	},
	ADD_STAFF: async (employee) => {
		return await axiosFormData
			.post(ApiRequest.StaffInformationManagementRequest.ADD_STAFF, employee)
			.then((response) => response.data)
	},
	UPDATE_STAFF: async (employee) => {
		return await axiosFormData
			.post(ApiRequest.StaffInformationManagementRequest.UPDATE_STAFF, employee)
			.then((response) => response.data)
	},
	DELETE_STAFF: async (employeeId) => {
		return await axiosFormBody
			.post(ApiRequest.StaffInformationManagementRequest.DELETE_STAFF, employeeId)
			.then((response) => response.data)
	},
}
