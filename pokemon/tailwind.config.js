/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx,vue}', // ✅ ให้ Tailwind สแกนทุกไฟล์ใน src ที่ลงท้ายด้วย .html, .js, .ts, .vue
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

}

