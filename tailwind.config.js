/** @type {import('tailwindcss').Config} */
const { PALETTE } = require("./theme/palette.ts");
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       colors: {
        // flat, semantic keys → super clear classnames
        "bg-mint-50": PALETTE["bg-mint-50"],
        "bg-peach-200": PALETTE["bg-peach-200"],

        "surface-overlay": PALETTE["surface-overlay"],

        "text-primary": PALETTE["text-primary"],
        "text-muted": PALETTE["text-muted"],

        "btn-primary-bg": PALETTE["btn-primary-bg"],
        "btn-primary-text": PALETTE["btn-primary-text"],
        "btn-ghost-bg": PALETTE["btn-ghost-bg"],
        "btn-ghost-icon": PALETTE["btn-ghost-icon"],

        // optional accents
        "accent-indigo-500": PALETTE["accent-indigo-500"],
        "danger-red-500": PALETTE["danger-red-500"],
        "success-green-500": PALETTE["success-green-500"],
      },
    },
  },
  plugins: [],
}