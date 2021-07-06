import { createRouter, createWebHashHistory } from 'vue-router'
import News from '../views/News/index.vue'

const routes = [
  {
    path: '/',
    name: 'News',
    component: News
  },
  {
    path: '/:id',
    name: 'News_id',
    component: () => import('../views/News/_id.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
