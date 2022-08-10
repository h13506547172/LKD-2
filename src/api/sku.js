import request from '@/utils/request'
// sku  商品管理模块   /vm-service/sku/search

// pageIndex	否
// pageSize	否
// skuName	否		商品名称
// classId	否		商品类别Id
/**
 *商品管理模块
 *商品搜索
 * @param {object} params
 * @returns promise
 */
export function getSkuSearchList(params) {
  return request({
    url: '/vm-service/sku/search',
    method: 'get',
    params,
  })
}

// /vm-service/skuClass/search

/**
 * 商品类型搜索
 * @returns promise
 */
export function getTypeSearch() {
  return request({
    url: '/vm-service/skuClass/search',
    method: 'get',
  })
}

// /vm-service/sku
/**
 *新建
 * @param {*} data
 * @returns
 */
export function setCreate(data) {
  return request({
    url: '/vm-service/sku',
    method: 'post',
    data,
  })
}

// /vm-service/sku/upload
/**
 *导入数据
 * @param {*} fileName 文件名
 * @returns
 */
export function transfromData(fileName) {
  return request({
    url: '/vm-service/sku/upload',
    method: 'post',
    fileName,
  })
}

// /vm-service/sku/:skuId
/**
 * 修改商品
 * @param {*} skuId
 * @returns promise
 */
export function reviseData(skuId, data) {
  return request({
    url: '/vm-service/sku/' + skuId,
    method: 'PUT',
    data,
  })
}

//上传图片

export function uploadImage(fileName) {
  return request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    data: fileName,
  })
}
