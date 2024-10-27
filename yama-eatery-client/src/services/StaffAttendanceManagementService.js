import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const StaffAttendanceManagementService = {
	GET_TODAY_ATTENDANCE: async () => {
		return await axiosFormBody
			.get(ApiRequest.StaffAttendanceManagementRequest.GET_TODAY_ATTENDANCE)
			.then((response) => response.data)
	},
	GET_NOT_TODAY_ATTENDANCE: async () => {
		return await axiosFormBody
			.get(ApiRequest.StaffAttendanceManagementRequest.GET_NOT_TODAY_ATTENDANCE)
			.then((response) => response.data)
	},
	ADD_STAFF_ATTENDANCE: async (staffId) => {
		return await axiosFormBody
			.post(ApiRequest.StaffAttendanceManagementRequest.ADD_STAFF_ATTENDANCE, staffId)
			.then((response) => response.data)
	},
	CHECK_IN: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.StaffAttendanceManagementRequest.CHECK_IN, id)
			.then((response) => response.data)
	},
	CHECK_OUT: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.StaffAttendanceManagementRequest.CHECK_OUT, id)
			.then((response) => response.data)
	},
	UPDATE_STAFF_ATTENDANCE: async (formData) => {
		return await axiosFormBody
			.post(ApiRequest.StaffAttendanceManagementRequest.UPDATE_STAFF_ATTENDANCE, formData)
			.then((response) => response.data)
	},
	DELETE_STAFF_ATTENDANCE: async (employeeId) => {
		return await axiosFormBody
			.post(ApiRequest.StaffAttendanceManagementRequest.DELETE_STAFF_ATTENDANCE, employeeId)
			.then((response) => response.data)
	},
}
