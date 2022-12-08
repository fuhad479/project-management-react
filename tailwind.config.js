/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        active: 'border-color: red',
        extend: {
            colors: {
                astronaut: {
                    100: 'rgba(43, 82, 118, 0.1)',
                    200: 'rgba(43, 82, 118, 0.2)',
                    300: 'rgba(43, 82, 118, 0.3)',
                    400: 'rgba(43, 82, 118, 0.4)',
                    500: 'rgba(43, 82, 118, 0.5)',
                    600: 'rgba(43, 82, 118, 0.6)',
                    700: 'rgba(43, 82, 118, 0.7)',
                    800: 'rgba(43, 82, 118, 0.8)',
                    900: 'rgba(43, 82, 118, 0.9)',
                    DEFAULT: 'rgba(43, 82, 118, 1)'
                },
                finn: {
                    100: 'rgba(101, 50, 100, 0.1)',
                    200: 'rgba(101, 50, 100, 0.2)',
                    300: 'rgba(101, 50, 100, 0.3)',
                    400: 'rgba(101, 50, 100, 0.4)',
                    500: 'rgba(101, 50, 100, 0.5)',
                    600: 'rgba(101, 50, 100, 0.6)',
                    700: 'rgba(101, 50, 100, 0.7)',
                    800: 'rgba(101, 50, 100, 0.8)',
                    900: 'rgba(101, 50, 100, 0.9)',
                    DEFAULT: 'rgba(101, 50, 100, 1)'
                },
                camarone: {
                    100: 'rgba(0, 93, 30, 0.1)',
                    200: 'rgba(0, 93, 30, 0.2)',
                    300: 'rgba(0, 93, 30, 0.3)',
                    400: 'rgba(0, 93, 30, 0.4)',
                    500: 'rgba(0, 93, 30, 0.5)',
                    600: 'rgba(0, 93, 30, 0.6)',
                    700: 'rgba(0, 93, 30, 0.7)',
                    800: 'rgba(0, 93, 30, 0.8)',
                    900: 'rgba(0, 93, 30, 0.9)',
                    DEFAULT: 'rgba(0, 93, 30, 1)'
                },
                ['oslo-gray']: {
                    100: 'rgba(128, 142, 146, 0.1)',
                    200: 'rgba(128, 142, 146, 0.2)',
                    300: 'rgba(128, 142, 146, 0.3)',
                    400: 'rgba(128, 142, 146, 0.4)',
                    500: 'rgba(128, 142, 146, 0.5)',
                    600: 'rgba(128, 142, 146, 0.6)',
                    700: 'rgba(128, 142, 146, 0.7)',
                    800: 'rgba(128, 142, 146, 0.8)',
                    900: 'rgba(128, 142, 146, 0.9)',
                    DEFAULT: 'rgba(128, 142, 146, 1)'
                },
                ['burnt-sienna']: {
                    100: 'rgba(236, 101, 100, 0.1)',
                    200: 'rgba(236, 101, 100, 0.2)',
                    300: 'rgba(236, 101, 100, 0.3)',
                    400: 'rgba(236, 101, 100, 0.4)',
                    500: 'rgba(236, 101, 100, 0.5)',
                    600: 'rgba(236, 101, 100, 0.6)',
                    700: 'rgba(236, 101, 100, 0.7)',
                    800: 'rgba(236, 101, 100, 0.8)',
                    900: 'rgba(236, 101, 100, 0.9)',
                    DEFAULT: 'rgba(236, 101, 100, 1)'
                },
            }
        }
    },
    plugins: []
}
