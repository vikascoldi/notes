import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/notes-logo-cool.svg";
import Profileinfo from "../UserProfileInfo/Profileinfo";
import SearchBar from "../saerchBar/SearchBar";

const Navbar = () => {
  const [searchQuery, setSearchQueary] = useState(""); // searcbar value
  const onChange = (e) => {
    // search bar logic
    setSearchQueary(e.target.value);
  };

  const handleSearch = (e) => {};

  const onClearSearch = () => {
    setSearchQueary("");
  };

  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/");
  };

  return (
    <nav
      className="sticky top-0 z-30 mb-4 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md md:px-6"
      aria-label="Main navigation"
    >
      <Link
        to=""
        aria-label="Notes App Home"
        className="shrink-0 rounded-lg"
      >
        <img src={logo} alt="Notes App Logo" className="w-12 md:w-14" />
      </Link>

      <div className="flex min-w-0 flex-1 justify-center">
        <SearchBar
          value={searchQuery}
          onChange={onChange}
          onClearSearch={onClearSearch}
        />
      </div>

      <Profileinfo onLogout={onLogout} />
    </nav>
  );
};

export default Navbar;