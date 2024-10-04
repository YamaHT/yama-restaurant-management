import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import ProductList from "@/pages/ProductList/ProductList";
import WeatherList from "@/pages/WeatherList";

const publicRoutes = [
  { path: "/", component: ProductList },
  { path: "/weather", component: WeatherList },
  { path: "/Product/Detail/:id", component: ProductDetail }, // Dynamic route for product detail
];


export { publicRoutes };

