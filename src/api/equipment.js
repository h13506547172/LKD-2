import request from '@/utils/request'

/**
 *
 * @param {*} 页码
 * @param {*} 设备编号
 * @returns
 */
export function getVMListAPI(pageIndex, innerCode) {
  return request({
    url: 'vm-service/vm/search',
    method: 'get',
    params: {
      pageIndex,
      innerCode,
      pageSize: 10,

    },
  })
}

// 策略列表  /vm-service/policy
export function getpolicyListAPI() {
  return request({
    url: '/vm-service/policy',
    method: 'get',
  })
}

// 确认策略 

export function applyPolicyAPI(data) {
  return request({
    url: '/vm-service/vm/applyPolicy',
    method: 'post',
    data
  })
}