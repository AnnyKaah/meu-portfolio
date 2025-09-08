/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pinkGradientStart: "#ff4d6d",
        purpleGradientEnd: "#6a0dad",
        goldMetallic: "#d4af37",
      },
      fontFamily: {
        orbitron: ['"Orbitron"', "sans-serif"],
        sans: ["system-ui", "sans-serif"],
      },
      animation: {
        typing:
          "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
        "fade-in-up": "fadeInUp 0.8s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
