<template>
  <el-dialog
    title="区域详情"
    :visible="infoVisible"
    width="35%"
    class="borderR"
    @close="onClose"
  >
    <el-form ref="form" label-width="100px">
      <el-form-item label="区域名称："> {{ infoName }}</el-form-item>
      <el-form-item label="包含点位：">
        <el-table
          :data="info"
          style="width: 100%"
          empty-text="暂无数据"
          :header-cell-style="headerColor"
          :cell-style="cellStyle"
          :row-class-name="tableRowClassName"
        >
          <el-table-column label="序号" width="180">
            <template v-slot="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="点位名称" width="180">
          </el-table-column>
          <el-table-column prop="vmCount" label="设备数量"> </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
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
  },
  data() {
    return {
      infoList: {},
    }
  },

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

<style scoped lang="less"></style>
