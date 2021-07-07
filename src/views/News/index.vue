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
          medium
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
              v-model="date.startTime"
              type="date"
              :value-format="yyyy - MM - dd"
              :disabled-date="disabledDate"
              placeholder="選擇開始時間"
              format="YYYY 年 MM 月 DD 日"
            >
            </el-date-picker>
            --
            <el-date-picker
              v-model="date.endTime"
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
          <el-select v-model="sort.data.value" placeholder="選擇排序">
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

      <el-row :gutter="3">
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
              <h3 class="title">{{ item.title }}</h3>
              <br />
              <!-- <h2 v-html="queryHighlight(item.title)"></h2> -->
              <div class="content">
                <h4>{{ item.description.substring(0, 60) }} ...more</h4>
                <br />

                <el-button
                  type="text"
                  small
                  @click="readMore(item.publishedAt)"
                  >See Details</el-button
                >

                <div class="bottom">
                    <span v-if="item.author ">Author：{{ item.author }}</span>
                  <span>{{ item.publishedAt.substring(0, 10) }}</span>
                  <br />
                </div>
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
import { defineComponent, computed, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'News',
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

    const query = computed({
      get () {
        return store.getters.query
      },
      set (value) {
        store.commit('setcurrQuery', value)
      }
    })

    const date = computed({
      get () {
        return store.getters.date
      },
      set (value) {
        store.commit('setcurrDate', value)
        console.log(value)
      }
    })

    const sort = computed({
      get () {
        return store.getters.sort
      },
      set (value) {
        store.commit('setcurrSort', value)
      }
    })

    const currNewsId = computed({
      get () {
        return store.getters.currNewsId
      },
      set (value) {
        store.commit('setcurrNewsId', value)
      }
    })

    const pageSize = computed(() => store.getters.pageSize)
    const page = computed(() => store.getters.page)
    const pagedNewsData = computed(() => store.getters.pagedNewsData)

    const setPage = (val) => {
      store.commit('setPages', val)
    }

    watch(
      () => sort.value.data.value,
      (newValue) => {
        axios
          .get(
            `https://newsapi.org/v2/everything?q=${query.value}&pageSize=100&from=${date.value.startTime}&to=${date.value.endTime}&sortBy=${newValue}&apiKey=ee91784129d14f3aa19dd854211221a3`
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
              store.commit('setNews', res.data.articles)
            } else {
              console.log(res.data.message)
            }
          })
          .catch((error) => {
            console.log(error.data.message)
          })
      }
    )

    const disabledDate = (time) => {
      return time.getTime() > Date.now()
    }

    function convert (str) {
      const date = new Date(str)
      const mnth = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return [date.getFullYear(), mnth, day].join('-')
    }

    const selectDate = () => {
      if (!date.value.startTime || !date.value.endTime) {
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          icon: 'error',
          title: '請選擇時間區間'
        })
      } else {
        const startTime = convert(date.value.startTime)
        const endTime = convert(date.value.endTime)
        axios
          .get(
            `https://newsapi.org/v2/everything?q=${query.value}&pageSize=100&from=${startTime}&to=${endTime}&sortBy=${sort.value.value}&apiKey=ee91784129d14f3aa19dd854211221a3`
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
              store.commit('setNews', res.data.articles)
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
        return axios
          .get(
            `https://newsapi.org/v2/everything?q=${query.value}&pageSize=100&from=${date.value.startTime}&to=${date.value.endTime}&sortBy=${sort.value.value}&apiKey=ee91784129d14f3aa19dd854211221a3`
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
              store.commit('setNews', res.data.articles)
            } else {
              console.log(res.data.message)
            }
          })
          .catch((error) => {
            console.log(error.data.message)
          })
      }
    }

    const readMore = (idx) => {
      const id = idx
      console.log(id)
      store.commit('setcurrNewsId', id)
      router.push(`/${id}`)
    }

    const queryHighlight = computed((val) => {
      pagedNewsData.value.filter((d) => d.title.includes(query))
      return val.replace(
        new RegExp(query.value, 'g'),
        `<h2 class="keyword">${query.value}</h2>`
      )
    })

    return {
      isLoad,
      query,
      sort,
      date,
      readMore,
      disabledDate,
      selectDate,
      submitInput,
      pageSize,
      page,
      setPage,
      pagedNewsData,
      currNewsId,
      queryHighlight
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

.el-header {
  h1 {
    margin-top: 20px;
    font-size: 3rem;
  }
  > hr {
    max-width: 50px;
    border: solid 2px;
    margin: 1rem auto;
  }
}

.el-pagination {
  margin-top: 90px;
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
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 5px;
  overflow: hidden;
  &-img {
    width: 100%;
    height: 220px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .bottom{
    padding-top:30px;
    padding-bottom:30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}

.search-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1% 1%;
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
.keyword {
  color: rgb(255, 253, 127) !important;
}
</style>
