/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
    extend: {
      colors: {
        brown: {
          DEFAULT: "#8B4513", //  main brown shade
          light: "#D2B48C", //  lighter shade
          dark: "#5D3412", //  darker shade
        },
        green: {
          DEFAULT: "#008000", //  main green shade
          light: "#32CD32", //  lighter shade
          dark: "#006400", //  darker shade
        },
        white: {
          DEFAULT: "#F5F5F5",
          light: "#FFFFFF", // Light white (pure white)
          dark: "#E0E0E0", // Dark white (very light gray)
        },
        black: {
          DEFAULT: "#000000",
          light: "#333333", // Light black (dark gray)
          dark: "#0a0a0a", // Dark black (closer to true black)
        },
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "ticker-opposite": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        ticker: "ticker 20s linear infinite",
        "ticker-opposite": "ticker-opposite 20s linear infinite", // Add the opposite animation
      },
    },
  },
  plugins: [],
};
