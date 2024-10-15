import { AuthRequest } from '@/requests/AuthRequest'
import { EnumRequest } from '@/requests/EnumRequest'
import { FeedbackRequest } from '@/requests/FeedbackRequest'
import { ProductRequest } from '@/requests/ProductRequest'
import { UserRequest } from '@/requests/UserRequest'

export const BASE_URL = 'https://localhost:7219/api/v1'
export const API_REQUEST = {
	AuthRequest,
	EnumRequest,
	ProductRequest,
	UserRequest,
	FeedbackRequest,
}
