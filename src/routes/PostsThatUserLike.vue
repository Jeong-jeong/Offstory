<template>
  <div class="container">
    <div id="date-filter" class="row">
      <div class="col col-sm-4 col-lg-8">
        <div class="date-filter">
          <button
            class="up-to-date"
            :class="isSortedByUpToDate ? 'active' : ''"
            @click="
              !isSortedByUpToDate && (isSortedByUpToDate = !isSortedByUpToDate)
            "
          >
            최신 순
          </button>
          <button
            class="out-of-date"
            :class="!isSortedByUpToDate ? 'active' : ''"
            @click="
              isSortedByUpToDate && (isSortedByUpToDate = !isSortedByUpToDate)
            "
          >
            오래된 순
          </button>
        </div>
      </div>
    </div>
    <div id="Divider" class="row">
      <div class="col col-sm-4 col-lg-8">
        <Divider :margin="'20px'" />
      </div>
    </div>
    <div id="like-list" class="row">
      <div class="col col-sm-4 col-lg-8">
        <div class="like-list">
          <template v-if="postsThatUserLike.length">
            <div class="post--exist" ref="postContainer">
              <Post
                v-for="post in isSortedByUpToDate
                  ? postsUpToDate
                  : postsOutOfDate"
                :key="post._id"
                :post="post"
                @click="
                  $router.push({
                    name: 'PostContent',
                    params: { postId: post._id },
                  })
                "
              />
            </div>
          </template>
          <template v-else>
            <teleport to="body">
              <div class="post--empty">
                <div>아직은 관심갖는 게시글이 없어요!</div>
              </div>
            </teleport>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from '../components/designs/Divider'
import Post from '../components/designs/PostInActivity'
import { userDetailInfo, getPost } from '../api/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    Post,
    Divider,
  },
  data() {
    return {
      postsThatUserLike: [],
      onlyLikeDataInPost: [],
      postContent: '',
      isSortedByUpToDate: true,
    }
  },
  computed: {
    ...mapGetters('Login', ['getToken']),
    profileImage() {
      const res = this.$storage.getItem('userData')
      return res.userCoverImage || require('../assets/images/user-profile.svg')
    },
    postsUpToDate() {
      const duplicatedPosts = this.postsThatUserLike.slice()
      duplicatedPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )

      console.log('postsUIpToDate', duplicatedPosts)
      return duplicatedPosts
    },
    postsOutOfDate() {
      const duplicatedPosts = this.postsThatUserLike.slice()
      duplicatedPosts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      )
      console.log('postsOutOfDate', duplicatedPosts)
      return duplicatedPosts
    },
  },
  mounted() {
    this.getPostsThatUserLike()
  },
  methods: {
    getOnlyLikeDataInPost(postData) {
      const res = []

      for (let i = 0; i < postData.likes?.length; i += 1) {
        res.push(postData.likes[i].user)
      }
      return res
    },
    async getPostsThatUserLike() {
      const { userId: currentUserId } = this.$storage.getItem('userData')
      const { data } = await userDetailInfo(currentUserId)
      const likes = data.likes

      const postsThatUserLike = []
      for (let i = 0; i < likes.length; i += 1) {
        const { post: postId } = likes[i]
        const { data } = await getPost(postId)
        postsThatUserLike[i] = data
      }

      this.postsThatUserLike = postsThatUserLike
    },
  },
}
</script>

<style lang="scss" scoped>
$marginToTheTop: 30px;

.container {
  position: relative;
  top: 130px;

  .row {
    @include flexbox;
  }

  #date-filter {
    .col {
      position: relative;

      .date-filter {
        button {
          margin-right: 15px;
        }
      }
    }
  }

  #like-list {
    .post-container {
      padding: 25px 40px;
      border: none;
      border-radius: 10px;
      box-shadow: 5px 5px 10px 3px rgba(224, 224, 224, 0.95);
    }
  }
}
.post--empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    font-size: $FONT_L;
    color: $COLOR_GRAY_DARKEN;
  }
}

.up-to-date,
.out-of-date {
  background-color: #cccccc;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  padding: 5px 10px;

  &.active {
    background-color: black;
  }
}
</style>
