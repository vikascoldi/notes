
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/input/PasswordInput";
import { validateEmail } from "../utils/helper";

import logo from "../assets/notes-logo-cool.svg";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // Validate email
    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // Call login API
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        {
          email: email.trim(),
          password,
        }
      );

      const data = response.data || {};

      console.log("Login response:", data);

      // Extract token from the API response
      const token =
        data.accessToken ||
        data.AccessToken ||
        data.token ||
        data.data?.accessToken ||
        data.data?.AccessToken ||
        data.data?.token;

      // Extract user information
      const user = data.user || data.data?.user;

      // Verify token
      if (!token) {
        setError(
          "Login response received, but no authentication token was found. Please check your backend response."
        );
        return;
      }

      // Store authentication token
      localStorage.setItem("accessToken", token);

      // Store user information
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Navigate to dashboard
      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error(
        "Login error:",
        err.response?.data || err.message || err
      );

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-8"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 900px 500px at 50% 0%, rgba(59,108,246,0.12), transparent 60%)",
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 md:p-9">

        <form onSubmit={handleLogin}>
          {/* Logo */}
          <img
            src={logo}
            alt="Notes App Logo"
            className="mx-auto mb-3 w-14"
          />

          {/* Heading */}
          <h4 className="mb-6 text-center text-2xl font-semibold text-slate-900">
            Login
          </h4>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-1 font-medium disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className="mt-4 text-center text-sm text-slate-600">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Create new account
            </Link>
          </p>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3 text-sm text-slate-400">
          <div className="h-px flex-1 bg-slate-200" />
          <span>or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() =>
            setError("Google login is not configured yet.")
          }
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 hover:bg-slate-50 active:scale-[0.99]"
        >
          <FcGoogle size={22} />

          <span className="text-sm font-medium text-slate-700">
            Continue With Google
          </span>
        </button>

      </div>
    </div>
  );
};

export default Login;

