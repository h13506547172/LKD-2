import request from '@/utils/request'

/**
 *
 * @param {*} 页码
 * @param {*} 工单编号
 * @param {*} 工单状态
 * @returns
 */
export function getOperatListAPI(pageIndex, taskCode, status) {
  return request({
    url: '/task-service/task/search',
    method: 'get',
    params: {
      pageIndex,
      taskCode,
      status,
      pageSize: 10,
      isRepair: false,
    },
  })
}
/**
 * 设置补货阀值
 * @param {*} alertValue 数字1-100
 * @returns
 */
export function setAutoSupplyConfigAPI(alertValue) {
  return request({
    url: '/task-service/task/autoSupplyConfig',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      alertValue,
    },
  })
}

//  获取补货预警值

export function getAutoSupplyConfigAPI() {
  return request({
    url: '/task-service/task/supplyAlertValue',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  })
}

// 工单创建 /task-service/task/create
/**
 *
 * @param {*} data: userId工单负责人id
 * createType：1
 * desc描述信息
 * details补货信息
 * innerCode设备id
 * productType：2 补货工单
 *
 * @returns
 */
export function createOrderAPI(data) {
  return request({
    url: '/task-service/task/create',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data,
  })
}

/**
 * 根据售货机获取运营人员列表
 * @param {*} innerCode 
 * @returns 
 */
export function getOperatorListAPI(innerCode) {
  return request({
    url: '/user-service/user/operatorList/' + innerCode,
    method: 'get',
  })
}

// 获取售货机货道详情
export function getChannelListAPI(innerCode) {
  return request({
    url: '/vm-service/channel/channelList/' + innerCode,
    method: 'get',
  })
}