// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        maplestory: ['MaplestoryOTFBold', 'sans-serif'],
      },
      backgroundImage: {
        // 이름은 마음대로!
        "moving-gradient":
          "linear-gradient(to right, #656565 0%, #7f42a7 20%, #6600c5 40%, #5300a0 60%, #757575 80%, #656565 100%)",
      },
      keyframes: {
        gradient: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
      },
      animation: {
        gradient: "gradient 2.5s linear infinite",
      },
    },
  },
}