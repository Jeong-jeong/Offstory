<template>
  <div class="editor">
    <h1 class="editor__title">{{ title }}</h1>
    <p v-html="content" class="content" type="text"></p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    content: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
