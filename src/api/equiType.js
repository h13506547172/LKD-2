import request from '@/utils/request'
/**
 * 售货机类型列表(搜索) 
 * @param pageIndex 
 * @param name 
 * @returns 
 */
export function getvmTypeListAPI(pageIndex,name) {
  return request({
    url: '/vm-service/vmType/search',
    method: 'get',
    params: {
      pageIndex,
      pageSize: 10,
      name
    }
  })
}

// 售货机类型删除 /vm-service/vmType/:typeId
export function delvmTypeListAPI(typeId) {
  return request({
    url: '/vm-service/vmType/' + typeId,
    method: 'DELETE',
  })
}

// 新建 /vm-service/vmType
export function addvmAPI(data) {
  return request({
    url: '/vm-service/vmType',
    method: 'POST',
    data
  })
}