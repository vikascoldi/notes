import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/notepad-logo-transparent.svg";

const Navbar = () => {
  return (
    <nav
      className="flex h-15 items-center justify-between px-1 py-3 border-b border-[#EDEDF3] relative z-10"
      style={{
        backgroundColor: "#FBFBFD",
        backgroundImage: "radial-gradient(#DCDCE8 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
      aria-label="Main navigation"
    >
      <Link to="" aria-label="Notes App Home">
        <img
          src={logo}
          alt="Notes App Logo"
          className="w-15 md:w-16"
        />
      </Link>
    </nav>
  );
};

export default Navbar;