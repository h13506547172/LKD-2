import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import app from './modules/app'
import settings from './modules/settings'
import createVuexPersisted from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    userInfo: {},
  },
  mutations: {
    // 获取用户token
    getToken(state, data) {
      state.user = data
    },
    // 获取用户详细信息
    getUserInfo(state, data) {
      state.userInfo = data
    },
  },
  actions: {
    asyncGetToken(context, data) {
      context.commit('getToken', data)
    },
    async asyncGetUserInfo(context, data) {
      context.commit('getUserInfo', data)
    },
    // 退出
    logout(context) {
      context.commit('getToken', {})
      context.commit('getUserInfo', {})
    },
  },
  modules: {
    app,
    settings,
  },
  getters,
  plugins: [
    // 默认是所有vuex模块中的state的值存入本地
    createVuexPersisted({
      reducer(state) {
        return {
          // 只存储user对象中的token
          user: state.user,
        }
      },
    }),
  ],
})

export default store
