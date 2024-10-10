import CrudManagement from "@/pages/Crud Management/CrudManagement";
import Home from "@/pages/Home/Home";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import ProductList from "@/pages/ProductList/ProductList";
import WeatherList from "@/pages/WeatherList";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/weather", component: WeatherList },
  { path: "/Product/Detail/:id", component: ProductDetail },
];


export { publicRoutes }

