<template>
  <div class="main">
    <div class="title" style="font-weight: 600">
      合作商点位数Top5
      <i class="el-icon-more" @click="clickFn"></i>
    </div>
    <div
      style="display: flex; align-items: center; justify-content: space-around"
    >
      <div class="bbq" id="myBbq"></div>
      <div class="right">
        <div class="count">{{ count1 }}</div>
        <div class="name">点位数</div>
        <div class="count">{{ count2 }}</div>
        <div class="name">合作商数</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getNodeCollect, getNodeCount, getPartnerCount } from '@/api/home'
export default {
  data() {
    return {
      option: {},
      data: [],
      count1: 0,
      count2: 0,
    }
  },

  created() {
    this.getPartnerCount()
    this.getNodeCount()
  },
  async mounted() {
    await this.getNodeCollect()
    this.getMyCharts()
  },
  methods: {
    clickFn() {
      this.$router.push('/place/node')
    },
    async getPartnerCount() {
      const { data } = await getPartnerCount()
      this.count1 = data
    },
    async getNodeCount() {
      const { data } = await getNodeCount()
      this.count2 = data
    },
    async getNodeCollect() {
      const { data } = await getNodeCollect()
      this.data = data
    },

    getMyCharts() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = echarts.init(document.getElementById('myBbq'))
      // 指定图表的配置项和数据
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>  总占比：{d}%',
        },

        series: [
          {
            name: 'Area Mode',
            type: 'pie',
            radius: [20, 120],
            center: ['55%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              //alignTo: 'edge',
              formatter: '{name|{b}}\n{time|{d} %}',
              lineHeight: 15,
              rich: {
                time: {
                  fontSize: 10,
                  color: '#999',
                },
              },
            },
            data: [
              { value: 30, name: 'rose 1' },
              { value: 28, name: 'rose 2' },
              { value: 26, name: 'rose 3' },
              { value: 24, name: 'rose 4' },
              { value: 22, name: 'rose 5' },
              { value: 20, name: 'rose 6' },
              { value: 18, name: 'rose 7' },
              { value: 16, name: 'rose 8' },
            ],
          },
        ],
      }
      this.option.series[0].data = this.data
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
    },
  },
}
</script>

<style scoped lang="less">
.main {
  position: relative;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
}
.bbq {
  width: 500px;
  min-height: 353px;
}
.right {
  /*  position: relative;
  top: 0;
  right: 0; */
  width: 154px;
  height: 230px;
  padding-top: 47px;
  background: linear-gradient(135deg, transparent, #f8f8f9 0) 0 0,
    linear-gradient(-135deg, transparent 12px, #f8f8f9 0) 100% 0,
    linear-gradient(-45deg, transparent, #f8f8f9 0) 100% 100%,
    linear-gradient(45deg, transparent 12px, #f8f8f9 0) 0 100%;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  text-align: center;
  .name {
    height: 17px;
    margin-top: 6px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000412;
    line-height: 17px;
  }
  .count {
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #072074;
    line-height: 33px;
  }
}
.el-icon-more {
  position: absolute;
  top: 20px;
  right: 20px;
  border: 1.5px solid #5f84ff;
  border-radius: 16px;
  color: #5f84ff;
  cursor: pointer;
}
</style>
