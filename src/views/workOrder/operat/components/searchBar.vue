<template>
  <div class="search">
    <el-form
      ref="operatForm"
      :model="operatFormData"
      label-width="80px"
      class="operatForm"
    >
      <el-form-item label="工单编号">
        <el-input
          v-model="operatFormData.taskCode"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="工单类型">
        <el-select v-model="operatFormData.status" placeholder="请选择">
          <el-option label="待办" value="1"></el-option>
          <el-option label="进行" value="2"></el-option>
          <el-option label="取消" value="3"></el-option>
          <el-option label="完成" value="4"></el-option>
        </el-select>
      </el-form-item>
      <searchBtn></searchBtn>
    </el-form>
  </div>
</template>

<script>
import searchBtn from '@/components/button/search.vue'
export default {
  components: {
    searchBtn
  },
  data() {
    return {
      operatFormData: {
        taskCode: '',
        status: '',
      },
    }
  },

  created() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.search {
  display: flex;
  height: 64px;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  .operatForm {
    display: flex;
    align-items: center;
    .el-form-item {
      display: flex;
      align-items: center;
      margin: 0;
      /deep/ .el-form-item__content {
        margin: 0 !important;
      }
    }
  }
  .el-button {
    margin-left: 20px;
  }
}
</style>
