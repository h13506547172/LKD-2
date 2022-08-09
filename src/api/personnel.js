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
export function getPersonnelWork(pageIndex,pageSize,userName,isRepair){
    return request({
        url:'/user-service/user/searchUserWork',
        params:{pageIndex,pageSize,userName,isRepair}
    })
}
export function getDataWork(start,end){
    return request({
        url:'/task-service/task/taskReportInfo/' + start + '/' + end,
    })
}
 
// 获取工作量详情/user-service/user/    /task-service/task/taskReportInfo/:start/:end
export function detailsApi(id){
return request({
    url:'/user-service/user/'+id
})
}

// 商品搜索列表

export function getVmservice(pageIndex,pageSize,className){
    return request({
        url:'/vm-service/skuClass/search',
        params:{pageIndex,pageSize,className}
    })
}
// 新增商品类型
export function Addcommodity(data){
    return request({
        url:'/vm-service/skuClass',
        method:'POST',
        data
    })
}
// 商品类型搜索
export function getProductsearch(pageIndex,pageSize,className){
    return request({
        url:'/vm-service/skuClass/search',
        params:{pageIndex,pageSize,className}
    })
}
// 修改商品类型
export function modifyApi(id,className){
    return request({
        url:'/vm-service/skuClass/'+ id,
        method:'PUT',
        data:{className}
    })
}
// 删除商品类型
export function delDeptsApi(id) {
    return request({
      url: "/vm-service/skuClass/" + id,
      method: "DELETE",
    });
  }