<template>
  <img v-show="!isLoad" class="load" src="@/assets/load.gif" alt="" />
  <el-container v-show="isLoad">
    <el-header
      ><h1 class="title">News API</h1>
      <hr />
      <br
    /></el-header>
    <el-main>
      <el-row class="search-wrapper" :gutter="10">
        <el-col :lg="8" :md="12" :sm="12" :xs="24">
          <el-input
            icon="search"
            type="text"
            placeholder="請輸入關鍵字"
            v-model="query"
            @keypress="fetchNews"
          ></el-input>
        </el-col>

        <div class="block">
          <el-date-picker
            v-model="value2"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
            :shortcuts="shortcuts"
          >
          </el-date-picker>
        </div>

        <el-col :lg="6" :md="6" :sm="6" :xs="24">
          <el-select v-model="sort.data.value" placeholder="Sort by">
            <el-option
              v-for="item in sort.data"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="2">
        <el-col :xs="24" :sm="12" :md="8" v-for="item in news.data" :key="item">
          <el-card class="card">
            <img :src="item.urlToImage" class="card-img" />
            <div style="padding: 14px">
              <h2 class="title">{{ item.title }}</h2>
              <div class="content">
                <h3>{{ item.description.substring(0, 60) }}...</h3>
                <span>{{ item.publishedAt }}</span>
                <br />
                <span>author：{{ item.author }}</span>
              </div>
              <div class="bottom">
                <el-button type="text" class="button" @click="readMore"
                  >查看更多</el-button
                >
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
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'News',
  setup () {
    const router = useRouter()
    const isLoad = ref(false)
    const apikey = ref('fb7bf8e352b7410a9f7cb203282ea1af')
    const url = ref('https://newsapi.org/v2/')

    const sort = reactive({
      data: [
        {
          value: 'relevancy',
          label: '相關度 relevancy'
        },
        {
          value: 'popularity',
          label: '人氣 popularity'
        },
        {
          value: 'publishedAt',
          label: '發布時間 publishedAt'
        }
      ],
      value: ''
    })
    const query = ref('COVID-19')
    const news = reactive({ data: {} })

    const state = reactive({
      shortcuts: [
        {
          text: '最近一週',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          })()
        },
        {
          text: '最近一個月',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          })()
        },
        {
          text: '最近三個月',
          value: (() => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          })()
        }
      ],
      value2: ''
    })

    watch(() => sort.data.value, (newValue) => {
      isLoad.value = false
      axios
        .get(
          `${url.value}everything?q=${query.value}&from=2021-07-04&to=2021-07-06&sortBy=${newValue}&apiKey=${apikey.value}`
        ).then((res) => {
          if (res.data.status) {
            isLoad.value = true
            news.data = res.data.articles
            console.log(news)
          } else {
            console.log(res.data.message)
          }
        }).catch((error) => {
          console.log(error.data.message)
        })
    })

    onMounted(() => {
      fetchNews()
    })

    const fetchNews = () => {
      axios
        .get(
          `${url.value}everything?q=${query.value}&from=2021-07-04&to=2021-07-06&sortBy=${sort.data.value}&apiKey=${apikey.value}`
        )
        .then((res) => {
          if (res.data.status) {
            isLoad.value = true
            news.data = res.data.articles
            console.log(news)
          } else {
            console.log(res.data.message)
          }
        })
        .catch((error) => {
          console.log(error.data.message)
        })
    }

    const readMore = () => {
      router.push('/213')
    }

    return {
      isLoad,
      apikey,
      url,
      query,
      sort,
      news,
      fetchNews,
      readMore,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
hr {
  max-width: 50px;
  border: solid 2px;
  margin: 0 auto;
}

.search-wrapper {
  margin: 10px 0;
}

.card {
  flex-basis: 550px;
  flex-shrink: 0;
  display: flex;
  width: auto;
  height: 550px;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-right: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  &-img {
    width: 100%;
    height: 220px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
</style>
