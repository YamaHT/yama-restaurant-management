import ForgotPassword from '@/pages/Auth/ForgotPassword/ForgotPassword'
import Login from '@/pages/Auth/Login/Login'
import OTPVerification from '@/pages/Auth/OTPVerification/OTPVerification'
import Register from '@/pages/Auth/Register/Register'
import MyAccount from '@/pages/Customer/MyAccount/MyAccount'
import VoucherList from '@/pages/Customer/VoucherList/VoucherList'
import AboutUs from '@/pages/Guest/AboutUs/AboutUs'
import ContactUs from '@/pages/Guest/ContactUs/ContactUs'
import Home from '@/pages/Guest/Home/Home'
import ProductDetail from '@/pages/Guest/ProductDetail/ProductDetail'
import ProductList from '@/pages/Guest/ProductList/ProductList'
import TableDetail from '@/pages/Guest/TableDetail/TableDetail'
import TableList from '@/pages/Guest/TableList/TableList'
import ContactManagement from '@/pages/Manager/ContactManagement/ContactManagement'
import ProductManagement from '@/pages/Manager/ProductManagement/ProductManagement'
import TableManagement from '@/pages/Manager/TableManagement/TableManagemen'
import UserManagement from '@/pages/Manager/UserManagement/UserManagement'
import VoucherManagement from '@/pages/Manager/VoucherManagement/VoucherManagement'

const publicRoutes = [
	{ path: '/', component: Home },
	{ path: '/product', component: ProductList },
	{ path: '/product/detail/:id', component: ProductDetail },
	{ path: '/table', component: TableList },
	{ path: '/table/detail/:id', component: TableDetail },
	{ path: '/voucher', component: VoucherList },
	{ path: '/about', component: AboutUs },
	{ path: '/contact', component: ContactUs },
	{ path: '/user', component: MyAccount },

	{ path: '/auth/forgot-password', component: ForgotPassword },
	{ path: '/auth/otp-verification', component: OTPVerification },
	{ path: '/auth/login', component: Login, layout: null },
	{ path: '/auth/register', component: Register, layout: null },

	{ path: '/manager/product', component: ProductManagement },
	{ path: '/manager/table', component: TableManagement },
	{ path: '/manager/contact', component: ContactManagement },
	{ path: '/manager/user', component: UserManagement },
	{ path: '/manager/voucher', component: VoucherManagement },
]

export { publicRoutes }
