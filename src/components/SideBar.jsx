import React from "react";
import { NavLink } from "react-router";

function SideBar({ isShow }) {
  return (
    <>
      <section
        className={`h-screen w-[250px] bg-red-300 text-white fixed top-0 left-0 transition-all duration-1000  ${
          isShow ? " translate-x-[0%]" : "translate-x-[-110%]"
        }`}
      >
        <p className="border-b-2 border-white/30 flex justify-center items-center text-2xl text-center h-16">
          Amazing Cart
        </p>

        <nav className="flex flex-col gap-1 px-3 text-lg">
          <NavLink
            className={({ isActive }) =>
              `hover:text-red-800 outline-none ${
                isActive ? "text-red-800" : "text-white"
              }`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `hover:text-red-800 outline-none ${
                isActive ? "text-red-800" : "text-white"
              }`
            }
            to="/product"
          >
            Product
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `hover:text-red-800 outline-none ${
                isActive ? "text-red-800" : "text-white"
              }`
            }
            to="/setting"
          >
            Setting
          </NavLink>
        </nav>
      </section>
    </>
  );
}

export default SideBar;
