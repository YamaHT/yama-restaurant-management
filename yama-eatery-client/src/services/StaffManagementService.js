import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosConfig'

export const StaffManagementService = {
	STAFF_ATTENDANCE_LIST: async () => {
		console.log()
		return await axiosFormBody
			.get(ApiRequest.StaffManagementRequest.STAFF_ATTENDANE_LIST)
			.then((response) => response.data)
	},
}
