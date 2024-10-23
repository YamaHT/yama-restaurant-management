export const VoucherManagementRequest = {
	VIEW_ALL_VOUCHER_MANAGEMENT: '/VoucherManagement',
	UPDATE_VOUCHER: (Id) => `/VoucherManagement/update/${Id}`,
	ADD_VOUCHER: '/VoucherManagement/add',
	DELETE_VOUCHER: (id) => `/VoucherManagement/remove/${id}`,
}
