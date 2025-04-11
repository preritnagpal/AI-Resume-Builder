import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'mlg': '896px', // Midway between md(768) and lg(1024)
        'print': { 'raw': 'print' } // 👈 Add custom 'print' screen
      },
      spacing: {
        '25': '6.25rem', '26': '6.5rem', '27': '6.75rem', '28': '7rem',
        '29': '7.25rem', '30': '7.5rem', '31': '7.75rem', '32': '8rem',
        '33': '8.25rem', '34': '8.5rem', '35': '8.75rem', '36': '9rem',
        '37': '9.25rem', '38': '9.5rem', '39': '9.75rem', '40': '10rem',
        '41': '10.25rem', '42': '10.5rem', '43': '10.75rem', '44': '11rem',
        '45': '11.25rem', '46': '11.5rem', '47': '11.75rem', '48': '12rem',
        '49': '12.25rem', '50': '12.5rem',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        "open-sans": ["var(--font-open_sans)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
