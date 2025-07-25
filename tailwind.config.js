const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
  require('@tailwindcss/line-clamp'),
],
};

export default config;
