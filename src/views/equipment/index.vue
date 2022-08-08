<template>
  <div>
    <searchBar @passData="passDataFn"></searchBar>
    <infoBar :innerCode='innerCode'></infoBar>
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
      innerCode: '',
    }
  },

  created() {},

  methods: {
    passDataFn(e) {
      // 传递搜索数据
      this.innerCode = e
    },
  },
}
</script>

<style lang="less" scoped></style>
