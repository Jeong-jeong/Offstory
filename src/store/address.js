import { $fetch } from '../plugins/fetch.js'
import { $axios } from '../plugins/axios.js'
import {
  API_ENDPOINT_OF_AREAINFO,
  API_ENDPOINT_OF_DEVCOURSE,
} from '../utils/variables.js'

export default {
  namespaced: true,
  state() {
    return {
      cityList: [],
      countyList: [],
      searchedCityInfo: {}, // 시
      searchedCountyInfo: {}, // 군
    }
  },
  getters: {},
  mutations: {
    updateSearchedAddress(state, searchedAddress) {
      state.searchedCityInfo = searchedAddress.userCity
      state.searchedCountyInfo = searchedAddress.userCounty
    },
  },
  actions: {
    async initialCityFetch({ state }) {
      const res = await $fetch(API_ENDPOINT_OF_AREAINFO)
      const infoOfCity = res.response.body
      const totalNumOfPage = Math.ceil(
        infoOfCity.totalCount / infoOfCity.numOfRows,
      )
      for (let pageNum = 1; pageNum <= totalNumOfPage; pageNum += 1) {
        const res = await $fetch(
          API_ENDPOINT_OF_AREAINFO + `&pageNo=${pageNum}`,
        )
        const cityList = res.response.body.items.item
        state.cityList.push(...cityList)
      }
    },

    async fetchCounty({ state }, cityCode) {
      const res = await $fetch(
        API_ENDPOINT_OF_AREAINFO + `&areaCode=${cityCode}`,
      )

      const infoOfCounty = res.response.body

      const totalNumOfPage = Math.ceil(
        infoOfCounty.totalCount / infoOfCounty.numOfRows,
      )

      for (let pageNum = 1; pageNum <= totalNumOfPage; pageNum += 1) {
        const res = await $fetch(
          API_ENDPOINT_OF_AREAINFO + `&areaCode=${cityCode}&pageNo=${pageNum}`,
        )

        const countyList = res.response.body.items.item
        state.countyList.push(...countyList)
      }

      //for debug
      console.log('state.countyList', state.countyList)
    },
  },
}
