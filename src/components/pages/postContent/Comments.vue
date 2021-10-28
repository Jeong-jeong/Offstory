<template>
  <Card>
    <section class="comments">
      <h1 class="comments__header">{{ comments.length }}개의 댓글</h1>
      <ul class="comments__list">
        <li
          ref="item"
          class="item"
          v-for="(commentList, _id) in comments"
          :key="_id"
          :commentId="commentList._id"
        >
          <span
            ref="hidden"
            class="hidden"
            :commentorId="commentList.author._id"
          >
            <!-- 댓글 작성자 id는 DOM 요소에서 보이지 않도록 display: none 처리함 -->
          </span>
          <div class="left">
            <button class="user__profile">
              <img :src="profileUrl" alt="유저 프로필" />
            </button>
            <div class="user__infos">
              <strong class="nickname"
                >{{ commentList.author.fullName }}
                <span class="uploadDate">{{
                  timeForToday(commentList.updatedAt)
                }}</span></strong
              >
              <p class="content">
                {{ commentList.comment }}
              </p>
            </div>
          </div>
          <div class="right">
            <div v-if="commentList.author._id === userId" class="edit-area">
              <button @click.stop="deleteComments($event)" aria-label="삭제">
                삭제
              </button>
            </div>
            <TagArea
              @click="checkHost"
              v-show="checkHost"
              :postId="postId"
              :userId="userId"
              :commentorId="commentList.author._id"
              :commentorName="commentList.author.fullName"
            />
          </div>
        </li>
        <li class="item">
          <div class="left logouted">
            <button class="user__profile">
              <img :src="profileUrl" alt="유저 프로필" />
            </button>
            <template v-if="isLogin">
              <textarea
                v-model="comment"
                @keyup.enter.exact="submitComment"
                ref="comment"
                class="add__comment"
                type="text"
                placeholder="댓글 달기"
              ></textarea>
              <Button
                v-if="isCommentLength"
                @click="submitComment"
                v-bind="{
                  width: '80px',
                  height: '40px',
                  boxShadow: 'none',
                }"
                ><i class="material-icons">arrow_forward</i></Button
              >
              <Button
                v-else
                v-bind="{
                  width: '80px',
                  height: '40px',
                  backgroundColor: '#CCCCCC',
                  boxShadow: 'none',
                }"
                disabled
                ><i class="material-icons">arrow_forward</i></Button
              >
            </template>
            <template v-else-if="checkReject">
              <textarea class="reject" type="text" disabled>
참가가 거절되어 댓글을 다실 수 없어요</textarea
              >
              <Button
                v-bind="{
                  width: '80px',
                  height: '40px',
                  backgroundColor: '#CCCCCC',
                  boxShadow: 'none',
                }"
                disabled
                ><i class="material-icons">arrow_forward</i></Button
              >
            </template>
            <div v-else class="logouted" @click="this.$router.push('/login')">
              <button class="button--logouted" type="text">
                로그인 해주세요
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserIdToCookie } from '~/utils/cookies'
import { timeForToday } from '~/utils/function'
import { userDetailInfo } from '~/api'
import { readPost, createComment, deleteComment } from '~/api/postContent'
import TagArea from '~/components/pages/postContent/TagArea'
import Card from '~/components/designs/Card.vue'
import Button from '~/components/designs/Button.vue'

export default {
  data() {
    return {
      comment: '',
      // postId: this.initialPostId,
      // comments: this.initialComments,
      // author: this.initialAuthor,
      userId: '',
    }
  },
  components: {
    Card,
    Button,
    TagArea,
  },
  props: ['initialPostId', 'initialComments', 'initialAuthor'],
  computed: {
    ...mapGetters('Login', ['isLogin']),
    postId() {
      return this.initialPostId
    },
    comments() {
      return this.initialComments
    },
    author() {
      return this.initialAuthor
    },
    profileUrl() {
      return (
        this.author.image ||
        require('~/assets/images/user-profile__default.svg')
      )
    },
    isCommentLength() {
      return this.comment.trim().length
    },
  },
  watch: {
    comments: {
      // FIXME: 작동 안함
      handler(newValue, oldValue) {
        console.log(newValue, 'watch')
        // readPost(this.postId)
      },
      deep: true,
    },
  },
  methods: {
    async submitComment() {
      const commentValue = this.$refs.comment.value
      if (!commentValue.trim().length) return
      const userData = {
        comment: commentValue,
        postId: this.postId,
      }
      const res = await createComment(userData)
      console.log(res, 'createComment')
      await this.$emit('rerender')
      this.comment = ''
      // TODO: \n을 바꿔줘야 함
    },
    async deleteComments(event) {
      const li = event.target.closest('li')
      const commentId = li.getAttribute('commentId')
      const userData = {
        id: commentId, // FIXME: 댓글작성자 ID, 댓글 ID, postID 다 안됨
      }
      const res = await deleteComment(userData) // FIXME: 작동안함
      console.log(res, 'deleteComment')
      this.$emit('rerender')
    },
    checkHost() {
      return this.author._id === this.userId
    }, // 글 작성자 _id, 로그인된 userId 같은지 비교

    checkCommentor(event) {
      const hidden = event.target.closest('.hidden')
      const commentorId = hidden.getAttribute('commentorId')
      // 댓글 작성자 _id, 로그인된 userId가 같은지 비교
      commentorId === this.userId
    },
    async checkReject() {
      const res = await userDetailInfo(this.commentorId) // 댓작성자의 정보 불러옴
      const username = res.data.username.split('/')[1]
      const array = JSON.parse(username)
      const result = array.some(
        v => v.postid === this.postId && v.state === 'reject',
      )
      console.log(result, 'checkReject')
      return result
    },
    getUserId() {
      this.userId = getUserIdToCookie()
    },
    timeForToday,
  },
  created() {
    this.getUserId()
  },
}
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

textarea:disabled {
  color: $COLOR_RED;
}
.comments {
  min-height: 160px;

  &__header {
    font-size: $FONT_L;
    font-weight: 700;
    padding: $INNER_PADDING_VERTICAL 0;
  }

  &__list {
    .item {
      @include flexbox($jc: between, $ai: stretch);
      min-height: 60px;
      padding: calc($INNER_PADDING_VERTICAL / 2) 0;

      & {
        border-bottom: 1px solid $COLOR_BORDER;
      }
      .left {
        @include flexbox($jc: start);

        &.logouted {
          width: 100%;
        }

        .user__infos {
          .nickname {
            word-break: keep-all;
            @include flexbox;
            flex-grow: 1;
            flex-wrap: nowrap;
            margin-bottom: $INNER_PADDING_SMALL;
          }

          .uploadDate {
            width: 100%;
            color: $KEY_COLOR;
            font-size: $FONT_XS;
            font-weight: 400;
            text-align: start;
            margin-left: $INNER_PADDING_SMALL;
          }

          .content {
            line-height: 1.3em;
          }
        }
      }

      .right {
        @include flexbox($jc: between);
        flex-direction: column;
      }

      .add__comment {
        font-family: inherit;
        width: 100%;
        border: none;
        font-size: inherit;
        resize: none;
      }

      .edit-area {
        width: 100%;
        text-align: end;

        button {
          color: $COLOR_GRAY_DARKEN;
          font-size: $FONT_XS;
          cursor: pointer;
        }
      }
    }

    .user {
      &__profile {
        flex-shrink: 0;
        border-radius: 50%;
        overflow: hidden;
        margin-right: $INNER_PADDING_HORIZONTAL;
        img {
          @include flexbox;
          width: 35px;
          height: 35px;
          object-fit: contain; // 일단은 contain으로 해놓음
        }
      }
    }
  }
}
</style>
