import { ApiRequest } from '@/utilities/ApiRequest'
import axiosFormBody from '@/utilities/axiosFormBody'
import axiosFormData from '@/utilities/axiosFormData'

export const ProductManagementService = {
	GET_ALL: async () => {
		return await axiosFormBody
			.get(ApiRequest.ProductManagementRequest.GET_ALL)
			.then((response) => response.data)
	},
	REMOVE_PRODUCT: async (productId) => {
		return await axiosFormBody
			.post(ApiRequest.ProductManagementRequest.REMOVE_PRODUCT, productId)
			.then((response) => response.data)
	},
	RESTOCK_PRODUCT: async (restockProduct) => {
		return await axiosFormBody
			.post(ApiRequest.ProductManagementRequest.RESTOCK_PRODUCT, restockProduct)
			.then((response) => response.data)
	},
	ADD_PRODUCT: async (product) => {
		return await axiosFormData
			.post(ApiRequest.ProductManagementRequest.ADD_PRODUCT, product)
			.then((response) => response.data)
	},
	UPDATE_PRODUCT: async (product) => {
		return await axiosFormData
			.post(ApiRequest.ProductManagementRequest.UPDATE_PRODUCT, product)
			.then((response) => response.data)
	},
	RESTORE_PRODUCT: async (productId) => {
		return await axiosFormBody
			.post(ApiRequest.ProductManagementRequest.RESTORE_PRODUCT, productId)
			.then((response) => response.data)
	},
}
