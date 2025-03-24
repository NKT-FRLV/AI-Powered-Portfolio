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
  		xxs: '320px',
  		xs: '410px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1400px'
  	},
  	fontFamily: {
  		sans: [
  			'var(--font-geist-sans)',
  			'system-ui',
  			'sans-serif'
  		],
  		mono: [
  			'var(--font-geist-mono)',
  			'monospace'
  		],
  		'rubik-mono': [
  			'var(--font-rubik-mono)',
  			'Courier New',
  			'monospace'
  		],
  		orbitron: [
  			'var(--font-orbitron)',
  			'sans-serif'
  		],
  		'geist-sans': [
  			'var(--font-geist-sans)',
  			'system-ui',
  			'sans-serif'
  		],
  		'geist-mono': [
  			'var(--font-geist-mono)',
  			'monospace'
  		],
  		roboto: [
  			'var(--font-roboto)',
  			'sans-serif'
  		]
  	},
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		fontWeight: {
  			thin: '100',
  			extralight: '200',
  			light: '300',
  			normal: '400',
  			medium: '500',
  			semibold: '600',
  			bold: '700',
  			extrabold: '800',
  			black: '900'
  		},
  		fontSize: {
  			xxs: '0.625rem',
  			xs: '0.75rem',
  			sm: '0.875rem',
  			base: '1rem',
  			lg: '1.125rem',
  			xl: '1.25rem',
  			'2xl': '1.5rem',
  			'3xl': '1.875rem',
  			'4xl': '2.25rem',
  			'5xl': '3rem',
  			'6xl': '3.75rem',
  			'7xl': '4.5rem',
  			'8xl': '6rem',
  			'9xl': '8rem'
  		},
  		letterSpacing: {
  			tightest: '-0.05em',
  			tighter: '-0.025em',
  			tight: '-0.0125em',
  			normal: '0',
  			wide: '0.0125em',
  			wider: '0.025em',
  			widest: '0.05em',
  			'super-wide': '0.1em'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: 0 },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: 0 }
  			},
  			'collapsible-down': {
  				from: { height: 0 },
  				to: { height: 'var(--radix-collapsible-content-height)' }
  			},
  			'collapsible-up': {
  				from: { height: 'var(--radix-collapsible-content-height)' },
  				to: { height: 0 }
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
  			'skeleton': {
  				'0%': {
  					opacity: 0.5,
  					transform: 'scale(0.98)'
  				},
  				'50%': {
  					opacity: 0.8,
  					transform: 'scale(1)'
  				},
  				'100%': {
  					opacity: 0.5,
  					transform: 'scale(0.98)'
  				}
  			},
  			'sheet-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(100%)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'sheet-out': {
  				'0%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'translateY(100%)'
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
  			glow: {
  				'0%, 100%': {
  					opacity: '0.5',
  					filter: 'brightness(1)'
  				},
  				'50%': {
  					opacity: '0.8',
  					filter: 'brightness(1.2)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.3s ease-out',
  			'accordion-up': 'accordion-up 0.3s ease-out',
  			'collapsible-down': 'collapsible-down 0.3s ease-out',
  			'collapsible-up': 'collapsible-up 0.3s ease-out',
  			'gradient-x': 'gradient-x 3s ease infinite',
  			'sheet-in': 'sheet-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  			'sheet-out': 'sheet-out 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  			'nav-in': 'nav-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  			'nav-out': 'nav-out 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  			'skeleton': 'skeleton 2s ease-in-out infinite',
  			'message-appear': 'message-appear 0.3s ease-out forwards',
  			'glow': 'glow 3s ease-in-out infinite',
  			'button-glow': 'glow 3s ease-in-out infinite'
  		},
  		backdropFilter: {
  			none: 'none',
  			blur: 'blur(8px)'
  		}
  	}
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['light'],
      textColor: ['light']
    }
  }
} 