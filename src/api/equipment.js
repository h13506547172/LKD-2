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
/**
 * 点位搜索
 * @returns 
 */ 
export function getNodeListAPI() {
  return request({
    url: '/vm-service/node/search',
    method: 'get',
  })
}
/**
 * 售货机类型列表(搜索)
 * @returns 
 */ 
export function getVmTypeListAPI() {
  return request({
    url: '/vm-service/vmType/search',
    method: 'get',
  })
}

// 新增售货机 /vm-service/vm
export function addVmAPI(data) {
  return request({
    url: '/vm-service/vm',
    method: 'post',
    data
  })
}
/**
 * 查询售货机策略 
 * @param {*} innerCode 
 * @returns 
 */
export function getVmPolicyAPI(innerCode) {
  return request({
    url: '/vm-service/policy/vmPolicy/'+ innerCode,
    method: 'get',
  })
}

// 取消策略 /vm-service/vm/cancelPolicy/:innerCode/:policyId
export function cancelPolicyAPI(innerCode,policyId) {
  return request({
    url: `/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'put',
  })
}

// 点位搜索 vm-service/node/search
export function nodeSearchAPI() {
  return request({
    url: '/vm-service/node/search',
    method: 'get',
    params: {
      pageIndex: 1,
      pageSize:10000
    }
  })
}

// 修改供货机点位 /api/vm-service/vm/:id/:nodeId
export function changeNodeAPI(id,nodeId) {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: 'put',
  })
}

/**
 * 售货机类型详情
 * @returns 
 */
export function getVmTypeInfoAPI(typeId) {
  return request({
    url: '/vm-service/vmType/' + typeId,
    method: 'get',
  })
}

/**
 * 获取售货机货道详情
 * @param {*} innerCode 
 * @returns 
 */
export function getChannelListAPI(innerCode) {
  return request({
    url: '/vm-service/channel/channelList/' + innerCode,
    method: 'get',
  })
}

// 补货推荐 /api/vm-service/sku/businessTop10/:businessId
export function boycottGoodsAPI(businessId) {
  return request({
    url: '/vm-service/sku/businessTop10/' + businessId,
    method: 'get',
  })
}
// 当前地区属于什么商圈 /vm-service/businessType/name/
export function getBusinessTypeAPI(businessId) {
  return request({
    url: '/vm-service/businessType/name/' + businessId,
    method: 'get',
  })
}

// 货道配置 
export function channelConfigAPI(innerCode,channelList) {
  return request({
    url: '/vm-service/channel/channelConfig',
    method: 'PUT',
    data: {
      innerCode,
      channelList
    }
  })
}

/**
 * 商品搜索
 * @param {*} pageIndex ,skuName
 * @returns 
 */
export function getvmServiceAPI(pageIndex, skuName) {
  return request({
    url: '/vm-service/sku/search',
    method: 'get',
    params: {
      pageIndex,
      pageSize: 10,
      skuName
    }
  })
}