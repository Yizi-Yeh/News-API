import { createRouter, createWebHashHistory } from 'vue-router'
import News from '../views/News/index.vue'
import NewsId from '../views/News/_id.vue'

const routes = [
  {
    path: '/',
    name: 'News',
    component: News
  },
  {
    path: '/:id',
    name: 'NewsId',
    component: NewsId
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
