<template>
  <div class="load-box" v-show="!isLoad">
    <img class="load" src="@/assets/load.gif" />
  </div>
  <el-container v-show="isLoad">

    <el-header
      ><h1 class="title">News API</h1>
      <hr
    /></el-header>

    <el-row>
      <el-col>
        <el-pagination
          small
          layout="prev, pager, next"
          :total="50"
          @current-change="setPage"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <el-main>
      <el-row class="search-wrapper" :gutter="5">
        <el-col :lg="6" :md="8" :sm="12" :xs="24" justify="center">
          <div class="block">
            <el-input
              v-focus
              icon="search"
              type="text"
              placeholder="請輸入關鍵字"
              v-model="query"
              @keypress="fetchNews"
            ></el-input>
            <el-button
              type="primary"
              size="medium"
              icon="search"
              @click="submitInput()"
              >查詢</el-button
            >
          </div>
        </el-col>

        <el-col :lg="10" :md="12" :sm="12" :xs="24">
          <div class="block">
            <el-date-picker
              v-model="date.data.startTime"
              type="date"
              :value-format="yyyy - MM - dd"
              :disabled-date="disabledDate"
              placeholder="選擇開始時間"
              format="YYYY 年 MM 月 DD 日"
            >
            </el-date-picker>
            --
            <el-date-picker
              v-model="date.data.endTime"
              type="date"
              :value-format="yyyy - MM - dd"
              :disabled-date="disabledDate"
              format="YYYY 年 MM 月 DD 日"
              placeholder="選擇結束時間"
            >
            </el-date-picker>
            <el-button
              type="primary"
              size="medium"
              icon="search"
              @click="selectDate()"
              >篩選</el-button
            >
          </div>
        </el-col>

        <el-col :lg="4" :md="6" :sm="6" :xs="24">
          <el-select v-model="sort.data.value" placeholder="排序">
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
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          v-for="item in pagedNewsData"
          :key="item"
        >
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
                <el-button type="text" @click="readMore(item.publishedAt)"
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
import { defineComponent, reactive, ref, watch, computed } from 'vue'
import axios from 'axios'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default defineComponent({
  name: 'News',
  setup () {
    const router = useRouter()
    const isLoad = ref(false)
    const apikey = ref('68a7a15d851d4a768b93e97ddaca25bd')
    const url = ref('https://newsapi.org/v2/')
    const query = ref('COVID-19')
    const date = reactive({
      data: {
        startTime: '',
        endTime: ''
      }
    })

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

    const news = reactive({ data: [] })

    const page = ref(1)
    const pageSize = ref(20)
    const setPage = (val) => {
      page.value = val
    }
    const pagedNewsData = computed(() => {
      return news.data.slice(
        pageSize.value * page.value - pageSize.value,
        pageSize.value * page.value
      )
    })

    watch(
      () => sort.data.value,
      (newValue) => {
        axios
          .get(
            `${url.value}everything?q=${query.value}&pageSize=100&from=2021-07-04&to=2021-07-06&sortBy=${newValue}&apiKey=${apikey.value}`
          )
          .then((res) => {
            if (res.data.status) {
              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1000,
                icon: 'success',
                title: '篩選成功'
              })
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
    )

    onMounted(() => {
      fetchNews()
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

    const disabledDate = (time) => {
      return time.getTime() > Date.now()
    }

    const selectDate = () => {
      if (!date.data.startTime || !date.data.endTime) {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          icon: 'error',
          title: '請選擇時間區間'
        })
      } else {
        const startTime = convert(date.data.startTime)
        const endTime = convert(date.data.endTime)
        axios
          .get(
            `${url.value}everything?q=COVID-19&pageSize=100&from=${startTime}&to=${endTime}&sortBy=${sort.data.value}&apiKey=${apikey.value}`
          )
          .then((res) => {
            if (res.data.status) {
              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1000,
                icon: 'success',
                title: '篩選成功'
              })
              news.data = res.data.articles
              console.log(startTime)
              console.log(endTime)
            } else {
              console.log(res.data.message)
            }
          })
          .catch((error) => {
            console.log(error.data.message)
          })
      }
    }

    const submitInput = () => {
      if (!query.value) {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          icon: 'error',
          title: '請輸入關鍵字'
        })
      } else {
        const startTime = convert(date.data.startTime)
        const endTime = convert(date.data.endTime)
        axios
          .get(
            `${url.value}everything?q=${query.value}&pageSize=100&from=${startTime}&to=${endTime}&sortBy=${sort.data.value}&apiKey=${apikey.value}`
          )
          .then((res) => {
            if (res.data.status) {
              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1000,
                icon: 'success',
                title: '查詢成功'
              })
              news.data = res.data.articles
              console.log(query.value)
            } else {
              console.log(res.data.message)
            }
          })
          .catch((error) => {
            console.log(error.data.message)
          })
      }
    }

    function convert (str) {
      const date = new Date(str)
      const mnth = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return [date.getFullYear(), mnth, day].join('-')
    }

    const readMore = (idx) => {
      const startTime = convert(date.data.startTime)
      const endTime = convert(date.data.endTime)
      axios
        .get(
          `${url.value}everything?q=${query.value}&pageSize=100&from=${startTime}&to=${endTime}&sortBy=${sort.data.value}&apiKey=${apikey.value}`
        )
        .then((res) => {
          if (res.data.status) {
            console.log(res.data)
            router.push(`/${idx}`)
          }
        })
    }

    return {
      isLoad,
      apikey,
      url,
      query,
      sort,
      news,
      date,
      fetchNews,
      readMore,
      disabledDate,
      selectDate,
      submitInput,
      pageSize,
      page,
      setPage,
      pagedNewsData
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

.load-box {
  margin-top: 250px;
  .load {
    height: 150px;
    margin: auto 0;
  }
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

.search-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 2% 0;
  .block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px;
    .el-button {
      margin: 3%;
      padding: 10px;
    }
  }
}
</style>
