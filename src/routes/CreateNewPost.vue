<template>
  <div class="container">
    <form @submit.prevent="createPost">
      <div>
        <h1 class="title">동행 구하기</h1>
      </div>
      <select @change="selectedCity($event)" class="selectcity">
        <option value="undefined">시</option>
        <option :key="i" :value="data.name" v-for="(data, i) in dummy_city">
          {{ data.name }}
        </option>
      </select>
      <select @change="selectedCounty($event)" class="selectcounty">
        <option value="undefined">군,구</option>
        <option :key="i" :value="data.name" v-for="(data, i) in dummy_county">
          {{ data }}
        </option>
      </select>
      <input
        placeholder="나머지 주소입력!"
        v-model="detailAdress"
        name="detailAdress"
        type="text"
        required
      />
      <br /><br />
      <input
        placeholder="제목"
        v-model="title"
        name="title"
        type="title"
        required
      />
      <input
        @change="uploadImage"
        multiple
        accept="image/*"
        type="file"
        id="file"
        class="inputfile"
      />

      <br /><br />
      <textarea v-model="content"></textarea>
      <button>글 작성하기</button>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getAuth, createPost, channelsList, createChannel } from '../api/index'

export default {
  data() {
    return {
      detailAdress: '',
      title: '',
      content: '',
      image: null,
      channelId: '',
      dummy_city: [
        {
          name: '서울',
        },
        {
          name: '경기',
        },
        {
          name: '인천',
        },
        {
          name: '강원',
        },
        {
          name: '경상',
        },
        {
          name: '제주',
        },
      ],
      dummy_county: ['강동', '강서', '강남', '강북'],
      countyListForSelect: [],
      selectuserCity: '',
      selectuserCounty: '',
    }
  },
  async mounted() {
    const auth = await getAuth()
    console.log(auth)
  },
  computed: {
    ...mapState('address', ['cityList', 'countyList']),
  },
  methods: {
    ...mapActions('address', ['fetchCounty']),

    async selectedCity(event) {
      console.log(event.target.value)
      this.selectuserCity = event.target.value
      const userCity = event.target.value //선택한 도시 넘겨줌
      await this.fetchCounty(userCity.code)
      this.countyListForSelect = this.countyList
    },

    selectedCounty(event) {
      console.log(event.target.value)
      this.selectuserCounty = event.target.value
    },

    uploadImage(event) {
      this.image = event.target.files[0]
      console.log(this.image)
    },

    getcitylist() {
      console.log(this.city)
      return this.city
    },
    async createPost() {
      try {
        const channelsListData = await channelsList()
        const selectChannelId = channelsListData.data
          .filter(x => {
            return x.name === this.selectuserCity
          })
          .map(x => x._id)
        console.log(selectChannelId)
        if (selectChannelId.length === 0) {
          //채널을 새로 생성해야 되는 경우
          const channelData = {
            name: this.selectuserCity,
            description: `${this.selectuserCity}의 채널입니다.`,
          }
          const newChannelData = await createChannel(channelData)
          this.channelId = newChannelData._id
        } else {
          this.channelId = selectChannelId[0]
        }
        const userData = new FormData()
        userData.append('title', `${this.title}/${this.content}`)
        userData.append('image', this.image)
        userData.append('channelId', this.channelId)
        userData.append(
          'location',
          `${this.selectuserCity}/${this.selectuserCounty}/${this.detailAdress}`,
        )
        userData.append('meta', '')

        // const userData = {
        //   title: `${this.title}/${this.content}`,
        //   image: this.image,
        //   channelId: this.channelId,
        //   location: `${this.selectuserCity}/${this.selectuserCounty}/${this.detailAdress}`,
        //   meta: '', //만일을 위해 아껴두자!
        // }
        console.log(userData)
        const postData = await createPost(userData)
        console.log(postData)
        //this.$router.push('/')
      } catch (error) {
        //에러 핸들링 코드
        console.log(error.response.data)
        alert(error.response.data)
      }
      //this.$route.push('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>
