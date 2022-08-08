<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 商品搜索 -->
      <div class="search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="商品搜索">
            <el-input v-model.trim="form.searchName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="goodSearchFn"
              @keydown.enter="goodSearchFn"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!--  -->
      <div class="result">
        <div class="operation">
          <!-- 按钮 -->
          <repeatButton type="success" size="large" @layclick="createFn">
            <span class="el-icon-circle-plus-outline"></span>
            新建</repeatButton
          >
          <repeatButton
            type="taskMake"
            size="large"
            @layclick="taskMake = true"
          >
            导入数据
          </repeatButton>
          <!-- 弹框 S-->

          <!-- 弹框 E-->

          <!-- 弹框 S-->
          <el-dialog
            title="导入数据"
            :visible="taskMake"
            :before-close="taskMakeFn"
            style="width:630px height:484px"
            class="dialogVisible"
          >
            <!-- upload -->
            <el-upload
              class="upload-demo"
              action=""
              :file-list="fileExelList"
              accept=".xls,.xlsx"
              :on-success="successFileExel"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>

            <!-- upload -->
            <span slot="footer" class="dialog-footer">
              <span
                slot="footer"
                class="dialog-footer operation"
                style="justify-content: center"
              >
                <repeatButton
                  type="taskMake"
                  size="large"
                  @layclick="taskMake = false"
                  >取消</repeatButton
                >
                <repeatButton
                  type="success"
                  size="large"
                  @layclick="transformFn"
                >
                  确定</repeatButton
                >
              </span>
            </span>
          </el-dialog>
          <!-- 弹框 E-->
        </div>
        <!--  Q运营列表 -->
        <TaskList :tableData="tableData">
          <el-table-column type="index" :index="indexMethod" prop label="序号">
          </el-table-column>
          <el-table-column prop="skuName" label="商品名称"> </el-table-column>
          <el-table-column prop="skuImage" label="商品图片">
            <template v-slot="scope">
              <img :src="scope.row.skuImage" alt="" class="skuImage" />
            </template>
          </el-table-column>
          <el-table-column prop="brandName" label="品牌"> </el-table-column>
          <el-table-column prop="unit" label="规格"> </el-table-column>
          <el-table-column label="商品价格">
            <template v-slot="scope">
              <span>{{ scope.row.price / 100 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="skuClass.className" label="商品类型">
          </el-table-column>
          <el-table-column label="创建日期">
            <template v-slot="scope">
              <span>{{ scope.row.createTime.replace(/T/gi, ' ') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <!-- reviseFn  修改 -->
              <el-button type="text" size="small" @click="reviseFn(scope.row)"
                >修改</el-button
              >
            </template></el-table-column
          >
        </TaskList>
        <!-- 弹层组件 新增，，修改-->
        <el-dialog
          :title="titleType"
          :visible="GoodsDialog"
          style="width:630px height:484px"
          class="dialogVisible"
        >
          <el-form
            label-width="120px"
            ref="reviseGoodsForm"
            :model="reviseGoodsForm"
          >
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
                v-model="reviseGoodsForm.skuName"
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
              <el-select v-model="reviseGoodsForm.classId" placeholder="请选择">
                <el-option
                  :label="item.className"
                  :value="item.classId"
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
                v-model="reviseGoodsForm.unit"
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
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
                @layclick="GoodsDialog = false"
                >取消</repeatButton
              >
              <repeatButton type="success" size="large" @layclick="create">
                确定</repeatButton
              >
            </span>
          </span>
        </el-dialog>

        <!-- A底部 -->
        <div class="pagination-container">
          <el-row type="flex">
            <el-col>
              <div>
                共
                <span> {{ results.totalCount }}</span>
                条记录 第<span>{{ pageIndex }}/{{ results.totalPage }}</span
                >页
              </div></el-col
            >
            <el-col style="width: 340px">
              <el-button
                @click="handleSizeChange"
                style="background: #edf0f9; color: #d8dde3"
                >上一页</el-button
              >
              <el-button
                @click="handleCurrentChange"
                style="background: #d5ddf8"
                >下一页</el-button
              >
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'
// import createOrReviseDialog from './component/sku-dialog.vue'
// api
import {
  getSkuSearchList,
  setCreate,
  getTypeSearch,
  transfromData,
  reviseData,
  uploadImage,
} from '@/api/sku'
import repeatButton from '@/components/repeatButton/index.vue'
import { getUserInfoAPI } from '@/api/user'

export default {
  name: 'goodsManager',
  data() {
    return {
      tableData: [],
      results: {},
      pageIndex: 1,
      dialogVisible: false,
      GoodsDialog: false,
      taskMake: false,
      reviseGoodsDialog: false,
      form: {
        searchName: '',
      },
      // 表单
      Form: {
        deviceNum: '',
        type: '',
        people: '',
        desc: '',
        list: '',
      },
      taskMakeContent: { cordon: '' },
      // 分页
      currentPage: 1,
      reviseGoodsForm: {
        skuName: '',
        skuImage: '',
        price: '',
        classId: '',
        unit: '',
        brandName: '',
      },

      //  类型数据
      TypeSearchList: [],
      titleType: '新增商品',
      // 图片
      imageUrl: '',
      dialogImageUrl: false,
      disabled: false,
      // 文件上传
      fileExelList: [],
      scopeRowSkuId: '',
    }
  },
  components: {
    TaskList,
    repeatButton,
    // createOrReviseDialog,
  },
  created() {
    this.getSkuSearchList()
    this.getTypeSearch()
  },
  computed: {},
  methods: {
    // 处理索引
    indexMethod(index) {
      return (this.pageIndex - 1) * 10 + index + 1
    },

    taskMakeFn(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    successFileExel(response, file, fileList) {
      console.log(response, file, fileList)
    },
    // 处理图片

    // // 获取列表
    async getSkuSearchList() {
      const res = await getSkuSearchList()
      // console.log(res)
      this.tableData = res.data.currentPageRecords
      this.results = res.data
      this.pageIndex = this.results.pageIndex
    },

    //上一页 // 分页
    async handleSizeChange() {
      this.pageIndex--
      if (this.pageIndex < 1) return
      const res = await getSkuSearchList({ pageIndex: this.pageIndex })
      this.tableData = res.data.currentPageRecords
    },
    //上一页 // 分页
    async handleCurrentChange() {
      this.pageIndex++
      const res = await getSkuSearchList({ pageIndex: this.pageIndex })
      this.tableData = res.data.currentPageRecords
    },
    // 搜索列表
    async goodSearchFn() {
      const res = await getSkuSearchList({ skuName: this.form.searchName })
      this.tableData = res.data.currentPageRecords
      // console.log(this.tableData)
    },
    // 弹框里的类型
    async getTypeSearch() {
      const res = await getTypeSearch()
      // console.log(res)
      this.TypeSearchList = res.data.currentPageRecords
    },
    // 点击外部新建
    createFn() {
      this.GoodsDialog = true
      this.titleType = '新增商品'
    },
    // 新建---内部点击--确定按钮
    async create() {
      this.GoodsDialog = false
      console.log(this.reviseGoodsForm)
      if (!this.scopeRowSkuId) {
        await setCreate(this.reviseGoodsForm)
        this.getSkuSearchList()
      } else {
        console.log(this.scopeRowSkuId)

        this.reviseGoodsForm.skuId = this.scopeRowSkuId
        console.log(this.reviseGoodsForm)
        await reviseData(this.scopeRowSkuId, this.reviseGoodsForm)
        this.getSkuSearchList()
      }
      // 初始化数据
      this.reviseGoodsForm = {
        skuName: '',
        skuImage: '',
        price: '',
        classId: '',
        unit: '',
        brandName: '',
      }
    },
    //点击弹框---修改按钮
    reviseFn(scopeRow) {
      this.GoodsDialog = true
      this.titleType = '修改商品'
      console.log(scopeRow)
      this.reviseGoodsForm = {
        skuName: scopeRow.skuName,
        skuImage: scopeRow.skuImage,
        price: scopeRow.price / 100,
        classId: scopeRow.skuClass.classId,
        unit: scopeRow.unit,
        brandName: scopeRow.brandName,
        // 图片
      }
      this.scopeRowSkuId = scopeRow.skuId
    },
    // 上传文件---内部点击确定
    async transformFn() {
      this.taskMake = false
      // 内部需要一个文件名
      await transfromData()
      // console.log(res)
    },

    async handleAvatarSuccess(res, file) {
      // console.log(res)
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)

      var formData = new FormData()
      formData.append('fileName', this.imageUrl)
      console.log(formData)
      const results = await uploadImage(formData)
      console.log(results)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>

<style scoped lang="less">
.app-container .result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
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
}
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.dialogVisible {
  :deep(.el-dialog) {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 630px;
    height: 484px;
  }
  .el-dialog .el-dialog__body .el-form-item .el-form-item__content {
    width: 396px;
  }
}
.skuImage {
  width: 50px;
  height: 50px;
}

// 上传图片

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
