<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 商品搜索 -->
      <div class="search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="策略搜索：">
            <el-input v-model.trim="form.searchName" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="goodSearchFn"
              @keydown.enter="goodSearchFn"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="result">
        <div class="operation">
          <!-- 按钮 -->
          <repeatButton type="success" size="large" @layclick="createFn">
            <span class="el-icon-search"></span>
            新建</repeatButton
          >
          <!-- 弹框 S-->
          <el-dialog
            :title="titleName"
            :visible="dialogVisible"
            :before-close="handleClose"
            class="dialogVisible"
            @close="createClose"
          >
            <!-- form    :rules="formRules"-->
            <el-form ref="form" :model="form" label-width="80px" class="dialog">
              <el-form-item label="策略名称" prop="name">
                <el-input v-model="strategyForm.name" placeholder="请输入">
                </el-input>
              </el-form-item>
              <el-form-item label="策略方案" style="position: relative">
                <el-input-number
                  v-model="strategyForm.methods"
                  controls-position="right"
                  style="width: 400px"
                  placeholder="请输入"
                ></el-input-number>
              </el-form-item>
            </el-form>
            <!-- footer -->
            <span slot="footer" class="dialog-footer">
              <span
                slot="footer"
                class="dialog-footer operation"
                style="justify-content: center"
              >
                <repeatButton
                  type="taskMake"
                  size="large"
                  @layclick="dialogVisible = false"
                  >取消</repeatButton
                >
                <repeatButton type="success" size="large" @layclick="onSaveFn">
                  确定</repeatButton
                >
              </span>
            </span>
          </el-dialog>
          <!-- 弹框 E-->
        </div>
        <!--  Q运营列表 -->
        <TaskList :tableData="tableData">
          <el-table-column type="index" prop label="序号"> </el-table-column>
          <el-table-column prop="policyName" label="策略名称">
          </el-table-column>
          <el-table-column prop="discount" label="策略方案"> </el-table-column>
          <el-table-column prop="createTime" label="创建日期">
            <template v-slot="scope">
              <span>{{ scope.row.createTime.replace(/T/gi, ' ') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="查看详情 修改 删除" label="操作">
            <template v-slot="scope">
              <!-- reviseFn  修改 -->
              <el-button type="text" size="small" @click="detailFn(scope.row)"
                >查看详情</el-button
              >
              <el-button type="text" size="small" @click="reviseFn(scope.row)"
                >修改</el-button
              >
              <el-button type="text" size="small" @click="deleteFn(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </TaskList>
        <div class="pagination-container">
          <el-row type="flex">
            <el-col>
              <div>
                共
                <span> {{ results.totalCount }}</span>
                条记录 第<span>{{ pageIndex }}/{{ results.totalPage }}</span
                >页
              </div></el-col
            >
            <el-col style="width: 340px">
              <el-button
                @click="prePage"
                style="background: #edf0f9; color: #d8dde3"
                >上一页</el-button
              >
              <el-button @click="nextPage" style="background: #d5ddf8"
                >下一页</el-button
              >
            </el-col>
          </el-row>
        </div>
        <el-dialog
          title="策略详情"
          :visible.sync="detailvisible"
          width="50%"
          :before-close="handleClose"
          @close="closeFn"
        >
          <span>策略名称:{{ detailName }}</span>
          <TaskList :tableData="detailStrategyList" v-if="detailStrategyList">
            <el-table-column
              type="index"
              :index="indexMethod"
              prop
              label="序号"
            >
            </el-table-column>
            <el-table-column prop="innerCode" label="策略名称">
            </el-table-column>
            <el-table-column prop="nodeName" label="策略方案">
            </el-table-column>
          </TaskList>
          <!-- 下一页   -->
          <div class="pagination-container">
            <el-row type="flex">
              <el-col>
                <div>
                  共
                  <span> {{ detailResults.totalCount }}</span>
                  条记录 第<span
                    >{{ pageIndex }}/{{ detailResults.totalPage }}</span
                  >页
                </div></el-col
              >
              <el-col style="width: 340px">
                <el-button
                  @click="handleSizeChange"
                  style="background: #edf0f9; color: #d8dde3"
                  >上一页</el-button
                >
                <el-button
                  @click="handleCurrentChange"
                  style="background: #d5ddf8"
                  >下一页</el-button
                >
              </el-col>
            </el-row>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'
// api
import {
  getStrategyList,
  getStrategySearch,
  deleteStrategy,
  detailStrategy,
  newStrategy,
  reviseStrategy,
} from '@/api/strategy'
import repeatButton from '@/components/repeatButton/index.vue'

export default {
  data() {
    return {
      tableData: [],
      results: {},
      pageIndex: 1,
      // 新建弹框
      dialogVisible: false,
      // 搜索
      form: { searchName: '' },

      taskMakeContent: { cordon: '' },
      // 分页
      currentPage: 1,
      detailStrategyList: [],
      // 详情
      detailvisible: false,
      detailName: '',
      currentId: '',
      strategyForm: { name: '', methods: '' },
      titleName: '策略名称',
      policyId: '',
      listpageIndex: 1,
      detailResults: [],
    }
  },
  components: {
    TaskList,
    repeatButton,
  },
  created() {
    this.getStrategyList()
  },
  methods: {
    // 查看详情--页码的设置
    indexMethod(index) {
      return (this.pageIndex - 1) * 10 + index + 1
    },
    onSubmit() {
      console.log('submit!')
    },
    handleClose(done) {
      done()
    },

    // 获取基本列表
    async getStrategyList() {
      // // pageIndex
      // pageSize
      const res = await getStrategyList({
        pageIndex: this.listpageIndex,
        pageSize: 10,
      })
      // console.log(res)
      this.tableData = res.data.currentPageRecords
      this.results = res.data
      this.listpageIndex = this.results.pageIndex
    },
    // 上一页
    async prePage() {
      this.listpageIndex--
      if (this.pageIndex < 1) return
      const res = await getStrategyList({
        pageIndex: this.listpageIndex,
        pageSize: 10,
      })
      this.tableData = res.data.currentPageRecords
    },
    async nextPage() {
      this.listpageIndex++
      const res = await getStrategyList({
        pageIndex: this.listpageIndex,
        pageSize: 10,
      })
      this.tableData = res.data.currentPageRecords
    },
    //搜索功能
    async goodSearchFn() {
      const res = await getStrategySearch({
        pageIndex: this.pageIndex,
        pageSize: 10,
        policyName: this.form.searchName,
      })
      // console.log(res)
      this.tableData = res.data.currentPageRecords
      this.results = res.data
      this.listpageIndex = this.results.pageIndex
    },
    // 删除
    async deleteFn(val) {
      // console.log(val)
      try {
        await deleteStrategy(val.policyId, {
          pageIndex: this.pageIndex,
          pageSize: 10,
          policyName: val.policyName,
        })
      } catch (e) {}
      this.getStrategyList()
    },
    //查看详情http://likede2-admin.itheima.net/likede/api/vm-service/policy/vmList/1?pageIndex=1&pageSize=10
    // /vm-service/policy/vmList/:policyId
    // 点击叉号，关闭
    handleClose(done) {
      done()
    },
    async detailFn(val) {
      this.detailvisible = true
      this.detailName = val.policyName
      this.currentId = val.policyId
      // console.log(this.currentId)
      try {
        const res = await detailStrategy(this.currentId, this.pageIndex, 10)
        this.detailStrategyList = res.data.currentPageRecords
        this.detailResults = res.data
        this.pageIndex = this.detailResults.pageIndex
        // console.log(this.detailStrategyList) //1\序号  2、innerCode  3、 nodeName
      } catch (e) {}
    },
    // 点击上一页、、下一页
    //上一页 // 分页
    async handleSizeChange() {
      // console.log(this.currentId) //当前的id
      this.pageIndex--
      if (this.pageIndex < 1) return
      const res = await detailStrategy(this.currentId, this.pageIndex, 10)
      this.detailStrategyList = res.data.currentPageRecords
    },
    //下一页 // 分页
    async handleCurrentChange() {
      this.pageIndex++
      // console.log(this.pageIndex)
      const res = await detailStrategy(this.currentId, this.pageIndex, 10)
      // console.log(res)
      this.detailStrategyList = res.data.currentPageRecords
    },
    //点击 新建
    async createFn() {
      this.dialogVisible = true
      this.titleName = '新增策略'
    },

    //点击 修改
    async reviseFn(val) {
      this.titleName = '修改策略'
      this.dialogVisible = true
      // console.log(val)
      // 回显数据
      this.strategyForm.name = val.policyName
      this.strategyForm.methods = val.discount
      this.policyId = val.policyId
    },
    // onsave 确定
    async onSaveFn() {
      if (this.titleName === '新增策略') {
        const res = await newStrategy(
          this.strategyForm.name,
          this.strategyForm.methods,
        )
        // console.log(res)
        this.getStrategyList()
      } else {
        const res = await reviseStrategy(
          this.policyId,
          this.strategyForm.name,
          this.strategyForm.methods,
        )
        this.getStrategyList()
        // console.log(res)
        this.strategyForm = { name: '', methods: '' }
      }
      this.dialogVisible = false
    },
    // 详情
    closeFn() {
      this.detailvisible = false
    },
    createClose() {
      this.dialogVisible = false
      this.strategyForm = { name: '', methods: '' }
    },
  },
}
</script>

<style scoped lang="less">
.app-container .result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .operation {
    margin-bottom: 20px;
    display: flex;
    .el-button {
      width: 80px !important;
      height: 36px;
      padding: 0;
      border: none;
    }
    .newCreate {
      background: linear-gradient(135deg, #f9b37a, #ff5e20) !important;
      margin-right: 10px;
    }
  }
}
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}

.el-dialog__wrapper .el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #fff;
  border-radius: 20px;
  box-sizing: border-box;
  width: 630px;
  height: 484px;
}
.dialogVisible {
  // .el-dialog .el-dialog__body .el-form-item .el-form-item__content {
  //   width: 396px;
  // }
  .arrow-up {
    position: absolute;
    right: 13px;
    top: 0;
    background-color: #eee;
    width: 25px;
    height: 15px;
    text-align: center;
  }
  .arrow-down {
    position: absolute;
    right: 13px;
    top: 24px;
    background-color: #eee;
    width: 25px;
    height: 15px;
    text-align: center;
  }
}
.search {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 15px;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
