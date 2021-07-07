<template>
  <el-container v-if="currNews">
    <el-header>
      <el-page-header @back="goBack" content="News Detail"> </el-page-header>
    </el-header>
    <el-main>
      <el-row>
        <el-col>
          <img :src="currNews.urlToImage" alt="" />
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h1>{{ currNews.title }}</h1>
          <br />
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h2>{{ currNews.content }}</h2>
          <br />
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h1>author：{{ currNews.author }}</h1>
          <br />
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h4>publishedAt：{{ currNews.publishedAt }}</h4>
          <br />
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h4>source：{{ currNews.source.name }}</h4>
          <br />
        </el-col>
      </el-row>
    </el-main>
    <el-footer><h4>Copyright 2021 all rights reserved</h4></el-footer>
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
