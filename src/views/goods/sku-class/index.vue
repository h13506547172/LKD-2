<template>
  <div>
    <div class="box1">
      <!-- 搜索 -->
      <el-card class="box-card">
        商品类型搜索：
        <el-input
          class="inputs"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-search"
          @click="ProductsearchFn"
          >查询</el-button
        >
      </el-card>
    </div>
    <!-- 列表 -->
    <el-card class="box-card">
      <el-button
        size="medium"
        type="primary"
        icon="el-icon-search"
        @click="newlyaddFn"
        >新建</el-button
      >
      <el-table :data="tableData" :border="false" style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="className" label="商品类型名称" width="1200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template v-slot="scoped">
            <el-button type="text" size="small" @click="modifyFn(scoped.$index)"
              >修改</el-button
            >
            <el-button type="text" size="small" @click="delFn(scoped.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div class="Page">
        <div>
          共{{ datapage.totalCount }}条数据
          <span>{{ pageIndex }}/{{ datapage.totalPage }}页</span>
        </div>
        <!-- :disabled='pageIndex==1 ? true : false' -->
        <el-button
          type="info"
          @click="previousFn"
          :disabled="pageIndex == 1 ? true : false"
          >上一页</el-button
        >
        <!-- :disabled='pageIndex == datapage.totalPage ? true : false' -->
        <el-button
          type="info"
          @click="nextFn"
          :disabled="pageIndex == datapage.totalPage ? true : false"
          >下一页</el-button
        >
      </div>
    </el-card>
    <!-- 弹出层e -->
    <el-dialog title="新增商品类型" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="新增商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.className" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddFn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出层s -->
  </div>
</template>

<script>
import {
  getVmservice,
  Addcommodity,
  getProductsearch,
  modifyApi,
  delDeptsApi
} from '@/api/personnel'
export default {
  data() {
    return {
      tableData: [],
      input: '',
      pageIndex: 1,
      gridData: [],
      datapage: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        classId:'',
        className: '',
      },
      formLabelWidth: '120px',
    }
  },
  created() {
    this.getVmservice()
  },

  methods: {
    // 页码
    indexpage(index) {
      return this.pageIndex * 10 - 9 + index
    },
    // 下一页
    async nextFn() {
      this.pageIndex++
      console.log(this.pageIndex)
      const res = await getVmservice(this.pageIndex, 10)
      console.log(res)
      this.tableData = res.data.currentPageRecords
    },
    // 上一页
    async previousFn() {
      this.pageIndex--
      const res = await getVmservice(this.pageIndex, 10)
      this.tableData = res.data.currentPageRecords
    },
    // 渲染
    async getVmservice() {
      const res = await getVmservice()
      console.log(res)
      this.tableData = res.data.currentPageRecords
      console.log(res.data.currentPageRecords)
      this.datapage = res.data
    },
    newlyaddFn() {
      this.dialogFormVisible = true
    },
       // 修改商品类型
    async modifyFn(index) {
      this.dialogFormVisible = true
      console.log(this.tableData[index])
      this.form = this.tableData[index]
      console.log(this.form);
    },
    // 删除商品类型
    async delFn(index){
      this.form = this.tableData[index]
     await delDeptsApi(this.form.classId)
     this.getVmservice()
    },
    // 确定
    async AddFn() {
      this.dialogFormVisible = false
      await this.$refs.form.validate()
      if (this.form.classId) {
        console.log(this.form.classId);
        await modifyApi(this.form.classId,this.form.className)
        this.getVmservice()
      } else {
        await Addcommodity(this.form)
      }
    },
    // 商品类型搜索
    async ProductsearchFn() {
      const res = await getProductsearch(null, null, this.input)
      this.tableData = res.data.currentPageRecords
    },
   
  },
}
</script>

<style lang="less" scoped>
.inputs {
  width: 200px;
  margin-right: 20px;
}
.box1 {
  margin-bottom: 30px;
}
.block {
  margin-left: 300px;
}
.el-pager li {
  padding: 0px 30px;
}
.box-card {
  margin-right: 20px;
}
// 页码?
.Page {
  display: flex;
  align-items: center;
  margin: 20px 0;
  .butn {
    width: 60px;
    height: 30px;
    background-color: rgb(206, 206, 206);
    border: 0px;
    line-height: 30px;
    text-align: center;
    margin-left: 20px;
  }
  // .butn1 {
  //   margin-left: 1170px;
  // }
}
</style>
