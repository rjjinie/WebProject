import { createRouter, createWebHistory } from 'vue-router'
import clientRoutes from './client.route'
import adminRoutes from './admin.route'

const routes = [
  ...clientRoutes,
  ...adminRoutes,
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router