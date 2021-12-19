<template>
  <LoadingSpinner v-if="this.$store.getters['Loading/loading']" />
  <div class="container">
    <div class="row">
      <div class="col-lg-10">
        <Button
          @click="this.$router.go(-1)"
          v-bind="{
            width: '100px',
            height: '40px',
            fontSize: '14px',
            backgroundColor: '#fff',
            color: '#343A40',
          }"
          class="button--back"
        >
          <img
            :src="iconBack"
            class="icon--back"
            alt="뒤로가기 아이콘"
            aria-hidden
          />
          <span class="button__text">목록으로</span>
        </Button>
        <Post
          @rerender="rePatch"
          :postId="postId"
          :postData="postData"
          :author="author"
          :channel="channel"
          :userId="userData.userId"
        />
        <Comments
          @rerender="rePatch"
          :postId="postId"
          :comments="comments"
          :author="author"
          :userId="userData?.userId"
          :userName="userData?.userFullName"
          :userImage="userData?.userCoverImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import LoadingSpinner from '~/components/designs/LoadingSpinner'
import Post from '~/components/pages/postContent/Post'
import Comments from '~/components/pages/postContent/Comments'
import Button from '~/components/designs/Button.vue'
import { readPost } from '~/api/postContent'
export default {
  components: {
    Post,
    Comments,
    Button,
    LoadingSpinner,
  },
  props: {
    postId: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      initialPostId: this.postId,
      postData: {},
      author: {},
      comments: [],
      channel: {},
      userData: {},
      isLoading: false,
    }
  },
  computed: {
    iconBack() {
      return require('~/assets/images/icon-back.svg')
    },
  },
  methods: {
    ...mapMutations('Loading', ['startLoading', 'endLoading']),
    async initPostdata() {
      try {
        this.startLoading()
        const { data: postData } = await readPost(this.initialPostId)
        this.postData = postData
        this.author = postData.author
        this.comments = postData.comments
        this.channel = postData.channel
        this.userData = this.$storage.getItem('userData') || {}
      } catch (error) {
        alert(error.response.data)
      }
      this.endLoading()
    },
    async rePatch() {
      this.initPostdata()
    },
  },
  created() {
    this.initPostdata()
  },
}
</script>

<style lang="scss" scoped>
.logouted {
  width: 100%;

  button--logouted {
    width: 100%;
    padding: $INNER_PADDING_VERTICAL 0;
    text-align: left;
  }
}
.container {
  position: relative;
  top: $LG_HEADER_HEIGHT;

  .row {
    justify-content: center;
  }

  [class^='col-lg'] > * {
    margin-bottom: $LG_PADDING_VERTICAL;
  }
}

.button {
  &--back {
    position: relative;
  }
  .icon--back {
    @include pos-center-y;
    left: $INNER_PADDING_HORIZONTAL;
    width: 18px;
  }
  &__text {
    position: relative;
    left: $INNER_PADDING_HORIZONTAL;
  }
}
</style>
