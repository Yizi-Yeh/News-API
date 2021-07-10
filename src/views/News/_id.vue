<template>
  <el-container v-if="currNews">
    <el-header class="header">
      <el-page-header @back="goBack" content="News Detail"> </el-page-header>
    </el-header>
    <el-main>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col class="main-title">
          <h1>{{ currNews.title }}</h1>
          <br>
          <img :src="currNews.urlToImage" class="main-img" />
        </el-col>
      </el-row>

      <el-row
        v-if="currNews.author"
        type="flex"
        class="row-bg"
        justify="center"
      >
        <el-col>
          <h3>Author：{{ currNews.author }}</h3>
        </el-col>
      </el-row>
      <br />

      <el-row type="flex" class="row-bg" justify="center">
        <el-col>
          <hr />

          <br />
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col class="main-content">
          <h3>{{ currNews.content }}</h3>
          <br />
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col class="main-footer">
          <h4>Source：{{ currNews.source.name }}</h4>
          <h4>PublishedAt：{{ currNews.publishedAt }}</h4>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'NewsId',
  setup () {
    const router = useRouter()
    const store = useStore()

    const isLoad = computed({
      get () {
        return store.getters.isLoad
      },
      set (value) {
        store.commit('setcurrIsLoad', value)
      }
    })

    const currNews = computed(() => store.getters.currNews)

    const goBack = () => {
      router.go(-1)
    }

    return {
      isLoad,
      currNews,
      goBack
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.h1,
.h2,
.h3,
.h4,
h1,
h2,
h3,
h4 {
  font-family: "EB Garamond", serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 28px;
}
.header {
  padding-top: 50px;
  padding-left: 100px;
  padding-bottom: 50px;
  font-size: 1rem;
}
.main-content {
  max-width: 640px;
}
.main-title {
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  .main-img {
    max-width: 900px;
    height: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
.main-footer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  max-width: 900px;
}
hr {
  max-width: 30px;
  border: solid 2px;
  margin: 0.5rem auto;
}
</style>
