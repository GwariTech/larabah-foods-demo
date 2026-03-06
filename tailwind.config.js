/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#09253c',   // Logo Deep Navy Blue
                    secondary: '#8bc53f', // Logo Bright Leaf Green 
                    accent: '#8bc53f',    // Emerald Green accent
                    bg: 'rgb(var(--color-bg-main) / <alpha-value>)',
                },
                ui: {
                    card: 'rgb(var(--color-bg-card) / <alpha-value>)',
                    surface: 'rgb(var(--color-bg-surface) / <alpha-value>)',
                    border: 'rgb(var(--color-border) / <alpha-value>)',
                    text: 'rgb(var(--color-text-main) / <alpha-value>)',
                    muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
                'fade-in-up-delay-1': 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
                'fade-in-up-delay-2': 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
                'fade-in-up-delay-3': 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
                'shimmer': 'shimmer 1.5s infinite linear',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(15px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                }
            }
        },
    },
    plugins: [],
}
