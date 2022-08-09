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
        <template #default="scope">
          <a
            href="javascript:;"
            class="blue"
            @click="openChannelConfig(scope.$index)"
            >货道
          </a>
          <a href="javascript:;" @click="getVmPolicy(scope.$index)" class="blue"
            >策略
          </a>
          <a
            href="javascript:;"
            class="blue"
            @click="showChangeData(scope.$index)"
            >修改</a
          >
        </template>
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
    <!-- 弹出层批量操作  -->
    <el-dialog
      :title="!curData.innerCode ? '批量操作' : '策略管理'"
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
          <el-select v-model="addEquipmentForm.vmType" placeholder="请选择">
            <el-option
              v-for="item in vmTypeList"
              :key="item.typeId"
              :label="item.name"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位">
          <el-select v-model="addEquipmentForm.nodeId" placeholder="请选择">
            <el-option
              v-for="item in nodeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addVmFn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹出层策略管理 -->
    <el-dialog
      title="策略管理"
      :visible.sync="strategicShow"
      width="40%"
      :before-close="closeStrategicShow"
    >
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机器编号">
              <div>{{ curData.innerCode }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="策略名称">
              <div>{{ curData.policyName }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="策略方案">
              <div>1%</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelStrategic(curData.innerCode, curData.policyId)"
          >取消策略</el-button
        >
      </span>
    </el-dialog>
    <!-- 弹出层修改设备 -->
    <el-dialog
      title="修改设备"
      :visible.sync="changeDataShow"
      width="40%"
      :before-close="closeChangeDataShow"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="机器编号">
          <div>{{ VmInfoForm.innerCode }}</div>
        </el-form-item>
        <el-form-item label="供货时间">
          <div>{{ VmInfoForm.updateTime }}</div>
        </el-form-item>
        <el-form-item label="设备类型">
          <div>{{ VmInfoForm.type ? VmInfoForm.type.name : '' }}</div>
        </el-form-item>
        <el-form-item label="设备容量">
          <div>
            {{ VmInfoForm.type ? VmInfoForm.type.channelMaxCapacity : 'xx' }}
          </div>
        </el-form-item>
        <el-form-item label="设备点位">
          <el-select v-model="curNode" placeholder="请选择活动区域">
            <el-option
              v-for="item in VmInfoForm.nodeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作商">
          <div>{{ VmInfoForm.ownerName }}</div>
        </el-form-item>
        <el-form-item label="所属区域">
          <div>{{ VmInfoForm.region ? VmInfoForm.region.name : 'xx' }}</div>
        </el-form-item>
        <el-form-item label="设备地址">
          <div>{{ VmInfoForm.node ? VmInfoForm.node.name : '' }}</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeChangeDataShow">取 消</el-button>
        <el-button type="primary" @click="changeNodeFn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 货道设置 -->
    <channelConfig
      :channelConfigShow="channelConfigShow"
      @closeChannel="channelConfigShow = $event"
      :vmTypeInfo="vmTypeInfo"
      :ChannelList="ChannelList"
      :VmInfoForm="VmInfoForm"
      @delGoods="delGoodsFn"
      @update="updateFn"
      ref="child"
    ></channelConfig>
  </div>
</template>

<script>
import addButton from '@/components/button/addButton.vue'
import Vbutton from '@/components/button/Vbutton.vue'
import channelConfig from './channelConfig.vue'
import {
  addVmAPI,
  applyPolicyAPI,
  cancelPolicyAPI,
  changeNodeAPI,
  getChannelListAPI,
  getNodeListAPI,
  getpolicyListAPI,
  getVMListAPI,
  getVmPolicyAPI,
  getVmTypeInfoAPI,
  getVmTypeListAPI,
  nodeSearchAPI,
} from '@/api/equipment'
export default {
  props: {
    innerCode: {
      type: String || Number,
    },
  },
  components: {
    addButton,
    Vbutton,
    channelConfig,
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
      // 选中的设备策略信息
      curData: {},
      curInnerCode: '',
      // 新增设备
      addDialogShow: false,
      addEquipmentForm: {
        createUserId: this.$store.state.userInfo.userId,
        nodeId: '',
        vmType: '',
      },
      // 设备类型列表
      vmTypeList: [],
      nodeList: [],
      // 策略管理弹出层
      strategicShow: false,
      // 修改设备
      changeDataShow: false,
      VmInfoForm: {},
      curNode: '',
      // 货道配置
      channelConfigShow: false,
      vmTypeInfo: {},
      // 货道商品列表
      ChannelList: [],
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
      if (this.selectList.length > 0 || !this.curData.innerCode) {
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
      // 如果选中某个策略
      if (!this.curData.innerCode) {
        innerCodeList.push(this.curInnerCode)
      } else {
        this.selectList.forEach((item) => {
          innerCodeList.push(item.innerCode)
        })
      }
      // 发送请求更改策略并更新数据
      await applyPolicyAPI({
        innerCodeList: innerCodeList,
        policyId: this.currentStrategy,
      })
      this.batchShow = false
      this.curData = {}
      this.curInnerCode = ''
      await getVMList(this.currentPage)
    },
    // 关闭新增设备对话框
    closeAddDialog() {
      this.addDialogShow = false
    },
    // 新增设备
    async addFn() {
      const res = await getNodeListAPI()
      const res2 = await getVmTypeListAPI()
      this.vmTypeList = res2.data.currentPageRecords
      this.nodeList = res.data.currentPageRecords
      this.addDialogShow = true
    },
    async addVmFn() {
      await addVmAPI(this.addEquipmentForm)
      this.addDialogShow = false
      await this.getVMList(this.currentPage)
    },
    // 获取商品策略
    async getVmPolicy(index) {
      const res = await getVmPolicyAPI(this.tableData[index].innerCode)
      this.curInnerCode = this.tableData[index].innerCode
      this.curData = res.data
      console.log(this.curData)
      // 如果策略不存在就添加策略，策略存在就显示策略
      if (!this.curData.innerCode) {
        this.getpolicyList()
      } else {
        this.strategicShow = true
      }
    },
    // 策略管理
    closeStrategicShow() {
      // 关闭
      this.strategicShow = false
    },
    // 取消策略
    async cancelStrategic(innerCode, policyId) {
      await cancelPolicyAPI(innerCode, policyId)
      this.strategicShow = false
      await this.getVMList(this.currentPage)
    },
    // 关闭设备修改
    closeChangeDataShow() {
      this.changeDataShow = false
    },
    // 显示设备修改
    async showChangeData(index) {
      this.VmInfoForm = this.tableData[index]
      // console.log(this.VmInfoForm)
      const res = await nodeSearchAPI()
      // console.log(res);
      this.VmInfoForm.nodeList = res.data.currentPageRecords
      this.changeDataShow = true
    },
    async changeNodeFn() {
      await changeNodeAPI(this.VmInfoForm.id, this.curNode)
      this.changeDataShow = false
      await this.getVMList(this.currentPage)
    },
    // 打开货道配置
    async openChannelConfig(index) {
      // 获得售货机详情
      this.VmInfoForm = this.tableData[index]
      // console.log(this.VmInfoForm)
      const res = await getVmTypeInfoAPI(this.VmInfoForm.type.typeId)
      // console.log(res)
      this.vmTypeInfo = res.data
      const res2 = await getChannelListAPI(this.VmInfoForm.innerCode)
      this.ChannelList = res2.data
      // console.log(this.ChannelList)
      this.channelConfigShow = true
    },
    // 删除商品
    delGoodsFn(channelCode) {
      const index = this.ChannelList.findIndex((item) => {
        return item.channelCode == channelCode
      })
      this.ChannelList[index].sku = {}
    },
    updateFn(curSku) {
      // console.log(curSku)
      // const index = this.ChannelList.findIndex((item) => {
      //   return item.skuId === curSku.skuId
      // })
      // console.log(curSku)
      // this.ChannelList[index].sku = curSku
      // console.log(this.ChannelList)
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
