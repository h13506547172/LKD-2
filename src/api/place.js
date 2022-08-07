import request from '@/utils/request'

/**
 * 区域列表
 * @param {*} params
 *  pageIndex	当前页码
 *  pageSize	每页数据个数
 *  name	    区域名称
 * @returns
 */
export function getPlaceList(params) {
  return request({
    url: 'vm-service/region/search',
    method: 'get',
    params,
  })
}

/**
 * 新增区域
 * @param {*} data
 *    regionName	区域名称
 *    remark	     备注
 * @returns
 */
export function addPlaceListApi(data) {
  return request({
    url: 'vm-service/region',
    method: 'POST',
    data,
  })
}

/**
 * 点位搜索(获取区域详情)
 * @param {*} regionId 区域Id
 * @returns
 */
export function getPlaceInfoApi(regionId) {
  return request({
    url: 'vm-service/node/search',
    method: 'GET',
    params: { regionId },
  })
}

/**
 * 修改区域
 * @param {*} id
 * @returns
 */
export function editPlaceInfoApi(id, data) {
  return request({
    url: `vm-service/region/${id}`,
    method: 'PUT',
    data,
  })
}

/**
 * 删除区域
 * @param {*} id
 * @returns
 */
export function delPlaceApi(id) {
  return request({
    url: `vm-service/region/${id}`,
    method: 'DELETE',
  })
}
