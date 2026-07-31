import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "./AppLayout.css";

const AppLayout = () => {
  return (
    <>
      <div className="app--layout">
        <Header />
        <main className="main--content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
