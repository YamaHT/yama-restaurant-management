import { AuthRequest } from '@/requests/AuthRequest'
import { BookingRequest } from '@/requests/BookingRequest'
import { EnumRequest } from '@/requests/EnumRequest'
import { FeedbackRequest } from '@/requests/FeedbackRequest'
import { ProductManagementRequest } from '@/requests/ProductManagementRequest'
import { ProductRequest } from '@/requests/ProductRequest'
import { StaffAttendanceManagementRequest } from '@/requests/StaffAttendanceManagementRequest'
import { StaffInformationManagementRequest } from '@/requests/StaffInformationManagementRequest'
import { StaffSalaryManagementRequest } from '@/requests/StaffSalaryManagementRequest'
import { TableRequest } from '@/requests/TableRequest'
import { UserManagementRequest } from '@/requests/UserManagementRequest'
import { UserRequest } from '@/requests/UserRequest'
import { VoucherRequest } from '@/requests/VoucherRequest'

export const BASE_URL = 'https://localhost:7219/api/v1'
export const ApiRequest = {
	AuthRequest,
	BookingRequest,
	EnumRequest,
	ProductRequest,
	UserRequest,
	FeedbackRequest,
	TableRequest,
	VoucherRequest,
	ProductManagementRequest,
	UserManagementRequest,
	StaffAttendanceManagementRequest,
	StaffSalaryManagementRequest,
	StaffInformationManagementRequest,
}
