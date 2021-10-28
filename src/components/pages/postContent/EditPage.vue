<template>
  <form @submit.prevent="submitInfo" class="editor">
    <div class="edit-area">
      <button @click="$emit('cancelEdit')">취소</button>
      <button>저장</button>
    </div>
    <input
      @change="loadFile($event)"
      multiple
      accept="image/*"
      type="file"
      class="inputfile"
    />
    <strong ref="imageName" class="image-name"></strong>
    <input
      ref="title"
      class="editor__title"
      :value="title"
      @input="changeTitle"
    />
    <p>{{ this.title }}</p>
    <textarea
      ref="content"
      class="content"
      type="text"
      :value="content"
      @input="changeContent"
    ></textarea>
    <p>{{ this.content }}</p>
  </form>
</template>

<script>
import { updatePost } from '~/api/postContent'
import { putBr } from '~/utils/function'
export default {
  props: {
    initialPostId: {
      type: String,
      default: '',
      required: true,
    },
    initialTitle: {
      type: String,
      default: '',
      required: true,
    },
    initialContent: {
      type: String,
      default: '',
      required: true,
    },
    initialChannel: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      postId: this.initialPostId,
      title: this.initialTitle,
      content: this.initialContent,
      channel: this.initialChannel,
      image: null,
    }
  },
  methods: {
    changeTitle(event) {
      this.title = event.target.value
    },

    changeContent(event) {
      let str = event.target.value
      const result = putBr(str)

      this.content = result
    },
    async submitInfo() {
      // const new formData()
      const userData = new FormData()
      userData.append('postId', this.postId)
      userData.append('title', `${this.title}/${this.content}`)
      userData.append('image', this.image)
      userData.append('channelId', this.channel._id)

      const res = await updatePost(userData)
      console.log(res, 'update 완료')
      this.$emit('rerender')
    },
    loadFile(event) {
      const file = event.target.files[0]
      this.$refs.imageName.textContent = file.name

      const newImage = document.createElement('img')
      newImage.setAttribute('class', 'new-image')

      const newImageSrc = URL.createObjectURL(file)
      newImage.src = newImageSrc
      this.image = file
      newImage.style.width = '200px'
      newImage.style.height = '200px'
      newImage.style.objectFit = 'contain'

      this.$refs.imageName.appendChild(newImage)
      console.log(newImage)
    },
    putBr,
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
    border: transparent;
    font-weight: 700;
  }

  .content {
    flex-grow: 1;
    padding: $INNER_PADDING_VERTICAL 0;
    border: transparent;
    font-size: $FONT_L;
  }

  .edit-area {
    position: absolute;
    top: 0;
    right: 0;

    button {
      color: $COLOR_GRAY_DARKEN;

      &:first-child {
        margin-right: $INNER_PADDING_HORIZONTAL;
      }
    }
  }
}
</style>
