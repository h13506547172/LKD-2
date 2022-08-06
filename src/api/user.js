import request from '@/utils/request'

// 登录，获取用户基本信息
export function loginAPI(data) {
  return request({
    url: '/user-service/user/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json'},
    data
  })
}

// 获取验证码图片
export const getCodeImgAPI = (clientToken) => {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`,
    method: 'GET',
  })
}

// 获取用户详细信息
export const getUserInfoAPI = (id) => {
  return request({
    url: `/user-service/user/${id}`,
    method: 'GET',
  })
}