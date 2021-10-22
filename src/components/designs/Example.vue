<template>
  <div class="container">
    <div class="row">
      <Button v-bind="{ width: '100%' }">회원가입</Button>
      <Button
        v-bind="{
          width: '85px',
          height: '50px',
          backgroundColor: '#339AF0',
        }"
        >로그인</Button
      >
      <Button
        v-bind="{
          width: '85px',
          height: '40px',
          backgroundColor: '#343A40',
          color: '#fff',
        }"
        >보러가기</Button
      >
      <Button
        v-bind="{
          height: '40px',
          backgroundColor: '#7C7C7C',
          color: '#fff',
          boxShadow: 'none',
        }"
        >그림자가 없는 버튼</Button
      >
    </div>
    <div class="row">
      <Tag v-bind="{ height: '25px', backgroundColor: '#51CF66' }"
        >참가 승인됨</Tag
      >
      <Tag v-bind="{ height: '25px', backgroundColor: '#F03E3E' }"
        >참가 거절됨</Tag
      >
      <Tag v-bind="{ height: '25px', backgroundColor: '#FF8B4A' }"
        >참가 대기중</Tag
      >
    </div>
    <Input
      v-bind="{
        width: '100%',
        backgroundColor: '#51CF66',
        color: '#fff',
      }"
      placeholder="내용을 입력하세요"
    />
    <Input
      v-bind="{
        width: '500px',
        paddingVertical: '15px',
        paddingHorizontal: '10px',
        backgroundColor: '#fff',
        color: '#343A40',
      }"
      placeholder="내용을 입력하세요"
    />
  </div>
</template>

<script>
import Button from '~/components/designs/Button'
import Tag from '~/components/designs/Tag'
import Input from '~/components/designs/Input'

export default {
  components: {
    Button,
    Tag,
    Input,
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  top: $LG_HEADER_HEIGHT;
}
</style>
