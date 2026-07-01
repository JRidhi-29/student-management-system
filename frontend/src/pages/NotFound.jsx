import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
      <span className="font-display text-7xl font-bold text-primary">404</span>
      <h1 className="mt-3 font-display text-xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
