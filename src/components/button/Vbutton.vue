<template>
  <el-button>
    <span>{{title}}</span>
  </el-button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.el-button {
  color: #655b56!important;
  background-color: #fbf4f0!important;
}
</style>