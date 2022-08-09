<template>
  <div class="info-bar">
    <div class="btns">
      <addButton></addButton>
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
        <a href="javascript:;" style="margin-right: 10px">修改</a>
        <a href="javascript:;">删除</a>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="block">
      <span class="demonstration"
        >共{{ total }}条记录 第 {{ currentPage1 }}/{{ totalPage }} 页</span
      >
      <el-pagination
        @prev-click="prevClickFn"
        @next-click="nextClickFn"
        :current-page.sync="currentPage1"
        :page-size="10"
        layout="prev, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import addButton from '@/components/button/addButton.vue'
import { delvmTypeListAPI, getvmTypeListAPI } from '@/api/equiType'
export default {
  components: {
    addButton,
  },
  data() {
    return {
      tableData: [],
      // 分页
      currentPage1: 1,
      total: 955,
      totalPage: 100,
      // 数据列表
      vmTypeList: [],
    }
  },

  async created() {
    await this.getvmTypeList(1)
  },

  methods: {
    // 获取售货机列表数据的方法
    async getvmTypeList(pageIndex, name) {
      const res = await getvmTypeListAPI(pageIndex, name)
      console.log(res)
      this.total = +res.data.totalCount
      this.totalPage = res.data.totalPage
      this.vmTypeList = res.data.currentPageRecords
    },
    prevClickFn(cur) {
      console.log(cur)
    },
    nextClickFn(cur) {
      console.log(cur)
    },
    // 删除售货机
    async delvmTypeList(){
      await delvmTypeListAPI()
    }
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
