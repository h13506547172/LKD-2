<template>
  <div>
    <!-- 头部搜索 -->
    <el-card class="box-card">
      <div class="hearder">
        <span style="display: flex; margin-right: 10px">
          <span style="width: 100px" class="hight">点位搜索：</span>
          <el-input
            v-model="searchInput"
            placeholder="请输入"
            clearable
            @clear="clearFn"
          >
          </el-input>
        </span>
        <span class="hight">
          区域搜索：
          <el-select
            v-model="searchInput2"
            filterable
            placeholder="请选择"
            clearable
            @clear="clearFn"
          >
            <el-option
              v-for="item in nodeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </span>
        <myBtn
          bgc="rgb(95, 132, 255)"
          @click.native="saerchBtn"
          style="margin-left: 10px"
        >
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
        <el-table-column prop="name" label="点位名称"> </el-table-column>
        <el-table-column prop="nodeCount" label="所在区域">
          <template v-slot="scope">
            {{ scope.row.region.name }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="商圈类型">
          <template v-slot="scope">
            {{ scope.row.businessType.name }}
          </template>
        </el-table-column>
        <el-table-column prop="ownerName" label="合作商"> </el-table-column>
        <el-table-column prop="name" label="详细地址"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
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
        <el-form ref="form" :model="myForm" label-width="100px" :rules="rules">
          <span class="redJH">*</span>

          <el-form-item label="点位名称：" prop="name">
            <el-input
              v-model="myForm.name"
              placeholder="请输入"
              maxlength="15"
              show-word-limit
            ></el-input>
          </el-form-item>
          <span class="redJH">*</span>
          <el-form-item label="详细地址：" prop="addr">
            <el-input
              v-model="myForm.addr"
              maxlength="60"
              show-word-limit
              type="textarea"
              placeholder="请输入详细地址"
              :autosize="{ minRows: 3 }"
            ></el-input>
          </el-form-item>
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
    ></infoPop>
  </div>
</template>

<script>
import myBtn from '@/components/myBtn.vue'
import { getNodeListApi, getPlaceList } from '@/api/place'
import infoPop from './components/infoPop.vue'

export default {
  name: 'node',
  components: {
    myBtn,
    infoPop,
  },
  data() {
    return {
      myForm: {
        /*  regionName: '', //添加地区的名字
        remark: '', //添加地区的备注 */
        name: '',
        addr: '',
      },
      infoVisible: false, //查看详情弹出框
      dialogVisible: false, //弹出框
      createVisible: false, //新建弹出框
      searchInput: '', //搜索输入框
      searchInput2: '', //搜索输入框2号
      pageSize: 10, //每页的条数
      pageIndex: 1, //页数
      list: [], //表格
      num: 0,
      totalCount: 0, //总共多少页
      indexOne: 0, //序号操作
      info: [],
      infoName: '',
      addTitle: '新增区域', //新建或者搜索的标题\
      editcontent: null, //点击编辑按钮传入的数据
      //表单验证
      rules: {
        regionName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        remark: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      },
      nodeList: [], //搜索栏2的下拉菜单
    }
  },

  created() {
    //获取类目
    this.getNodeType()
    //初始化列表
    this.getNodeList()
  },

  methods: {
    //清空搜索栏触发刷新
    clearFn() {
      // this.getNodeList()
      this.saerchBtn()
    },

    //点击新建按钮
    addCreate() {
      if (this.$refs.form !== undefined) this.$refs.form.resetFields()
      this.addTitle = '新增点位'
      this.myForm.regionName = ''
      this.myForm.remark = ''
      this.createVisible = true
    },
    //查看详情按钮
    async infoBtnFn(val) {
      const res = await getPlaceInfoApi(val.id)
      this.info = res.data.currentPageRecords
      this.infoName = val.name
      this.infoVisible = true
    },
    //修改按钮
    editBtnFn(val) {
      if (this.$refs.form !== undefined) this.$refs.form.resetFields()
      this.editcontent = val
      this.myForm.regionName = val.name
      this.myForm.remark = val.remark
      this.addTitle = '修改点位'
      this.createVisible = true
    },
    //删除按钮
    async delBtnFn(val) {
      try {
        await delPlaceApi(val.id)
        this.$message.success('删除成功~')
        this.getNodeList()
      } catch (error) {}
    },

    //获取头部的数据并进行筛选处理
    saerchBtn() {
      this.searchInput = this.searchInput.trim()
      this.pageIndex = 1
      this.pageSize = 10
      this.loadPageFn()
    },
    //根据传来的页码刷新数据
    async loadPageFn() {
      const send = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        name: this.searchInput.trim(),
        regionId: this.searchInput2,
      }
      try {
        const { data } = await getNodeListApi(send)
        this.list = data.currentPageRecords
        this.totalCount = +data.totalCount
      } catch (error) {
        this.$message.error('请求失败')
      }
    },
    //点击新建弹出框确认按钮
    createConf() {
      this.createVisible = false
      this.addPlaceList()
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
    async getNodeList() {
      const send = {
        pageIndex: 1,
        pageSize: 10,
      }
      try {
        const { data } = await getNodeListApi(send)
        this.list = data.currentPageRecords
        this.totalCount = +data.totalCount
      } catch (error) {
        this.$message.error('请求失败')
      }
    },
    //初始化列表的项目用于搜索栏
    async getNodeType() {
      const send = {
        pageIndex: 1,
        pageSize: 1000,
      }
      try {
        const { data } = await getPlaceList(send)
        this.nodeList = data.currentPageRecords
      } catch (error) {
        this.$message.error('请求失败')
      }
    },
    //新建区域
    async addPlaceList() {
      try {
        const send = {
          regionName: this.myForm.regionName, //添加地区的名字
          remark: this.myForm.remark, //添加地区的备注
        }
        await this.$refs.form.validate()
        if (this.addTitle == '新增点位') {
          await addPlaceListApi(send)
          this.$message.success('添加成功~')
          this.getNodeList()
        } else {
          const res = await editPlaceInfoApi(this.editcontent.id, send)
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
.redJH {
  color: red;
  position: relative;
  top: 28px;
  left: 12px;
}
</style>
<style>
.el-dialog {
  border-radius: 10px;
}
</style>
