<template>
  <div class="result-container">
    <div class="list-header">
      <h1></h1>
      <!-- <div v-if="$store.state.movie.isLoading" class="loader"></div>
      <div v-else> -->
      <!-- <div v-if="!isLoading && !totalresult" class="movie-result">
        검색된 영화가 없습니다. 다시 입력해주세요.
      </div> -->
      <div class="search-results-find">
        검색결과: {{ getUserCity }}/{{ getUserCounty }}/{{ getdetailAddress }}
      </div>

      <button class="movie-movehome" @click="$router.push({ name: 'Home' })">
        메인화면으로
      </button>
    </div>
    <div class="movie-result">
      <ul class="movie-result-list">
        <li v-for="i in getPostListData" :key="i">
          <div class="movie-result-list-item">
            <div class="image">
              <template v-if="i.image === undefined">
                <img
                  class="movie-result-poster"
                  src="../assets/images/not-found.png"
                  alt=""
                />
              </template>
              <template v-else>
                <img class="movie-result-poster" :src="`${i.image}`" />
              </template>
            </div>
            <div class="movie-result-title">{{ i.title }}</div>
            <div class="movie-result-location">{{ i.location }}</div>
            <div class="movie-result-like">❤+{{ i.likes.length }}</div>
            <div class="movie-result-comment">
              댓글📃+{{ i.comments.length }}
            </div>
            <div class="movie-result-author">
              글쓴이:{{ i.author.fullName }}
            </div>
            <div class="movie-result-author">
              {{ timeForToday(i.createdAt) }}
            </div>

            <button
              class="movie-result-moreinfobutton"
              @click="
                $router.push({
                  name: 'MoreInfo',
                  params: {
                    postId: i.imdbID,
                  },
                })
              "
            >
              상세보기
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  getAuth,
  createPost,
  channelsList,
  createChannel,
  channelPostList,
} from '../api/index'
import Button from '~/components/designs/Button'
export default {
  data() {
    return {
      searchCity: '',
      searchCounty: '',
      deatailAddress: '',
      channelId: '',
      postList: [],
      Title: '',
    }
  },
  computed: {
    getUserCity() {
      return this.$store.getters['address/getUserCity']
    },
    getUserCounty() {
      return this.$store.getters['address/getUserCounty']
    },
    getdetailAddress() {
      return this.$store.getters['address/getdetailAddress']
    },
    getSearchChannelId() {
      return this.$store.getters['address/getSearchChannelId']
    },
    getPostListData() {
      console.log(this.$store.getters['address/getPostListData'])
      return this.$store.getters['address/getPostListData']
    },
    getLikeData() {
      let likeCount = this.$store.getters['address/getPostListData'].map(
        x => x.likes,
      )
      console.log(likeCount)
      return likeCount.length
    },
  },
  mounted() {
    // this.searchCity = this.getUserCity()
    // this.searchCity = this.$store.getters['address/getUserCity']
    // this.searchCounty = this.$store.getters['address/getUserCounty']
    // this.channelId = this.$store.getters['address/getSearchChannelId']
    // this.deatailAddress = this.$store.getters['address/getdetailAddress']
    // const poaslist = this.$store.getters['address/getPostListData']
  },
  async created() {
    // this.searchCity = this.$store.getters['address/getUserCity']
    // this.searchCounty = this.$store.getters['address/getUserCounty']
    // this.channelId = this.$store.getters['address/getSearchChannelId']
    // this.deatailAddress = this.$store.getters['address/getdetailAddress']
    // const postListdata = await channelPostList(this.channelId)
    // this.postList = postListdata.data
    // console.log(this.postList)
  },
  methods: {
    parseTitleContent() {
      const data = this.$store.getters['address/getPostListData']
      const titledata = data.map(x => x.title)
      const titleList = []
      console.log(titledata)
      for (let i in titledata) {
        let titlestr = titledata[i]
        titleList.push(titlestr.split('/')[0])
      }
      console.log(titleList)

      return titleList
    },
    timeForToday(value) {
      const today = new Date()
      const timeValue = new Date(value)

      const betweenTime = Math.floor(
        (today.getTime() - timeValue.getTime()) / 1000 / 60,
      )
      if (betweenTime < 1) return '방금전'
      if (betweenTime < 60) {
        return `${betweenTime}분전`
      }

      const betweenTimeHour = Math.floor(betweenTime / 60)
      if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`
      }

      const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
      if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`
      }

      return `${Math.floor(betweenTimeDay / 365)}년전`
    },
  },
}
</script>
<style lang="scss" scoped>
.result-container {
  @include flexbox;
  width: 100vw;
  height: 100vh;

  h1 {
    padding-top: 20px;
    margin: 0px;
    color: black;
    border-bottom: solid black;
  }

  .loader {
  }

  .movie-result {
    font-size: 30px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .movie-rusult-find {
    font-size: 20px;
    padding: 10px;

    .nav-page {
      .nav-page-prev {
        font-size: 20px;
        border: none;

        &:hover {
          color: red;
        }
      }

      .nav-page-next {
        margin-left: 20px;
        font-size: 20px;
        border: none;

        &:hover {
          color: red;
        }
      }
    }
  }

  .movie-movehome {
    margin-left: 10px;
    font-size: 20px;
    border: none;

    &:hover {
      color: royalblue;
    }
  }

  .movie-result-list {
    display: grid;
    align-items: center;
    justify-content: center;
    text-align: center;
    grid-template-columns: repeat(5, 1fr);
    gap: 3px;
    margin-top: 20px;
    padding-inline: 100px;

    li {
      margin: 10px;
      text-align: right;
      list-style: none;

      .movie-result-list-item {
        text-align: center;
      }

      .movie-result-poster {
        width: 200px;
        height: 250px;
      }
      .movie-result-title {
        margin-left: 30px;
        width: 200px;
        font-size: 20px;
        min-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .movie-result-moreinfobutton {
        font-size: 30px;
        border: none;

        &:hover {
          border-bottom: solid blue;
          color: blue;
        }
      }
    }
  }

  @media all and (max-width: 1020px) {
    .movie-result-list {
      display: grid;
      align-items: center;
      justify-content: center;
      text-align: center;
      grid-template-columns: repeat(2, 210px);
      gap: 3px;
      margin-top: 20px;
      padding-inline: 100px;

      li {
        margin: 10px;
        text-align: right;
        list-style: none;

        .movie-result-list-item {
          text-align: center;
        }

        .movie-result-poster {
          width: 200px;
          min-width: 200px;
          height: 250px;
        }
        .movie-result-title {
          width: 200px;
          font-size: 20px;
          min-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .movie-result-moreinfobutton {
          font-size: 30px;
          border: none;

          background-color: black;
          color: white;

          &:hover {
            border-bottom: solid blue;
            color: blue;
          }
        }
      }
    }
  }
  @media all and (min-width: 1021px) {
  }
}
</style>
