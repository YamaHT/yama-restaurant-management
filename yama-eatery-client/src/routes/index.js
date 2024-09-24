import WeatherList from "@/pages/WeatherList";
import HomePage from "@/pages/Home";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/weather", component: WeatherList },
];

export { publicRoutes };
