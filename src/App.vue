<template>
 <div class="load-box" v-show="!isLoad">
      <img class="load" src="@/assets/load.gif" />
        <br>
      <h3>Loading...</h3>
    </div>
  <router-view>
  </router-view>
</template>

<script>
import { onMounted, computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  components: {},
  setup () {
    const store = useStore()

    const isLoad = computed({
      get () {
        return store.getters.isLoad
      },
      set (value) {
        store.commit('setcurrIsLoad', value)
      }
    })

    const handImgLoad = (itemArr) => {
      let i = 0
      itemArr.forEach(img => {
        const imgs = new Image()
        imgs.src = img.urlToImage
        imgs.onload = () => {
          i++
          if (i >= 20) {
            store.dispatch('handLoadState', true)
          }
        }
      })
    }

    const init = () => {
      store.dispatch('fetchNews').then(res => {
        handImgLoad(res)
      })
    }

    onMounted(() => {
      init()
    })

    return {
      isLoad
    }
  }
}
</script>

<style lang="scss">
@import '@/style/basic.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.load-box {
  margin-top: 250px;
  .load {
    height: 150px;
    margin: auto 0;
  }
}
</style>
