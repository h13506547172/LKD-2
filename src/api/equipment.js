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