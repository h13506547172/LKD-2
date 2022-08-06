import axios from 'axios'
import store from '@/store/index'
// 引入存储cookie的方法
import { getTokenTime } from './auth'
// 引入router实例
import router from '../router/index'
// 单独引入element的消息提示
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // timeout: 5000,
})
// token是否过期
const timeOut = () => {
  const tokenTime = getTokenTime()
  const nowTime = Date.now()
  return nowTime - tokenTime > 7200 * 1000
}
// 请求拦截器
service.interceptors.request.use(
  async function (config) {
    // 在发送请求之前如果user.token存在就添加请求头
    const { user } = store.state
    //如果token过期就跳转登录
    if (user?.token) {
      if (timeOut()) {
        // 跳转到登录页
        await store.dispatch('logout')
        router.push('/login')
        // 返回一个错误对象
        return Promise.reject(new Error('登录过期'))
      } else {
        config.headers.Authorization = user.token
      }
    }

    //config是本次请求的请求配置对象,一定要返回
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  function (res) {
    // 如果是验证码请求没有success
    // if (res.data.success === undefined) {
    //   return res.config.url
    // }
    // 对返回的数据进行解构，如果成功就返回数据
    // const { msg, success } = res.data
    // if (success) {
    //   return res.data
    // }
    // 失败就抛出错误
    // return Promise.reject(new Error(msg))
    return res
  },
  async function (error) {
    // 后端判断token过期的情况
    if (error.response?.status === 401) {
      // 跳转到登录页
      await store.dispatch('logout')
      router.push('/login')
      Message.error('登录过期，请重新登录')
    } else {
      // console.log(error.message)
      Message.error(error.message)
    }

    return Promise.reject(error)
  },
)

export default service
