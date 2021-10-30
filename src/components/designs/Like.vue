<template>
  <div class="wrapper">
    <template v-if="doesUserLike">
      <i class="material-icons" @click="cancleLike"> favorite </i>
    </template>
    <template v-else>
      <i class="material-icons" @click="like"> favorite_border </i>
    </template>
    <span class="like-number">{{ likeCount }}</span>
  </div>
</template>

<script>
import { likePost, cancleLikePost } from '~/api'
export default {
  data() {
    return {
      likeCount: 0,
      doesUserLike: false,
    }
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  computed: {},
  methods: {
    async like() {
      const res = await likePost(this.post._id)
      this.doesUserLike = !this.doesUserLike
      this.likeCount++
      const { userId: currentUserId } = this.$storage.getItem('userData')
      this.post.likes.push({ _id: res.data._id, user: currentUserId })
    },
    async cancleLike() {
      const [likeId, index] = this.findLikeId()
      await cancleLikePost(likeId)
      this.doesUserLike = !this.doesUserLike
      this.likeCount--
      this.post.likes.splice(index, 1)
    },
    findLikeId() {
      const index = this.post.likes.findIndex(like => {
        const { userId: currentUserId } = this.$storage.getItem('userData')
        return like.user === currentUserId
      })
      const likeId = this.post.likes[index]._id
      return [likeId, index]
    },
    likeUpdate() {
      const { userId: currentUserId } = this.$storage.getItem('userData')
      const likes = this.post.likes
      const likeUserIds = likes.map(like => like.user) // user is userId
      this.doesUserLike = likeUserIds.includes(currentUserId)
      this.likeCount = likes.length
    },
  },
  mounted() {
    this.likeUpdate()
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    cursor: pointer;
  }
}
</style>
