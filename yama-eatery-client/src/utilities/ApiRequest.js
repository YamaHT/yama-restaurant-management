import { AuthRequest } from '@/requests/AuthRequest'
import { BookingManagementRequest } from '@/requests/BookingManagementRequest'
import { BookingRequest } from '@/requests/BookingRequest'
import { ContactManagementRequest } from '@/requests/ContactManagementRequest'
import { EmployeeRequest } from '@/requests/EmployeeRequest'
import { EnumRequest } from '@/requests/EnumRequest'
import { FeedbackRequest } from '@/requests/FeedbackRequest'
import { ManagerStatisticRequest } from '@/requests/ManagerStatisticRequest'
import { ProductManagementRequest } from '@/requests/ProductManagementRequest'
import { ProductRequest } from '@/requests/ProductRequest'
import { StaffAttendanceManagementRequest } from '@/requests/StaffAttendanceManagementRequest'
import { StaffInformationManagementRequest } from '@/requests/StaffInformationManagementRequest'
import { StaffSalaryManagementRequest } from '@/requests/StaffSalaryManagementRequest'
import { StaffStatisticRequest } from '@/requests/StaffStatisticRequest'
import { TableManagementRequest } from '@/requests/TableManagementRequest'
import { TableRequest } from '@/requests/TableRequest'
import { UserManagementRequest } from '@/requests/UserManagementRequest'
import { UserRequest } from '@/requests/UserRequest'
import { VoucherManagementRequest } from '@/requests/VoucherManagementRequest'
import { VoucherRequest } from '@/requests/VoucherRequest'

export const BASE_URL = 'https://localhost:7219/api/v1'
export const ApiRequest = {
	AuthRequest,
	BookingRequest,
	BookingManagementRequest,
	ContactManagementRequest,
	EmployeeRequest,
	EnumRequest,
	ProductRequest,
	UserRequest,
	FeedbackRequest,
	ManagerStatisticRequest,
	TableRequest,
	VoucherRequest,
	ProductManagementRequest,
	VoucherManagementRequest,
	UserManagementRequest,
	StaffAttendanceManagementRequest,
	StaffSalaryManagementRequest,
	StaffInformationManagementRequest,
	StaffStatisticRequest,
	TableManagementRequest,
}
