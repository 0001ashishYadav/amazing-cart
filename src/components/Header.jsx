import { Menu } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="h-16 bg-red-300 sticky top-0 w-auto flex items-center gap-2 pl-3 text-white">
      <Menu />
      <p className="text-lg">Dashboard</p>
    </div>
  );
}

export default Header;
