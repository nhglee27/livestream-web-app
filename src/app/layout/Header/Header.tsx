import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <h1>this is header</h1>
      </div>
    </nav>
  );
};

export default Header;
