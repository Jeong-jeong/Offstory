<template>
  <Card>
    <section class="comments">
      <h1 class="comments__header">{{ comments.length }}개의 댓글</h1>
      <ul class="comments__list">
        <li
          ref="item"
          class="item"
          v-for="(commentList, index) in comments"
          :key="index"
          :commentId="commentList._id"
        >
          <span
            ref="hidden"
            class="visually-hidden"
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
                  commentList.updatedAt
                }}</span></strong
              >
              <p class="content">
                {{ commentList.comment }}
              </p>
            </div>
          </div>
          <div class="right">
            <div v-if="checkCommentor" class="edit-area" @click="deleteComment">
              <button aria-label="삭제">삭제</button>
            </div>
            <TagArea />
          </div>
        </li>
        <li class="item">
          <div class="left logouted">
            <button class="user__profile">
              <img :src="profileUrl" alt="유저 프로필" />
            </button>
            <template v-if="getUserId">
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
                  width: '60px',
                  height: '40px',
                  boxShadow: 'none',
                }"
                ><i class="material-icons">play_arrow</i></Button
              >
              <Button
                v-else
                v-bind="{
                  width: '60px',
                  height: '40px',
                  backgroundColor: '#CCCCCC',
                  boxShadow: 'none',
                }"
                disabled
                ><i class="material-icons">play_arrow</i></Button
              >
            </template>
            <div v-else class="logouted" @click="this.$router.push('/login')">
              <button class="button--logouted" type="text">
                getUserId: {{ getuserId }} 로그인 해주세요
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
import { createComment, deleteComment } from '~/api'
import TagArea from '~/components/pages/postContent/TagArea'
import Card from '~/components/designs/Card.vue'
import Tag from '~/components/designs/Tag.vue'
import Button from '~/components/designs/Button.vue'

export default {
  data() {
    return {
      comment: '',
    }
  },
  components: {
    Card,
    Button,
    TagArea,
  },
  props: {
    postId: {
      type: String,
      default: '',
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('Login', ['getUserId']), // FIXME: undefined 가져옴
    profileUrl() {
      return require('~/assets/images/user-profile__default.svg')
    },
    isCommentLength() {
      return this.comment.trim().length
    },
  },
  methods: {
    submitComment() {
      const commentValue = this.$refs.comment.value
      if (!commentValue.trim().length) return
      const userData = {
        comment: commentValue,
        postId: this.postId,
      }

      const res = createComment(userData)
      console.log(res, 'createComment')
      // TODO: \n을 바꿔줘야 함
    },
    deleteComment() {
      const commentId = this.$refs.item.getAttribute('commentId')
      console.log(commentId)
      const res = deleteComment(commentId)
    },
    checkHost() {
      this.author._id === this.getUserId
    }, // 글 작성자 _id, getUserId가 같은지 비교

    checkCommentor() {
      const commentorId = this.$refs.hidden.getAttribute('commentorId')
      commentorId === this.getUserId
      console.log(
        commentorId,
        this.getUserId,
        '댓글 작성자와 로그인 유저가 같지 않음',
      )
    }, // 댓글 작성자 _id, getUserId가 같은지 비교
  },
}
</script>

<style lang="scss" scoped>
.visually-hidden {
  display: none;
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
            display: inline-block;
            margin-bottom: $INNER_PADDING_SMALL;
          }

          .uploadDate {
            width: 100%;
            color: $KEY_COLOR;
            font-size: $FONT_S;
            text-align: end;
            margin-bottom: $INNER_PADDING_SMALL;
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
