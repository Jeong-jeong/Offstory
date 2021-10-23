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
<<<<<<< HEAD
    'backgroundColor',
    'color',
    'borderRadius',
    'fontSize',
=======
    'fontSize',
    'backgroundColor',
    'color',
    'borderRadius',
>>>>>>> dev
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
