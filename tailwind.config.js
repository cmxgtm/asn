/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EBF1F8",
          100: "#D6E3F1",
          200: "#B0CAE5",
          300: "#7AAED6",
          400: "#3B82C6",
          500: "#1A4B8C",
          600: "#153D72",
          700: "#0F2847",
          800: "#0B1F3D",
          900: "#071529",
        },
        accent: {
          400: "#38bdf8",
          500: "#0ea5e9",
        },
      },
      fontFamily: {
        display: ["'ZalandoSans'", "system-ui", "sans-serif"],
        body: ["'ZalandoSans'", "system-ui", "sans-serif"],
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
          "0%": { opacity: "0", transform: "translateY(16px)" },
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
