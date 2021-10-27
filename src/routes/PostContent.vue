<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10">
        <Button
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
        <!-- TODO: postContent 컴포의 data를 전부 전달하는 방법이 있을까요? -->
        <Post
          :postId="postId"
          :fullName="fullName"
          :updatedAt="updateAt"
          :location="location"
          :title="title"
          :content="content"
        />
        <Comments :postId="postId" :comments="comments" :author="author" />
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
      default: '',
      required: true,
    },
  },
  data() {
    return {
      fullName: '이름없는 사용자' || '',
      title: '제목없음' || '',
      content: '내용없음' || '',
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
      image: null, // TODO: 이미지를 어디 넣을지도 생각해봐야겠음
      location: '위치없음' || '',
      updatedAt: '날짜' || '',
    }
  },
  computed: {
    iconBack() {
      return require('~/assets/images/icon-back.svg')
    },
  },
  created() {
    // this.initPostdata() // data 초기화
  },
  methods: {
    async initPostdata(postId) {
      try {
        const { data } = await readPost(postId)
        const { author } = data

        const [title, content] = data.title.split('/')
        this.fullName = author.fullName
        this.title = title
        this.content = content
        this.comments = data.comments
        this.image = data.image // 안보임
        this.location = data.location
        this.updatedAt = data.updateAt
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
