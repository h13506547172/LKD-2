<template>
  <div class="search">
    <el-form
      ref="Form"
      :model="FormData"
      label-width="80px"
      class="Form"
    >
      <el-form-item label="请输入">
        <el-input
          v-model="FormData.taskCode"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      FormData: {
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
}
</style>
