import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import ProductDetails from "./components/product/ProductDetails";
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
      },
      {
        path: "/products/test",
        element: <ProductDetails />,
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
