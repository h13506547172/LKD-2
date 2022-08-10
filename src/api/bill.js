import request from '@/utils/request'

// /order-service/report/partnerCollect
// partnerName	否		合作商名称
//       start	是	2020-01-01	开始日期时间
//       end	是	2020-01-01	结束日期时间
//       pageIndex	是
//       pageSize

/**
 *获取一定日期范围之内的合作商分成汇总数据
 * @param {*} params
 * @returns Promise
 */
export function getPartnerCollect(params) {
  return request({
    url: '/order-service/report/partnerCollect',
    method: 'get',
    params,
  })
}

//  /api/order-service/report/totalBill
// partnerId	否		合作商Id
// start	是	2020-01-01 12:00:00	开始日期时间
// end	是	2020-01-01 12:00:00	结束日期时间

/**
 *获取一定时间范围之内的分成总数
 * @param {*} params
 * @returns Promise
 */
export function getTotalBill(params) {
  return request({
    url: '/order-service/report/totalBill',
    method: 'get',
    params,
  })
}

// /order-service/report/orderAmount
// partnerId	否		合作商Id
// start	是	2020-01-01 00:00:00	开始日期时间
// end	是	2020-01-01 00:00:00	结束日期时间
// innerCode	否		售货机编号
/**
 * 获取一定时间范围之内的收入
 * @param {*} params
 * @returns Promise
 */
export function getOrderAmount(params) {
  return request({
    url: '/order-service/report/orderAmount',
    method: 'get',
    params,
  })
}

// 获取一定时间范围之内的订单总数
// /order-service/report/orderCount
// partnerId	否		合作商Id
// start	是	2020-01-01 00:00:00	开始日期时间
// end	是	2020-01-01 00:00:00	结束日期时间
// innerCode	否		售货机编号
export function getOrderCount(params) {
  return request({
    url: '/order-service/report/orderCount',
    method: 'get',
    params,
  })
}

// 合作商搜索
/**
 * 合作商搜索
 * @param {*} params
 * @returns Promise
 */
export function getPartner(params) {
  return request({
    url: '/user-service/partner/search',
    method: 'get',
    params,
  })
}
