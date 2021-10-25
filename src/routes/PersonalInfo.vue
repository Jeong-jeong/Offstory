<template>
  <div class="container">
    <div id="user-info" class="row">
      <div class="col col-sm-4 col-lg-9">
        <div class="wrapper">
          <img :src="url" alt="유저 프로필 사진" />
          <button class="UploadContainer" @click="chooseFile">
            <i class="material-icons"> settings </i>
            <input
              type="File"
              accept="image/*"
              @change="uploadImage"
              ref="imageInput"
              :style="{ display: 'none' }"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_ENDPOINT_OF_DEVCOURSE } from '../utils/variables'
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      url: '',
    }
  },
  computed: {
    ...mapGetters('Login', ['getUserInfo, getToken']),
  },
  methods: {
    chooseFile() {
      this.$refs.imageInput.click()
    },
    async imageSetup() {},
    async uploadImage(event) {
      // const URL = 'http://13.209.30.200:5000/users/upload-photo'
      // const data = new FormData()
      // data.append('isCover', true)
      // data.append('image', event.target.files[0])

      // const res = await this.$fetch(URL, {
      //   method: 'POST',
      //   headers: {
      //     // 'Content-Type':'image/png',
      //     Authorization: `bearer ${localStorage.getItem('Token')}`,
      //   },
      //   body: data,
      // })

      // console.log(res)
      console.log(this.getUserInfo)

      // const res2 = await this.$fetch(
      //   'http://13.209.30.200:5000/users/61728bdecd64fa348cdac41a',
      // )

      // console.log(res2)

      // this.url = res2.coverImage
    },
    // eldora09@naver.com
    // aA!12345
    // 유저 아이디 61728bdecd64fa348cdac41a
    async test() {
      // console.log('가져올때 토큰', localStorage.getItem('Token'))
      // const test = await this.$fetch('http://13.209.30.200:5000/settings/update-user', {
      //   method:'PUT',
      //   headers: {
      //     'Content-Type' : 'application/json',
      //     Authorization: `bearer ${localStorage.getItem('Token')}`
      //   },
      //   body: JSON.stringify({
      //     "fullName" : '12345',
      //     "username": '김영후',
      //   })
      // })
      // console.log(test);
      // console.log('test결과', test);
      // console.log('token정보', localStorage.getItem('Token'))
      // const res = await this.$fetch(
      //   'http://13.209.30.200:5000' + '/users/upload-photo',
      //   {
      //     method: 'POST',
      //     headers: {
      //      Authorization: localStorage.getItem('Token'),
      //     },
      //     body: '',
      //   },
      // )
      // console.log('유저 데이터 결과', res)
    },
  },
  async mounted() {
    console.log(this.getUserInfo)
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.container {
  position: relative;
  top: 150px;

  .row {
    @include flexbox;
  }

  #user-info {
    .col {
      display: flex;
      justify-content: center;
      .wrapper {
        position: relative;

        img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
        }
        button {
          position: absolute;
          right: 0;
          bottom: 0;

          i {
            color: #666666;
            font-size: 40px;
          }
        }
      }
    }
  }
}
</style>
