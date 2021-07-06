<template>
  <el-container>
    <el-header>News-API</el-header>
    <el-main type="flex" justify="center">
      <el-row>
        <el-col
          :xl="{ span: 12, offset: 6 }"
          :lg="{ span: 12, offset: 6 }"
          :md="{ span: 16, offset: 4 }"
          :sm="{ span: 20, offset: 2 }"
          :xs="24"
          type="flex"
          justify="center"
        >
          <div class="search-box">
            <el-input
              type="text"
              class="search-bar"
              placeholder="請輸入關鍵字"
              v-model="query"
              @keypress="fetchNews"
            ></el-input>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :xl="{ span: 12, offset: 6 }"
          :lg="{ span: 12, offset: 6 }"
          :md="{ span: 16, offset: 4 }"
          :sm="{ span: 20, offset: 2 }"
          :xs="24"
          v-for="(item, idx) in news.data"
          :key="item"
          :offset="idx > 0 ? 2 : 0"
        >
          <el-card>
            <img :src="item.urlToImage" class="image" />
            <div style="padding: 14px">
              <span>好吃的汉堡</span>
              <div class="bottom">
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer><h4>Copyright 2021 all rights reserved</h4></el-footer>
  </el-container>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'Home',
  setup () {
    const apikey = ref('fb7bf8e352b7410a9f7cb203282ea1af')
    const url = ref('https://newsapi.org/v2/')
    const query = ref('COVID-19')
    const sort = ref('popularity')
    const news = reactive({ data: {} })

    onMounted(() => {
      fetchNews()
    })

    const fetchNews = () => {
      axios
        .get(
          `${url.value}everything?q=${query.value}&from=2021-07-04&to=2021-07-04&sortBy=${sort.value}&apiKey=${apikey.value}`
        )
        .then((res) => {
          news.data = res.data.articles
          console.log(news)
        })
    }

    return { apikey, url, query, sort, news, fetchNews }
  }
}
</script>
