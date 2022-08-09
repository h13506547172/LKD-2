<template>
  <div>
    <div class="box1">
      <!-- 工作量搜索 -->
      <el-card class="box-card">
        人员搜索：
        <el-input
          class="inputs"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        角色：
        <el-select
          v-model="isRepair"
          style="width: 14%"
          placeholder="请选择角色"
        >
          <el-option label="运营员" :value="false"></el-option>
          <el-option label="维修员" :value="true"></el-option>
        </el-select>
        <el-button
          class="btnnn"
          size="medium"
          type="primary"
          icon="el-icon-search"
          @click="queryFn"
          >查询</el-button
        >
      </el-card>
    </div>
    <!-- 列表 -->
    <el-card class="box-card">
      <el-table :data="tableData" :border="false" style="width: 100%">
        <el-table-column
          type="index"
          :index="indexpage"
          label="序号"
          width="80"
        >
        </el-table-column>
        <el-table-column prop="userName" label="人员名称" width="200">
        </el-table-column>
        <el-table-column prop="roleName" label="角色" width="200">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话" width="200">
        </el-table-column>
        <el-table-column prop="workCount" label="完成工单（本月）" width="200">
        </el-table-column>
        <el-table-column prop="progressTotal" label="进行中工单" width="200">
        </el-table-column>
        <el-table-column
          prop="cancelCount"
          label="拒绝工单（本月）"
          width="180"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template v-slot="scoped">
            <el-button type="text" size="small" @click="details(scoped.$index)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹框e -->
      <!-- Table -->
      <el-dialog title="人员详情" :visible.sync="dialogTableVisible">
        <div class="boxtext">
          <p><span>人员名称：{{deta.userName}}</span><span class="span1">角色：{{deta.roleName}}</span><span class="span1">联系电话：{{deta.regionId}}</span></p>
          <p><span>负责区域：{{deta.regionName}}</span></p>
        </div>
        <el-table :data="gridData" border>
          <el-table-column
            property="day"
            width="100"
          ></el-table-column>
           <el-table-column
            property="total"
            label="总工单数"
            width="100"
          ></el-table-column> <el-table-column
            property="cancelTotal"
            label="拒绝工单"
            width="100"
          ></el-table-column>
          <el-table-column
            property="completedTotal"
            label="完成工单"
            width="100"
          ></el-table-column>
          <el-table-column property="progress" label="进行中工单"></el-table-column>
        </el-table>
      </el-dialog>
      <!-- 弹框s -->
      <!-- 页码 -->
      <div class="Page">
        <div>
          共{{ datapage.totalCount }}条数据
          <span>{{ pageIndex }}/{{ datapage.totalPage }}页</span>
        </div>
        <el-button
          type="info"
          @click="previousFn"
          :disabled="pageIndex == 1 ? true : false"
          >上一页</el-button
        >
        <el-button
          type="info"
          @click="nextFn"
          :disabled="pageIndex == datapage.totalPage ? true : false"
          >下一页</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { getPersonnelWork, detailsApi,getDataWork } from '@/api/personnel'
export default {
  data() {
    return {
      tableData: [],
      input: '',
      pageIndex: 1,
      datapage: {},
      isRepair: '',
      dialogTableVisible: false,
      gridData: [],
      deta:{},
      str:{}
    }
  },
  created() {
    this.getPersonnelWork()
  },

  methods: {
    // 渲染
    async getPersonnelWork() {
      const res = await getPersonnelWork()
      console.log(res)
      this.tableData = res.data.currentPageRecords
      this.datapage = res.data
      // console.log(res.data.currentPageRecords)
    },
    // 页码
    indexpage(index) {
      return this.pageIndex * 10 - 9 + index
    },
    // 下一页
    async nextFn() {
      this.pageIndex++
      // console.log(this.pageIndex)
      const res = await getPersonnelWork(this.pageIndex, 10)
      this.tableData = res.data.currentPageRecords
      // this.pageIndex = res.data.pageIndex
    },
    // 上一页
    async previousFn() {
      this.pageIndex--
      const res = await getPersonnelWork(this.pageIndex, 10)
      this.tableData = res.data.currentPageRecords
    },
    // 详情
    async details(index) {
      this. dialogTableVisible = true
      const res = await detailsApi(this.tableData[index].userId)
      this.deta = res.data
      console.log(this.deta);
      const str1 = await getDataWork('2022-08-08 00:00:00','2022-08-09 23:59:59')
      const str2 = await getDataWork('2022-08-01 00:00:00','2022-08-09 23:59:59')
      const str3 = await getDataWork('2022-01-01 00:00:00','2022-08-09 23:59:59')
      if(this.deta.roleId === 2){
        this.gridData=[]
      str1.data[0].day = '天'
      str2.data[0].day = '月'
      str3.data[0].day= '年'
      str1.data[0].progress = '0'
      str2.data[0].progress = '0'
      str3.data[0].progress = '0'
      this.gridData.push(str1.data[0], str2.data[0], str3.data[0])
      console.log(this.gridData);
      } else{
        this.gridData=[]
      str1.data[1].day = '天'
      str2.data[1].day = '月'
      str3.data[1].day= '年'
      str1.data[1].progress = '0'
      str2.data[1].progress = '0'
      str3.data[1].progress = '0'
      this.gridData.push(str1.data[1], str2.data[1], str3.data[1])
      console.log(this.gridData);
      }
     
      // console.log(str1.data);
      // console.log(str2.data);
      // console.log(str3.data);
      // this.str = {...str1,...str2,...str3}
    },
    // 查询
    async queryFn() {
      const res = await getPersonnelWork(
        this.pageIndex,
        10,
        this.input,
        this.isRepair,
      )
      // console.log(res)
      this.tableData = res.data.currentPageRecords
    },
  },
}
</script>

<style lang="less" scoped>
.inputs {
  width: 200px;
  margin-right: 20px;
}
.box1 {
  margin-bottom: 30px;
}
.block {
  margin-left: 300px;
}
.el-pager li {
  padding: 0px 30px;
}
.box-card {
  margin-right: 20px;
}
.btnnn {
  margin-left: 20px;
}
// 页码
.Page {
  display: flex;
  align-items: center;
  margin: 20px 0;
  .butn {
    width: 60px;
    height: 30px;
    background-color: rgb(206, 206, 206);
    border: 0px;
    line-height: 30px;
    text-align: center;
    margin-left: 20px;
  }
}

// 弹框盒子
.boxtext{
  background-color: #eee;
  padding: 10px;
  margin-bottom: 20px;
  p{
    display: flex;
    .span1{
      margin-left: 60px;
    }
  }
}
</style>
