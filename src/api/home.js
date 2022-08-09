import request from '@/utils/request'

/**
 * 获取当时工单汇总信息(人员统计头部信息)
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function getReportInfo(start, end) {
  return request({
    url: `task-service/task/taskReportInfo/${start}/${end}`,
    method: 'GET',
  })
}

/**
 * 获取一定时间范围之内的订单总数
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function getOrderCount(start, end) {
  return request({
    url: `order-service/report/orderCount`,
    method: 'GET',
    params: { start, end },
  })
}
/**
 * 获取一定时间范围之内的收入
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function getOrderAmount(start, end) {
  return request({
    url: `order-service/report/orderAmount`,
    method: 'GET',
    params: { start, end },
  })
}

/**
 * 获取销售额统计
 * @param {*} collectType
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function getAmountCollect(collectType, start, end) {
  return request({
    url: `order-service/report/amountCollect/${collectType}/${start}/${end}`,
    method: 'GET',
  })
}

/**
 * 根据地区汇总销售额数据(销售量分布)
 * @param {*} start
 * @param {*} end
 * @returns
 */
export function getRegionCollect(start, end) {
  return request({
    url: `order-service/report/regionCollect/${start}/${end}`,
    method: 'GET',
  })
}

export function getSkuTop(topValue, start, end) {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`,
    method: 'get',
  })
}

/**
 * 合作商点位汇总统计
 * @returns
 */
export function getNodeCollect() {
  return request({
    url: `vm-service/node/nodeCollect`,
    method: 'get',
  })
}

/**
 * 获取点位总数
 * @returns
 */
export function getNodeCount() {
  return request({
    url: `vm-service/node/count`,
    method: 'get',
  })
}

/**
 * 获取合作商总数
 * @returns
 */
export function getPartnerCount() {
  return request({
    url: `user-service/partner/count`,
    method: 'get',
  })
}
