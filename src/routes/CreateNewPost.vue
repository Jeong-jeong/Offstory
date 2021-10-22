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
        placeholder="제목 작성!!"
        v-model="title"
        name="title"
        type="title"
        required
      />
      <br /><br />
      <textarea v-model="content"></textarea>
      <button>글 작성하기</button>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { createPost } from '../api/index'

export default {
  data() {
    return {
      detailAdress: '',
      title: '',
      image: '',
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

    getcitylist() {
      //return this.cityList
      console.log(this.city)
      return this.city
    },
    async createPost() {
      try {
        const userData = {
          title: this.title,
          image: this.image,
          //channelId: this.channelId, //채널이 없음
          //location: `${this.selectuserCity}+${this.selectuserCounty}`,
          //meta: `${this.detailAdress}+${this.content}`,
        }
        const { data } = await createPost(userData)
        console.log(data.user)
        console.log(data.user.image)
        this.$router.push('/')
        // this.$store.commit('Login/setUsername', data.user.fullName)
        // this.$store.commit('Login/setToken', data.token)
        console.log(data.token)
      } catch (error) {
        //에러 핸들링 코드
        console.log(error.response.data)
        alert(error.response.data)
      }
      this.$route.push('/')
      alert('글 작성이 완료 되었습니다.')
    },
  },
}
</script>

<style lang="scss" scoped></style>
