export const UserManagementRequest = {
	VIEW_MEMBERSHIP_REGISTER: '/usermanagement/view-membership-register',
	APPROVE_MEMBERSHIP: (id) => `/usermanagement/approve-membership/${id}`,
	DENY_MEMBERSHIP: (id) => `/usermanagement/deny-membership/${id}`,
	VIEW_USER_LIST: '/usermanagement/view-user-list',
}
