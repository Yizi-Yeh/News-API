<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <el-row v-show="isLoad">
        <el-col>
          <h2>{{ currNews.title }}</h2>
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
import { useRoute } from 'vue-router'

export default {
  name: 'NewsId',
  setup () {
    const route = useRoute()
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

    return {
      isLoad,
      apikey,
      url,
      news,
      fetchNews,
      currNews
    }
  }
}
</script>
