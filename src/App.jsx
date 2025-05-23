import { Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import Product from "./pages/products/Product";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Setting from "./pages/Setting";
import LoginPage from "./pages/login";
import ProtectetRoute from "./components/ProtectetRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectetRoute>
              <HomePage />
            </ProtectetRoute>
          }
        />
        <Route
          path="/product"
          element={
            <ProtectetRoute>
              <Product />
            </ProtectetRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectetRoute>
              <Setting />
            </ProtectetRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
