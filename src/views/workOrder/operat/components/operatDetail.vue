<template>
  <el-dialog
    title="工单详情"
    :visible="operatDetailShow"
    width="40%"
    :before-close="closeFn"
  >
    <!-- 取消工单 -->
    <div v-if="passTaskStatus === '取消'">
      <!-- 取消工单头部 -->
      <div class="task-status">
        <img src="~@/assets/image/下载 (2).png" alt="" class="icon" />
        <span class="status">取消</span>
        <img src="~@/assets/image/pic_3.e8208e34.png" alt="" class="pic" />
      </div>
      <!-- 取消工单表格 -->
      <el-row :gutter="24">
        <el-form label-width="80px">
          <el-col :span="12">
            <el-form-item label="设备编号">
              <div>{{ detailInfo.innerCode }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期">
              <div>{{ detailInfo.createTime }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="完成日期">
              <div>{{ detailInfo.updateTime }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营人员">
              <div>{{ detailInfo.userName }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单类型">
              <div>
                {{
                  detailInfo.taskType
                    ? detailInfo.taskType.typeName
                    : '补货工单'
                }}
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补货数量">
              <a
                href="javascript:;"
                style="color: #5f84ff"
                @click="getTaskDetailsFn"
                >补货详细</a
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单方式">
              <div>{{ detailInfo.createType == 0 ? '自动' : '手动' }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="取消原因"> </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <!-- 完成工单 -->
    <div v-else-if="passTaskStatus === '完成'">
      <!-- 完成工单头部 -->
      <div class="task-status">
        <img src="~@/assets/image/完成.png" alt="" class="icon" />
        <span class="status">完成</span>
        <img src="~@/assets/image/完成111.png" alt="" class="pic" />
      </div>
      <!-- 完成工单表格 -->
      <el-row :gutter="24">
        <el-form label-width="80px">
          <el-col :span="12">
            <el-form-item label="设备编号">
              <div>{{ detailInfo.innerCode }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期">
              <div>{{ detailInfo.createTime }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="完成日期">
              <div>{{ detailInfo.updateTime }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营人员">
              <div>{{ detailInfo.userName }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单类型">
              <div>
                {{
                  detailInfo.taskType
                    ? detailInfo.taskType.typeName
                    : '补货工单'
                }}
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补货数量">
              <a
                href="javascript:;"
                style="color: #5f84ff"
                @click="getTaskDetailsFn"
                >补货详细</a
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单方式">
              <div>{{ detailInfo.createType == 0 ? '自动' : '手动' }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <div>{{ detailInfo.desc }}</div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <!-- 代办工单 -->
    <div v-else>
      <!-- 代办工单头部 -->
      <div class="task-status">
        <img src="~@/assets/image/代办.png" alt="" class="icon" />
        <span class="status">代办</span>
        <img src="~@/assets/image/代办111.png" alt="" class="pic" />
      </div>
      <!-- 代办工单表格 -->
      <el-row :gutter="24">
        <el-form label-width="80px">
          <el-col :span="12">
            <el-form-item label="设备编号">
              <div>{{ detailInfo.innerCode }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建日期">
              <div>{{ detailInfo.createTime }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营人员">
              <div>{{ detailInfo.userName }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单类型">
              <div>
                {{
                  detailInfo.taskType
                    ? detailInfo.taskType.typeName
                    : '补货工单'
                }}
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="补货数量">
              <a
                href="javascript:;"
                style="color: #5f84ff"
                @click="getTaskDetailsFn"
                >补货详细</a
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单方式">
              <div>{{ detailInfo.createType == 0 ? '自动' : '手动' }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <div>{{ detailInfo.desc }}</div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer" v-if="passTaskStatus === '取消'">
      <el-button @click="againCreate">重新创建</el-button>
    </span>
    <span
      slot="footer"
      class="dialog-footer"
      v-else-if="passTaskStatus === '待办'"
    >
      <el-button @click="cancelFn">取消工单</el-button>
    </span>
    <!-- 补货详情弹出框 -->
    <el-dialog
      title="补货详细"
      :visible.sync="taskDetailsShow"
      width="30%"
      :before-close="closeTaskDetails"
      :modal="false"
      class="box"
    >
      <el-scrollbar style="height: 100%" wrap-style="overflow-x:hidden;">
        <el-table :data="taskDetailsData" style="width: 100%" class="height">
          <el-table-column prop="channelCode" label="货道编号">
          </el-table-column>
          <el-table-column prop="skuName" label="商品"> </el-table-column>
          <el-table-column prop="expectCapacity" label="补货数量">
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { cancelAPI, getTaskDetailsAPI, getTaskInfoAPI } from '@/api/operat'
export default {
  props: {
    operatDetailShow: {
      type: Boolean,
      required: true,
    },
    // 工单id
    passTaskId: {
      type: String || Number,
      required: true,
    },
    // 工单类型
    passTaskStatus: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      detailInfo: {},
      // 控制补货详情的弹出框
      taskDetailsShow: false,
      // 补货详细数据
      taskDetailsData: [],
    }
  },
  methods: {
    // 关闭页面
    closeFn() {
      this.$emit('closeDetail', false)
    },
    // 发送请求获取详情数据
    async getTaskInfo() {
      const res = await getTaskInfoAPI(this.passTaskId)
      // console.log(res)
      this.detailInfo = res.data
      // console.log(this.detailInfo)
    },
    // 查看补货详情
    async getTaskDetailsFn() {
      const res = await getTaskDetailsAPI(this.passTaskId)
      // console.log(res)
      this.taskDetailsData = res.data
      this.taskDetailsShow = true
    },
    // 关闭补货详情
    closeTaskDetails() {
      this.taskDetailsShow = false
    },
    // 取消工单
    async cancelFn(done) {
      try {
        await this.$confirm('确认取消工单？')
        await cancelAPI(this.passTaskId)
        this.closeFn()
        // 刷新页面
        this.$emit('loadPage')
      } catch (error) {
        console.log(error)
      }
    },
    // 重新创建
    againCreate(){
      this.$emit('createShow',this.passTaskId)
    }
  },
  watch: {
    async passTaskId() {
      await this.getTaskInfo()
    },
  },
}
</script>

<style lang="less" scoped>
.task-status {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
  .icon {
    margin-left: 22px;
  }
  .status {
    flex: 1;
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
  .pic {
    margin-right: 76px;
    margin-bottom: 7px;
  }
}
/deep/ .el-form-item {
  margin-bottom: 0px;
}

/deep/ .el-dialog__footer {
  text-align: center;
}
.height {
  height: 400px;
}
.box {
  /deep/ .el-dialog__body {
    height: 400px;
  }
}
</style>
