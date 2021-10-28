<template>
  <div class="container">
    <div id="user-info" class="row">
      <div class="col col-sm-4 col-lg-8">
        <img :src="profileImage" alt="" />
        <div class="user-details">
          <div class="user-nickname">wherehows</div>
          <div class="user-introduce">나는 공부하는게 너무 싫습니다</div>
        </div>
      </div>
    </div>
    <div id="category" class="row">
      <div class="col col-sm-4 col-lg-8">
        <div class="category">
          <button class="OffStory">OffStory</button>
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
            <li>
              <div class="post-container">
                <div class="top">
                  <div class="user-profile">
                    <img
                      :src="require('../assets/images/user-profile.svg')"
                      alt=""
                    />
                    <div class="nickname">wherehows</div>
                  </div>
                  <Tag class="join-state" />
                </div>
                <Divider :margin="`20`" />
                <div class="mid">
                  <div class="title">서귀포인데 바다 놀러가실분</div>
                  <div class="content">비용은 N빵입니다 ㅋㅋ~</div>
                </div>
                <div class="bot">
                  <div class="interest">
                    <div class="like">
                      <i class="material-icons"> favorite </i>
                      <span class="like-number">5</span>
                    </div>
                    <div class="comments">
                      <i class="material-icons"> chat_bubble </i>
                      <div class="comment-number">12</div>
                    </div>
                  </div>
                  <div class="time">
                    <div class="day">2021-10-28</div>
                    <div class="seperator">/</div>
                    <div class="before">3시간 전</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from '../components/designs/Divider'
import {
  updateCoverImage,
  updateNickname,
  updatePassword,
  userDetailInfo,
} from '../api/index'
import Tag from '../components/designs/Tag'

export default {
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
    }
  },
  components: { Divider, Tag },
  computed: {
    profileImage() {
      const res = this.$storage.getItem('userData')
      return res.userCoverImage || require('../assets/images/user-profile.svg')
    },
    postData() {},
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    async getUserData() {
      const { data } = await userDetailInfo(
        this.$storage.getItem('userData').userId,
      )
      console.log(data)
      return data.posts
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
  }

  #category {
    margin-top: $marginToTheTop;
  }

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
          width: 30px;
        }

        .nickname {
          font-weight: 700;
          font-size: 1.1rem;
          margin-left: 15px;
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
