export default {
  content: ["./src/**/*.{astro,html,js}"],
  theme: {
    extend: {
      colors: {
        surface: "#fafafa", // off-white background
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.04)",
      },
      animation: {
        fade: "fadeIn 0.4s ease-out both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
