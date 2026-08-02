import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage, { loader as homeLoader } from "./pages/HomePage";
import ProductDetails, {
  loader as detailsLoader,
} from "./components/product/ProductDetails";
import Contact from "./components/contact/Contact";
import AboutPage from "./pages/AboutPage";

//router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "/product/:slug",
        element: <ProductDetails />,
        loader: detailsLoader,
      },
      {
        path: "/about-us",
        element: <AboutPage />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
    ],
  },
]);
