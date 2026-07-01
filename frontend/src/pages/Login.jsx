import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI-only login: no backend auth per assignment scope.
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-display text-base font-bold text-white">
            SM
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-1 text-sm text-muted">Sign in to manage your student records</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-surface p-7 shadow-card">
          <div className="mb-4">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={values.email}
              onChange={handleChange}
              placeholder="you@school.edu"
              className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={values.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="mb-5 flex justify-end">
            <button type="button" className="text-xs font-medium text-primary hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          This is a UI-only login screen — any credentials will sign you in.
        </p>
      </div>
    </div>
  );
};

export default Login;
