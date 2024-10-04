import WeatherList from "@/pages/WeatherList";
import HomePage from "@/pages/Home";
import AboutUs from "@/pages/AboutUs/AboutUs";
import HistoryFeedback from"@/pages/HistoryFeedback/HistoryFeedback";
import AfterPayment from "@/pages/AfterPayment/AfterPayment"
import VoucherList from "@/pages/VoucherList/VouchetList";
import VoucherManage from "@/pages/VoucherManage/VoucherManage";

const publicRoutes = [
  { path: "/", component: VoucherManage},
  { path: "/HistoryFeedback", component: HistoryFeedback},
  { path: "/AfterPayment", component: AfterPayment},
  { path: "/AboutUs", component: AboutUs},
  { path: "/weather", component: WeatherList },
];

export { publicRoutes };
