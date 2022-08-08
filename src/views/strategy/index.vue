<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 商品搜索 -->
      <div class="search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="商品搜索">
            <el-input v-model.trim="form.searchName"></el-input>
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
      <!--  -->
      <div class="result">
        <div class="operation">
          <!-- 按钮 -->
          <repeatButton
            type="success"
            size="large"
            @layclick="dialogVisible = true"
          >
            <span class="el-icon-search"></span>
            新建</repeatButton
          >
          <repeatButton
            type="taskMake"
            size="large"
            @layclick="taskMake = true"
          >
            导入数据
          </repeatButton>
          <!-- 弹框 S-->
          <el-dialog
            title="新增工单"
            :visible="dialogVisible"
            :before-close="handleClose"
            style="width:630px height:484px"
            class="dialogVisible"
          >
            <el-form label-width="100px">
              <el-form-item
                label="设备编号"
                :rules="{
                  required: true,

                  trigger: 'blur',
                }"
              >
                <el-input
                  type="text"
                  placeholder="请输入内容"
                  v-model="Form.deviceNum"
                  maxlength="10"
                  show-word-limit
                ></el-input
              ></el-form-item>

              <el-form-item
                label="工单类型"
                :rules="{
                  required: true,

                  trigger: 'blur',
                }"
              >
                <el-select v-model="Form.type" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="补货数量">
                <el-button style="color: #5f84ff" icon="el-icon-edit-outline"
                  >补货清单</el-button
                >
              </el-form-item>
              <el-form-item
                label="运营人员"
                :rules="{
                  required: true,

                  trigger: 'blur',
                }"
              >
                <el-select v-model="Form.people" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="备注"
                prop="desc"
                :rules="{
                  required: true,

                  trigger: 'blur',
                }"
              >
                <el-input
                  type="textarea"
                  placeholder="请输入备注（不超过40字）"
                  v-model="Form.desc"
                  maxlength="30"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </el-form>

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
                <repeatButton
                  type="success"
                  size="large"
                  @layclick="dialogVisible = false"
                >
                  确定</repeatButton
                >
              </span>
            </span>
          </el-dialog>
          <!-- 弹框 E-->

          <!-- 弹框 S-->
          <el-dialog
            title="工单配置"
            :visible="taskMake"
            :before-close="taskMakeFn"
            style="width:630px height:484px"
            class="dialogVisible"
          >
            <span slot="footer" class="dialog-footer">
              <span
                slot="footer"
                class="dialog-footer operation"
                style="justify-content: center"
              >
                <repeatButton
                  type="taskMake"
                  size="large"
                  @layclick="taskMake = false"
                  >取消</repeatButton
                >
                <repeatButton
                  type="success"
                  size="large"
                  @layclick="taskMake = false"
                >
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
          <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
          <el-table-column prop="taskType.typeName" label="工单类型">
          </el-table-column>
          <el-table-column prop="createType" label="工单方式">
          </el-table-column>
          <el-table-column
            prop="taskStatusTypeEntity.statusName"
            label="工单状态"
          >
          </el-table-column>
          <el-table-column prop="userName" label="运营人员"> </el-table-column>
          <el-table-column prop="createTime" label="创建日期">
          </el-table-column>
          <el-table-column prop="查看详情" label="操作"> </el-table-column>
        </TaskList>

        <!-- A底部 -->
        <div class="pagination-container">
          <el-row type="flex">
            <el-col>
              <div>
                共
                <span> {{ results.totalCount }}</span>
                条记录 第<span
                  >{{ results.pageIndex }}/{{ results.totalPage }}</span
                >页
              </div></el-col
            >
            <el-col :span="5">
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
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'
// api
import repeatButton from '@/components/repeatButton/index.vue'
export default {
  data() {
    return {
      tableData: [],
      results: {},
      pageIndex: 1,
      dialogVisible: false,
      taskMake: false,
      form: { searchName: '' },
      // 表单
      Form: {
        deviceNum: '',
        type: '',
        people: '',
        desc: '',
        list: '',
      },
      taskMakeContent: { cordon: '' },
      // 分页
      currentPage: 1,
    }
  },
  components: {
    TaskList,
    repeatButton,
  },
  created() {
    this.taskSearch()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    taskMakeFn(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // // 获取列表
    taskSearch() {
      //   const res = await taskSearch({ pageIndex: this.pageIndex })
      //   this.results = res.data
      //   // console.log(this.results)
      //   this.tableData = res.data.currentPageRecords
      //   // console.log(this.results.pageIndex)
      //   this.pageIndex = this.results.pageIndex
    },

    // // 分页
    handleSizeChange() {
      this.pageIndex--
      if (this.pageIndex < 1) return
      console.log(this.pageIndex)
      const res = this.taskSearch({ pageIndex: this.pageIndex })
      this.tableData = res.data.currentPageRecords
      console.log(this.tableData)
    },
    handleCurrentChange() {
      console.log(this.pageIndex)
      this.pageIndex++
      this.taskSearch({ pageIndex: this.pageIndex })
      console.log(this.tableData)
    },
    // 搜索
    goodSearchFn() {
      //
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
.dialogVisible {
  :deep(.el-dialog) {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 630px;
    height: 484px;
  }
  .el-dialog .el-dialog__body .el-form-item .el-form-item__content {
    width: 396px;
  }
}
</style>
