<template>
  <div class="comment" :style="{ marginLeft: checkUnit(marginLeft) }">
    <i
      class="material-icons"
      :style="{ fontSize: checkUnit(symbolSize), color }"
    >
      notes
    </i>
    <div
      class="comment-number"
      :style="{
        fontSize: checkUnit(fontSize),
        width: checkUnit(marginBetween),
        textAlign: 'right',
        color,
      }"
    >
      {{ commentCount }}
    </div>
  </div>
</template>

<script>
import { checkUnit } from '~/utils/function'

export default {
  props: {
    post: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    symbolSize: {
      type: [Number, String],
      default: '1.2rem',
    },
    fontSize: {
      type: [Number, String],
      default: '1.2rem',
    },
    marginBetween: {
      type: [Number, String],
      default: '15px',
    },
    color: {
      type: String,
      default: 'black',
    },
    marginLeft: {
      type: [Number, String],
      default: '0px',
    },
  },
  computed: {
    commentCount() {
      return this.post.comments.length
    },
  },
  methods: {
    checkUnit,
  },
}
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    cursor: pointer;
  }
}
</style>
