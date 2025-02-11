import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        logo: "#14c688",
        bgrd: "#1a1a1a",
      },
    },
  },
  plugins: [lineClamp],
} satisfies Config;
