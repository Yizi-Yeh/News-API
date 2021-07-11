import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import './scss/theme-chalk/index.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App)
app.directive('focus', {
  mounted (el) {
    el.querySelector('input').focus()
  }
})
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(VueSweetalert2)
  .use(VueAxios, axios)
  .use(VueLazyLoad, {
    loading: () => {
      console.log('loading')
    },
    error: () => {
      console.log('error')
    },
    loaded: () => {
      console.log('loaded')
    }
  })
  .mount('#app')
