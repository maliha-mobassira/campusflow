/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        campus: {
          bg: '#F5F5F5',
          card: '#FFFFFF',
          elevated: '#FAFAFA',
          text: '#111111',
          secondary: '#11111199',
          muted: '#11111166',
          border: '#11111112',
          hover: '#EAEAEA',
          accent: '#111111',
          success: '#3D8B68',
          error: '#C95C5C',
          warning: '#C58A3A',
          dark: {
            bg: '#111111',
            card: '#1C1C1C',
            elevated: '#242424',
            text: '#F5F5F5',
            secondary: '#F5F5F599',
            muted: '#F5F5F566',
            border: '#FFFFFF14',
            hover: '#2A2A2A',
            accent: '#F5F5F5',
            success: '#65B88D',
            error: '#E47777',
            warning: '#E0AA5C',
          }
        }
      }
    },
  },
  plugins: [],
}
