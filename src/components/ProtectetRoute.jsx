import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

const ProtectetRoute = ({ children }) => {
  const { isLogin } = useAuthContext;
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
            <h1>Protected Route</h1>
            <div>{children}</div>
          </div>
        )}
        <Footer />
      </section>
    </>
  );
};

export default ProtectetRoute;
