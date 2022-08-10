<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 商品搜索 -->
      <div class="ordersearch" style="display: flex">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="订单编号:">
            <el-input
              v-model.trim="form.number"
              placeholder="请输入订单编号"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 日期 -->

        <div class="time">
          <span class="demonstration">选择日期:</span>
          <el-date-picker
            v-model="form.timeDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <repeatButton icon="el-icon-search" type="search" @layclick="searchFn"
          >搜索</repeatButton
        >
      </div>

      <!--  -->
      <div class="result">
        <!--  Q运营列表 -->
        <TaskList :tableData="tableData">
          <el-table-column type="index" :index="indexMethod" prop label="序号">
          </el-table-column>
          <el-table-column prop="orderNo" label="订单编号"> </el-table-column>
          <el-table-column prop="skuName" label="商品名称"> </el-table-column>
          <el-table-column prop="price" label="订单金额">
            <template v-slot="scope">
              {{ (scope.row.price / 100).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
          <el-table-column prop="status" label="订单状态">
            <template v-slot="scope">
              {{ scope.row.status | formStatus }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="订单日期">
            <template v-slot="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column prop label="操作">
            <template v-slot="scope">
              <a href="#" style="color: #4368e1" @click="detailFn(scope.row)"
                >查看详情</a
              >
            </template>
          </el-table-column>
        </TaskList>
        <!-- 弹框 -->
        <el-dialog
          class="orderDialog"
          title="订单详情"
          :visible.sync="orderVisible"
          width="50%"
          :before-close="orderClose"
          style="border-radius: 10px"
        >
          <div class="pic">
            <div>
              <img
                v-if="list.status === 2"
                src="../../assets/image/weixin.png"
                alt=""
              />
              <img
                v-else-if="list.status === 0"
                src="../../assets/image/下载 (3)出货失败.png"
                alt=""
              />
              <span v-if="list.status === 2">出货成功</span>
              <span v-else-if="list.status === 0">未支付</span>
            </div>
            <div>
              <img
                v-if="list.status === 2"
                src="../../assets/image/pic.png"
                alt=""
              />
              <img
                v-else-if="list.status === 0"
                src="../../assets/image/失败出货.png"
                alt=""
              />
            </div>
          </div>
          <!-- list -->
          <div class="list">
            <el-row>
              <!-- left -->
              <el-col :span="12"
                ><div class="grid-content bg-purple">
                  <el-row class="left" type="flex">
                    <el-col :span="6"
                      ><div class="grid-content bg-purple">
                        <span> 订单编号 : </span>
                        <span class="num">{{ list.orderNo }}</span>
                      </div></el-col
                    >
                    <el-col :span="6"
                      ><div class="grid-content bg-purple-light">
                        <span> 设备编号 : </span>
                        <span>{{ list.innerCode }}</span>
                      </div></el-col
                    >
                    <el-col :span="6"
                      ><div class="grid-content bg-purple">
                        <span> 完成时间 : </span>
                        <span>{{ list.updateTime }}</span>
                      </div></el-col
                    >
                    <el-col :span="6"
                      ><div class="grid-content bg-purple-light">
                        <span> 设备地址 : </span>
                        <span>{{ list.regionName }}</span>
                      </div></el-col
                    >
                  </el-row>
                </div></el-col
              >

              <!-- right  -->
              <el-col :span="12"
                ><div class="grid-content bg-purple-light">
                  <el-row class="right" type="flex">
                    <el-col :span="6"
                      ><div
                        class="grid-content bg-purple"
                        style="display: flex"
                      >
                        <span> 商品名称 : </span>
                        <span>{{ list.skuName }}</span>
                      </div></el-col
                    >
                    <el-col :span="6"
                      ><div class="grid-content bg-purple-light">
                        <span> 订单金额 : </span>
                        <span>{{ list.price / 100 }}</span>
                      </div></el-col
                    >
                    <el-col :span="6"
                      ><div class="grid-content bg-purple">
                        <span> 创建时间 : </span>
                        <span>{{ list.createTime }}</span>
                      </div></el-col
                    >
                    <el-col :span="6"
                      ><div class="grid-content bg-purple-light">
                        <span> 支付方式 : </span>
                        <span>{{ list.status | formStatus }}</span>
                      </div></el-col
                    >
                  </el-row>
                </div></el-col
              >
            </el-row>
          </div>
        </el-dialog>
        <!-- A底部 -->
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
            <el-col :span="5" style="width: 340px">
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
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'
// api
import { orderSearchList } from '@/api/order'
import repeatButton from '@/components/repeatButton/index.vue'
export default {
  data() {
    return {
      form: {
        number: '',
        timeDate: '',
      },
      tableData: [],
      dialogVisible: false,
      results: {},
      pageIndex: 1,
      // 默认数据
      orderVisible: false,
      list: {},
    }
  },
  components: {
    TaskList,
    repeatButton,
  },
  created() {
    this.orderSearchList()
  },
  filters: {
    formStatus(val) {
      if (val === 0) {
        return '未支付'
      } else if (val === 1) {
        return '支付完成'
      } else if (val === 2) {
        return '出货成功'
      } else if (val === 3) {
        return '出货失败'
      }
    },
  },
  methods: {
    indexMethod(index) {
      return (this.pageIndex - 1) * 10 + index + 1
    },
    // L: http://likede2-admin.itheima.net/likede/api/order-service/order/search?pageIndex=1&pageSize=10&startDate=2022-08-09&endDate=2022-08-13
    // 获取列表
    async orderSearchList() {
      const res = await orderSearchList({
        pageIndex: this.pageIndex,
        pageSize: 10,
        orderNo: this.form.number ? this.form.number : null,
        startDate: this.form.timeDate[0] ? this.form.timeDate[0] : null,
        endDate: this.form.timeDate[1] ? this.form.timeDate[1] : null,
      })
      // console.log(res.data)
      this.results = res.data
      this.pageIndex = res.data.pageIndex
      this.tableData = res.data.currentPageRecords
    },
    // // 分页
    async prePage() {
      this.pageIndex--
      if (this.pageIndex < 1) return
      const res = await orderSearchList({
        pageIndex: this.pageIndex,
        pageSize: 10,
        orderNo: this.form.number ? this.form.number : null,
        startDate: this.form.timeDate[0] ? this.form.timeDate[0] : null,
        endDate: this.form.timeDate[1] ? this.form.timeDate[1] : null,
      })
      this.tableData = res.data.currentPageRecords
    },
    async nextPage() {
      this.pageIndex++
      const res = await orderSearchList({
        pageIndex: this.pageIndex,
        pageSize: 10,
        orderNo: this.form.number ? this.form.number : null,
        startDate: this.form.timeDate[0] ? this.form.timeDate[0] : null,
        endDate: this.form.timeDate[1] ? this.form.timeDate[1] : null,
      })
      this.tableData = res.data.currentPageRecords
    },

    // 搜索
    async searchFn() {
      this.pageIndex = 1
      const res = await orderSearchList({
        pageIndex: this.pageIndex,
        pageSize: 10,
        orderNo: this.form.number ? this.form.number : null,
        startDate: this.form.timeDate[0] ? this.form.timeDate[0] : null,
        endDate: this.form.timeDate[1] ? this.form.timeDate[1] : null,
      })

      console.log(res.data)
      this.results = res.data
      this.pageIndex = res.data.pageIndex
      this.tableData = res.data.currentPageRecords
    },
    //查看详情
    detailFn(val) {
      console.log(val)
      this.list = val
      this.orderVisible = true
    },
    // 弹框
    orderClose(done) {
      done()
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
.orderDialog {
  :deep(.el-dialog) {
    border-radius: 10px;
    color: rgb(102, 102, 102);
    background-color: rgba(236, 236, 236, 0.39);
  }
  .pic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(236, 236, 236, 0.39);
    height: 54px;
    position: relative;
    padding: 0 76px 0 22px;
    margin-bottom: 30px;
    span {
      position: absolute;
      top: 17px;
      left: 58px;
    }
  }
  .left,
  .right {
    flex-direction: column;
    justify-content: center;
    .el-col-6 {
      height: 48px;
      width: 85%;
    }
  }
}
.ordersearch {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 15px;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
