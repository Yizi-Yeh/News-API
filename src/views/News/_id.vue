<template>
  <el-container v-if="currNews">
    <el-main>
      <div class="top">
        <div class="left">
          <el-row>
            <el-col>
              <el-header class="header">
                <el-page-header
                  @back="goBack"
                  content="News Detail"
                  style="font-family:'EB Garamond"
                >
                </el-page-header>
              </el-header>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <h1 class="title">{{ currNews.title }}</h1></el-col
            >
            <el-col>
              <p class="author">Author：{{ currNews.author }}</p></el-col
            >
            <el-col
              ><p class="source">Source：{{ currNews.source.name }}</p></el-col
            >
            <el-col
              ><p class="publishedAt">
                PublishedAt：{{ currNews.publishedAt.substring(10, 0) }}
              </p></el-col
            >
          </el-row>
        </div>

        <div class="right">
          <el-row>
            <el-col>
              <img :src="currNews.urlToImage" class="main-img" />
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="bottom">
        <div class="content">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col class="main-content">
              <h3>{{ currNews.content }}</h3>
              <br />
              <h3 class="readDetail" @click="readDetail(currNews.url)">
                Readmore
              </h3>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { emitter } from '@/utils/mitt'

export default {
  name: 'NewsId',
  setup () {
    const router = useRouter()
    const store = useStore()
    const isMobile = ref(false)

    emitter.on('isMobile', (item) => {
      isMobile.value = item
      console.log('isMobile', item)
    })

    const isLoad = computed({
      get () {
        return store.getters.isLoad
      },
      set (value) {
        store.commit('setcurrIsLoad', value)
      }
    })

    const currNews = computed(() => store.getters.currNews)

    const goBack = () => {
      router.go(-1)
    }

    const readDetail = (idx) => {
      const id = idx
      console.log(id)
      window.open(id)
    }

    return {
      isLoad,
      currNews,
      goBack,
      readDetail
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/basic.scss";
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  font-size: 16px;
}
.el-container {
  padding-left: 100px;
  padding-right: 100px;
}
.top {
  padding-top: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: auto;
  margin-right: auto;
  padding-left: 100px;
  width: auto;
  .left {
    width: 35%;
    height: 500px;
    text-align: left;
    p {
      font-style: normal;
      font-size: $text-font-lg;
      letter-spacing: 0.03em;
      line-height: 25px;
      margin-bottom: 2rem;
    }
    .title {
      margin-top: 4rem;
      letter-spacing: normal;
      font-weight: bolder;
      margin-bottom: 2rem;
    }
    .author {
      margin-bottom: 2rem;
    }
    .source {
      margin-bottom: 2rem;
    }
    .publishedAt {
      margin-bottom: 2rem;
    }
  }
  .right {
    width: 60%;
    height: inherit;
    .main-img {
      object-fit: cover;
      height: 500px;
      margin-bottom: 60px;
      width: 100%;
      max-width: 830px;
    }
  }
}

.bottom {
  .readDetail {
    &:hover {
      cursor: pointer;
      filter: opacity(50%);
      transition: 0.3s;
    }
  }
}

.h1,
.h2,
.h3,
.h4,
h1,
h2,
h3,
h4,
p {
  font-family: "EB Garamond", serif;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.03em;
  line-height: 28px;
}
@media screen and (min-width: 320px) and (max-width: 820px) {
  .el-container {
    padding-left: 0px;
    padding-right: 0px;
  }
  .el-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px;
    .top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      width: 100vw;
      padding-top: 30px;
      padding-left: 30px;
      padding-right: 30px;
      max-width: 750px;
      .left {
        width: 100%;
        height: 300px;
        text-align: left;
        p {
          font-style: normal;
          font-size: $text-font-sm;
          letter-spacing: 0.03em;
          line-height: 25px;
          margin-bottom: 2rem;
        }
        .title {
          margin-top: 1rem;
          letter-spacing: normal;
          font-weight: bolder;
          margin-bottom: 1rem;
        }
        .author {
          margin-bottom: 1rem;
        }
        .source {
          margin-bottom: 1rem;
        }
        .publishedAt {
          margin-bottom: 1rem;
        }
      }
      .right {
        width: 100%;
        height: inherit;
        .main-img {
          margin-top: 2rem;
          object-fit: cover;
          height: auto;
          width: 100%;
          max-width: 320px;
        }
      }
    }
    .bottom {
      padding-left: 30px;
      padding-right: 30px;
      text-align: left;
    }
  }
}
</style>
