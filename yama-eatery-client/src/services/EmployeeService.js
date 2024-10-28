import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'

export const EmployeeService = {
	GET_PROFILE: async () => {
		return await axiosFormBody
			.get(ApiRequest.EmployeeRequest.PROFILE)
			.then((response) => response.data)
	},
}
