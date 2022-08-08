import request from '@/utils/request'

export function getSkuSearchList(params) {
  return request({
    url: '/vm-service/sku/search',
    method: 'get',
    params,
  })
}
