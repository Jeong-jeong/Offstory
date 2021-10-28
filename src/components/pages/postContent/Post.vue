<template>
  <Card>
    <section class="post">
      <header class="post__header">
        <div class="left">
          <button class="user__profile">
            <img :src="profileUrl" alt="유저 프로필" />
          </button>
          <div class="user__infos">
            <strong class="nickname">{{ author.fullName }}</strong>
            <div class="uploadDate">{{ timeForToday(postData.createdAt) }}</div>
            <div class="location">{{ postData.location }}</div>
          </div>
        </div>
        <div class="right">
          <Button v-if="!checkHost" v-bind="{ width: '60px', height: '70px' }">
            찜하기
          </Button>
          <div v-if="checkHost" class="edit-area">
            <button v-if="!isEdit" @click="changeToEdit" class="edit">
              편집
            </button>

            <button v-if="!isEdit" @click="submitDelete" class="delete">
              삭제
            </button>
          </div>
        </div>
      </header>
      <template v-if="!isEdit">
        <Editor :title="title" :content="content" />
      </template>
      <template v-else>
        <!-- TODO: 이벤트 올리기 -->
        <EditPage
          @rerender="provideRerender"
          @cancelEdit="cancelEdit"
          v-show="changeToEdit"
          :initialPostId="postId"
          :initialTitle="title"
          :initialContent="content"
          :initialChannel="channel"
        />
      </template>
    </section>
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'
import { timeForToday } from '~/utils/function'
import { deletePost } from '~/api/postContent'
import Card from '~/components/designs/Card'
import Button from '~/components/designs/Button'
import Editor from '~/components/pages/postContent/Editor'
import EditPage from '~/components/pages/postContent/EditPage'

export default {
  components: {
    Card,
    Button,
    Editor,
    EditPage,
  },
  props: [
    'initialPostId',
    'initialPostData',
    'initialAuthor',
    'initialChannel',
  ],
  data() {
    return {
      postId: this.initialPostId,
      postData: this.initialPostData,
      author: this.initialAuthor,
      channel: this.initialChannel,
      isEdit: false,
      // profileImg: this.hasProperty(this.author, 'image') || '',
    }
  },
  methods: {
    timeForToday,
    checkHost() {
      this.author._id === this.userId
    }, // 글 작성자 _id, 로그인된 userId 같은지 비교
    changeToEdit() {
      this.isEdit = true
    },
    cancelEdit() {
      this.isEdit = false
    },
    submitDelete() {
      const userData = {
        id: this.postId,
      }

      deletePost()
    },
  },
  computed: {
    ...mapGetters('Login', ['getUserId']),
    title() {
      return this.postData.title.split('/')[0]
    },
    content() {
      return this.postData.title.split('/')[1]
    },
    profileUrl() {
      return (
        this.profileImg || require('~/assets/images/user-profile__default.svg')
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.post {
  position: relative;
  min-height: 300px;

  &__header {
    @include flexbox($jc: between, $ai: start);
    height: $LG_HEADER_HEIGHT;

    .left {
      @include flexbox($jc: start);

      .user {
        &__profile {
          flex-shrink: 0;
          border-radius: 50%;
          overflow: hidden;
          margin-right: $INNER_PADDING_HORIZONTAL;
          img {
            @include flexbox;
            width: 40px;
            height: 40px;
            object-fit: contain; // 일단은 contain으로 해놓음
          }
        }

        &__infos {
          & > * {
            margin-bottom: $INNER_PADDING_SMALL;
          }
          .nickname {
            display: inline-block;
            font-size: $FONT_L;
            cursor: pointer;
          }

          .uploadDate,
          .location {
            color: inherit;
            font-size: $FONT_S;
          }

          .uploadDate {
            color: $KEY_COLOR;
          }
        }
      }
    }

    .right {
      .edit-area {
        button {
          color: $COLOR_GRAY_DARKEN;
        }
        .edit {
          margin-right: $INNER_PADDING_HORIZONTAL;
        }
      }
    }
  }
}
</style>
