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
        <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
        <el-table-column prop="nodeCount" label="设备型号">
          <template v-slot="scope">
            {{ scope.row.type.name }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="详细地址">
          <template v-slot="scope">
            {{
              scope.row.node.addr.substring(
                scope.row.node.addr.lastIndexOf('-') + 1,
              )
            }}
          </template>
        </el-table-column>
        <el-table-column prop="vmStatus" label="运营状态">
          <template v-slot="scope">
            {{ { 0: '未投放', 1: '运营', 3: '撤机' }[scope.row.vmStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="设备状态">
          <template v-slot="scope">
            <el-tag effect="dark" v-if="!scope.row.status[10001]" class="tag1"
              >离线</el-tag
            >
            <el-tag effect="dark" v-if="scope.row.status[10002]" class="tag2"
              >货道</el-tag
            >
            <el-tag effect="dark" v-if="scope.row.status[10003]" class="tag2"
              >传动轴</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <span class="infoBtn" @click="infoBtnFn(scope.row)">查看详情</span>
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
    </el-card>
    <!-- 查看详情弹出层 -->
    <infoPop
      :infoVisible.sync="infoVisible"
      :info="info"
      :infoName="infoName"
      ref="infoPop"
    ></infoPop>
  </div>
</template>

<script>
import myBtn from '@/components/myBtn.vue'
import { getVmList } from '@/api/equipment'
import infoPop from './components/infoPop.vue'

export default {
  name: 'status',
  components: {
    myBtn,
    infoPop,
  },
  data() {
    return {
      infoVisible: false, //查看详情弹出框
      searchInput: '', //搜索输入框
      pageSize: 10, //每页的条数
      pageIndex: 1, //页数
      list: [], //表格
      totalCount: 0, //总共多少页
      indexOne: 0, //序号操作
      info: [],
      infoName: '',
      searchInputRes: '',
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

    //查看详情按钮
    async infoBtnFn(val) {
      this.infoVisible = true
      this.$refs.infoPop.getOrderCount(val.innerCode)
      this.$refs.infoPop.getOrderAmount(val.innerCode)
      this.$refs.infoPop.getSupplyCount(val.innerCode)
      this.$refs.infoPop.getRepairCount(val.innerCode)
      this.$refs.infoPop.getSkuCollect(val.innerCode)
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
        innerCode: this.searchInputRes,
      }
      try {
        const { data } = await getVmList(send)
        this.list = data.currentPageRecords
        this.totalCount = +data.totalCount
      } catch (error) {
        this.$message.error('请求失败')
      }
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
        const { data } = await getVmList(send)
        this.list = data.currentPageRecords
        this.totalCount = +data.totalCount
      } catch (error) {
        this.$message.error('请求失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.tag1 {
  background: #ff665f linear-gradient(135deg, #ffb043, #ffc020);
  border: unset;
}
.tag2 {
  border: unset;
  background: #ff665f linear-gradient(135deg, #3fc997, #4bda98);
}

.el-tag--dark {
  border-radius: 20px;
  padding: 0 10px;
  margin-right: 10px;
  height: 23px;
  line-height: 23px;
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
