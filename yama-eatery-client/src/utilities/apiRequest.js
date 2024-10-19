import { AuthRequest } from '@/requests/AuthRequest'
import { EnumRequest } from '@/requests/EnumRequest'
import { FeedbackRequest } from '@/requests/FeedbackRequest'
import { ProductRequest } from '@/requests/ProductRequest'
import { StaffManagementRequest } from '@/requests/StaffManagementRequest'
import { TableRequest } from '@/requests/TableRequest'
import { UserManagementRequest } from '@/requests/UserManagementRequest'
import { UserRequest } from '@/requests/UserRequest'
import { VoucherRequest } from '@/requests/VoucherRequest'

export const BASE_URL = 'https://localhost:7219/api/v1'
export const ApiRequest = {
	AuthRequest,
	EnumRequest,
	ProductRequest,
	UserRequest,
	FeedbackRequest,
	TableRequest,
	VoucherRequest,
	UserManagementRequest,
	StaffManagementRequest,
}
