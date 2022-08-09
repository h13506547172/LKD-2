<template>
  <div>
    <div class="boxTopOne">
      <div class="title" style="font-weight: 600">
        销售数据
        <span class="timeAround">{{ timeAround }}</span>
        <div class="type">
          <el-radio-group v-model="chooseType" size="mini" @change="changeType">
            <el-radio-button label="周"></el-radio-button>
            <el-radio-button label="月"></el-radio-button>
            <el-radio-button label="年"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div style="display: flex; justify-content: space-around">
        <div id="main" ref="chart"></div>
        <div id="bbq"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import * as echarts from 'echarts'
import { getAmountCollect, getRegionCollect } from '@/api/home'
export default {
  name: 'pic',
  data() {
    return {
      chooseType: '周', //按钮状态
      data: [], //折线图数据
      data2: [],
      myChart: '',
      option: {},
      option2: {},
    }
  },
  computed: {
    timeAround() {
      const start = moment().format('YYYY.MM') + '.01'
      const end = moment().format('YYYY.MM.DD')
      return start + ' ~ ' + end
    },
  },
  created() {},
  async mounted() {
    await this.getAmountCollect()
    this.drawChart()
    await this.getRegionCollect()
    this.drawChart22()
  },
  methods: {
    //第二个表的数据
    async getRegionCollect() {
      if (this.chooseType == '周') {
        //如果是点这周，那就获取这周1和今天的
        const start =
          moment().format('YYYY-MM-') +
          '0' +
          (moment().format('D') - moment().format('E') + 1)
        const end = moment().format('YYYY-MM-DD')
        const { data } = await getRegionCollect(start, end)
        this.data2 = data
      } else if (this.chooseType == '月') {
        const start = moment().format('YYYY-MM') + '-01'
        const end = moment().format('YYYY-MM-DD')
        const { data } = await getRegionCollect(start, end)
        this.data2 = data
      } else {
        const start = moment().format('YYYY') + '-01-01'
        const end = moment().format('YYYY-MM-DD')
        const { data } = await getRegionCollect(start, end)
        this.data2 = data
      }
    },
    //点击日周年按钮
    async changeType() {
      await this.getAmountCollect()
      this.drawChart()
      await this.getRegionCollect()
      this.drawChart22()
    },
    //获取折线图内容
    async getAmountCollect() {
      if (this.chooseType == '周') {
        //如果是点这周，那就获取这周1和今天的
        const start =
          moment().format('YYYY-MM-') +
          '0' +
          (moment().format('D') - moment().format('E') + 1)
        const end = moment().format('YYYY-MM-DD')
        const { data } = await getAmountCollect(1, start, end)
        this.data = data
      } else if (this.chooseType == '月') {
        const start = moment().format('YYYY-MM') + '-01'
        const end = moment().format('YYYY-MM-DD')
        const { data } = await getAmountCollect(1, start, end)
        this.data = data
      } else {
        const start = moment().format('YYYY') + '-01-01'
        const end = moment().format('YYYY-MM-DD')
        const { data } = await getAmountCollect(2, start, end)
        this.data = data
      }
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      this.option = {
        title: {
          text: '销售额趋势图',
          left: 'center',
          top: 'top',
          textStyle: {
            fontSize: 16,
          },
        },
        xAxis: {
          type: 'category',
          data: [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日',
          ],
          boundaryGap: false,
        },

        yAxis: {
          type: 'value',
          name: '单位：元',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: {
          left: 100, // 调整这个属性
        },
        series: [
          {
            data: [123, 0],
            // data: this.data,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: 'rgb(255,87,87)',
            },
            itemStyle: {
              normal: {
                color: 'rgb(255,87,87)',
              },
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255,87,87,0.1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,255,255)',
                  },
                ],
                global: false,
              },
            },
          },
        ],
      }
      const res = this.data.series.map((item) => item / 100)
      const res2 = this.data.xAxis
      if (this.chooseType == '周') {
        let day = [
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六',
          '星期日',
        ]
        let timeRes = res2.map((item) => day[moment(item).day() - 1])
        this.option.xAxis.data = timeRes
        this.option.series[0].data = res
      } else {
        this.option.xAxis.data = res2
        this.option.series[0].data = res
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
    },
    drawChart22() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart2 = echarts.init(document.getElementById('bbq'))
      // 指定图表的配置项和数据
      this.option2 = {
        title: {
          text: '销售额分布',
          left: 'center',
          top: 'top',
          textStyle: {
            fontSize: 16,
          },
        },
        grid: {
          left: 100, // 调整这个属性
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          type: 'value',
          name: '单位：元',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          },
        ],
      }
      const res = this.data2.series.map((item) => item / 100)
      const res2 = this.data2.xAxis
      this.option2.xAxis.data = res2
      this.option2.series[0].data = res
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(this.option2)
    },
  },
}
</script>

<style scoped lang="less">
#main {
  width: 50%;
  height: 300px;
  //   background-color: pink;
  z-index: 9999;
}
.boxTopOne {
  margin-top: 20px;
  background-color: #fff;
  width: 100%;
  border-radius: 15px;
  padding: 20px;
  min-height: 166px;
  min-width: 450px;
  .title {
    position: relative;
    .timeAround {
      font-weight: 400;
      color: #999;
      font-size: 12px;
    }
    .type {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
#bbq {
  width: 50%;
  height: 300px;
}
</style>
