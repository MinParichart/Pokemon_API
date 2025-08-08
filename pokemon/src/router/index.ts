import { createRouter, createWebHistory } from 'vue-router'
import PokemonDetail from '../components/PokemonDetail.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', 
      name: 'home', 
      component: HomeView },
    {
      path: '/pokemon/:id',
      name: 'pokemon-detail',
      component: PokemonDetail,
      props: true,
    },
  ],
})

export default router
