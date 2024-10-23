export const BookingRequest = {
	GET_BOOKED_DAYPART: (tableId, date) => `/booking/booked-dayPart?tableId=${tableId}&date=${date}`,
	GET_VALID_VOUCHER: '/booking/valid-vouchers',
	RESERVE_A_BOOKING: '/booking/reserve',
}
