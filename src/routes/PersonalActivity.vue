<template>
  <div class="container">
    <!-- <div id="user-info" class="row">
      <div class="col col-sm-4 col-lg-8">
        <img :src="profileImage" alt="" />
        <div class="user-details">
          <div class="user-nickname">wherehows</div>
          <div class="user-introduce">나는 공부하는게 너무 싫습니다</div>
        </div>
      </div>
    </div> -->
    <div id="category" class="row">
      <div class="col col-sm-4 col-lg-8">
        <div class="category">
          <button class="OffStory">참여한 모임</button>
        </div>
      </div>
    </div>
    <div id="Divider" class="row">
      <div class="col col-sm-4 col-lg-8">
        <Divider />
      </div>
    </div>
    <div id="activity-filter" class="row">
      <div class="col col-sm-4 col-lg-8">
        <div class="activity-filter">
          <button class="admitted">날짜 순</button>
          <button class="admitted">참가 승인됨</button>
          <button class="denied">참가 거절됨</button>
          <button class="waiting">참가 대기중</button>
        </div>
      </div>
    </div>
    <div id="activity-list" class="row">
      <div class="col col-sm-4 col-lg-8">
        <div class="activity-list">
          <ul>
            <Post
              v-for="post in postsThatUserJoinTest"
              :key="post._id"
              :post="post"
            />
            <!-- <li v-for="(post, index) in postData" :key="post._id">
              <div class="post-container">
                <div class="top">
                  <div class="user-profile">
                    <img
                      :src="
                        post.author.coverImage ||
                        require('../assets/images/user-profile.svg')
                      "
                      alt=""
                    />
                    <div class="text-profile">
                      <div class="nickname">{{ post.author.fullName }}</div>
                      <div class="address">
                        {{ post.location.replace(/[/]/g, ' ') }}
                      </div>
                    </div>
                  </div>
                  <Tag class="join-state" :fontSize="'15px'" />
                </div>
                <Divider :margin="`13`" />
                <div class="mid">
                  <div class="title">{{ post.title.split('/')[0] }}</div>
                  <div
                    class="content"
                    v-html="getPostContent(post.title)"
                  ></div>
                </div>
                <div class="bot">
                  <div class="interest">
                    <div class="like">
                      <template v-if="doesUserLikePost(post)">
                        <i
                          class="material-icons"
                          @click="event => changeLike(event, post)"
                        >
                          favorite
                        </i>
                      </template>
                      <template v-else>
                        <i
                          class="material-icons"
                          @click="event => changeLike(event, post)"
                        >
                          favorite_border
                        </i>
                      </template>
                      <span class="like-number">{{
                        post.likes.length > 100 ? '100+' : post.likes.length
                      }}</span>
                    </div>
                    <div class="comments">
                      <i class="material-icons"> chat_bubble </i>
                      <div class="comment-number">
                        {{
                          post.comments.length > 0
                            ? '100+'
                            : post.comments.length
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="time">
                    <div class="day">{{ getTime(post.createdAt)[0] }}</div>
                    <div class="seperator">/</div>
                    <div class="before">
                      {{ pastTimeFrom(post.createdAt) }}
                    </div>
                  </div>
                </div>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from '../components/designs/Divider'
import Tag from '../components/designs/Tag'
import Post from '../components/designs/PostInActivity'
import { userDetailInfo, likePost, cancleLikePost, getPost } from '../api/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    Post,
    Divider,
  },
  data() {
    return {
      dummyPostData: {
        likes: [],
        comments: [],
        image: '',
        title: '',
        author: '',
        location: '',
      },
      postsThatUserJoin: [],
      postsThatUserJoinTest: [],
      postsThatUserLike: [],
      onlyLikeDataInPost: [],
      postContent: '',
    }
  },
  computed: {
    ...mapGetters('Login', ['getToken']),
    profileImage() {
      const res = this.$storage.getItem('userData')
      return res.userCoverImage || require('../assets/images/user-profile.svg')
    },
  },
  mounted() {
    this.getPostsThatUserJoin()
    this.getPostsThatUserJoinTest()
  },
  methods: {
    async changeLike(event, pos) {},
    doesUserLikePost(post) {
      return this.getOnlyLikeDataInPost(post).includes(
        this.$storage.getItem('userData').userId,
      )
    },
    pastTimeFrom(createdAt) {
      const today = new Date()
      const timeValue = new Date(createdAt)

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
    getPostContent(title) {
      return title.split('/')[1].replace(/\n/g, '<br/>')
    },
    getOnlyLikeDataInPost(postData) {
      const res = []

      for (let i = 0; i < postData.likes?.length; i += 1) {
        res.push(postData.likes[i].user)
      }
      return res
    },
    getTime(time) {
      return [
        new Date(time).toISOString().split('T')[0],
        new Date(time).toTimeString().split(' ')[0],
      ]
    },
    async getPostsThatUserJoin() {
      const { userId: currentUserId } = this.$storage.getItem('userData')
      const { data } = await userDetailInfo(currentUserId)
      const [_, postsStr] = data.username.split('/')

      if (postsStr !== '') {
        const posts = JSON.parse(postsStr)
        posts.forEach(async post => {
          const { data: detailOfPost } = await getPost(post.id)
          detailOfPost.state = post.state
          this.postsThatUserJoin.push(detailOfPost)
        })
      }
    },
    async getPostsThatUserJoinTest() {
      const { data } = await getPost('617b8a28c63ff72877a2277c')
      data.state = 'approve'
      this.postsThatUserJoinTest.push(data)
      console.log('테스트입니다', this.postsThatUserJoinTest)
    },
    // updatePostLike(postArray) {
    //   const res = []
    //   for (let i = 0; i < postArray.length; i++) {
    //     if (
    //       postArray[i].likes.some(like => {
    //         console.log('like.user', like.user)
    //         console.log('userId', this.$storage.getItem('userData').userId)
    //         return like.user === this.$storage.getItem('userData').userId
    //       })
    //     ) {
    //       res.push(true)
    //     } else {
    //       res.push(false)
    //     }
    //   }
    //   console.log('res결과는?', res)

    //   this.doesUserLikePost = res
    // },
    async getPartiesThatUserJoin() {
      const { data } = await userDetailInfo(
        this.$storage.getItem('userData').userId,
      )
      const [_, party] = data.username.split('/')

      return JSON.parse(party)
    },
    async likeUpdate(postId) {
      const data = {
        postId,
      }
      await likePost(data)
    },
  },
}
</script>

<style lang="scss" scoped>
$marginToTheTop: 30px;

.container {
  position: relative;
  top: 150px;
  .row {
    @include flexbox;
  }
  /* 
  #user-info {
    .col {
      display: flex;
      img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
      }

      .user-details {
        margin-left: 20px;
      }
    }
  } */

  #activity-filter {
    .col {
      position: relative;

      .activity-filter {
        position: absolute;
        right: 0;

        button {
          margin-left: 25px;
        }
      }
    }
  }

  #activity-list {
    margin-top: 60px;

    .post-container {
      padding: 25px 40px;
      border: none;
      border-radius: 10px;
      box-shadow: 5px 5px 10px 3px rgba(224, 224, 224, 0.95);
    }

    .top {
      position: relative;

      .user-profile {
        display: flex;

        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #cccccc;
        }

        .text-profile {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          margin-left: 15px;

          .nickname {
            font-weight: 700;
            font-size: 1.1rem;
            line-height: 0.95rem;
          }
        }
      }

      .join-state {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .mid {
      .title {
        font-weight: 700;
        font-size: 1.4rem;
      }
      .content {
        margin-top: 10px;
        font-size: 1.1rem;
      }
    }

    .bot {
      position: relative;
      margin-top: 50px;

      i {
        font-size: 1.4rem;
      }

      .interest {
        display: flex;

        .like {
          display: flex;
          align-items: center;

          i {
            cursor: pointer;
          }

          .like-number {
            font-size: 1.1rem;
            margin-left: 8px;
          }
        }
        .comments {
          display: flex;
          align-items: center;
          margin-left: 50px;

          .comment-number {
            font-size: 1.1rem;
            margin-left: 8px;
          }
        }
      }
      .time {
        position: absolute;
        display: flex;
        top: 0;
        right: 0;

        div {
          font-size: 1.1rem;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
