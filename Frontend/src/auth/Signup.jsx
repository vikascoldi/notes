import React, { useEffect, useRef, useState } from "react";

import PasswordInput from "../components/input/PasswordInput";
import { validateEmail } from "../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/notes-logo-cool.svg";
import { FcGoogle } from "react-icons/fc";


import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/api";

const MIN_PASSWORD_LENGTH = 6;
const REDIRECT_DELAY_MS = 1200;

// Spinner shown while the request is running
const Spinner = () => (
  <svg
    className="h-5 w-5 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-90"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

// Animated right sign (check mark) shown after successful signup
const CheckMark = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path className="signup-check-path" d="M5 13l4 4L19 7" />
  </svg>
);

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const redirectTimer = useRef(null);

  // Clean up the timer if the user leaves the page early
  useEffect(() => {
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  const isBusy = isLoading || isSuccess;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBusy) return; // block double clicks

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: cleanName,
        email: cleanEmail,
        password,
      });

      const data = response.data || {};

      // Your backend currently sends "AccesssToken" (3 s). Fallbacks are
      // included so this keeps working if you fix the spelling later.
      const token = data.AccesssToken || data.AccessToken || data.accessToken;

      if (token) {
        localStorage.setItem("accessToken", token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Show the right sign, then go to the dashboard
      setIsLoading(false);
      setIsSuccess(true);

      redirectTimer.current = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, REDIRECT_DELAY_MS);
    } catch (err) {
      setIsLoading(false);

      if (axios.isAxiosError(err)) {
        if (!err.response) {
          setError("Cannot reach the server. Check your internet and try again.");
        } else {
          setError(err.response.data?.message || "Registration failed");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // Clear the error as soon as the user starts fixing the input
  const withClearError = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  return (
    <>
      {/* Draws the check mark once */}
      <style>{`
        .signup-check-path {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: signup-draw-check 0.45s ease-out forwards;
        }
        @keyframes signup-draw-check {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .signup-check-path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      

      <div
        className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-8"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 900px 500px at 50% 0%, rgba(59,108,246,0.12), transparent 60%)",
        }}
      >
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 md:p-9">
          <form onSubmit={handleSubmit} noValidate>
            <img
              src={logo}
              alt="Notes App Logo"
              className="mx-auto mb-3 w-14"
            />

            <h4 className="mb-6 text-center text-2xl font-semibold text-slate-900">
              Create Your Account
            </h4>

            {/* fieldset disables every input while the request is running */}
            <fieldset disabled={isBusy} className="border-0 p-0 m-0 min-w-0">
              <input
                type="text"
                placeholder="Enter your name"
                aria-label="Name"
                autoComplete="name"
                value={name}
                onChange={withClearError(setName)}
                className="input-box disabled:opacity-60"
              />

              <div className="mb-4 flex items-start gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email"
                  autoComplete="email"
                  value={email}
                  onChange={withClearError(setEmail)}
                  className="input-box !mb-0 min-w-0 flex-1 disabled:opacity-60"
                />

                <button
                  type="button"
                  className="shrink-0 cursor-pointer rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Verify Email
                </button>
              </div>

              <PasswordInput
                value={password}
                onChange={withClearError(setPassword)}
              />
            </fieldset>

            {error && (
              <p
                role="alert"
                className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {isSuccess && (
              <p
                role="status"
                className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              >
                Account created. Taking you to your dashboard...
              </p>
            )}

            <button
              type="submit"
              disabled={isBusy}
              aria-busy={isLoading}
              className={`btn-primary mt-1 flex w-full items-center justify-center gap-2 font-medium transition-colors disabled:cursor-not-allowed ${
                isSuccess
                  ? "!bg-emerald-600 hover:!bg-emerald-600"
                  : "disabled:opacity-80"
              }`}
            >
              {isLoading && (
                <>
                  <Spinner />
                  <span>Creating account...</span>
                </>
              )}

              {isSuccess && (
                <>
                  <CheckMark />
                  <span>Account created</span>
                </>
              )}

              {!isBusy && <span>Sign Up</span>}
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
            disabled={isBusy}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 hover:bg-slate-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
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