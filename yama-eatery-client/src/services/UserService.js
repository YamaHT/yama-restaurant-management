import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosConfig'
import axiosFormData from '@/utilities/axiosFormData'

export const UserService = {
	CHANGE_PASSWORD: async ({ password, newPassword }) => {
		return await axiosFormBody
			.post(ApiRequest.UserRequest.CHANGE_PASSWORD, { password, newPassword })
			.then((response) => response.data)
	},
	CONTACT: async ({ name, title, message }) => {
		console.log(name, title, message)
		return await axiosFormBody
			.post(ApiRequest.UserRequest.CONTACT, { name, title, message })
			.then((response) => response.data)
	},
	MEMBERSHIP_REGISTER: async () => {
		console.log()
		return await axiosFormBody
			.post(ApiRequest.UserRequest.MEMBERSHIP_REGISTER)
			.then((response) => response.data)
	},
	USER_MEMBERSHIP: async () => {
		console.log()
		return await axiosFormBody
			.get(ApiRequest.UserRequest.USER_MEMBERSHIP)
			.then((response) => response.data)
	},
	CANCEL_MEMBERSHIP: async () => {
		console.log()
		return await axiosFormBody
			.get(ApiRequest.UserRequest.CANCEL_MEMBERSHIP)
			.then((response) => response.data)
	},
	APPROVE_MEMBERSHIP: async () => {
		console.log()
		return await axiosFormBody
			.get(ApiRequest.UserRequest.APRROVE_MEMBERSHIP)
			.then((response) => response.data)
	},
	MY_VOUCHER: async () => {
		return await axiosFormBody
			.get(ApiRequest.UserRequest.MY_VOUCHERS)
			.then((response) => response.data)
	},
	HISTORY_FEEDBACK: async () => {
		return await axiosFormBody
			.get(ApiRequest.UserRequest.HISTORY_FEEDBACK)
			.then((response) => response.data)
	},
	HISTORY_BOOKING: async () => {
		return await axiosFormBody
			.get(ApiRequest.UserRequest.HISTORY_BOOKING)
			.then((response) => response.data)
	},
	CANCEL_BOOKING: async (id) => {
		return await axiosFormBody
			.post(ApiRequest.UserRequest.CANCEL_BOOKING, id)
			.then((response) => response.data)
	},
	GET_PROFILE: async () => {
		return await axiosFormBody.get(ApiRequest.UserRequest.PROFILE).then((response) => response.data)
	},
	UPDATE_PROFILE: async (formData) => {
		return await axiosFormData
			.post(ApiRequest.UserRequest.PROFILE, formData)
			.then((response) => response.data)
	},
}
