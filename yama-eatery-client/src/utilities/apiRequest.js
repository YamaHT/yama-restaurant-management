import { AuthRequest } from '@/requests/AuthRequest'
import { EnumRequest } from '@/requests/EnumRequest'
import { FeedbackRequest } from '@/requests/FeedbackRequest'
import { ProductManagementRequest } from '@/requests/ProductManagementRequest'
import { ProductRequest } from '@/requests/ProductRequest'
import { TableRequest } from '@/requests/TableRequest'
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
	ProductManagementRequest
}
