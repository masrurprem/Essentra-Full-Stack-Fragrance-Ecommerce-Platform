import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "./AppLayout.css";
import Spinner from "../components/utils/Spinner";

const AppLayout = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  return (
    <>
      <div className="app--layout">
        {loading && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50">
            <Spinner />
          </div>
        )}
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
