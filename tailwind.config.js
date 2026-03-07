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
                    primary: 'var(--brand-primary, #09253c)',
                    secondary: 'var(--brand-secondary, #8bc53f)',
                    accent: '#8bc53f',
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
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.015em' }],
                'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '500' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600', letterSpacing: '-0.01em' }],
                '2xl': ['1.5rem', { lineHeight: '2rem', fontWeight: '700', letterSpacing: '-0.02em' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '800', letterSpacing: '-0.03em' }],
                '5xl': ['3rem', { lineHeight: '1', fontWeight: '900', letterSpacing: '-0.04em' }],
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
