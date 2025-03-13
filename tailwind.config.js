/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      'xs': '410px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1400px',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        "skeleton": {
          "0%": { opacity: 0.5, transform: "scale(0.98)" },
          "50%": { opacity: 0.8, transform: "scale(1)" },
          "100%": { opacity: 0.5, transform: "scale(0.98)" }
        },
        "sheet-in": {
          "0%": { 
            opacity: "0",
            transform: "translateY(100%)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "sheet-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)"
          },
          "100%": {
            opacity: "0",
            transform: "translateY(100%)"
          }
        },
        'nav-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'nav-out': {
          '0%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(-100%)'
          }
        },
        'message-appear': {
          from: {
            opacity: 0,
            transform: 'translateY(10px)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        'chat-open': {
          '0%': {
            clipPath: 'circle(50% at bottom right)'
          },
          '100%': {
            clipPath: 'inset(0% 0% 0% 0% round 0.5rem)'
          }
        },
        'chat-close': {
          '0%': {
            clipPath: 'inset(0% 0% 0% 0% round 0.5rem)'
          },
          '100%': {
            clipPath: 'circle(50% at bottom right)'
          }
        },
        'glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px 2px rgba(var(--foreground-rgb), 0.3)'
          },
          '50%': {
            boxShadow: '0 0 20px 5px rgba(var(--foreground-rgb), 0.6)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'gradient-x': 'gradient-x 3s ease infinite',
        "sheet-in": "sheet-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        "sheet-out": "sheet-out 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        "nav-in": "nav-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        "nav-out": "nav-out 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        "skeleton": "skeleton 2s ease-in-out infinite",
        "message-appear": "message-appear 0.3s ease-out forwards",
        "chat-open": "chat-open 0.5s ease-out forwards",
        "chat-close": "chat-close 0.4s ease-in forwards",
        "glow": "glow 3s ease-in-out infinite"
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(8px)',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['light'],
      textColor: ['light']
    }
  }
} 