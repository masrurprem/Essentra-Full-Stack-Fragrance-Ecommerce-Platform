import React from "react";
import FeaturedIn from "./components/utils/FeaturedIn";
import Epilogue from "./components/utils/epilogue";
import HeroSection from "./components/home/HeroSection";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AboutTop from "./components/about/AboutTop";
import AboutBottom from "./components/about/AboutBottom";
import Contact from "./components/contact/Contact";
import ProductContainer from "./components/product/ProductContainer";
import ProductDetails from "./components/product/ProductDetails";
//
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <>
      {/* <Navbar />
      <HeroSection />
      <FeaturedIn />
      <Epilogue />
      <Footer /> */}
      {/* <Navbar /> */}
      {/* <AboutTop />
      <FeaturedIn />
      <AboutBottom /> */}
      {/* <ProductDetails />
      <Footer /> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
