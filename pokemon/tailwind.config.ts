import type { Config } from 'tailwindcss'

// export object config ให้ Tailwind ใช้ | การใช้ export default ทำให้ไฟล์นี้ถูก import อัตโนมัติเมื่อ Tailwind รัน build
export default {
  // content บอก tailwind ว่าจะให้มันไปหา class ที่เราใช้จากไฟล์ไหน้บ้าง 
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx,vue}', // ✅ ให้ Tailwind สแกนทุกไฟล์ใน src ที่ลงท้ายด้วย .{html,js,jsx,ts,tsx,vue
  ],
  // เพิ่ม theme ได้
  theme: {
    extend: {},
  },
  // โหลด plugin DaisyUI
  plugins: [require('daisyui')],
} satisfies Config
