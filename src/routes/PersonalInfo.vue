<template>
  <LoadingSpinner v-if="this.$store.getters['Loading/loading']" />
  <div class="container">
    <div id="user-info" class="row">
      <div class="col col-sm-4 col-lg-7">
        <form class="form" @submit="submit">
          <div class="user-profile">
            <div class="img-wrapper">
              <img :src="url" alt="유저 프로필 사진" ref="image" />
              <div
                class="upload-container"
                @click="isImageChangeModalShown = !isImageChangeModalShown"
                aria-label="이미지 변경"
              >
                <i class="material-icons"> settings </i>
                <input
                  type="File"
                  accept="image/*"
                  @change="previewImage"
                  ref="imageInput"
                  :style="{ display: 'none' }"
                />
              </div>
              <template v-if="isImageChangeModalShown">
                <div class="image-choice">
                  <Button @click="chooseFile">이미지 파일 선택</Button>
                  <Button @click="setDefaultImage">기본 이미지 설정</Button>
                </div>
              </template>
            </div>
          </div>
          <div class="form-control">
            <label>닉네임</label>
            <input
              type="text"
              v-model="nickname"
              placeholder="닉네임 (2 ~ 30자)"
              ref="nickname"
              @focus="initializeClassname"
              @blur="checkNickname"
            />
            <i class="material-icons success"> check_circle_outline </i>
            <i class="material-icons error"> error_outline </i>
            <small>Error Message</small>
          </div>
          <div class="form-control">
            <label>비밀번호</label>
            <input
              type="password"
              v-model="password"
              placeholder="영문, 숫자, 특수문자 8 ~ 30자"
              ref="firstPassword"
              @focus="initializeClassname"
              @blur="checkPassword"
            />
            <i class="material-icons success"> check_circle_outline </i>
            <i class="material-icons error"> error_outline </i>
            <small>Error Message</small>
          </div>
          <div class="form-control">
            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              ref="secondPassword"
              @focus="initializeClassname"
              @blur="passwordDoubleCheck"
            />
            <i class="material-icons success"> check_circle_outline </i>
            <i class="material-icons error"> error_outline </i>
            <small>Error Message</small>
          </div>
          <div class="button-container">
            <Button @click="submit">제출하기</Button>
            <Button @click="$router.push('/authcheck')">취소하기</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
  updateCoverImage,
  updateNameField,
  updatePassword,
  userDetailInfo,
} from '../api/index'
import Button from '../components/designs/Button'
import { deleteCookie, saveUserImageToCookie } from '../utils/cookies'
import LoadingSpinner from '~/components/designs/LoadingSpinner'

export default {
  components: { Button, LoadingSpinner },
  data() {
    return {
      url: '',
      nickname: '',
      password: '',
      isDefaultImageChosen: false,
      uploadedFile: null,
      defaultImage: require('~/assets/images/user-profile.svg'),
      isNicknameValid: true,
      isFirstPasswordValid: false,
      isSecondPasswordValid: false,
      isImageChangeModalShown: false,
    }
  },
  computed: {
    ...mapGetters('Login', ['getToken']),
  },
  inject: ['toggleSidebar'],
  methods: {
    ...mapMutations('Loading', ['startLoading', 'endLoading']),
    ...mapMutations('Login', ['setProfileImage']),
    // 화면으로 접속시에 적색 박스와 녹색 박스 화면에 표시
    initialValidCheck() {
      setSuccessFor(this.$refs.nickname)
      setErrorFor(
        this.$refs.firstPassword,
        '비밀번호는 (영문, 숫자, 특수문자) 조합이어야 합니다',
      )
      setErrorFor(
        this.$refs.secondPassword,
        '비밀번호는 (영문, 숫자, 특수문자) 조합이어야 합니다',
      )
    },
    // 유저의 현재 정보 데이터를 화면에 표시
    setUserInfo() {
      const res = this.$storage.getItem('userData')
      this.url = res.userCoverImage || this.defaultImage
      this.nickname = res.userFullName
    },
    // 파일 선택 아이콘을 클릭하는 경우, input태그를 클릭함.
    chooseFile() {
      this.isDefaultImageChosen = false
      this.$refs.imageInput.click()
    },
    // 유저가 올린 이미지 화면에 표시
    previewImage(event) {
      this.uploadedFile = event.target.files[0]

      if (this.uploadedFile) {
        const reader = new FileReader()
        const img = this.$refs.image

        reader.addEventListener('load', function () {
          img.setAttribute('src', this.result)
        })

        reader.readAsDataURL(this.uploadedFile)
      }
    },
    // 유저가 input을 focus하면 focus된 input이 기존에 갖고 있는 className에서 success와 error를 제거함
    // 제거하지 않으면 화면에 계속 남아있음.
    initializeClassname(event) {
      const formControl = event.target.parentElement
      if (formControl.classList.contains('success')) {
        formControl.classList.toggle('success')
      } else if (formControl.classList.contains('error')) {
        formControl.classList.toggle('error')
      }
    },
    // 입력된 닉네임 유효성 검사
    checkNickname() {
      const nickname = this.$refs.nickname

      if (isOutOfRange(nickname.value, 2, 29)) {
        setErrorFor(nickname, '닉네임은 2자 이상, 30자 미만이어야 합니다')
      } else if (isSpecialExist(nickname.value)) {
        setErrorFor(nickname, '닉네임을 입력해야 합니다')
      } else if (isSpaceExist(nickname.value)) {
        setErrorFor(nickname, '닉네임은 공백이 포함될 수 없습니다')
      } else {
        setSuccessFor(nickname)
        this.isNicknameValid = true
        return
      }

      this.isNicknameValid = false
    },
    // 입력된 비밀번호 유효성 검사
    checkPassword() {
      const password = this.$refs.firstPassword

      if (
        !isNumExist(password.value) ||
        !isEngExist(password.value) ||
        !isSpecialExist(password.value)
      ) {
        setErrorFor(
          password,
          '비밀번호는 (영문, 숫자, 특수문자) 조합이어야 합니다.',
        )
      } else if (isSpaceExist(password.value)) {
        setErrorFor(password, '공백은 존재할 수 없습니다')
      } else if (isOutOfRange(password.value, 8, 29)) {
        setErrorFor(password, '비밀번호는 8자 이상, 30자 미만이어야 합니다.')
      } else {
        setSuccessFor(password)
        this.isFirstPasswordValid = true
        return
      }

      this.isFirstPasswordValid = false
    },
    // 입력된 두번째 비밀번호 유효성 검사
    passwordDoubleCheck() {
      const firstPassword = this.$refs.firstPassword
      const secondPassword = this.$refs.secondPassword
      if (
        !isNumExist(secondPassword.value) ||
        !isEngExist(secondPassword.value) ||
        !isSpecialExist(secondPassword.value)
      ) {
        setErrorFor(
          secondPassword,
          '비밀번호는 (영문, 숫자, 특수문자) 조합이어야 합니다.',
        )
      } else if (isSpaceExist(secondPassword.value)) {
        setErrorFor(secondPassword, '공백은 존재할 수 없습니다')
      } else if (isOutOfRange(secondPassword.value, 8, 29)) {
        setErrorFor(
          secondPassword,
          '비밀번호는 8자 이상, 30자 미만이어야 합니다.',
        )
      } else if (!isEqual(firstPassword.value, secondPassword.value)) {
        setErrorFor(secondPassword, '비밀번호가 동일하지 않습니다')
      } else {
        setSuccessFor(secondPassword)
        this.isSecondPasswordValid = true
        return
      }

      this.isSecondPasswordValid = false
    },
    // 제출하는 경우,
    async submit(event) {
      if (
        !this.isNicknameValid ||
        !this.isFirstPasswordValid ||
        !this.isSecondPasswordValid
      ) {
        event.preventDefault()
        return
      }

      event.preventDefault()
      this.startLoading()
      // 프로필 사진 업데이트 로직
      // (1) 새로운 이미지를 선택한 경우,
      const userInfoUpdatedByNewImage =
        this.uploadedFile && (await changeCoverImage(this.uploadedFile))

      // (2) 기본 이미지를 선택한 경우,
      const fileObjectOfDefaultImage = this.dataURLtoFile(
        this.defaultImage,
        'default-profile.svg',
      )

      const userInfoUpdatedByDefaultImage =
        this.isDefaultImageChosen &&
        (await changeCoverImage(fileObjectOfDefaultImage))

      // fullName 및 usernmae 업데이트 로직
      const userPriorData = this.$storage.getItem('userData')
      const username =
        !isEqual(this.nickname, userPriorData.userFullName) &&
        (await changeNickname(this.nickname))

      // 패스워드 변경 로직
      await changePassword(this.password)

      const updatedUserData = updateUserData(
        userPriorData,
        userInfoUpdatedByNewImage
          ? userInfoUpdatedByNewImage
          : userInfoUpdatedByDefaultImage,
        this.nickname,
        username,
      )

      if (this.uploadedFile || this.isDefaultImageChosen) {
        saveUserImageToCookie(
          (this.uploadedFile && updatedUserData.userCoverImage) ||
            (this.isDefaultImageChosen &&
              userInfoUpdatedByDefaultImage.data.coverImage) ||
            null,
        )

        this.setProfileImage(
          (this.uploadedFile && updatedUserData.userCoverImage) ||
            (this.isDefaultImageChosen &&
              userInfoUpdatedByDefaultImage.data.coverImage) ||
            null,
        )
      }
      this.$storage.setItem('userData', updatedUserData)

      this.toggleSidebar()

      this.setUserInfo()
      this.endLoading()
      alert('정보가 수정되었습니다!')
      this.$router.push('/authcheck')
    },
    setDefaultImage() {
      this.uploadedFile = null
      this.isDefaultImageChosen = true
      const img = this.$refs.image
      const defaultImage = this.defaultImage
      img.setAttribute('src', defaultImage)
      this.isImageChangeModalShown = false
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
  },
  mounted() {
    this.setUserInfo()
    this.initialValidCheck()
  },
}

// 보조함수
function isEqual(first, second) {
  return JSON.stringify(first) === JSON.stringify(second)
}

function setErrorFor(input, message) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')
  formControl.classList.toggle('error')
  small.textContent = message
}

function setSuccessFor(input) {
  const formControl = input.parentElement
  formControl.classList.toggle('success')
}

function isNumExist(string) {
  return /[0-9]/g.test(string)
}

function isEngExist(string) {
  return /[a-z]/gi.test(string)
}

function isSpecialExist(string) {
  return /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi.test(string)
}

function isSpaceExist(string) {
  return /\s/.test(string)
}

function isOutOfRange(string, lower, upper) {
  return string.length < lower || string.length > upper
}

function updateUserData(userPriorData, userInfo, nickname, username) {
  const updatedUserData = { ...userPriorData }
  console.log('userInfo는 어떻게 나올까?', userInfo)
  updatedUserData.userFullName = nickname
  updatedUserData.userCoverImage =
    userInfo?.data?.coverImage || updatedUserData.userCoverImage
  updatedUserData.userName = username
  return updatedUserData
}

async function changeCoverImage(uploadedFile) {
  let userInfo = null

  if (uploadedFile) {
    const formData = new FormData()
    formData.append('isCover', true)
    formData.append('image', uploadedFile)
    userInfo = await updateCoverImage(formData)
  }

  return userInfo
}

async function changePassword(password) {
  const data = {
    password,
  }

  await updatePassword(data)
}

async function changeNickname(nickname) {
  const data = {
    fullName: nickname,
    username: 'false',
  }

  await updateNameField(data)

  return data.username
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.container {
  position: relative;
  top: 110px;

  .row {
    @include flexbox;
  }

  .form {
    position: relative;
    padding: $LG_PADDING_VERTICAL $LG_PADDING_HORIZONTAL;
    box-shadow: $BOX_SHADOW;
    margin-bottom: 20px;
  }

  .form-control {
    position: relative;
    margin-bottom: 30px;
    padding-bottom: 20px;

    input {
      display: block;
      border: 2px solid #f0f0f0;
      border-radius: 5px;
      font-size: 14px;
      padding: 10px;
      width: 100%;
      margin-bottom: 10px;
    }

    label {
      display: inline-block;
      margin-bottom: 10px;
    }
    i {
      position: absolute;
      top: 44px;
      right: 10px;
      visibility: hidden;
    }
    small {
      visibility: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    &.success {
      input {
        border-color: #2ecc71;
      }
      i.success {
        color: #2ecc71;
        visibility: visible;
      }
    }

    &.error {
      input {
        border-color: #e74c3c;
      }
      i.error {
        color: #e74c3c;
        visibility: visible;
      }
      small {
        color: #e74c3c;
        visibility: visible;
      }
    }
  }

  .user-profile {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .img-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    width: 200px;
    height: 200px;

    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 0.1px solid #cccccc;
    }
  }

  .upload-container {
    position: absolute;
    right: -10px;
    bottom: -10px;
    cursor: pointer;
    i {
      color: #666666;
      font-size: 40px;
    }
  }

  .button-container {
    /* position: absolute; */
    display: flex;
    flex-direction: column;
    width: 100%;
    cursor: default;

    button {
      width: 100%;
    }
    button:last-child {
      margin-top: 10px;
    }
  }

  @media (max-width: 590px) {
    small {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  }
}
.image-choice {
  padding: 10px 20px;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  position: absolute;
  transform: translate(0, 110%);
  bottom: 0;
  z-index: 1;
  background-color: rgba(255, 255, 255, 1);

  button {
    background-color: #344e68;
  }

  button:last-child {
    margin-top: 10px;
  }
}
</style>
