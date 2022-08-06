<template>
  <div class="operat-page">
    <searchBar></searchBar>
    <infoBar></infoBar>
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
    return {}
  },

  created() {},

  methods: {},
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
