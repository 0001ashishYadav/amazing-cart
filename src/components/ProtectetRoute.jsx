import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";

const ProtectetRoute = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isLogin } = useAuthContext();

  console.log(isLogin);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Run on initial render
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <SideBar isShow={isSidebarOpen} />

      <section
        className={`transition-all duration-1000 ${
          isSidebarOpen ? "ml-[254px]" : "ml-[0px]"
        }`}
      >
        <Header />
        {!isLogin ? (
          <Navigate to="/login" replace />
        ) : (
          <div>
            <div>{children}</div>
          </div>
        )}
        <Footer />
      </section>
    </>
  );
};

export default ProtectetRoute;
