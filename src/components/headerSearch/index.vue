<template>
  <div class="search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品搜索">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option label="待办" value="待办"></el-option>
          <el-option label="进行" value="进行"></el-option>
          <el-option label="取消" value="取消"></el-option>
          <el-option label="完成" value="完成"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        taskId: '',
        status: '',
      },
    }
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="less">
.app-container .search {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 64px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
