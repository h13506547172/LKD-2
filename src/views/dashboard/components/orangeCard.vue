<template>
  <div class="boxTopOne">
    <div class="title" style="font-weight: 600">
      销售统计
      <span class="timeAround">{{ timeAround }}</span>
    </div>
    <div class="content">
      <div class="contentItem">
        <p>{{ orderCount }}</p>
        <span class="small">订单量（个）</span>
      </div>
      <div class="contentItem">
        <p>{{ orderAmount }}</p>
        <span class="small">销售额（万元）</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getOrderCount, getOrderAmount } from '@/api/home'
export default {
  data() {
    return {
      //销售统计统计↓
      orderCount: 0,
      orderAmount: 0,
    }
  },
  computed: {
    timeAround() {
      const start = moment().format('YYYY.MM') + '.01'
      const end = moment().format('YYYY.MM.DD')
      return start + ' ~ ' + end
    },
  },
  created() {
    //获取当时工单汇总信息(人员统计头部信息)
    this.getOrderCount()
    this.getOrderAmount()
  },

  methods: {
    //获取当时工单汇总信息(人员统计头部信息)getOrderCount,getOrderAmount
    async getOrderCount() {
      const start = moment().format('YYYY-MM') + '-01 00:00:00'
      const end = moment().format('YYYY-MM-DD') + ' 23:59:59'
      const { data } = await getOrderCount(start, end)
      this.orderCount = data
    },
    async getOrderAmount() {
      const start = moment().format('YYYY-MM') + '-01 00:00:00'
      const end = moment().format('YYYY-MM-DD') + ' 23:59:59'
      const { data } = await getOrderAmount(start, end)
      this.orderAmount = (data / 1000000).toFixed(2)
    },
  },
}
</script>

<style scoped lang="less">
.boxTopOne {
  width: 42%;
  border-radius: 15px;
  padding: 20px;
  min-height: 166px;
  min-width: 450px;
  position: relative;
  /*      width: 450px;
          height: 166px; */
  background: #fbefe8
    url(http://likede2-admin.itheima.net/img/sale.606b0d8c.png) no-repeat 300px
    50px;

  .cityPic {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 1;
  }
  .title {
    .timeAround {
      font-weight: 400;
      color: #999;
      font-size: 12px;
    }
  }
  .content {
    justify-content: space-evenly;
    margin-top: 15px;
    font-size: 36px;
    display: flex;

    .contentItem {
      height: 50px;
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      z-index: 100;
      color: #ff5757;
      text-shadow: 2px 4px 7px rgba(255, 99, 85, 0.5);
      p {
        margin: unset;
      }
      .small {
        font-size: 12px;
        color: #de9690;
        font-weight: normal;
      }
    }
  }
}
</style>
