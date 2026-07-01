/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F7F8FB",
        surface: "#FFFFFF",
        ink: "#1E2333",
        muted: "#6B7280",
        line: "#E5E7EB",
        primary: {
          DEFAULT: "#4F46E5",
          dark: "#4338CA",
          light: "#EEF2FF",
        },
        cs: { DEFAULT: "#4F46E5", light: "#EEF2FF" },
        mech: { DEFAULT: "#F59E0B", light: "#FFFBEB" },
        electrical: { DEFAULT: "#10B981", light: "#ECFDF5" },
        danger: { DEFAULT: "#DC2626", light: "#FEF2F2" },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(30, 35, 51, 0.06), 0 1px 3px rgba(30, 35, 51, 0.08)",
      },
    },
  },
  plugins: [],
};
