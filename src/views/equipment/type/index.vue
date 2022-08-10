<template>
  <div>
    <searchBar @passData='passDataFn'></searchBar>
    <infoBar :name='name'></infoBar>
  </div>
</template>

<script>
import searchBar from "./component/searchBar.vue";
import infoBar from "./component/infoBar.vue";

export default {
  components: {
    searchBar,
    infoBar
  },
  data() {
    return {
      name: ''
    }
  },

  created() {},

  methods: {
    passDataFn(e){
      this.name = e.name
    }
  },
}
</script>

<style lang="less" scoped></style>
