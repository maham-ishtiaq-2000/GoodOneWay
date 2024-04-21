module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // scan these file types for Tailwind classes
  ],
  theme: {
    extend: {
      colors:{
        "lightPink" : "#fefbff",
        "platinum" : "#f9eef2",
        "gray"  : "#A9A9A9",
        "darkRed" : "#463e3e",
        "darkGrey" : "#696969",
        "homePageColor" : "#fefbff",
        "white" : "#ffffff",
        "lightGray" : "#d4d4d4"
      }
    },
  },
  plugins: [],
}
