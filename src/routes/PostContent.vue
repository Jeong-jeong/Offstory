<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10">
        {{ postId }}
        <Button
          @click="this.$router.push('/')"
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
          :initialPostId="postId"
          :initialPostData="postData"
          :initialAuthor="author"
        />
        <Comments
          :initialPostId="postId"
          :initialComments="comments"
          :initialAuthor="author"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Post from '~/components/pages/postContent/Post'
import Comments from '~/components/pages/postContent/Comments'
import Button from '~/components/designs/Button.vue'
import { readPost } from '~/api/postContent'
export default {
  components: {
    Post,
    Comments,
    Button,
  },
  props: {
    postId: {
      // $router.push({ name: 'PostContent', params: { postId } })
      type: String,
      default: '6174ec4d46af0b5b4174cc1c',
      required: true,
    },
  },
  data() {
    return {
      postData: {},
      author: {},
      comments: [
        {
          _id: '01232adfdjf',
          comment:
            '저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요',
          author: {
            _id: 'authorId',
            posts: [],
            comments: [],
            fullName: '한라산만 31번째',
          },
          post: 'postId',
          updatedAt: '오늘',
        },
        {
          _id: '01232adfdjf',
          comment:
            '저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요',
          author: {
            _id: 'authorId',
            posts: [],
            comments: [],
            fullName: '한라산만 31번째',
          },
          post: 'postId',
          updatedAt: '오늘',
        },
        {
          _id: '01232adfdjf',
          comment:
            '저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요저도 끼워주세요',
          author: {
            _id: 'authorId',
            posts: [],
            comments: [],
            fullName: '한라산만 31번째',
          },
          post: 'postId',
          updatedAt: '오늘',
        },
      ],
    }
  },
  computed: {
    iconBack() {
      return require('~/assets/images/icon-back.svg')
    },
  },
  created() {
    this.initPostdata() // data 초기화
  },
  methods: {
    async initPostdata() {
      try {
        const { data: postData } = await readPost(this.postId)
        this.postData = postData
        this.author = postData.author
        this.comments = postData.comments
      } catch (error) {
        console.log(error.response.data)
        alert(error.response.data)
      }
    },
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
