<template>
  <div class="tags-area">
    <Tag @click="onToggle" class="standByTag" />
    <!-- <template v-if="this.commentorId === this.userId"> -->
    <template v-if="checkHost()">
      <Card
        v-show="isToggle"
        class="tags-choice"
        v-bind="{
          width: '200px',
          height: '100px',
        }"
      >
        <h2 class="recommend">채팅 참여 승인여부를 <br />선택해주세요</h2>
        <div class="button-wrapper">
          <Button
            @click="saveApprovalData($event)"
            class="approve"
            v-bind="{
              width: '60px',
              height: '40px',
              backgroundColor: '#51CF66',
              fontSize: '14px',
            }"
            >승인</Button
          >
          <Button
            @click="saveApprovalData($event)"
            class="reject"
            v-bind="{
              width: '60px',
              height: '40px',
              backgroundColor: '#F03E3E',
              fontSize: '14px',
            }"
            >거절</Button
          >
        </div>
      </Card>
    </template>
  </div>
</template>

<script>
import { userDetailInfo, updateUserDetailInfo } from '~/api'
import Card from '~/components/designs/Card.vue'
import Tag from '~/components/designs/Tag.vue'
import Button from '~/components/designs/Button.vue'

export default {
  components: {
    Card,
    Tag,
    Button,
  },
  props: {
    postId: {
      type: String,
      default: '',
      required: true,
    },
    userId: {
      type: String,
      default: '',
      required: true,
    },
    commentorId: {
      type: String,
      default: '',
      required: true,
    },
    commentorName: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      isToggle: false,
    }
  },
  methods: {
    onToggle() {
      this.isToggle = !this.isToggle
    },
    checkHost() {
      return this.commentorId === this.userId
    }, // 글 작성자 _id, 로그인된 userId 같은지 비교
    async saveApprovalData(event) {
      const state = event.target.className.replace('button ', '') // approve, reject
      const stateData = {
        postId: this.postId,
        state,
      }
      // const mixedData = JSON.stringify({
      //   fullName: this.commentorName,
      //   username: ,
      // })

      const res = await userDetailInfo(this.commentorId)
      const username = res.data.username.split('/')[1] // []

      // const userInfo = await updateUserDetailInfo()
    },
  },
}
</script>

<style lang="scss" scoped>
.tags-area {
  position: relative;
}

.tags-choice {
  @include flexbox($jc: around);
  flex-direction: column;
  position: absolute;
  top: $TAG_HEIGHT + $INNER_PADDING_SMALL;
  right: 0px;
  z-index: $TAG_AREA_INDEX;

  .recommend {
    text-align: center;
    @include font($sz: $FONT_XS);
  }

  .button-wrapper {
    @include flexbox($jc: around);
    width: 100%;
  }
}
</style>
