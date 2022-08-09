<template>
  <el-dialog
    title="设备详情"
    :visible="infoVisible"
    width="35%"
    class="borderR"
    @close="onClose"
    ><div class="main">
      <span
        >销售量：<span style="color: #5f84ff">{{ orderCount }} 个</span></span
      >
      <span
        >销售额：<span style="color: #5f84ff"> {{ orderAmount / 100 }} </span
        >元</span
      >
      <span>
        补货次数：<span style="color: #5f84ff">{{ supplyCount }} 次</span>
      </span>
      <span>
        维修次数：<span style="color: #5f84ff">{{ repairCount }} 次</span></span
      >
    </div>
    <div class="goodsHeader">商品销量（月）</div>
    <div class="goodsBox">
      <div
        class="goodsItem"
        v-for="(item, index) in goodsItemList"
        :key="index"
      >
        <span>{{ item.skuName }}</span>
        <span>:{{ item.count }}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import {
  getOrderCount,
  getOrderAmount,
  getSupplyCount,
  getRepairCount,
  getSkuCollect,
} from '@/api/equipment1'
export default {
  name: 'infoPop',
  props: {
    infoVisible: {
      type: Boolean,
    },
    info: {
      type: Array,
      required: true,
    },
    infoName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      infoList: {},
      orderCount: 0, //获取一定时间范围之内的订单总数
      orderAmount: 0, //获取一定时间范围之内的收入
      supplyCount: 0, //获取售货机补货次数
      repairCount: 0, //获取售货机维修次数
      goodsItemList: [],
    }
  },

  created() {},
  mounted() {
    // this.getPlace()
  },

  methods: {
    //获取一定时间范围之内的订单总数
    async getOrderCount(innerCode) {
      const send = {
        start: moment().format('YYYY-MM') + '-01 00:00:00',
        end: moment().format('YYYY-MM-DD') + ' 23:59:59',
        innerCode: innerCode,
      }
      const { data } = await getOrderCount(send)
      this.orderCount = data
    },
    //获取一定时间范围之内的收入
    async getOrderAmount(innerCode) {
      const send = {
        start: moment().format('YYYY-MM') + '-01 00:00:00',
        end: moment().format('YYYY-MM-DD') + ' 23:59:59',
        innerCode: innerCode,
      }
      const { data } = await getOrderAmount(send)
      this.orderAmount = data
    },
    //获取售货机补货次数
    async getSupplyCount(innerCode) {
      const { data } = await getSupplyCount(
        innerCode,
        moment().format('YYYY-MM') + '-01',
        moment().format('YYYY-MM-DD'),
      )
      this.supplyCount = data
    },
    //获取售货机维修次数
    async getRepairCount(innerCode) {
      const { data } = await getRepairCount(
        innerCode,
        moment().format('YYYY-MM') + '-01',
        moment().format('YYYY-MM-DD'),
      )
      this.repairCount = data
    },
    async getSkuCollect(innerCode) {
      const { data } = await getSkuCollect(
        innerCode,
        moment().format('YYYY-MM') + '-01',
        moment().format('YYYY-MM-DD'),
      )
      this.goodsItemList = data
    },

    //关闭弹窗
    onClose() {
      this.$emit('update:infoVisible', false)
    },
    //修改表头
    headerColor() {
      return 'background:rgb(243,246,251)'
    },
    //修改表单元格
    cellStyle() {
      return 'background:rgb(252,253,254)'
    },
    //修改表高亮
    tableRowClassName() {
      return 'highlight-row'
    },
  },
}
</script>

<style scoped lang="less">
.main {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 54px;
  background: rgba(227, 233, 245, 0.39);
  text-align: center;
}
.goodsHeader {
  margin: 20px 0 12px 6px;
}
.goodsBox {
  display: flex;
  flex-wrap: wrap;
  .goodsItem {
    width: 25%;
    border: 1px solid #d8dde3;
    padding: 0 10px;
    line-height: 40px;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
  }
}
</style>
