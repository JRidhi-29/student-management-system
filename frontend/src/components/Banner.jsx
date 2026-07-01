import React from "react";

const Banner = ({ type = "error", children, onDismiss }) => {
  if (!children) return null;

  const styles =
    type === "error"
      ? "bg-danger-light text-danger border-danger/20"
      : "bg-electrical-light text-electrical border-electrical/20";

  return (
    <div className={`flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${styles}`}>
      <span>{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-xs font-semibold underline underline-offset-2"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export default Banner;
