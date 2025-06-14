// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;

// module.exports = {
//   // data-mode is used as an example, next-themes supports using any data attribute
//   darkMode: ["selector", '[data-mode="dark"]'],
// };

import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx,md,mdx}",
    "./app/**/*.{ts,tsx,md,mdx}",
    "./src/**/*.{ts,tsx,md,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
  },
} satisfies Config;

export default config;
