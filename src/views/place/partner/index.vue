<template>
  <div>
    <!-- 头部搜索 -->
    <el-card class="box-card">
      <div class="hearder">
        <span style="display: flex; margin-right: 10px">
          <span style="width: 100px" class="hight">区域搜索：</span>
          <el-input
            v-model="searchInput"
            placeholder="请输入"
            clearable
            @clear="clearFn"
          >
          </el-input>
        </span>
        <myBtn bgc="rgb(95, 132, 255)" @click.native="saerchBtn">
          <i class="el-icon-search"></i> 查询</myBtn
        >
      </div>
    </el-card>

    <el-card class="box-card">
      <div style="display: flex" class="btnB">
        <myBtn
          bgc="linear-gradient(135deg, #ff9743, #ff5e20)"
          @click.native="addCreate"
        >
          <i class="el-icon-circle-plus-outline"></i>新建</myBtn
        >
      </div>
      <el-table
        :data="list"
        style="width: 100%"
        :cell-style="{ padding: '10px 0' }"
        :header-cell-style="headerColor"
      >
        <el-table-column prop="taskId" label="序号" width="80">
          <template v-slot="scope">
            {{ scope.$index + 1 + indexOne }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="合作商名称"> </el-table-column>
        <el-table-column prop="account" label="账号"> </el-table-column>
        <el-table-column prop="vmCount" label="设备数量"> </el-table-column>
        <el-table-column prop="ratio" label="分成比例">
          <template v-slot="scope">
            {{ scope.row.ratio + '%' }}
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系人"> </el-table-column>
        <el-table-column prop="mobile" label="联系电话"> </el-table-column>

        <el-table-column label="操作" width="250">
          <template v-slot="scope">
            <span class="infoBtn" @click="restBtnFn(scope.row)">重置密码</span>
            <span class="infoBtn" @click="infoBtnFn(scope.row)">查看详情</span
            ><span class="editBtn" @click="editBtnFn(scope.row)">修改</span
            ><span class="delBtn" @click="delBtnFn(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="totalCount"
      >
      </el-pagination>

      <!-- 新建 -->
      <el-dialog
        :title="addTitle"
        :visible.sync="createVisible"
        width="35%"
        class="borderR"
      >
        <el-form ref="form" :model="myForm" label-width="120px" :rules="rules">
          <el-form-item label="合作商名称：" prop="name">
            <el-input
              v-model="myForm.name"
              placeholder="请输入"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="联系人：" prop="contact">
            <el-input
              v-model="myForm.contact"
              placeholder="请输入"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="联系电话：" prop="mobile">
            <el-input
              v-model="myForm.mobile"
              placeholder="请输入"
              maxlength="11"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="分成比例(%)：" prop="ratio">
            <el-input-number
              class="widthIsMax"
              v-model="myForm.ratio"
              controls-position="right"
              placeholder="请输入"
              :min="0"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="账号：" prop="account">
            <el-input
              v-model="myForm.account"
              placeholder="请输入"
              maxlength="18"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              v-model="myForm.password"
              placeholder="请输入"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <!-- 结束 -->
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="createVisible = false" class="popCanBtn"
            >取 消</el-button
          >
          <el-button type="primary" @click="createConf" class="popConBtn">
            确 认
          </el-button>
        </span>
      </el-dialog>
    </el-card>
    <!-- 查看详情弹出层 -->
    <infoPop
      :infoVisible.sync="infoVisible"
      :info="info"
      :infoName="infoName"
      :infoMan="infoMan"
      :infoNumb="infoNumb"
      :infoRatio="infoRatio"
    ></infoPop>
  </div>
</template>

<script>
import myBtn from '@/components/myBtn.vue'
import {
  getPartnerList,
  addPartner,
  editPartner,
  resetPartnerPassWord,
  delPartner,
} from '@/api/place'
import infoPop from './components/infoPop.vue'

export default {
  name: 'partner',
  components: {
    myBtn,
    infoPop,
  },
  data() {
    return {
      infoMan: '',
      infoNumb: '',
      infoRatio: '',
      myForm: {
        name: '', //合作商名称
        contact: '', //联系人
        mobile: '', //联系电话
        ratio: undefined, //分成比例
        account: '', //账号
        password: '', //密码
      },
      infoVisible: false, //查看详情弹出框
      dialogVisible: false, //弹出框
      createVisible: false, //新建弹出框
      searchInput: '', //搜索输入框
      pageSize: 10, //每页的条数
      pageIndex: 1, //页数
      list: [], //表格
      num: 0,
      totalCount: 0, //总共多少页
      indexOne: 0, //序号操作
      editId: null, //修改合作商的ID
      info: [],
      infoName: '',
      addTitle: '新增合作商', //新建或者搜索的标题\
      editcontent: null, //点击编辑按钮传入的数据
      //表单验证
      rules: {
        regionName: [{ required: true, message: '请输入', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入', trigger: 'blur' }],
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号不规范',
            trigger: 'blur',
          },
        ],
        ratio: [{ required: true, message: '请输入', trigger: 'blur' }],
        account: [{ required: true, message: '请输入', trigger: 'blur' }],
        password: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
    }
  },

  created() {
    this.getPlaceList()
  },

  methods: {
    //清空搜索栏触发刷新
    clearFn() {
      this.indexOne = 0
      this.getPlaceList()
    },

    //点击新建按钮
    addCreate() {
      if (this.$refs.form !== undefined) {
        this.$refs.form.resetFields()
      }
      this.addTitle = '新增合作商'
      /*   this.myForm.regionName = ''
      this.myForm.remark = '' */
      this.createVisible = true
    },
    //重置密码按钮
    async restBtnFn(val) {
      this.$confirm('确定要重置合作商密码吗？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await resetPartnerPassWord(val.id)
          this.$message({
            type: 'success',
            message: '重置成功!',
          })
        })
        .catch(() => {})
    },
    //查看详情按钮
    async infoBtnFn(val) {
      this.infoMan = val.contact
      this.infoNumb = val.mobile
      this.infoRatio = val.ratio + '%'
      this.infoName = val.name
      this.infoVisible = true
    },
    //修改按钮
    editBtnFn(val) {
      if (this.$refs.form !== undefined) this.$refs.form.resetFields()
      this.editId = val.id
      this.myForm.name = val.name
      this.myForm.contact = val.contact
      this.myForm.mobile = val.mobile
      this.myForm.ratio = val.ratio
      this.myForm.account = val.account
      this.myForm.password = val.password
      this.addTitle = '修改合作商'
      this.createVisible = true
    },
    //删除按钮
    async delBtnFn(val) {
      try {
        await delPartner(val.id)
        this.$message.success('删除成功~')
        this.pageIndex = 1
        this.pageSize = 10
        this.indexOne = 0
        this.getPlaceList()
      } catch (error) {}
    },

    //获取头部的数据并进行筛选处理
    saerchBtn() {
      this.searchInput = this.searchInput.trim()
      this.pageIndex = 1
      this.pageSize = 10
      this.indexOne = 0
      this.loadPageFn()
    },
    //根据传来的页码刷新数据
    async loadPageFn() {
      const send = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        name: this.searchInput.trim(),
      }
      try {
        const { data } = await getPartnerList(send)
        this.list = data.currentPageRecords
        this.totalCount = +data.totalCount
      } catch (error) {
        this.$message.error('请求失败')
      }
    },
    //新建按钮的弹出框的确认按钮
    async createConf() {
      try {
        await this.$refs.form.validate()
        this.createVisible = false
        this.addPlaceList()
      } catch (error) {}
    },
    //修改表头
    headerColor() {
      return 'background:rgb(243,246,251)'
    },
    //跳页时进行操作同步父组件
    handleCurrentChange(val) {
      this.indexOne = (val - 1) * 10
      this.loadPageFn()
    },
    //初始化列表
    async getPlaceList() {
      const send = {
        pageIndex: 1,
        pageSize: 10,
      }
      try {
        const { data } = await getPartnerList(send)
        this.list = data.currentPageRecords
        this.totalCount = +data.totalCount
      } catch (error) {
        this.$message.error('请求失败')
      }
    },
    //新建区域
    async addPlaceList() {
      try {
        const send = {
          name: this.myForm.name,
          contact: this.myForm.contact,
          mobile: this.myForm.mobile,
          ratio: this.myForm.ratio,
          account: this.myForm.account,
          password: this.myForm.password,
        }
        if (this.addTitle == '新增合作商') {
          await addPartner(send)
          this.$message.success('添加成功~')
          this.pageSize = 10
          this.pageIndex = 1
          this.indexOne = 0
          this.getPlaceList()
        } else {
          const res = await editPartner(this.editId, send)
          this.$message.success('修改成功~')
          this.loadPageFn()
        }
      } catch (error) {
        // this.$message.error(error?.response?.data)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.widthIsMax {
  width: 100%;
}
.box-card {
  margin-bottom: 30px;
}
.el-card {
  width: 99%;
}
.hearder {
  display: flex;
  font-size: 14px;
}
.hight {
  line-height: 40px;
}

/deep/.el-table th > .cell {
  font-weight: 400;
  color: rgb(102, 102, 102);
  //   background: rgb(243, 246, 251);
}
.marginright {
  margin-right: 10px;
}
.btnB {
  margin-bottom: 10px;
}

.popConBtn {
  margin-right: 180px;
  margin-left: 30px;
  height: 36px;
  width: 80px;
  padding: 0;
  border: unset;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
}
.popCanBtn {
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: unset;
  background-color: #fbf4f0 !important;
}
.infoBtn {
  color: #5f84ff;
  margin-right: 10px;
  cursor: pointer;
}
.editBtn {
  color: #5f84ff;
  margin-right: 10px;
  cursor: pointer;
}
.delBtn {
  color: #ff5a5a;
  margin-right: 10px;
  cursor: pointer;
}
</style>
<style>
.el-dialog {
  border-radius: 10px;
}
</style>
