import request from '@/utils/request'
/**
 *pageIndex		
 *pageSize			
 *orderNo		
 *startDate	
 *endDate

 * @param {Object} params 
 * @returns 
 */

export function orderSearchList(params) {
  return request({
    url: '/order-service/order/search',
    method: 'get',
    params,
  })
}
