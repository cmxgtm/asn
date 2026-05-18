/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef2ff",
          100: "#dce8ff",
          200: "#bad1ff",
          300: "#7aaeff",
          400: "#3b82f6",
          500: "#1d5ecc",
          600: "#1a3a6b",
          700: "#152e58",
          800: "#0f2040",
          900: "#091428",
        },
        gold: {
          400: "#f5c842",
          500: "#e5b800",
        },
      },
      fontFamily: {
        display: ["var(--font-zalando)", "sans-serif"],
        body: ["var(--font-zalando)", "sans-serif"],
      },
      animation: {
        "slide-in": "slideIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
