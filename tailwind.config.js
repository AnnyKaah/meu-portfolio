/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-start': 'var(--accent-1)', // #ff6fb5 (rosa)
        'primary-end': 'var(--accent-2)',   // #9b5cff (roxo)
        'primary-accent': 'var(--accent-3)', // #ff4fa3 (magenta)
        'background-dark': '#0A0A1A',
        'background-light': '#F8F9FA',
        'text-dark': '#212529',
        'text-light': '#E0E0E0',
        'highlight': 'var(--highlight-color)',
      },
      fontFamily: {
        heading: ['"Orbitron"', "sans-serif"],
        body: ['"Poppins"', "sans-serif"],
      },
      animation: {
        "background-pan": "background-pan 20s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease forwards",
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      textShadow: {
        glow: "0 0 8px var(--highlight-color), 0 0 20px var(--highlight-color)",
      },
      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "background-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 25px -5px var(--highlight-color, #00F5A0)' },
          '50%': { boxShadow: '0 0 40px 5px var(--highlight-color, #00F5A0)' },
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
