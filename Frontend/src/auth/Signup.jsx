import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import PasswordInput from "../components/input/PasswordInput";
import { validateEmail } from "../utils/helper";
import { Link } from "react-router-dom";
import logo from "../assets/notes-logo-cool.svg";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter valid email");
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
        className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-8"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 900px 500px at 50% 0%, rgba(59,108,246,0.12), transparent 60%)",
        }}
      >
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 md:p-9">
          <form onSubmit={handleSubmit}>
            <img
              src={logo}
              alt="Notes App Logo"
              className="mx-auto mb-3 w-14"
            />

            <h4 className="mb-6 text-center text-2xl font-semibold text-slate-900">
              Create Your Account
            </h4>

            <input
              type="text"
              placeholder="Enter your name"
              aria-label="Name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-box"
            />

            <div className="mb-4 flex items-start gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-box !mb-0 min-w-0 flex-1"
              />
              <button
                type="button"
                className="shrink-0 cursor-pointer rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-700 active:scale-95"
              >
                Verify Email
              </button>
            </div>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p
                role="alert"
                className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary mt-1 font-medium">
              Sign Up
            </button>

            <p className="mt-4 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>

          <div className="my-5 flex items-center gap-3 text-sm text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            <span>or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 hover:bg-slate-50 active:scale-[0.99]"
          >
            <FcGoogle size={22} />
            <span className="text-sm font-medium text-slate-700">
              Continue With Google
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;