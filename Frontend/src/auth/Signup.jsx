import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import PasswordInput from "../components/input/PasswordInput";
import { validateEmail } from "../utils/helper";
import { Link } from "react-router-dom";
import logo from "./../assets/notepad-logo-transparent.svg";
import { FcGoogle } from "react-icons/fc";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name){
      setError("Please enter name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter valid email");
      return;
    }
    if(!password){
      setError("Please enter valid password");
      return;
    }
    setError("");
  };
  return (
    <>
      <Navbar />
      <div
        className="min-h-[calc(100vh-4rem)] flex items-center  justify-center px-4  "
        style={{
          backgroundColor: "#FBFBFD",
          backgroundImage:
            "radial-gradient(ellipse 900px 500px at 50% 0%, rgba(109,94,245,0.14), transparent 60%), radial-gradient(#e6e6ee 1px, transparent 1px)",
          backgroundSize: "auto, 24px 24px",
        }}
      >
        <div className="  w-full max-w-md rounded px-7   bg-transparent">
          <form onSubmit={handleSubmit}>
            <img
              src={logo}
              alt="Notes App Logo"
              className="w-15 mx-auto mb-2"
            />

            <h4 className="mb-4 font-medium text-3xl text-center">
              Create Your Account
            </h4>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-300 px-2 py-3 text-lg outline-none rounded mb-3"
            />
            
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b text-lg  border-gray-300 px-2 py-3 outline-none rounded mb-3"
              />
               <button className="bg-green-600 cursor-pointer px-6 py-1 rounded text-white ">Verify Email</button>
               
          

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 mb-1">{error}</p>}

            <button
              type="submit"
              className=" text-2xl bg-blue-500 w-full text-white px-3 py-2 rounded cursor-pointer"
            >
              Sign Up
            </button>

            <p className="mt-2 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-medium">
                Click here
              </Link>
            </p>
          </form>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1  h-px bg-gray-300" />
            <span>or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
          <div className=" flex items-center justify-center">
            <button className=" w-full flex max-w-sm  items-center justify-center px-4 gap-1 transition hover:bg-gray-50   py-2 border border-gray-300 rounded ">
               <FcGoogle size={22} />
               <span className="text-sm text-gray-700 font-medium  cursor-pointer ">Continue With Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;