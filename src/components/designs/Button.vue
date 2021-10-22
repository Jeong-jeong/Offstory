<template>
  <button :style="style" class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: [
    'width',
    'height',
    'fontSize',
    'backgroundColor',
    'color',
    'borderRadius',
  ],
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
        fontSize: this.fontSize,
        color: this.color,
        backgroundColor: this.backgroundColor,
        borderRadius: this.borderRadius,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  width: 200px;
  height: $BUTTON_HEIGHT;
  font-size: $FONT_BASE;
  color: $COLOR_WHITE;
  background-color: $KEY_COLOR;
  border-radius: $BORDER_RADIOUS;
  font-weight: 700;
  transition: all 300ms;

  &:hover,
  &:active {
    filter: brightness($OPACITY);
  }
}
</style>
