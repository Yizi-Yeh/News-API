<template>
  <div class="home"></div>
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
    let news = reactive({})

    onMounted(() => {
      fetchNews()
    })

    const fetchNews = () => {
      axios
        .get(
          `${url.value}everything?q=${query.value}&from=2021-07-04&to=2021-07-04&sortBy=${sort.value}&apiKey=${apikey.value}`
        )
        .then((res) => {
          news = res.data
        })
    }

    return { apikey, url, query, sort, news, fetchNews }
  }
}
</script>
