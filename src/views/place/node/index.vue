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
        @close="closeFn"
      >
        <el-form ref="form" :model="myForm" label-width="110px" :rules="rules">
          <el-form-item label="点位名称：" prop="name">
            <el-input
              v-model="myForm.name"
              placeholder="请输入"
              maxlength="15"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="所在区域：" prop="regionId">
            <span class="hight">
              <el-select
                v-model="myForm.regionId"
                filterable
                placeholder="请选择"
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
          </el-form-item>

          <el-form-item label="所属商圈：" prop="businessId">
            <span class="hight">
              <el-select
                v-model="myForm.businessId"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in businessTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </span>
          </el-form-item>

          <el-form-item label="归属合作商：" prop="ownerId">
            <span class="hight">
              <el-select
                v-model="myForm.ownerId"
                filterable
                placeholder="请选择"
                @change="getOwnerIdFn"
              >
                <el-option
                  v-for="item in partnerList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </span>
          </el-form-item>

          <el-form-item label="详细地址：" prop="addrInfo">
            <wl-address
              ref="wladdress"
              class="my-wl-address"
              :type="address_mode"
              :address.sync="address_data"
            >
            </wl-address>
            <el-input
              v-model="myForm.addrInfo"
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

import {
  getNodeListApi,
  getPlaceList,
  getBusinessTypeApi,
  getPartnerListApi,
  addNodeApi,
  editNodeApi,
  getVmListApi,
  delNodeApi,
} from '@/api/place'
import infoPop from './components/infoPop.vue'
export default {
  name: 'node',

  data() {
    return {
      myForm: {
        name: '', //点位名称
        regionId: '', //所在区域
        businessId: '', //所属商圈
        ownerId: '', //合作商ID
        ownerName: '', //合作商名字
        addr: '', //选择器地址
        addrInfo: '', //详细地址
        id: '',
      },
      //三级地区联级
      address_mode: 'cascader', // default普通 cascader级联
      address_data: '', // 选中地址
      owner: {}, //合作商选中信息
      partnerList: [], //归属合作商列表
      businessTypeList: [], //所属商圈的列表
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
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        regionId: [{ required: true, message: '请输入', trigger: 'change' }],
        businessId: [{ required: true, message: '请输入', trigger: 'change' }],
        ownerId: [{ required: true, message: '请输入', trigger: 'change' }],
        ownerName: [{ required: true, message: '请输入', trigger: 'blur' }],
        addrInfo: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      nodeList: [], //搜索栏2的下拉菜单
      searchInputRes: '',
    }
  },
  watch: {
    address_data(val) {
      if (val === '') return
      const res = JSON.parse(val).map((item) => item.name)
      if (res[0] === res[1]) {
        res.shift()
      }
      this.myForm.addr = res.join('-')
    },
  },
  computed: {},
  components: {
    myBtn,
    infoPop,
  },
  created() {
    //获取类目
    this.getNodeType()
    //初始化列表
    this.getNodeList()
  },

  methods: {
    //关闭窗口
    closeFn() {
      this.$refs.wladdress.cascader_val = []
    },
    //新增按钮中的归属合作商
    getOwnerIdFn(val) {
      const res = this.partnerList.filter((item) => item.id == val)
      this.myForm.ownerName = res[0].name
    },
    //清空搜索栏触发刷新
    clearFn() {
      this.indexOne = 0
      this.searchInputRes = ''
      this.getNodeList()
    },

    //点击新建按钮
    async addCreate() {
      if (this.$refs.form !== undefined) {
        this.$refs.form.resetFields()
      }
      //获取商圈类型
      const { data } = await getBusinessTypeApi()
      this.businessTypeList = data
      //获取合作商数据
      const {
        data: { currentPageRecords },
      } = await getPartnerListApi()
      this.partnerList = currentPageRecords

      this.addTitle = '新增点位'
      this.createVisible = true
    },
    //查看详情按钮
    async infoBtnFn(val) {
      const res = await getVmListApi(val.id)
      this.info = res.data
      this.infoVisible = true
    },
    //修改按钮
    async editBtnFn(val) {
      if (this.$refs.form !== undefined) this.$refs.form.resetFields()
      //点击修改后状态回显↓
      this.myForm.name = val.name
      this.myForm.regionId = val.regionId
      this.myForm.businessId = val.businessType.id
      this.myForm.ownerId = val.ownerId
      this.myForm.ownerName = val.ownerName
      this.myForm.id = val.id
      const addrR = val.addr.substring(val.addr.lastIndexOf('-') + 1)
      this.myForm.addrInfo = addrR
      this.myForm.addr = val.addr.substring(0, val.addr.lastIndexOf('-'))
      /*    let addrDeep = val.addr.substring(0, val.addr.lastIndexOf('-'))
      addrDeep = addrDeep.split('-') */
      /*  console.log(addrDeep)
      this.address_data = JSON.stringify(addrDeep) */
      /*   this.$nextTick(() => {
        this.address_data = addrDeep
      }) */

      /*     let myRes = []
      addrDeep.forEach((item, index) => {
        myRes.push({ name: item, code: `${index}` })
      }) */
      // console.log(JSON.stringify(myRes))
      // this.$refs.wladdress.cascader_val = JSON.stringify(myRes)
      /*  this.address_data = JSON.stringify(myRes)
      console.log(JSON.stringify(myRes)) */
      // this.$refs.wladdress.cascader_val = [name:]
      //获取商圈类型
      const { data } = await getBusinessTypeApi()
      this.businessTypeList = data
      //获取合作商数据
      const {
        data: { currentPageRecords },
      } = await getPartnerListApi()
      this.partnerList = currentPageRecords
      this.addTitle = '修改点位'
      this.createVisible = true
    },
    //删除按钮
    async delBtnFn(val) {
      try {
        await delNodeApi(val.id)
        this.$message.success('删除成功~')
        this.pageIndex = 1
        this.pageSize = 10
        this.indexOne = 0
        this.getNodeList()
      } catch (error) {}
    },

    //获取头部的数据并进行筛选处理
    saerchBtn() {
      this.searchInput = this.searchInput.trim()
      //将搜索框的值给搜索框的维护对象，能够解决bug=>搜索的时候修改输入框会影响跳页结果
      this.searchInputRes = this.searchInput
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
        name: this.searchInputRes,
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
    //点击新建弹出框的确认按钮*****************
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
        if (this.addTitle == '新增点位') {
          const send = {
            name: this.myForm.name, //点位名称
            regionId: this.myForm.regionId, //所在区域
            businessId: this.myForm.businessId, //所属商圈
            ownerId: this.myForm.ownerId, //合作商ID
            ownerName: this.myForm.ownerName, //合作商名字
            addr: this.myForm.addr + '-' + this.myForm.addrInfo, //选择器地址
            createUserId: 1,
          }
          await addNodeApi(send)
          this.$message.success('添加成功~')
          this.pageSize = 10
          this.pageIndex = 1
          this.indexOne = 0
          this.getNodeList()
        } else {
          const send = {
            name: this.myForm.name, //点位名称
            regionId: this.myForm.regionId, //所在区域
            businessId: this.myForm.businessId, //所属商圈
            ownerId: this.myForm.ownerId, //合作商ID
            ownerName: this.myForm.ownerName, //合作商名字
            addr: this.myForm.addr + '-' + this.myForm.addrInfo, //选择器地址
            createUserId: this.$store.state.user.userId,
          }
          await editNodeApi(this.myForm.id, send)
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
//三级地区
/deep/.el-cascader {
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

.borderR {
  .hight {
    line-height: 40px;
    .el-select {
      width: 100%;
    }
  }
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
// .redJH {
//   color: red;
//   position: relative;
//   top: 28px;
//   left: 0;
// }
</style>
<style>
.el-dialog {
  border-radius: 10px;
}
</style>
