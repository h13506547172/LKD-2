<template>
  <div class="info-bar">
    <div class="btns">
      <addButton @click.native="addShow"></addButton>
    </div>
    <!-- 数据列表区域 -->
    <el-table :data="vmTypeList" stripe style="width: 100%">
      <el-table-column prop="date" label="序号" width="80"> </el-table-column>
      <el-table-column prop="name" label="型号名称"> </el-table-column>
      <el-table-column prop="model" label="型号编码"> </el-table-column>
      <el-table-column prop="image" label="设备图片">
        <template #default="scope">
          <img :src="vmTypeList[scope.$index].image" alt="" class="type-img" />
        </template>
      </el-table-column>
      <el-table-column prop="vmRow" label="货道行"> </el-table-column>
      <el-table-column prop="vmCol" label="货道列"> </el-table-column>
      <el-table-column prop="channelMaxCapacity" label="设备容量">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <a
            href="javascript:;"
            style="margin-right: 10px"
            @click="amendFn(scope.$index)"
            >修改</a
          >
          <a href="javascript:;" @click="delvmTypeList(scope.$index)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="block">
      <span class="demonstration"
        >共{{ total }}条记录 第 {{ currentPage1 }}/{{ totalPage }} 页</span
      >
      <el-pagination
        @prev-click="prevnextClickFn"
        @next-click="prevnextClickFn"
        :current-page.sync="currentPage1"
        :page-size="10"
        layout="prev, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 新建 -->
    <el-dialog
      title="新增设备列表"
      :visible.sync="addDialogShow"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="addForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="型号名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="型号编码" prop="model">
          <el-input v-model="addForm.model"></el-input>
        </el-form-item>
        <el-form-item label="货道行数" prop="vmRow">
          <el-input
            type="number"
            max="10"
            min="1"
            v-model="addForm.vmRow"
          ></el-input>
        </el-form-item>
        <el-form-item label="货道列数" prop="vmCol">
          <el-input
            type="number"
            max="10"
            min="1"
            v-model="addForm.vmCol"
          ></el-input>
        </el-form-item>
        <el-form-item label="货道容量" prop="channelMaxCapacity">
          <el-input
            type="number"
            max="10"
            min="1"
            v-model="addForm.channelMaxCapacity"
          ></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="设备图片" prop="image">
          <el-upload
            ref="upimg"
            :limit="1"
            action="/api/vm-service/sku/fileUpload"
            list-type="picture-card"
            :auto-upload="true"
            :on-success="upImg"
            :on-remove="removeImg"
            name="fileName"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addVmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addButton from '@/components/button/addButton.vue'
import { addvmAPI, delvmTypeListAPI, getvmTypeListAPI } from '@/api/equiType'
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  components: {
    addButton,
  },
  data() {
    return {
      // 分页
      currentPage1: 1,
      total: 955,
      totalPage: 100,
      // 数据列表
      vmTypeList: [],
      // 新增
      addDialogShow: false,
      addForm: {
        name: '',
        model: '',
        vmRow: '',
        vmCol: '',
        channelMaxCapacity: '',
        image: '',
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        model: [{ required: true, message: '请输入', trigger: 'blur' }],
        vmRow: [{ required: true, message: '请输入', trigger: 'blur' }],
        vmCol: [{ required: true, message: '请输入', trigger: 'blur' }],
        channelMaxCapacity: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
      },
      // 图片上传
    }
  },

  async created() {
    await this.getvmTypeList(1)
  },

  methods: {
    // 获取售货机列表数据的方法
    async getvmTypeList(pageIndex, name) {
      const res = await getvmTypeListAPI(pageIndex, name)
      // console.log(res)
      this.total = +res.data.totalCount
      this.totalPage = res.data.totalPage
      this.vmTypeList = res.data.currentPageRecords
    },
    async prevnextClickFn(cur) {
      // console.log(cur)
      this.currentPage1 = cur
      await this.getvmTypeList(cur, this.name)
    },
    // 删除售货机
    async delvmTypeList(index) {
      // console.log(this.vmTypeList[index]);
      await delvmTypeListAPI(this.vmTypeList[index].typeId)
    },
    // 新建售货机
    addShow() {
      this.addDialogShow = true
    },
    // 关闭新建
    handleClose() {
      // console.log(this.$refs)
      this.$refs.upimg.clearFiles()
      this.addDialogShow = false
    },
    // 上传图片
    upImg(response) {
      console.log(response)
      this.addForm.image = response
    },
    removeImg(file) {
      console.log(file)
    },
    // 新建机器
    async addVmFn() {
      await addvmAPI(this.addForm)
      this.$refs.upimg.clearFiles()
      this.addDialogShow = false
      this.getvmTypeList(1, this.name)
    },
    // 修改功能
    amendFn(index) {
      this.addForm = this.vmTypeList[index]
      this.addDialogShow = true
    },
  },
  watch: {
    async name(val) {
      this.currentPage1 = 1
      await this.getvmTypeList(this.currentPage1, val)
    },
  },
}
</script>

<style lang="less" scoped>
.info-bar {
  background-color: #fff;
  width: 100%;
  min-height: 500px;
  padding: 20px 15px 19px 17px;
  .btns {
    margin-bottom: 20px;
  }
  .block {
    display: flex;
    justify-content: space-between;
    /deep/ .btn-prev {
      color: #606266;
      min-width: 30px;
      width: 70px;
      height: 32px;
      margin: 0 16px;
      border-radius: 2px;
      background-color: #d5ddf8;
    }
    /deep/ button:disabled {
      background-color: #d8dde3 !important;
    }
    /deep/ .btn-next {
      color: #606266;
      min-width: 30px;
      width: 70px;
      height: 32px;
      margin: 0 16px;
      border-radius: 2px;
      background-color: #d5ddf8;
    }
  }
  .type-img {
    display: block;
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 50%;
    background: #f3f6fb;
    border: 1px solid #f3f6fb;
  }
}
</style>
