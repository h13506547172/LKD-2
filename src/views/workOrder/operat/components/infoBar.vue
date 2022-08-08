<template>
  <div class="info-bar">
    <div class="btns">
      <addButton @click.native="addPopShow"></addButton>
      <Vbutton title="工单配置" @click.native="showPopupconfig"></Vbutton>
    </div>
    <!-- 数据列表区域 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="num" label="序号" width="80"> </el-table-column>
      <el-table-column prop="taskCode" label="工单编号"> </el-table-column>
      <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
      <el-table-column prop="taskName" label="工单类型"> </el-table-column>
      <el-table-column prop="createType" label="工单方式"> </el-table-column>
      <el-table-column prop="taskStatus" label="工单状态"> </el-table-column>
      <el-table-column prop="username" label="运营人员"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <a
            href="javascript:;"
            class="infoBtn"
            @click="detailsShow(scope.$index)"
            >查看详情</a
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="block">
      <span class="demonstration"
        >共{{ total }}条记录 第 {{ currentPage1 }}/{{ totalPage }} 页</span
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
    <!-- 弹出层工单配置 -->
    <el-dialog title="工单配置" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="configForm" label-width="100px">
        <el-form-item label="补货警戒线：">
          <el-input
            type="number"
            v-model="configForm.num"
            class="iptcenter"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setAutoSupplyConfigFn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 弹出层新增配置 -->
    <addPop
      ref="addPop"
      :addDialogVisible="addDialogVisible"
      @addShow="addDialogVisible = $event"
    ></addPop>
    <!-- 工单详细 -->
    <operatDetail
      :operatDetailShow="operatDetailShow"
      :passTaskStatus="passTaskStatus"
      :passTaskId="passTaskId"
      @closeDetail="operatDetailShow = $event"
      @loadPage="getOperatList(this.currentPage1)"
      @createShow="createShowFn"
    ></operatDetail>
  </div>
</template>

<script>
import addButton from '@/components/button/addButton.vue'
import Vbutton from '@/components/button/Vbutton.vue'
import addPop from './addPop.vue'
import operatDetail from './operatDetail.vue'
import {
  getOperatListAPI,
  setAutoSupplyConfigAPI,
  getAutoSupplyConfigAPI,
} from '@/api/operat'
// 时间处理
import moment from 'moment'
export default {
  name: 'detail',
  props: {
    searchCondition: {
      type: Object,
    },
  },
  components: {
    addButton,
    Vbutton,
    addPop,
    operatDetail,
  },
  data() {
    return {
      tableData: [],
      // 分页
      currentPage1: 1,
      total: 1,
      totalPage: 100,
      // 获取的数据
      currentPageRecords: [],
      // 工单方式/创建类型
      createType: {
        0: '自动',
        1: '手动',
      },
      // 工单状态 taskStatus
      taskStatus: {
        1: '待办',
        2: '进行',
        3: '取消',
        4: '完成',
      },
      // 弹出层工单配置
      dialogVisible: false,
      configForm: {
        num: 0,
      },
      // 新增工单弹出层
      addDialogVisible: false,
      // 工单详细弹出层
      operatDetailShow: false,
      passTaskStatus: '',
      passTaskId: '',
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
      this.total = +res.data.totalCount
      this.totalPage = res.data.totalPage
      this.currentPageRecords = res.data.currentPageRecords
      let num1 = (this.currentPage1 - 1) * 10
      // 清空列表数据
      this.tableData = []
      this.currentPageRecords.forEach((item) => {
        num1++
        this.tableData.push({
          num: num1,
          taskCode: item.taskCode,
          innerCode: item.innerCode,
          // 工单类型
          taskName: item.taskType.typeName,
          // 工单方式
          createType: this.createType[item.createType],
          // 工单状态
          taskStatus: this.taskStatus[item.taskStatus],
          username: item.userName,
          createTime: moment(item.createTime).format('YYYY.MM.DD hh:mm:ss'),
          taskId: item.taskId,
        })
      })
    },
    async prevClickFn(page) {
      this.currentPage1 = page
      await this.getOperatList(page)
    },
    async nextClickFn(page) {
      this.currentPage1 = page
      await this.getOperatList(page)
    },
    // 设置自动补货阀值
    async setAutoSupplyConfigFn() {
      await setAutoSupplyConfigAPI(+this.configForm.num)
      this.dialogVisible = false
      await getOperatList(1)
    },
    // 获取补货阈值
    async showPopupconfig() {
      this.dialogVisible = true
      const res = await getAutoSupplyConfigAPI()
      // console.log(res)
      this.configForm.num = res.data
    },
    // 显示新增弹出层
    addPopShow() {
      this.addDialogVisible = true
    },
    // 显示详情
    detailsShow(index) {
      // 传递详情数据
      this.passTaskId = this.tableData[index].taskId
      this.passTaskStatus = this.tableData[index].taskStatus
      this.operatDetailShow = true
    },
    // 重新创建
    async createShowFn(taskId) {
      // console.log(taskId)
      await this.$refs.addPop.againCreate(taskId)
      this.addDialogVisible = true
    },
  },
  watch: {
    searchCondition: {
      deep: true,
      async handler(val) {
        // console.log(val)
        await this.getOperatList(1, val.taskCode, val.status)
      },
    },
    'configForm.num'(val) {
      // console.log(val);
      if (val < 0 || val > 100) {
        this.configForm.num = 0
      }
    },
  },
}
</script>

<style lang="less" scoped>
.iptcenter {
  text-align: center;
  /deep/ .el-input__inner {
    text-align: center;
  }
}
.iptBtns {
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  span {
    border: 1px solid #ccc;
    flex: 1;
  }
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
  .infoBtn {
    color: #5f84ff;
  }
}
</style>
