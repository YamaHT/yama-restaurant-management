import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const StaffSalaryManagementService = {
	GET_STAFF_SALARY: async (month) => {
		return await axiosFormBody
			.get(ApiRequest.StaffSalaryManagementRequest.GET_STAFF_SALARY + `?month=${month}`)
			.then((response) => response.data)
	},
	PAY_SALARY: async ({ employeeId, month }) => {
		return await axiosFormBody
			.post(ApiRequest.StaffSalaryManagementRequest.PAY_SALARY, { employeeId, month })
			.then((response) => response.data)
	},
}
