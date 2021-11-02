<template>
  <div class="wrapper" :style="{ marginLeft: checkUnit(marginLeft) }">
    <template v-if="doesUserLike">
      <i
        class="material-icons"
        @click="cancleLike"
        :style="{ fontSize: checkUnit(symbolSize), color }"
      >
        favorite
      </i>
    </template>
    <template v-else>
      <i
        class="material-icons"
        @click="like"
        :style="{ fontSize: checkUnit(symbolSize), color }"
      >
        favorite_border
      </i>
    </template>
    <span
      class="like-number"
      :style="{
        width: checkUnit(marginBetween),
        fontSize: checkUnit(fontSize),
        textAlign: 'right',
        color,
      }"
      >{{ likeCount }}</span
    >
  </div>
</template>

<script>
import { likePost, cancleLikePost } from '~/api'
import { checkUnit } from '~/utils/function'

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
  computed: {},
  methods: {
    async like(event) {
      event.stopPropagation()
      const res = await likePost(this.post._id)
      this.doesUserLike = !this.doesUserLike
      this.likeCount++
      const { userId: currentUserId } = this.$storage.getItem('userData')
      this.post.likes.push({ _id: res.data._id, user: currentUserId })
    },
    async cancleLike(event) {
      event.stopPropagation()
      const [likeId, index] = this.findLikeId()
      const cancleLike = await cancleLikePost(likeId)
      this.doesUserLike = !this.doesUserLike
      this.likeCount--
      this.post.likes.splice(index, 1)
    },
    findLikeId() {
      const index = this.post.likes.findIndex(like => {
        const { userId: currentUserId } =
          this.$storage.getItem('userData') || {}
        return like.user === currentUserId
      })
      const likeId = this.post.likes[index]._id
      return [likeId, index]
    },
    likeUpdate() {
      const userData = this.$storage.getItem('userData')
      if (userData) {
        const { userId: currentUserId } = userData
        const likes = this.post.likes
        const likeUserIds = likes.map(like => like.user) // user is userId
        this.doesUserLike = likeUserIds.includes(currentUserId)
        this.likeCount = likes.length
      }
    },
    checkUnit,
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
