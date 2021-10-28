<template>
  <h1 class="notfound">
    404 Not Found 요청하신 페이지를 찾을 수 없어요
    <div class="button">
      <button @click="$router.push('/')">메인 페이지로 가기</button>
    </div>
  </h1>
</template>

<style lang="scss" scoped>
.notfound {
  text-align: center;
  font-size: $FONT_XXL;
  width: 100%;
  position: absolute;
  height: 100vh;
  margin: 0;
  background-color: $KEY_COLOR;
  color: white;
  button {
    font-size: $FONT_XL;
    color: white;
    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
