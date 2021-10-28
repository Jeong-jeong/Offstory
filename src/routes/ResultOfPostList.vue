<template>
  <div class="container">
    <div class="searchresult-page">
      <div class="row">
        <div class="col-lg-13">
          <!-- <div v-if="$store.state.movie.isLoading" class="loader"></div>
      <div v-else> -->
          <!-- <div v-if="!isLoading && !totalresult" class="movie-result">
        검색된 영화가 없습니다. 다시 입력해주세요.
      </div> -->
          <h1 class="searchresult-find">
            "{{ getUserCity }} {{ getUserCounty }} {{ getdetailAddress }}"
            <span>검색결과</span>
          </h1>
          <template v-if="getPostListData.length === 0">
            <div class="searchresult-find-noresult">
              <div class="nontext">
                검색결과가 없습니다. 동행을 직접 모집해보세요!
              </div>
              <Button
                @click="$router.push('/newpost')"
                v-bind="{ width: '20%' }"
                class="party"
                >동행 모집하러가기</Button
              >
            </div>
          </template>
          <template v-else>
            <div class="resultlist">
              <ul class="resultlist-listcards">
                <li v-for="i in getPostListData" :key="i">
                  <div
                    class="resultlist-listcard"
                    @click="
                      $router.push({
                        name: 'PostContent',
                        params: { id: i.postId },
                      })
                    "
                  >
                    <div class="resultlist-listcard-header">
                      <div class="resultlist-listcard-createtime">
                        {{ i.createdAt.substring(0, 10) }}
                      </div>
                      <div class="resultlist-listcard-timefortoday">
                        {{ timeForToday(i.createdAt) }}
                      </div>
                      <div class="resultlist-listcard-location">
                        {{ i.location }}
                      </div>
                    </div>
                    <div class="postimage">
                      <template v-if="i.image === undefined">
                        <img
                          class="postimage-default"
                          src="../assets/images/not-found.png"
                          alt=""
                        />
                      </template>
                      <template v-else>
                        <img class="postimage-user" :src="`${i.image}`" />
                      </template>
                    </div>
                    <div class="resultlist-listcard-active">
                      <div class="resultlist-listcard-like">
                        ♡ +{{ i.likes.length }}
                      </div>
                      <div class="resultlist-listcardt-comment">
                        🗨+{{ i.comments.length }}
                      </div>
                    </div>
                    <div class="resultlist-listcard-userinfo">
                      <div class="resultlist-listcard-userprofile">
                        <template v-if="i.author.coverImage === undefined">
                          <img
                            class="resultlist-listcard-userprofile-basicimage"
                            :src="imageUrl"
                            alt=""
                          />
                        </template>
                        <template v-else>
                          <img
                            class="resultlist-listcard-userprofile-userimage"
                            :src="`${i.author.coverImage}`"
                            alt=""
                          />
                        </template>
                        <div class="movie-result-author">
                          {{ i.author.fullName }}
                        </div>
                        <div class="resultlist-listcard-title">
                          {{ parseTitleContent(i.title) }}
                        </div>
                      </div>
                    </div>
                    <!-- <button
                    class="movie-result-moreinfobutton"
                    @click="
                      $router.push({
                        name: 'MoreInfo',
                        params: {
                          id: i.imdbID,
                        },
                      })
                    "
                  >
                    상세보기
                  </button> -->
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
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
      imageUrl: require('../assets/images/user-profile__default.svg'),
    }
  },
  components: { Button },
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
    parseTitleContent(titledata) {
      //   const data = titleContent
      //   const titledata = data.map(x => x.title)
      const titleList = []
      console.log(titledata)
      titleList.push(titledata.split('/')[0])
      //   for (let i in titledata) {
      //     let titlestr = titledata[i]
      //     titleList = titlestr.split('/')[0]
      //   }
      console.log(titleList[0])

      return titleList[0]
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
.container {
  position: relative;
  top: $LG_HEADER_HEIGHT;

  .row {
    justify-content: center;
    .col-lg-13 {
      width: 100%;
    }
  }
  .searchresult-find {
    margin-top: 20px;
    padding-bottom: $INNER_PADDING_HORIZONTAL;
    color: $KEY_COLOR;
    border-bottom: solid $KEY_COLOR;
    font-size: $FONT_L;
    span {
      color: black;
    }
  }
  .searchresult-find-noresult {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    .nontext {
      font-size: $FONT_XXL;
      color: $COLOR_GRAY_DARKEN;
    }
    .party {
      margin-top: 20px;
    }
  }
  .resultlist {
    width: 100%;
    height: 100%;

    .resultlist-listcards {
      display: flex;
      flex-flow: wrap;
      height: 100%;
      width: 100%;

      .resultlist-listcard {
        cursor: pointer;
        margin: 30px 5px 5px 10px;
        width: 355px;
        height: 370px;
        border: solid 1px $COLOR_GRAY_LIGHTEN;
        border-radius: 30px;
        padding: 20px;
        box-shadow: $BOX_SHADOW;
        .resultlist-listcard-header {
          display: flex;
          margin-bottom: 10px;
          .resultlist-listcard-createtime {
            font-size: $FONT_BASE;
            color: $COLOR_GRAY_DARKEN;
          }
          .resultlist-listcard-timefortoday {
            margin: 0px;
            padding: 0px;
            margin-top: 4px;
            margin-left: 6px;
            font-size: $FONT_XS;
            color: $COLOR_GRAY_LIGHTEN;
          }
          .resultlist-listcard-location {
            width: 130px;
            margin: 0px;
            padding: 0px;
            margin-left: 50px;
            font-size: $FONT_BASE;
            color: $COLOR_GRAY_DARKEN;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .postimage {
          border-radius: 10px;
          overflow: hidden;

          .postimage-default {
            border-radius: 30px;
            width: 100%;
            height: 200px;
          }
          .postimage-user {
            border-radius: 10px;
            width: 100%;
            height: 200px;
            filter: brightness(65%);
            transform: scale(1);
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transition: all 0.3s ease-in-out;

            &:hover {
              transform: scale(1.2);
              -webkit-transform: scale(1.2);
              -moz-transform: scale(1.2);
              -ms-transform: scale(1.2);
              -o-transform: scale(1.2);
            }
          }
        }
        .resultlist-listcard-active {
          display: flex;
          width: 120px;
          .resultlist-listcard-like {
            color: $COLOR_GRAY_LIGHTEN;
          }
          .resultlist-listcardt-comment {
            margin-left: 10px;
            color: $COLOR_GRAY_LIGHTEN;
          }
        }
        .resultlist-listcard-userinfo {
          position: relative;
          top: -50px;
          display: flex;
          justify-self: center;
          //   align-content: center;
          flex-direction: column;
          .resultlist-listcard-userprofile {
            display: flex;
            align-items: center;
            flex-direction: column;
            .resultlist-listcard-userprofile-basicimage {
              width: 40px;
              height: 40px;
              background: white;
              border-radius: 30px;
            }
            .resultlist-listcard-userprofile-userimage {
              width: 40px;
              height: 40px;
              border-radius: 40px;
            }
            .movie-result-author {
            }
            .resultlist-listcard-title {
              width: 300px;
              text-align: center;
              margin-top: 10px;
              font-size: $FONT_L;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        &:hover {
          //filter: brightness(120%);
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
