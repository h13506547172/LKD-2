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

/**
 * 点位搜索
 * @param {*} params
 *pageIndex
 *pageSize
 *name			    点位名称
 *regionId			区域id
 * @returns
 */
export function getNodeListApi(params) {
  return request({
    url: `vm-service/node/search`,
    method: 'GET',
    params,
  })
}

/**
 * 商圈列表
 * @param {*} params
 * @returns
 */
export function getBusinessTypeApi() {
  return request({
    url: `vm-service/businessType`,
    method: 'GET',
  })
}

/**
 * 合作商搜索
 * @returns
 */
export function getPartnerListApi() {
  return request({
    url: `user-service/partner/search`,
    method: 'GET',
    params: { pageSize: 100000 },
  })
}

/**
 * 新增点位
 * @param {*} paramsdata
 *name	          名称
 *addr	          详细地址
 *areaCode	      	最后一级区域Id
 *createUserId    创建人Id
 *regionId	      所属区域Id
 *businessId	    	所属商圈Id
 *ownerId	        合作商Id
 *ownerName	      	合作商名称
 * @returns
 */
export function addNodeApi(data) {
  return request({
    url: `vm-service/node`,
    method: 'POST',
    data,
  })
}

/**
 * 修改点位
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function editNodeApi(id, data) {
  return request({
    url: `vm-service/node/${id}`,
    method: 'PUT',
    data,
  })
}

/**
 * 点位详情
 * @param {*} id
 * @returns
 */
export function getVmListApi(id) {
  return request({
    url: `vm-service/node/vmList/${id}`,
    method: 'GET',
  })
}

/**
 * 删除点位
 * @param {*} id
 * @returns
 */
export function delNodeApi(id) {
  return request({
    url: `vm-service/node/${id}`,
    method: 'DELETE',
  })
}

/**
 * 合作商搜索
 * @param {*} params
 * @returns
 */
export function getPartnerList(params) {
  return request({
    url: `user-service/partner/search`,
    method: 'GET',
    params,
  })
}

/**
 * 新增合作商
 * @param {*} data
 * @returns
 */
export function addPartner(data) {
  return request({
    url: `user-service/partner`,
    method: 'POST',
    data,
  })
}

/**
 * 修改合作商
 * @param {*} id
 * @returns
 */
export function editPartner(id, data) {
  return request({
    url: `user-service/partner/${id}`,
    method: 'PUT',
    data,
  })
}

/**
 * 重置合作商密码
 * @param {*} id
 * @returns
 */
export function resetPartnerPassWord(id) {
  return request({
    url: `user-service/partner/resetPwd/${id}`,
    method: 'PUT',
  })
}

/**
 * 删除合作商
 * @param {*} id
 * @returns
 */

export function delPartner(id) {
  return request({
    url: `user-service/partner/${id}`,
    method: 'DELETE',
  })
}
