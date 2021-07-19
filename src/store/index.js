import { createStore } from 'vuex'
// import axios from 'axios'
import { apiGetNewsRequest } from '../api/index'

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1
const date = currentDate.getDate()
const Now = `${year}-${month}-${date}`
const daysAgo = 2
const fromDaysAgo = `${year}-${month}-${(date - daysAgo)}`

// const apikey = '68a7a15d851d4a768b93e97ddaca25bd'

export default createStore({
  state: {
    isLoad: false,
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
           'publishedAt'
        },
        {
          value: 'relevancy',
          label: 'relevancy'
        },
        {
          value: 'popularity',
          label: 'popularity'
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
    setcurrIsLoad (state, bool) {
      state.isLoad = bool
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
    },
    setcurrNewsId (state, payload) {
      state.currNewsId = payload
    }
  },
  actions: {
    // 取得新聞資料
    fetchNews ({ commit }) {
      const res = apiGetNewsRequest()
      return res.then(response => {
        commit('setNews', response.data.articles)
        return response.data.articles
      })
      // return axios
      //   .get(
      //     `https://newsapi.org/v2/everything?q=COVID-19&pageSize=100&from=${fromDaysAgo}&to=${Now}&sortBy=publishedAt&apiKey=${apikey}`
      //   )
      //   .then((res) => {
      //     commit('setNews', res.data.articles)
      //     return res.data.articles
      //   }).catch((error) => {
      //     console.log(error)
      //   })
    },
    handLoadState ({ commit }, bool) {
      commit('setcurrIsLoad', bool)
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
