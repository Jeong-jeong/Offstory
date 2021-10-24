<template>
  <div class="tag" :style="style">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: ['width', 'height', 'color', 'backgroundColor', 'borderRadius'],
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
        color: this.color,
        backgroundColor: this.backgroundColor,
        borderRadius: this.borderRadius,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tag {
  @include flexbox;
  @include font($sz: 12px, $color: $COLOR_WHITE);
  font-weight: 700;
  width: $TAG_WIDTH;
  height: $TAG_HEIGHT;
  border-radius: $BORDER_RADIOUS;
  background-color: $COLOR_GREEN;
  box-shadow: $BUTTON_BOX_SHADOW;
  transition: all 300ms;

  &:hover,
  &:active {
    filter: brightness($OPACITY);
  }
}
</style>
