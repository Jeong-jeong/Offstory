<template>
  <Card>
    <section class="post">
      <header class="post__header">
        <div class="left">
          <button class="user__profile">
            <img :src="profileUrl" alt="유저 프로필" />
          </button>
          <div class="user__infos">
            <strong class="nickname">{{ fullName }}</strong>
            <div class="uploadDate">{{ updatedAt }}</div>
            <div class="location">{{ location }}</div>
          </div>
        </div>
        <div class="right">
          <Button v-bind="{ width: '60px', height: '70px' }"> 찜하기 </Button>
        </div>
      </header>
      <div class="editor">
        <h1 class="editor__title">{{ title }}</h1>
        <p class="content" type="text">{{ content }}</p>
      </div>
    </section>
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/designs/Card.vue'
import Button from '~/components/designs/Button.vue'

export default {
  components: {
    Card,
    Button,
  },
  props: {
    postId: {
      type: String,
      default: '',
    },
    fullName: {
      type: String,
      required: true,
    },
    updateAt: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('Login', ['getUserId']),
    profileUrl() {
      return require('~/assets/images/user-profile__default.svg')
    },
  },
}
</script>

<style lang="scss" scoped>
.post {
  min-height: 300px;

  &__header {
    @include flexbox($jc: between);
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
            font-size: $FONT_S;
          }

          .location {
            color: $KEY_COLOR;
          }
        }
      }
    }
  }

  .editor {
    height: calc(100% - $LG_HEADER_HEIGHT);
    display: flex;
    flex-direction: column;

    &__title {
      padding: $INNER_PADDING_VERTICAL 0;
      font-size: $FONT_XL;
      font-weight: 700;
    }

    .content {
      flex-grow: 1;
      padding: $INNER_PADDING_VERTICAL 0;
      font-size: $FONT_L;
    }
  }
}
</style>
