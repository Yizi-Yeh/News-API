import axios from 'axios'

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1
const date = currentDate.getDate()
const Now = `${year}-${month}-${date}`
const daysAgo = 2
const fromDaysAgo = `${year}-${month}-${(date - daysAgo)}`

const apikey = '68a7a15d851d4a768b93e97ddaca25bd'

const NewsRequest = axios.create({
  baseURL: 'https://newsapi.org/v2/'
})

export const getNewsRequest = () => NewsRequest.get(`everything?q=COVID-19&pageSize=100&from=${fromDaysAgo}&to=${Now}&sortBy=publishedAt&apiKey=${apikey}`)
