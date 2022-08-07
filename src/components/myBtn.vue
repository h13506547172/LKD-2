<template>
  <div>
    <el-button
      class="mybtn1"
      :style="{
        border: 0,
        background: bgc,
        color: color,
      }"
      :class="type"
    >
      <slot>按钮</slot>
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    bgc: {
      type: String,
      default: 'black',
    },
    color: {
      type: String,
      default: '#fff',
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="less">
.mybtn1:hover {
  opacity: 0.9;
}
// .orange {
//   background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
// }
</style>
