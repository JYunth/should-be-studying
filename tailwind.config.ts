import { heroui } from "@heroui/react";
import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'dot-pulse': {
          '0%, 100%': { backgroundColor: 'rgb(255 255 255 / 0.1)' },
          '50%': { backgroundColor: 'rgb(255 255 255 / 0.7)' },
        },
      },
      animation: {
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config; 
