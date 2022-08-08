import request from '@/utils/request'

/**
 * 获取运维工单列表
 * @param {*} 页码
 * @param {*} 工单编号
 * @param {*} 工单状态
 * @returns
 */
export function getOperationListAPI(pageIndex, taskCode, status) {
  return request({
    url: '/task-service/task/search',
    method: 'get',
    params: {
      pageIndex,
      taskCode,
      status,
      pageSize: 10,
      isRepair: true,
    },
  })
}

// 获取维修人员名单  
export function getrepairerListAPI(innerCode) {
  return request({
    url: '/user-service/user/repairerList/' + innerCode,
    method: 'get',
  })
}