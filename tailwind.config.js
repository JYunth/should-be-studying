const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'dot-pulse': {
          '0%, 100%': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          '50%': { backgroundColor: 'rgba(255, 255, 255, 0.7)' },
        },
      },
      animation: {
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
