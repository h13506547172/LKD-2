import request from '@/utils/request'

// pageIndex
// pageSize
// policyName
export function getStrategyList(params) {
  return request({
    url: '/vm-service/policy/search',
    method: 'get',
    params,
  })
}
///vm-service/policy/search  get  搜索
// pageIndex	是
// pageSize	是
// policyName
export function getStrategySearch(params) {
  return request({
    url: '/vm-service/policy/search',
    method: 'get',
    params,
  })
}
// /api/vm-service/policy/:policyId   DELETE  删除
/**
 * 删除
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function deleteStrategy(id, data) {
  return request({
    url: '/vm-service/policy/' + id,
    method: 'DELETE',
    data,
  })
}
//查看详情http://likede2-admin.itheima.net/likede/api/vm-service/policy/vmList/1?pageIndex=1&pageSize=10
// /vm-service/policy/vmList/:policyId
/**
 *查看详情
 * @param {*} id
 * @param {*} parmas  pageIndex	pageSize
 * @returns
 */
export function detailStrategy(id, pageIndex, pageSize) {
  return request({
    url: '/vm-service/policy/vmList/' + id,
    method: 'GET',
    params: {
      pageIndex,
      pageSize,
    },
  })
}
// 新建
/**
 * 新增策略
 * @param {*} policyName 	策略名
 * @param {*} discount 折扣值
 * @returns promise
 */
export function newStrategy(policyName, discount) {
  return request({
    url: '/vm-service/policy',
    method: 'post',
    data: {
      policyName,
      discount,
    },
  })
}
// 修改  /vm-service/policy/:policyId   修改
/**
 * 修改策略
 * @param {*} id
 * @param {*} policyName 	策略名
 * @param {*} discount 折扣值
 * @returns promise
 */
export function reviseStrategy(id, policyName, discount) {
  return request({
    url: '/vm-service/policy/' + id,
    method: 'PUT',
    data: {
      policyName,
      discount,
    },
  })
}
