<template>
  <div class="search">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="商品搜索">
        <el-input v-model="form.searchName"></el-input>
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
      form: {
        searchName: '',
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
