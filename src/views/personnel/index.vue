<template>
  <div>
    <div class="box1">
      <!-- 搜索 -->
      <el-card class="box-card">
        人员搜索：
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
          @click="queryFn"
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
      <!-- 弹层e -->
      <el-dialog title="新增人员" :visible.sync="dialogFormVisible">
        <el-form :model="formData" ref="form">
          <el-form-item label="*人员名称" :label-width="formLabelWidth">
            <el-input
              v-model="formData.userName"
              autocomplete="off"
              maxlength="5"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="*角色" :label-width="formLabelWidth">
            <el-select
              v-model="formData.roleId"
              style="width: 100%"
              placeholder="请选择角色"
            >
              <el-option label="运营员" :value="Number(1)"></el-option>
              <el-option label="维修员" :value="Number(2)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="*联系电话" :label-width="formLabelWidth">
            <el-input
              v-model="formData.mobile"
              autocomplete="off"
              maxlength="11"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="*负责区域" :label-width="formLabelWidth">
            <el-select
              v-model="formData.regionId"
              style="width: 100%"
              placeholder="请选择区域"
            >
              <el-option
                v-for="item in tableAddress"
                :key="item.id"
                :label="item.regionName"
                :value="item.regionId"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 上传头像 -->
          <span class="headtext">*头像</span>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddOKFn">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 弹层s -->

      <el-table :data="tableData" :border="false" style="width: 100%">
        <el-table-column
          type="index"
          :index="indexpage"
          label="序号"
          width="80"
        >
        </el-table-column>
        <el-table-column prop="userName" label="人员名称" width="300">
        </el-table-column>
        <el-table-column prop="regionName" label="归属区域" width="300">
        </el-table-column>
        <el-table-column prop="role.roleName" label="角色" width="300">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话" width="300">
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
          <el-button type="info"  @click="previousFn"  disabled>上一页</el-button>
        <!-- <button class="butn butn1" @click="previousFn" >上一页</button> -->
        <button class="butn" @click="nextFn" :disable='falg'>下一页</button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getPersonnel,
  AddPersonnel,
  editDeptsApi,
  delPersonnel,
} from '@/api/personnel'
export default {
  data() {
    return {
      tableData: [],
      tableAddress: [],
      input: '',
      pageIndex: 1,
      disabled:false,
      datapage: {},
      imageUrl: '',
      dialogTableVisible: true,
      dialogFormVisible: false,
      formData: {
        image: 'http://likede2-java.itheima.net/image/1659862212695.jpg',
        mobile: '',
        regionId: '',
        regionName: '',
        roleId: '',
        status: false,
        userName: '',
      },
      formLabelWidth: '120px',
    }
  },
  created() {
    this.getPersonnel()
  },
  methods: {
    // 渲染列表
    async getPersonnel() {
      const res = await getPersonnel()
      this.tableData = res.data.currentPageRecords
      console.log(res.data)
      this.datapage = res.data
    },
    // 页码
    indexpage(index) {
      return this.pageIndex * 10 - 9 + index
    },
    // 下一页
    async nextFn() {
        this.pageIndex++
      if (this.pageIndex === this.datapage.totalPage){
        this.disabled = true
      }
      // console.log(this.pageIndex)
      const res = await getPersonnel(this.pageIndex, 10)
      this.tableData = res.data.currentPageRecords
      this.pageIndex = res.data.pageIndex
    },
    // 上一页
    async previousFn() {
      this.pageIndex--
      if (this.pageIndex === 1) return
      const res = await getPersonnel(this.pageIndex++, 10)
      this.tableData = res.data.currentPageRecords
    },
    // 查询
    async queryFn() {
      const res = await getPersonnel(1, 10, this.input)
      //  console.log(res);
      this.tableData = res.data.currentPageRecords
      if (this.input === '') {
        this.getPersonnel()
      }
    },
    // 新增
    async newlyaddFn() {
      this.dialogFormVisible = true
      const res = await getPersonnel(this.pageIndex, 100000)
      // console.log(res)
      this.tableAddress = res.data.currentPageRecords.reduce((cur, next) => {
        this.tableAddress[next.regionName]
          ? ''
          : (this.tableAddress[next.regionName] = true && cur.push(next))
        return cur
      }, [])
      // console.log(this.tableAddress)
      // this.tableAddress = res.data.currentPageRecords
    },
    // 确定
    async AddOKFn() {
      this.dialogFormVisible = false
      await this.$refs.form.validate()
      if (this.formData.id) {
        const res = this.tableAddress.filter(
          (item) => item.regionId === this.formData.regionId,
        )
        this.formData.regionName = res[0].regionName
        await editDeptsApi(this.formData)
      } else {
        const res = this.tableAddress.filter(
          (item) => item.regionId === this.formData.regionId,
        )
        this.formData.regionName = res[0].regionName
        await AddPersonnel(this.formData)
      }
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.formData.image = this.imageUrl
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
    // 修改
    async modifyFn(index) {
      this.dialogFormVisible = true
      console.log(this.tableData[index])
      this.formData = this.tableData[index]
      const res = await getPersonnel(this.pageIndex, 100000)
      // console.log(res)
      this.tableAddress = res.data.currentPageRecords.reduce((cur, next) => {
        this.tableAddress[next.regionName]
          ? ''
          : (this.tableAddress[next.regionName] = true && cur.push(next))
        return cur
      }, [])
    },
    // 删除
    async delFn(index) {
      this.formData = this.tableData[index]
      await delPersonnel(this.formData.id)
      this.getPersonnel()
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
// 上传
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon[data-v-35596f79] {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  margin-left: 120px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 108px;
  height: 108px;
  display: block;
}
.headtext {
  position: absolute;
  left: 100px;
  top: 380px;
  font-weight: 700;
}
</style>
