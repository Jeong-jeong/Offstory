<template>
  <div class="tags-area">
    <Tag @click="onToggle" class="standByTag" />
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
          v-bind="{
            width: '60px',
            height: '40px',
            backgroundColor: '#51CF66',
            fontSize: '14px',
          }"
          >승인</Button
        >
        <Button
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
  </div>
</template>

<script>
import Card from '~/components/designs/Card.vue'
import Tag from '~/components/designs/Tag.vue'
import Button from '~/components/designs/Button.vue'

export default {
  data() {
    return {
      isToggle: false,
    }
  },
  components: {
    Card,
    Tag,
    Button,
  },
  methods: {
    onToggle() {
      this.isToggle = !this.isToggle
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
