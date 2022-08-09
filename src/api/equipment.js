import request from '@/utils/request'

/**
 * 搜索售货机(售货机列表)
 * @param {*} params
 * @returns
 */
export function getVmList(params) {
  return request({
    url: `vm-service/vm/search`,
    method: 'GET',
    params,
  })
}

/**
 * 获取一定时间范围之内的订单总数
 * @param {*} params
 * @returns
 */
export function getOrderCount(params) {
  return request({
    url: `order-service/report/orderCount`,
    method: 'GET',
    params,
  })
}

//获取一定时间范围之内的收入
export function getOrderAmount(params) {
  return request({
    url: `order-service/report/orderAmount`,
    method: 'GET',
    params,
  })
}

/**
 * 获取售货机补货次数
 * @param {*} innerCode 设备编号
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @returns
 */
export function getSupplyCount(innerCode, start, end) {
  return request({
    url: `task-service/task/supplyCount/${innerCode}/${start}/${end}`,
    method: 'GET',
  })
}

/**
 * 获取售货机维修次数
 * @param {*} innerCode 设备编号
 * @param {*} start 开始日期
 * @param {*} end 结束日期
 * @returns
 */
export function getRepairCount(innerCode, start, end) {
  return request({
    url: `task-service/task/repairCount/${innerCode}/${start}/${end}`,
    method: 'GET',
  })
}

/**
 * 获取售货机商品销量
 * @param {*} innerCode
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function getSkuCollect(innerCode, start, end) {
  return request({
    url: `order-service/report/skuCollect/${innerCode}/${start}/${end}`,
    method: 'GET',
  })
}
