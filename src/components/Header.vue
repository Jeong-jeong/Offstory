<template>
  <div class="wrapper">
    <div class="left">
      <img src="../assets/images/symbol.svg" alt="OffStory 심볼" />
      <button class="logo" @click="$router.push('/')">OffStory</button>
    </div>
    <div class="middle">
      <form @submit.prevent="">
        <input
          :value="userAddress"
          placeholder="'서울 강남'을 입력해 보세요"
          ref="input"
          @keyup.enter="parseAddress"
        />
        <button><i class="material-icons"> search </i></button>
      </form>
    </div>
    <div class="right">
      <template v-if="isLogin">
        <button>
          <i class="material-icons"> edit </i>
        </button>
        <button>
          <i class="material-icons"> question_answer </i>
        </button>
        <button>
          <i class="material-icons"> notifications </i>
        </button>
        <template v-if="isEmptyProfileImage">
          <button @click="toggleSidebar">
            <i class="material-icons"> account_circle </i>
          </button>
        </template>
        <template v-else>
          <button @click="toggleSidebar">
            <img src="getUserProfileImage" />
          </button>
        </template>
      </template>
      <template v-else>
        <router-link to="/login">
          <Button width="100px" fontSize="25px">Login</Button>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Button from '~/components/designs/Button'

export default {
  props: {
    isSidebarShowed: {
      type: Boolean,
      defaultValue: false,
    },
  },
  components: {
    Button,
  },
  computed: {
    ...mapState('address', ['cityList', 'countyList']),
    ...mapGetters('Login', ['isLogin']),
    ...mapGetters('Login', ['isEmptyProfileImage']),
    ...mapGetters('Login', ['getUserProfileImage']),
  },
  methods: {
    ...mapMutations('address', ['updateSearchedAddress']),
    ...mapActions('address', ['fetchCounty']),
    async parseAddress() {
      const userCity = this.cityList.find(city =>
        this.$refs.input.value.includes(city.name),
      )

      await this.fetchCounty(userCity.code)

      const userCounty = this.countyList.find(county => {
        const countyNameWithoutGu = county.name.replace(/구$/, '')
        return this.$refs.input.value.includes(countyNameWithoutGu)
      })

      //for debug
      console.log('userCounty', userCounty)

      this.updateSearchedAddress({ userCity, userCounty })
      this.$refs.input.value = ''
    },
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/variables';

.wrapper {
  position: fixed;
  width: 100%;
  height: $LG_HEADER_HEIGHT;
  border-bottom: 0.1px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40px;

    .logo {
      font-size: 35px;
      font-weight: 700;
      color: $KEY_COLOR;
      margin-left: 20px;
    }
  }

  .middle {
    form {
      position: relative;
      display: flex;
      align-items: center;

      input {
        width: 500px;
        padding: 13px;
        font-size: 20px;
        border: 1px solid darken($KEY_COLOR, 0%);
        border-radius: 25px;
        &:focus {
          border-color: darken($KEY_COLOR, 10%);
        }
      }

      button {
        position: absolute;
        right: 10px;
        z-index: 1;

        i {
          color: darken($KEY_COLOR, 0%);
          font-size: 35px;
        }
      }
    }
  }

  .right {
    margin-right: 25px;

    button {
      margin-left: 25px;

      i {
        font-size: 35px;
        color: darken($KEY_COLOR, 0%);
        &:hover {
          color: darken($KEY_COLOR, 30%);
        }
      }
    }
  }
}
</style>
