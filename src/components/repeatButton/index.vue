<template>
  <!-- <div :class="[type, size]" class="btn"> -->
  <div :class="[type, size]" @click="$emit('layclick')">
    <slot />
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'large',
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped>
div {
  border: none;
  margin: 4px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 背景 type */
.success {
  background: linear-gradient(135deg, #f9b37a, #ff5e20) !important;
  margin-right: 10px;
  color: #fff;
}
.taskMake {
  background: #fbf4f0;

  color: black;
  font-weight: 400;
}
.pre {
  border-radius: 2px;
  background: #edf0f9;
  color: #d8dde3;
}
.next {
  border-radius: 2px;
  background-color: #d5ddf8;
  color: #606266;
}
/* 默认颜色 */
.default {
  background-color: #eee;
  color: black;
}
/* 尺寸size */
.mini {
  width: 70px;
  height: 32px;
  line-height: 32px;
}

.large {
  width: 90px;
  height: 40px;
  line-height: 60px;
}
</style>
