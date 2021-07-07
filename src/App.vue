<template>
  <News/>
  <NewsId/>
</template>

<script>
import News from './views/News/index.vue'
import NewsId from './views/News/_id.vue'

export default {
  components: {
    News, NewsId
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
