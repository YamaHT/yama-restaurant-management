export const UserRequest = {
	PROFILE: '/user/profile',
	CHANGE_PASSWORD: '/user/change-password',
	CANCEL_BOOKING: (bookingId) => `/user/cancel-booking/${bookingId}`,
	HISTORY_FEEDBACK: '/user/history-feedback',
	HISTORY_BOOKING: '/user/history-booking',
	MY_VOUCHERS: '/user/my-vouchers',
}
