<template>
  <div class="info-bar">
    <div class="btns">
      <addButton @click.native="addFn"></addButton>
      <Vbutton title="批量操作" @click.native="getpolicyList"></Vbutton>
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
    <!-- 弹出层批量操作 -->
    <el-dialog
      title="批量操作"
      :visible.sync="batchShow"
      width="40%"
      :before-close="closeBatchFn"
      class="dialog"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="活动区域">
          <el-select v-model="currentStrategy" placeholder="请策略">
            <el-option
              v-for="item in strategyForm"
              :key="item.policyId"
              :label="item.policyName"
              :value="item.policyId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmStrategyFn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹出层新增设备 -->
    <el-dialog
      title="新增设备"
      :visible.sync="addDialogShow"
      width="40%"
      :before-close="closeAddDialog"
    >
      <el-form ref="form" :model="addEquipmentForm" label-width="80px">
        <el-form-item label="设备编号">
          <div>系统自动生成</div>
        </el-form-item>
        <el-form-item label="选择型号">
          <el-select placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位">
          <el-select placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addDialogShow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addButton from '@/components/button/addButton.vue'
import Vbutton from '@/components/button/Vbutton.vue'
import { applyPolicyAPI, getpolicyListAPI, getVMListAPI } from '@/api/equipment'
export default {
  props: {
    innerCode: {
      type: String || Number,
    },
  },
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
      // 选中的列表
      selectList: [],
      // 批量操作弹出层
      batchShow: false,
      // 策略列表
      strategyForm: [],
      currentStrategy: '',
      // 新增设备
      addDialogShow: false,
      addEquipmentForm: {},
    }
  },

  async created() {
    await this.getVMList(this.currentPage)
  },

  methods: {
    // 获取数据
    async getVMList(page, innerCode) {
      const res = await getVMListAPI(page, innerCode)
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
    async prevClickFn(page) {
      this.currentPage = page
      await this.getVMList(page)
    },
    async nextClickFn(page) {
      this.currentPage = page
      await this.getVMList(page)
    },
    selectionChangeFn(sec) {
      // 选中的数据
      this.selectList = sec
    },
    // 获取策略列表
    async getpolicyList() {
      if (this.selectList.length > 0) {
        const res = await getpolicyListAPI()
        // console.log(res)
        this.strategyForm = res.data
        this.batchShow = true
      } else {
        this.$message.warning('请勾选售货机')
      }
    },
    // 关闭批量操作
    closeBatchFn() {
      this.batchShow = false
    },
    // 确认策略
    async confirmStrategyFn() {
      // console.log(this.currentStrategy)
      let innerCodeList = []
      this.selectList.forEach((item) => {
        innerCodeList.push(item.innerCode)
      })
      // 发送请求更改策略并更新数据
      await applyPolicyAPI({
        innerCodeList: innerCodeList,
        policyId: this.currentStrategy,
      })
      this.batchShow = false
      await getVMList(this.currentPage)
    },
    // 关闭新增设备对话框
    closeAddDialog() {
      this.addDialogShow = false
    },
    // 新增设备
    addFn() {
      this.addDialogShow = true
    },
  },
  watch: {
    // 搜索设备
    innerCode(val) {
      this.getVMList(1, val)
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
  // .dialog {
  //   .el-select {
  //     width: 100%;
  //   }
  // }
  .el-select {
    width: 100%;
  }
}
</style>
