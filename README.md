## 串接 News-API
- 新聞列表頁
  - 使用 Everything endpoint 進行串接
  - 能夠用關鍵字、時間區間搜尋新聞結果 (使用 q, from, to 參數)
  - 預設搜尋關鍵字為 COVID-19
  - 可以根據以下方式由高至低進行排序 (使用 sortBy 參數)
    -  相關度 relevancy
    -  人氣 popularity
    -  發布時間 publishedAt

- 新聞詳細頁

## 使用技術
  - Vue 3 - Vue.js
  - Vue CLI
  - Element-UI

## 使用套件
  - SweetAlert2

## 啟動方式

### install dependency
    npm install

### develop
    npm run serve
