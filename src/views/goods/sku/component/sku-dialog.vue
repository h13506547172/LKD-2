<template>
  <el-dialog
    title="修改商品"
    :visible="GoodsDialog"
    style="width:630px height:484px"
    class="dialogVisible"
  >
    <el-form label-width="120px" ref="reviseGoodsForm" :model="reviseGoodsForm">
      <!-- 1 商品名称 -->
      <el-form-item
        label="商品名称"
        :rules="{
          required: true,
          trigger: 'blur',
        }"
      >
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="reviseGoodsForm.goodsName"
        ></el-input
      ></el-form-item>
      <!--2 品牌 -->
      <el-form-item
        label="品牌"
        :rules="{
          required: true,
          trigger: 'blur',
        }"
      >
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="reviseGoodsForm.brandName"
        ></el-input
      ></el-form-item>
      <!-- 3 商品价格（元）-->
      <el-form-item
        label="商品价格（元）"
        :rules="{
          required: true,
          trigger: 'blur',
        }"
      >
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="reviseGoodsForm.price"
        ></el-input
      ></el-form-item>
      <!-- 4 商品类型-->
      <el-form-item
        label="商品类型"
        :rules="{
          required: true,
          trigger: 'blur',
        }"
      >
        <el-select v-model="reviseGoodsForm.type" placeholder="请选择">
          <el-option
            :label="item.className"
            :value="item.className"
            v-for="item in TypeSearchList"
            :key="item.classId"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 5 规格-->
      <el-form-item
        label="规格"
        :rules="{
          required: true,
          trigger: 'blur',
        }"
      >
        <el-input
          placeholder="请输入内容"
          v-model="reviseGoodsForm.num"
        ></el-input>
      </el-form-item>
      <!--6 商品图片 -->
      <el-form-item
        label="商品图片"
        :rules="{
          required: true,
          trigger: 'blur',
        }"
      >
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          multiple
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <span
        slot="footer"
        class="dialog-footer operation"
        style="justify-content: center"
      >
        <repeatButton
          type="taskMake"
          size="large"
          @layclick="$emit('close', false)"
          >取消</repeatButton
        >
        <repeatButton
          type="success"
          size="large"
          @layclick="$emit('close', false)"
        >
          确定</repeatButton
        >
      </span>
    </span>
  </el-dialog>
</template>

<script>
import repeatButton from '@/components/repeatButton/index.vue'
import { getTypeSearch } from '@/api/sku'
export default {
  name: 'GoodsDialog',
  props: ['GoodsDialog'],
  components: {
    repeatButton,
  },
  data() {
    return {
      reviseGoodsForm: {
        goodsName: '',
        brandName: '',
        price: '',
        type: '',
        num: '',

        // 图片
      },
      //  类型数据
      TypeSearchList: [],
      fileList: [
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
    }
  },

  created() {
    this.getTypeSearch()
  },

  methods: {
    async getTypeSearch() {
      const res = await getTypeSearch()
      console.log(res)
      this.TypeSearchList = res.data.currentPageRecords
    },

    handlePreview(file) {
      console.log(file)
    },
  },
}
</script>

<style scoped lang="less">
.operation {
  margin-bottom: 20px;
  display: flex;
  .el-button {
    width: 80px !important;
    height: 36px;
    padding: 0;
    border: none;
  }
  .newCreate {
    background: linear-gradient(135deg, #f9b37a, #ff5e20) !important;
    margin-right: 10px;
  }
}
:deep(.el-input__inner) {
  width: 400px;
}
</style>
