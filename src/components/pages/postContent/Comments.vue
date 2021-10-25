<template>
  <Card>
    <section class="comments">
      <h1 class="comments__header">
        {{ Object.keys(comments).length }}개의 댓글
      </h1>
      <ul class="comments__list">
        <li class="item" v-for="(commentList, index) in comments" :key="index">
          <div class="left">
            <button class="user__profile">
              <img :src="profileUrl" alt="유저 프로필" />
            </button>
            <p>{{ commentList }}, {{ index }}</p>
            <div class="user__infos">
              <strong class="nickname">{{ commentList.author }}</strong>
              <p class="content">
                {{ commentList.comment }}
              </p>
            </div>
          </div>
          <div class="right">
            <div class="uploadDate">{{ commentList.updatedAt }}</div>
            <Tag>참가 대기중</Tag>
          </div>
        </li>
        <li class="item">
          <div class="left logouted">
            <button class="user__profile">
              <img :src="profileUrl" alt="유저 프로필" />
            </button>
            <input
              v-if="userId"
              class="add__comment"
              type="text"
              placeholder="댓글 달기"
            />
            <div v-else class="logouted" @click="this.$router.push('/login')">
              <button class="button--logouted" type="text">
                로그인해주세요
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </Card>
</template>

<script>
import { mapState } from 'vuex'
import Card from '~/components/designs/Card.vue'
import Tag from '~/components/designs/Tag.vue'

export default {
  components: {
    Card,
    Tag,
  },
  props: {
    comments: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('Login', ['userId']),
    profileUrl() {
      return require('~/assets/images/user-profile__default.svg')
    },
  },
}
</script>

<style lang="scss" scoped>
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

        &__infos {
          .nickname {
            display: inline-block;
            margin-bottom: $INNER_PADDING_SMALL;
          }

          .content {
            line-height: 1.3em;
          }
        }
      }
      .add__comment {
        width: 100%;
        border: none;
        font-size: inherit;
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

      .right {
        @include flexbox($jc: start);
        flex-direction: column;
        .uploadDate {
          color: $KEY_COLOR;
          font-size: $FONT_S;
          text-align: end;
          margin-bottom: $INNER_PADDING_SMALL;
        }
      }
    }
  }
}
</style>
