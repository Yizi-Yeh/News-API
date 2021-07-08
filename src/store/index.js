import { createStore } from 'vuex'
import axios from 'axios'

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1
const date = currentDate.getDate()
const Now = `${year}-${month}-${date}`
const daysAgo = 2
const fromDaysAgo = `${year}-${month}-${(date - daysAgo)}`

const apikey = '68a7a15d851d4a768b93e97ddaca25bd'

export default createStore({
  state: {
    isLoad: 'false',
    // 關鍵字參數:預設為COVID-19
    query: 'COVID-19',
    date: {
      startTime: fromDaysAgo,
      endTime: Now
    },
    sort: {
      data: [
        {
          value: 'publishedAt',
          label:
           '發布時間 publishedAt'
        },
        {
          value: 'relevancy',
          label: '相關度 relevancy'
        },
        {
          value: 'popularity',
          label: '人氣 popularity'
        }],
      value: ''
    },
    pageSize: 20,
    page: 1,
    // 存放API回傳的新聞資訊
    news: [],
    currNewsId: null

  },
  mutations: {
    setcurrIsLoad (state, payload) {
      console.log(payload)
      state.isLoad = payload
    },
    setcurrQuery (state, payload) {
      state.query = payload
    },
    setcurrDate (state, payload) {
      state.date = payload
    },
    setcurrSort (state, payload) {
      state.sort = payload
    },
    setNews (state, payload) {
      state.news = payload
    },
    setPages (state, payload) {
      state.page = payload
      console.log(payload)
    },
    setcurrNewsId (state, payload) {
      console.log(payload)
      state.currNewsId = payload
    }
  },
  actions: {
    // 取得新聞資料
    fetchNews ({ commit }) {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=COVID-19&pageSize=100&from=${fromDaysAgo}&to=${Now}&sortBy=publishedAt&apiKey=${apikey}`
        )
        .then((res) => {
          commit('setNews', res.data.articles)
        }).catch((error) => {
          console.log(error.data.message)
        })
    }
  },
  getters: {
    isLoad (state) {
      return state.isLoad
    },
    query (state) {
      return state.query
    },
    date (state) {
      return state.date
    },
    sort (state) {
      return state.sort
    },
    news (state) {
      return state.news
    },
    pageSize (state) {
      return state.pageSize
    },
    page (state) {
      return state.page
    },
    pagedNewsData (state) {
      return state.news.slice(
        state.pageSize * state.page - state.pageSize,
        state.pageSize * state.page)
    },
    currNewsId (state) {
      return state.currNewsId
    },
    currNews (state) {
      const { news } = state
      return news.filter((item) => item.publishedAt === state.currNewsId)[0]
    }

  }
})
