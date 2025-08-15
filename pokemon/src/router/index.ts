import { createRouter, createWebHistory } from 'vue-router'
import PokemonDetail from '../components/PokemonDetail.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/pokemon/:id',
      name: 'pokemon-detail',
      component: PokemonDetail,
      // props: true หมายถึง ให้ Vue Router
      // ส่งค่าพารามิเตอร์จาก URL (เช่น :id) มาเป็น props ให้ component อัตโนมัติ
      // ทำให้ใน component สามารถประกาศรับ props id ได้โดยตรง
      props: true,
    },
  ],
})

// ส่งออก index.ts นี้ นำไปใช้กับ app.use(router) ในไฟล์ main.ts
export default router
