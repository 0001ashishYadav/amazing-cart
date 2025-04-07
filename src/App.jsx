import { Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import Product from "./pages/products/Product";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Setting from "./pages/Setting";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </section>
    </>
  );
}

export default App;
