<template>
  <router-view></router-view>
</template>

<script>
import { onMounted, computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  components: {
  },
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

    const init = () => {
      store.dispatch('fetchNews').then(store.commit('setcurrIsLoad', true))
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
