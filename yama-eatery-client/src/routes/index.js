import CrudManagement from "@/pages/Crud Management/CrudManagement";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import ProductList from "@/pages/ProductList/ProductList";
import WeatherList from "@/pages/WeatherList";

const publicRoutes = [
  { path: "/", component: ProductList },
  { path: "/weather", component: WeatherList },
  { path: "/Product/Detail/:id", component: ProductDetail },
];


export { publicRoutes }

