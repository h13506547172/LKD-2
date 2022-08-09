<template>
  <div>
    <searchBar></searchBar>
    <infoBar></infoBar>
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
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style lang="less" scoped></style>
