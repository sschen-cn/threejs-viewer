import { createRouter, createWebHistory } from 'vue-router'
import dataCenter from '../view/data-center.vue'

const routes = [
  {
    path: '/',
    redirect: '/data-center',
  },
  {
    path: '/data-center',
    name: 'data-center',
    component: dataCenter,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
