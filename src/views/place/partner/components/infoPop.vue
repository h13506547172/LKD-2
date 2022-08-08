<template>
  <el-dialog
    title="合作商详情"
    :visible="infoVisible"
    width="35%"
    class="borderR"
    @close="onClose"
  >
    <div class="container">
      <div class="text">
        <span>合作商名称：{{ infoName }}</span
        ><span>联系人：{{ infoMan }}</span>
      </div>
      <div class="text">
        <span>联系电话：{{ infoNumb }}</span
        ><span>分成比例：{{ infoRatio }}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
// import { getPlaceInfoApi } from '@/api/place'
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
    infoMan: {
      type: String,
      required: true,
    },
    infoNumb: {
      type: String,
      required: true,
    },
    infoRatio: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      infoList: {},
    }
  },
  computed: {},
  created() {},
  mounted() {
    // this.getPlace()
  },

  methods: {
    /* async getPlace() {

    }, */

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
.container {
  padding: 0 30px;
  .text {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
