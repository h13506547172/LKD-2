<template>
  <div class="operat-page">
    <!-- 搜索栏 -->
    <searchBar @passData="passDataFn"></searchBar>
    <!-- 表格区域 -->
    <infoBar :searchCondition="searchCondition"></infoBar>
  </div>
</template>

<script>
import searchBar from './components/searchBar.vue'
import infoBar from './components/infoBar.vue'

export default {
  components: {
    searchBar,
    infoBar,
  },
  data() {
    return {
      searchCondition: {},
    }
  },

  created() {},

  methods: {
    passDataFn(data) {
      // 传递搜索条件
      this.searchCondition = {...data}
    },
  },
}
</script>

<style lang="less" scoped>
.operat-page {
  overflow: hidden;
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
}
</style>
