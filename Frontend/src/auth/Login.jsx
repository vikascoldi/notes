import React, { useState } from "react";
 
import { Link } from "react-router-dom";
import PasswordInput from "../components/input/PasswordInput";
import { validateEmail } from "../utils/helper";
import Navbar from "../components/navbar/Navbar";
import logo from "./../assets/notepad-logo-transparent.svg";
import { FcGoogle } from "react-icons/fc";
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
 
  const handleLogin = async (e) => {
    e.preventDefault();
 
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
 
    if (!password) {
      setError("Please enter valid password");
      return;
    }
    setError("");
  };
  return (
    <>
      <Navbar />
 
      <div
        className="min-h-[calc(100vh-5rem)] pt-28 flex items-center justify-center"
        style={{
          backgroundColor: "#FBFBFD",
          backgroundImage: "radial-gradient(#DCDCE8 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <div className="w-96  bg-transparent rounded px-7 py-10  ">
          <form onSubmit={handleLogin} className="">
            <img
                          src={logo}
                          alt="Notes App Logo"
                          className="w-15 mx-auto mb-2"
                        />  
            <h4 className="text-2xl text-center  mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className={`input-box  `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-500 pb-1 "> {error} </p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-lg text-center mt-2">
              Not register yet?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-medium "
              >
                Creat new account
              </Link>{" "}
            </p>
          </form>
          <div className="flex mt-2 items-center gap-3">
            <div className="  flex-1 h-px bg-gray-300" />
            <span>or</span>
            <div className=" flex-1 h-px bg-gray-300" />
          </div>
          <div className=" flex mt-3 items-center justify-center">
            <button className=" w-full flex max-w-sm  items-center justify-center px-4 gap-1 transition hover:bg-gray-50   py-2 border border-gray-300 rounded ">
              <FcGoogle size={22} />
              <span className="text-sm text-gray-700 font-medium  cursor-pointer ">
                Continue With Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default Login;
 
