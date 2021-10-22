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
    'backgroundColor',
    'color',
    'borderRadius',
    'fontSize',
  ],
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
        color: this.color,
        backgroundColor: this.backgroundColor,
        borderRadius: this.borderRadius,
        fontSize: this.fontSize,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  width: 200px;
  height: $BUTTON_HEIGHT;
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
