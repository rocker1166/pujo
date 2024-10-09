import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			durgaRed: '#FF5733',
  			dhakBrown: '#8B4513',
  			kashfulWhite: '#FFFDD0',
  			festiveOrange: '#FF7F50',
  			mandalaGold: '#FFD700',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			float: 'float 6s ease-in-out infinite',
  			'pulse-slow': 'pulse 4s ease-in-out infinite',
  			'spin-slow': 'spin 12s linear infinite',
  			diagonalMove: 'diagonalMove 10s linear infinite',
  			swing: 'swing 3s ease-in-out infinite',
  			slideUp: 'slideUp 1s ease-out forwards',
  			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					opacity: '0.8'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			},
  			diagonalMove: {
  				'0%': {
  					transform: 'translate(0, 0)'
  				},
  				'50%': {
  					transform: 'translate(20px, 20px)'
  				},
  				'100%': {
  					transform: 'translate(0, 0)'
  				}
  			},
  			swing: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'50%': {
  					transform: 'rotate(10deg)'
  				},
  				'100%': {
  					transform: 'rotate(0deg)'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(100%)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			ripple: {
  				'0%, 100%': {
  					transform: 'translate(-50%, -50%) scale(1)'
  				},
  				'50%': {
  					transform: 'translate(-50%, -50%) scale(0.9)'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
