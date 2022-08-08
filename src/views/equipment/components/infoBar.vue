<template>
  <div class="info-bar">
    <div class="btns">
      <addButton></addButton>
      <Vbutton title="批量操作"></Vbutton>
    </div>
    <!-- 数据列表区域 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="selectionChangeFn"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="num" label="序号" width="80"> </el-table-column>
      <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
      <el-table-column prop="type.name" label="设备型号"> </el-table-column>
      <el-table-column prop="node.addr" label="详细地址"> </el-table-column>
      <el-table-column prop="ownerName" label="合租商"> </el-table-column>
      <el-table-column prop="vmStatus" label="设备状态"> </el-table-column>
      <el-table-column label="操作" width="150">
        <a href="javascript:;" class="blue">货道 </a>
        <a href="javascript:;" class="blue">策略 </a>
        <a href="javascript:;" class="blue">修改</a>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="block">
      <span class="demonstration"
        >共{{ total }}条记录 第 {{ currentPage }}/{{ totalPage }} 页</span
      >
      <el-pagination
        @prev-click="prevClickFn"
        @next-click="nextClickFn"
        :current-page.sync="currentPage"
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
import { getVMListAPI } from '@/api/equipment'
export default {
  components: {
    addButton,
    Vbutton,
  },
  data() {
    return {
      tableData: [],
      // 分页
      currentPage: 1,
      total: 955,
      totalPage: 100,
      vmStatus: {
        0: '未投放',
        1: '运营',
        3: '撤机',
      },
    }
  },

  async created() {
    await this.getOperatList()
  },

  methods: {
    // 获取数据
    async getOperatList() {
      const res = await getVMListAPI(this.currentPage)
      // console.log(res.data);
      this.total = +res.data.totalCount
      this.totalPage = +res.data.totalPage
      let num = (this.currentPage - 1) * 10
      this.tableData = res.data.currentPageRecords
      this.tableData.forEach((item) => {
        num++
        item.num = num
        item.vmStatus = this.vmStatus[item.vmStatus]
      })
    },
    prevClickFn(cur) {
      this.currentPage = cur
    },
    nextClickFn(cur) {
      console.log(cur)
    },
    selectionChangeFn(sec) {
      console.log(sec)
    },
  },
}
</script>

<style lang="less" scoped>
.blue {
  color: #8184ff;
}
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
