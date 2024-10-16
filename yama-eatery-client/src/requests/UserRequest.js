export const UserRequest = {
	PROFILE: '/user/profile',
	CHANGE_PASSWORD: '/user/change-password',
	CANCEL_BOOKING: (bookingId) => `/user/cancel-booking/${bookingId}`,
	HISTORY_FEEDBACK: '/user/history-feedback',
	HISTORY_BOOKING: '/user/history-booking',
	MY_VOUCHERS: '/user/my-vouchers',
	CONTACT: '/user/contact',
	MEMBERSHIP_REGISTER: '/user/membership-register',
	USER_MEMBERSHIP: '/user/user-membership',
	CANCEL_MEMBERSHIP: '/user/cancel-membership',
	APRROVE_MEMBERSHIP: '/user/approve-membership',
}
