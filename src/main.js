import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import './scss/theme-chalk/index.css'

const app = createApp(App)
app.directive('focus', {
  // 在 directive中為mounted
  // mounted 會回傳 dom(el)
  mounted (el) {
  // 回傳掛載元素
    el.children[0].focus()
    console.log(el)
  }
})
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(VueAxios, axios)
  .mount('#app')
