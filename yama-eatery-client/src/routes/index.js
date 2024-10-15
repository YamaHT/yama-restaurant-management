import AboutUs from '@/pages/AboutUs/AboutUs'
import ChangePassword from '@/pages/ChangePassword/ChangePassword'
import ContactManagement from '@/pages/ContactManagement/ContactManagement'
import ContactUs from '@/pages/ContactUs/ContactUs'
import ForgotPassword from '@/pages/ForgotPassword/ForgotPassword'
import HistoryBooking from '@/pages/HistoryBooking/HistoryBooking'
import HistoryFeedback from '@/pages/HistoryFeedback/HistoryFeedback'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'
import Membership from '@/pages/Membership/Membership'
import MyVoucher from '@/pages/MyVoucher/MyVoucher'
import OtpVerification from '@/pages/OTPVerification/OTPVerification'
import ProductDetail from '@/pages/ProductDetail/ProductDetail'
import ProductList from '@/pages/ProductList/ProductList'
import ProductManagement from '@/pages/ProductManagement/ProductManagement'
import Profile from '@/pages/MyAccount/Profile/Profile'
import Register from '@/pages/Register/Register'
import TableDetail from '@/pages/TableDetail/TableDetail'
import TableList from '@/pages/TableList/TableList'
import TableManagement from '@/pages/TableManagement/TableManagemen'
import UserManagement from '@/pages/UserManagement/UserManagement'
import VoucherList from '@/pages/VoucherList/VoucherList'
import VoucherManagement from '@/pages/VoucherManagement/VoucherManagement'
import MyAccount from '@/pages/MyAccount/MyAccount'

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
	{ path: '/auth/otp-verification', component: OtpVerification },
	{ path: '/auth/login', component: Login, layout: null },
	{ path: '/auth/register', component: Register, layout: null },

	{ path: '/manager/product', component: ProductManagement },
	{ path: '/manager/table', component: TableManagement },
	{ path: '/manager/contact', component: ContactManagement },
	{ path: '/manager/user', component: UserManagement },
	{ path: '/manager/voucher', component: VoucherManagement },
]

export { publicRoutes }
