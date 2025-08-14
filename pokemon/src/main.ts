// import global styles 
import './assets/main.css'

// import function vue - createApp
import { createApp } from 'vue'
// import component หลัก (root component)
import App from './App.vue'
// import ตัวจัดการเส้นทาง (Vue Router) src/router/index.ts
import router from './router'

// สร้าง app 
const app = createApp(App)

// บอก app ให้รู้จักระบบ routing
app.use(router)

// mount คือบอกให้ vue เอา app ไปแสดงบนหน้าเว็บจริง | ติดตั้ง app Vue ลงไปใน element ที่มี id="app"
app.mount('#app')
