<template>
  <el-container v-show="isLoad">
    <br />
    <el-header><h1 class="title">News API</h1></el-header>
    <el-row>
      <el-col>
        <el-pagination
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
              style="font-family:'EB Garamond"
              icon="search"
              type="text"
              placeholder="Search News"
              v-model="query"
              @blur="blurSearchFor"
              v-focus="blurFocus"
            ></el-input>
            <el-button
              type="info"
              size="medium"
              icon="search"
              @click="submitInput()"
              >Search</el-button
            >
          </div>
        </el-col>

        <el-col :lg="10" :md="12" :sm="12" :xs="24">
          <div class="block">
            <el-date-picker
              style="font-family:'EB Garamond"
              v-model="date.startTime"
              type="date"
              :value-format="yyyy - MM - dd"
              :disabled-date="disabledDate"
              placeholder="Select StartTime"
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
              placeholder="Select EndTime"
            >
            </el-date-picker>
            <el-button
              type="info"
              size="medium"
              icon="search"
              @click="selectDate()"
              >Search</el-button
            >
          </div>
        </el-col>

        <el-col :lg="4" :md="6" :sm="6" :xs="24">
          <el-select style="font-family:'EB Garamond" v-model="sort.data.value" placeholder="Sort News">
            <el-option
              style="font-family:'EB Garamond"
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
          <el-card class="card" @click="readMore(item.publishedAt)">
            <div class="top">
              <h3>{{ item.publishedAt.substring(0, 10) }}</h3>
            </div>
            <img :src="item.urlToImage" class="card-img" />
            <div style="padding: 10px">
              <div class="title">
                <h3>{{ item.title.substring(0, 60)}} ... </h3>
              </div>
              <div class="content">
                <h4>{{ item.description.substring(0, 80) }} ...more</h4>
              </div>
              <div class="bottom">
                <h4>Author：{{ item.author ? item.author : "none" }}</h4>
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
import { useKeypress } from 'vue3-keypress'
const apikey = '68a7a15d851d4a768b93e97ddaca25bd'

export default defineComponent({
  name: 'News',
  setup () {
    const router = useRouter()
    const store = useStore()

    const someSuccessCallback = ({ keyCode }) => {
      submitInput()
    }

    useKeypress({
      keyEvent: 'keypress',
      keyBinds: [
        {
          keyCode: 'enter',
          success: someSuccessCallback
        }
      ]
    })

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
            `https://newsapi.org/v2/everything?q=${query.value}&pageSize=100&from=${date.value.startTime}&to=${date.value.endTime}&sortBy=${newValue}&apiKey=${apikey}`
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
            console.log(error)
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
            `https://newsapi.org/v2/everything?q=${query.value}&pageSize=100&from=${startTime}&to=${endTime}&sortBy=${sort.value.value}&apiKey=${apikey}`
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
              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1000,
                icon: 'error',
                title: '篩選失敗',
                text: res.data.message
              })
            }
          })
          .catch((error) => {
            console.log(error)
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
            `https://newsapi.org/v2/everything?q=${query.value}&pageSize=100&from=${date.value.startTime}&to=${date.value.endTime}&sortBy=${sort.value.value}&apiKey=${apikey}`
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
            console.log(error)
          })
      }
    }

    const readMore = (idx) => {
      const id = idx
      console.log(id)
      store.commit('setcurrNewsId', id)
      router.push(`/${id}`)
    }

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
      currNewsId
    }
  }
})
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.h1,
.h2,
.h3,
.h4,
.input,
h1,
h2,
h3,
h4,
input {
  font-family: "EB Garamond", serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 28px;
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
.el-input__inner {
  border-radius: 0px;
  margin-bottom: 3rem;
}

.el-button {
  font-family: "EB Garamond", serif;
  border: transparent;
  width: auto;
  &:hover {
    transition-duration: 0.5s;
  }
}
.el-card__body {
  padding-top: 10px;
  padding-bottom: 5px;
}
.el-pagination {
  font-family: "EB Garamond", serif;
  margin-top: 3rem;
}

.card {
  font-family: AGaramondPro-Regular, sans-serif;
  position: relative;
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
  &:hover {
    cursor: pointer;
  }
  .top {
    float: left;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.3rem;
    text-align: left;
    margin-top: 1rem;
    margin-bottom: 2rem;
    color: #000305;
    line-height: 1.4rem;
  }
  .content {
    text-align: left;
  }
  .bottom {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  &-img {
    width: 100%;
    height: 220px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &:hover {
      filter: opacity(40%);
      transition: 0.3s ease;
    }
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
