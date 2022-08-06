export const imgError = {
  inserted(el, binding) {
    console.log(el.src)
    if (el.src === '') {
      el.src = 'https://img01.yzcdn.cn/vant/cat.jpeg'
    }
    // 404的时候,修改src为默认图片
    el.onerror = () => {
      // binding.value包含用户传递过来的值
      el.src = binding.value
    }
  },
}
