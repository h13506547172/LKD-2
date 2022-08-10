<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- header -->
      <div class="header">
        <el-row type="flex">
          <!-- 销售统计 -->
          <el-col :span="12" class="col-left">
            <div class="grid-content bg-purple">
              <div>
                <div>日销售统计</div>
                <el-row>
                  <el-col :span="8"
                    ><div class="grid-cont">
                      <h2>0</h2>
                      <p>当日销售量（个）</p>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-cont">
                      <h2>0</h2>
                      <p>当日销售额（元）</p>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-cont">
                      <h2>9</h2>
                      <p>当日分成（元）</p>
                    </div></el-col
                  >
                </el-row>
              </div>
            </div>
          </el-col>

          <el-col :span="12" class="col-right">
            <div class="grid-content bg-purple-light">
              <div>
                <div>月销售统计</div>
                <el-row>
                  <el-col :span="8"
                    ><div class="grid-cont">
                      <h2>{{ OrderCount }}</h2>
                      <p>当月销售量（个）</p>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-cont">
                      <h2>{{ (OrderAmount / 10000).toFixed(2) }}</h2>
                      <p>当月销售额（万元）</p>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-cont">
                      <h2>{{ TotalBill / 100 }}</h2>
                      <p>当月分成（元）</p>
                    </div></el-col
                  >
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- nav -->
      <el-card class="box-card">
        <!-- 合作商搜索 -->
        <div class="ordersearch" style="display: flex">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="合作商: " prop="region">
              <el-select v-model="form.name" placeholder="请选择">
                <el-option
                  v-for="item in getPartnerList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 日期 -->

          <div class="time">
            <span class="demonstration">日期: </span>
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

        <!-- 统计数据 -->
        <el-row class="data">
          <el-col :span="5"
            ><div class="grid-content bg-purple">
              <span>
                笔数统计：<i> {{ OrderCount }}</i> 个</span
              >
            </div></el-col
          >
          <el-col :span="7"
            ><div class="grid-content bg-purple-light">
              <span>
                收入统计：
                <i>{{ OrderAmount }}</i> 元</span
              >
            </div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <span>
                分成统计：
                <i> {{ TotalBill }}</i> 元</span
              >
            </div></el-col
          >
        </el-row>

        <!-- list -->
        <TaskList :tableData="PartnerCollectList">
          <el-table-column prop="date" label="订单日期"> </el-table-column>
          <el-table-column prop="ownerName" label="合作商"> </el-table-column>
          <el-table-column prop="ratio" label="分成比例">
            <template v-slot="scope">
              {{ scope.row.ratio }}<span>%</span>
            </template>
          </el-table-column>

          <el-table-column prop="orderTotalMoney" label="收入（元）">
            <template v-slot="scope">
              <span>+</span> {{ (scope.row.orderTotalMoney * 0.01).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="orderCount" label="笔数"> </el-table-column>
          <el-table-column prop="createTime" label="分成金额（元）">
            <template v-slot="scope">
              <span>+</span> {{ (scope.row.totalBill * 0.01).toFixed(2) }}
            </template>
          </el-table-column>
        </TaskList>
      </el-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import TaskList from '@/components/TaskList'
// API
import {
  getPartnerCollect,
  getTotalBill,
  getOrderAmount,
  getOrderCount,
  getPartner,
} from '@/api/bill'
import repeatButton from '@/components/repeatButton/index.vue'
export default {
  data() {
    return {
      form: {
        name: '',
        timeDate: [
          // moment().subtract(8, 'day').format('YYYY-MM-DD HH:mm:ss'),
          moment().format('YYYY-MM') + '-01',
          moment().format('YYYY-MM-DD HH:mm:ss'),
        ],
        // '2022-08-09',
      },
      tableData: [],
      // 初始数据
      PartnerCollectList: [],
      sumcount: 0,
      summoney: 0,
      totalBill: 0,
      //
      TotalBill: '',
      OrderAmount: '',
      OrderCount: '',
      getPartnerList: [],
    }
  },
  components: {
    repeatButton,
    TaskList,
  },
  created() {
    this.getPartnerCollect()
    this.getPartner()
    this.getTotalBill()
    this.getOrderAmount()
    this.getOrderCount()
  },

  computed: {},

  methods: {
    // 获取一定日期范围之内的合作商分成汇总数据
    // moment().format('YYYY-MM-DD HH:mm:ss')
    // : http://likede2-admin.itheima.net/likede/api/order-service/report/partnerCollect?pageIndex=1&pageSize=10&start=2022-08-01&end=2022-08-09
    async getPartnerCollect() {
      const res = await getPartnerCollect({
        pageSize: 100,
        start: moment().format('YYYY-MM') + '-01',
        end: moment().format('YYYY-MM-DD'),
      })
      // start: moment(this.form.timeDate[0]).format('YYYY-MM-DD HH:mm:ss'),
      //   end: moment(this.form.timeDate[1]).format('YYYY-MM-DD HH:mm:ss'),
      // console.log(res)
      this.PartnerCollectList = res.data.currentPageRecords
      this.PartnerCollectList.forEach((ele) => {
        this.sumcount = this.sumcount + ele.orderCount * 1
        this.summoney = this.summoney + ele.orderTotalMoney / 100
        this.totalBill = this.totalBill + ele.totalBill / 100
      })
    },
    async getTotalBill() {
      const res1 = await getTotalBill({
        start: moment(this.form.timeDate[0]).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(this.form.timeDate[1]).format('YYYY-MM-DD HH:mm:ss'),
      })
      this.TotalBill = res1.data
      // console.log(this.TotalBill)
    },

    async getOrderAmount() {
      const res2 = await getOrderAmount({
        start: moment(this.form.timeDate[0]).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(this.form.timeDate[1]).format('YYYY-MM-DD HH:mm:ss'),
      })
      this.OrderAmount = res2.data / 100
    },
    async getOrderCount() {
      const res3 = await getOrderCount({
        start: moment(this.form.timeDate[0]).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(this.form.timeDate[1]).format('YYYY-MM-DD HH:mm:ss'),
      })
      this.OrderCount = res3.data
    },

    //  获取一定时间范围之内的分成总数
    //  http://likede2-admin.itheima.net/likede/api/order-service/report/totalBill?start=2022-08-01+00:00:00&end=2022-08-09+23:59:59
    async searchFn() {
      console.log(moment(this.form.timeDate[0]).format('YYYY-MM-DD+HH:mm:ss'))

      const res = await getPartnerCollect({
        pageIndex: 1,
        pageSize: 10,
        partnerName: this.form.name,
        start: this.form.timeDate[0]
          ? moment(this.form.timeDate[0]).format('YYYY-MM-DD')
          : null,
        end: this.form.timeDate[1]
          ? moment(this.form.timeDate[1]).format('YYYY-MM-DD')
          : null,
      })
      console.log(res, this.form.name)
      this.PartnerCollectList = res.data.currentPageRecords
      // 重新渲染数据
      this.getTotalBill()
      this.getOrderAmount()
      this.getOrderCount()
    },
    // 获取一定时间范围之内的收入
    //  http://likede2-admin.itheima.net/likede/api/order-service/report/orderAmount?start=2022-08-01+00:00:00&end=2022-08-09+23:59:59
    // getOrderAmount() {},
    // 获取一定时间范围之内的订单总数
    //  http://likede2-admin.itheima.net/likede/api/order-service/report/orderCount?start=2022-08-01+00:00:00&end=2022-08-09+23:59:59
    // getOrderCount() {},

    // 获取合作商列表
    async getPartner() {
      const res = await getPartner({ pageIndex: 1, pageSize: 10 })
      console.log(this.form.name)
      this.getPartnerList = res.data.currentPageRecords
      console.log(this.getPartnerList)
    },
  },
}
</script>

<style lang="less" scoped>
.app-container {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  min-height: 700px;
  .col-left {
    width: 50%;
    height: 193px;
    margin-right: 20px;
    border-radius: 20px;
    padding: 40px;
    background: #e9f3ff url('../../assets/image/day.4272ef60.png') no-repeat
      right bottom;
  }
  .col-right {
    width: 50%;
    height: 193px;
    border-radius: 20px;
    padding: 40px;
    background: #fbefe8 url('../../assets/image/month.5c71f45f.png') no-repeat
      right bottom;
  }
  // #ff5757  红色
  .header {
    margin-bottom: 20px;
  }
  .col-left .grid-content h2 {
    line-height: 0;
    font-size: 40px;
    color: #072074;
    text-shadow: 2px 4px 7px rgba(85, 132, 255, 0.5);
  }
  .col-left .grid-content p {
    line-height: 0;
    font-size: 10px;
    color: #072074;
  }
  .col-right .grid-content h2 {
    text-shadow: 2px 4px 7px rgba(255, 99, 85, 0.5);
    line-height: 0;
    font-size: 40px;
    color: #ff5757;
  }
  .col-right .grid-content p {
    line-height: 0;
    font-size: 10px;
    color: #ff5757;
  }
}
// 搜所
.ordersearch {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 15px;
  .el-form-item {
    margin-bottom: 0;
  }
}
.data .grid-content span {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
.data .grid-content i {
  font-size: 20px;
  font-weight: 500;
  color: #ff5757;
}
</style>
