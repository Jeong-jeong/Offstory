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
          class="button-back"
        >
          <img
            src="../assets/images/icon-back.svg"
            class="icon-back"
            alt="뒤로가기 아이콘"
            aria-hidden
          />
          <span class="button-text">목록으로</span>
        </Button>
        <Card>
          <section class="post">
            <header class="post-header">
              <div class="left">
                <button class="user-profile">
                  <img
                    src="../assets/images/user-profile__default.svg"
                    alt="유저 프로필"
                  />
                </button>
                <div class="user-infos">
                  <strong class="nickname">닉네임칸</strong>
                  <div class="uploadDate">업로드 일자</div>
                  <div class="location">위치</div>
                </div>
              </div>
              <div class="right">
                <Button v-bind="{ width: '60px', height: '70px' }">
                  찜하기
                </Button>
              </div>
            </header>
            <div class="editor">
              <h1 class="editor-title">안녕하세여</h1>
              <p class="content" type="text">이번주 일요일 ㄱㄱ</p>
            </div>
          </section>
        </Card>
        <Card>
          <section class="comment">
            <h1 class="comment-header">댓글</h1>
            <ul class="comment-list">
              <li class="item">
                <div class="left">
                  <button class="user-profile">
                    <img
                      src="../assets/images/user-profile__default.svg"
                      alt="유저 프로필"
                    />
                  </button>
                  <div class="user-infos">
                    <strong class="nickname">닉네임칸</strong>
                    <p class="content">
                      댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용 댓글
                      내용댓글 내용댓글 내용댓글 내용댓글 내용 댓글 내용댓글
                      내용댓글 내용댓글 내용댓글 내용 댓글 내용댓글 내용댓글
                      내용댓글 내용댓글 내용 내용댓글 내용댓글 내용댓글 내용댓글
                      내용 댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용 댓글
                      내용댓글 내용댓글 내용댓글 내용댓글 내용
                    </p>
                  </div>
                </div>
                <div class="right">
                  <div class="uploadDate">업로드 일자</div>
                  <Tag v-bind="{}">참가 승인됨</Tag>
                </div>
              </li>
              <li class="item">
                <div class="left">
                  <button class="user-profile">
                    <img
                      src="../assets/images/user-profile__default.svg"
                      alt="유저 프로필"
                    />
                  </button>
                  <div class="user-infos">
                    <strong class="nickname">닉네임칸</strong>
                    <p class="content">
                      댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용 댓글
                    </p>
                  </div>
                </div>
                <div class="right">
                  <div class="uploadDate">업로드 일자</div>
                  <Tag v-bind="{}">참가 승인됨</Tag>
                </div>
              </li>
              <li class="item">
                <div class="left">
                  <button class="user-profile">
                    <img
                      src="../assets/images/user-profile__default.svg"
                      alt="유저 프로필"
                    />
                  </button>
                  <div class="user-infos">
                    <strong class="nickname">닉네임칸</strong>
                    <p class="content">
                      댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용 댓글
                      내용댓글 내용댓글 내용댓글 내용댓글 내용 댓글 내용댓글
                      내용댓글 내용댓글 내용댓글 내용 댓글 내용댓글 내용댓글
                      ㅁㄴㅇ럼아ㅣㄹasdkfkldafdjklfj 12144
                    </p>
                  </div>
                </div>
                <div class="right">
                  <div class="uploadDate">업로드 일자</div>
                  <Tag v-bind="{}">참가 승인됨</Tag>
                </div>
              </li>
            </ul>
          </section>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../components/designs/Button.vue'
import Card from '../components/designs/Card.vue'
import Tag from '../components/designs/Tag.vue'
export default {
  components: {
    Button,
    Card,
    Tag,
  },
}
</script>

<style lang="scss" scoped>
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
  &-back {
    position: relative;
  }
  .icon-back {
    @include pos-center-y;
    left: $INNER_PADDING_HORIZONTAL;
    width: 18px;
  }
  &-text {
    position: relative;
    left: 10px;
  }
}

.post {
  min-height: 300px;

  &-header {
    @include flexbox($jc: between);
    height: $LG_HEADER_HEIGHT;

    .left {
      @include flexbox($jc: start);

      .user {
        &-profile {
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

        &-infos {
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

    &-title {
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

.comment {
  min-height: 160px;

  &-header {
    font-size: $FONT_L;
    font-weight: 700;
    padding: $INNER_PADDING_VERTICAL 0;
  }

  &-list {
    .item {
      @include flexbox($jc: between, $ai: stretch);
      min-height: 60px;
      padding: ($INNER_PADDING_VERTICAL / 2) 0;

      &:not(:last-child) {
        border-bottom: 1px solid $COLOR_BORDER;
      }
      .left {
        @include flexbox($jc: start);
        .user {
          &-profile {
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

          &-infos {
            .nickname {
              display: inline-block;
              margin-bottom: $INNER_PADDING_SMALL;
            }

            .content {
              line-height: 1.3em;
            }
          }
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
