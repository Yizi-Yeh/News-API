<template>
  <el-container v-if="currNews">
    <el-header>
      <el-page-header @back="goBack" content="新聞詳細內容"> </el-page-header>
    </el-header>
    <el-main>
      <el-row>
        <el-col>
          <img :src="currNews.urlToImage" alt="">
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h1>{{ currNews.title }}</h1>
          <br>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h1>author：{{ currNews.author }}</h1>
          <br>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h2>{{ currNews.content }}</h2>
          <br>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h4>publishedAt：{{ currNews.publishedAt }}</h4>
          <br>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <h4>source：{{ currNews.source.name }}</h4>
          <br>
        </el-col>
      </el-row>

    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
import { reactive, ref, computed } from 'vue'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'NewsId',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const isLoad = ref(false)
    const apikey = ref('68a7a15d851d4a768b93e97ddaca25bd')
    const url = ref('https://newsapi.org/v2/')
    const news = reactive({ data: [] })

    const sort = reactive({
      data: [
        {
          value: 'publishedAt',
          label: '發布時間 publishedAt'
        },
        {
          value: 'relevancy',
          label: '相關度 relevancy'
        },
        {
          value: 'popularity',
          label: '人氣 popularity'
        }
      ],
      value: ''
    })

    onMounted(() => {
      fetchNews()
      console.log(currNews)
    })

    const currNews = computed(() => {
      const id = route.params.id
      console.log(id)
      return news.data.filter((d) => d.publishedAt === id)[0]
    })
    const fetchNews = () => {
      axios
        .get(
          `${url.value}everything?q=COVID-19&pageSize=100&from=2021-07-04&to=2021-07-06&sortBy=${sort.data.value}&apiKey=${apikey.value}`
        )
        .then((res) => {
          if (res.data.status) {
            isLoad.value = true
            news.data = res.data.articles
            console.log(news.data)
          } else {
            console.log(res.data.message)
          }
        })
        .catch((error) => {
          console.log(error.data.message)
        })
    }

    const goBack = () => {
      router.go(-1)
    }

    return {
      isLoad,
      apikey,
      url,
      news,
      fetchNews,
      currNews,
      goBack
    }
  }
}
</script>
