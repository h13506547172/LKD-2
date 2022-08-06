<template>
  <div class="info-bar">
    <div class="btns">
      <addButton></addButton>
      <Vbutton title="工单配置"></Vbutton>
    </div>
    <!-- 数据列表区域 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="num" label="序号" width="80"> </el-table-column>
      <el-table-column prop="taskCode" label="工单编号"> </el-table-column>
      <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
      <el-table-column prop="taskName" label="工单类型"> </el-table-column>
      <el-table-column prop="taskStatus" label="工单方式"> </el-table-column>
      <el-table-column prop="createType" label="工单状态"> </el-table-column>
      <el-table-column prop="username" label="运营人员"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column prop="caozo" label="操作" width="100">
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="block">
      <span class="demonstration"
        >共{{ total }}条记录 第 {{ currentPage1 }}/{{totalPage}} 页</span
      >
      <el-pagination
        @prev-click="prevClickFn"
        @next-click="nextClickFn"
        :current-page.sync="currentPage1"
        :page-size="10"
        layout="prev, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import addButton from '@/components/button/addButton.vue'
import Vbutton from '@/components/button/Vbutton.vue'
import { getOperatListAPI } from '@/api/operat'
export default {
  components: {
    addButton,
    Vbutton,
  },
  data() {
    return {
      tableData: [
        // {
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄',
        // },
        // {
        //   date: '2016-05-04',
        //   name: '王小虎xx',
        //   address: '上海市普陀区金沙江路 1517 弄',
        // },
        // {
        //   date: '2016-05-01',
        //   name: '王xx',
        //   address: '上海市普陀区金沙江路 1519 弄',
        // },
        // {
        //   date: '2016-05-03',
        //   name: '王小虎xx',
        //   address: '上海市普陀区金沙江路 1516 弄',
        // },
      ],
      // 分页
      currentPage1: 1,
      total: 1,
      totalPage: 100,
      // 获取的数据
      currentPageRecords: []
    }
  },

  async created() {
    await this.getOperatList(this.currentPage1)
  },

  methods: {
    // 获取工单列表数据
    async getOperatList(pageIndex, taskCode, status) {
      const res = await getOperatListAPI(pageIndex, taskCode, status)
      // console.log(res)
      this.total = res.data.totalCount
      this.totalPage = res.data.totalPage
      this.currentPageRecords = res.data.currentPageRecords
      let num1 = (this.currentPage1 - 1)*10
      this.currentPageRecords.forEach((item) =>{
        num1++
        this.tableData.push({
          num: num1,
          taskCode: item.taskCode,
          innerCode: item.innerCode,
          // 工单类型
          taskName: item.taskType.typeName,
          // 工单方式
          createType: item.createType,
          // 工单状态
          taskStatus: item.taskStatus,
          username: item.userName,
          createTime: item.createTime,
          caozo: '查看详细'
        })
      })
      
    },
    prevClickFn(cur) {
      console.log(cur)
    },
    nextClickFn(cur) {
      console.log(cur)
    },
  },
}
</script>

<style lang="less" scoped>
.info-bar {
  background-color: #fff;
  width: 100%;
  min-height: 500px;
  padding: 20px 15px 19px 17px;
  .btns {
    margin-bottom: 20px;
  }
  .block {
    display: flex;
    justify-content: space-between;
    /deep/ .btn-prev {
      color: #606266;
      min-width: 30px;
      width: 70px;
      height: 32px;
      margin: 0 16px;
      border-radius: 2px;
      background-color: #d5ddf8;
    }
    /deep/ button:disabled {
      background-color: #d8dde3 !important;
    }
    /deep/ .btn-next {
      color: #606266;
      min-width: 30px;
      width: 70px;
      height: 32px;
      margin: 0 16px;
      border-radius: 2px;
      background-color: #d5ddf8;
    }
  }
}
</style>
