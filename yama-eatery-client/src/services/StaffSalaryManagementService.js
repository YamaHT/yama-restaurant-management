import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const StaffSalaryManagementService = {
	GET_STAFF_SALARY: async () => {
		return await axiosFormBody
			.get(ApiRequest.StaffSalaryManagementRequest.GET_STAFF_SALARY)
			.then((response) => response.data)
	},
}
