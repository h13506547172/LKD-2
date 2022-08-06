import request from '@/utils/request'

/**
 * 
 * @param {*} 页码
 * @param {*} 工单编号
 * @param {*} 工单状态
 * @returns 
 */
export function getOperatListAPI(pageIndex,taskCode,status) {
  return request({
    url: '/task-service/task/search',
    method: 'get',
    params: {
      pageIndex,
      taskCode,
      status,
      pageSize: 10, 
      isRepair: false
    }
  })
}
