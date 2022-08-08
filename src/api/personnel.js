// 人员管理列表

import request from '@/utils/request'
export function getPersonnel(pageIndex,pageSize,userName){
    return request({
        url:'/user-service/user/search?',
        params:{pageIndex,pageSize,userName}
    })
}

// 修改人员/user-service/user/:id
export function editDeptsApi(data){
    return request({
      url:'/user-service/user/' + data.id,
      method:'PUT',
      data,
    })
  }
// 新增/user-service/user
export function AddPersonnel(data){
    return request({
        url:'/user-service/user',
        method:'POST',
        data
    })
}
// 删除人员
export function delPersonnel(id){
    return request({
        url:'/user-service/user/'+id,
        method:'DELETE',
    })
}

// 工作量列表、
export function getPersonnelWork(){
    return request({
        url:'/user-service/user/searchUserWork'
    })
}


// 商品搜索列表

export function getVmservice(){
    return request({
        url:'/vm-service/skuClass/search'
    })
}