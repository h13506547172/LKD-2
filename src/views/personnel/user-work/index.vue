<template>
  <div>
    <div class="box1">
      <!-- 工作量搜索 -->
      <el-card class="box-card">
        人员搜索：
        <el-input
          class="inputs"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        角色：
        <el-input
          class="inputs"
          placeholder="请输入内容"
          v-model="input"
          clearable
        >
        </el-input>
        <el-button size="medium" type="primary" icon="el-icon-search"
          >查询</el-button
        >
      </el-card>
    </div>
    <!-- 列表 -->
    <el-card class="box-card">
      <el-table :data="tableData" :border="false" style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="userName" label="人员名称" width="200">
        </el-table-column>
        <el-table-column prop="roleName" label="角色" width="200">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话" width="200">
        </el-table-column>
        <el-table-column prop="workCount" label="完成工单（本月）" width="200">
        </el-table-column>
        <el-table-column prop="progressTotal" label="进行中工单" width="200">
        </el-table-column>
        <el-table-column
          prop="cancelCount"
          label="拒绝工单（本月）"
          width="180"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template>
            <el-button type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPersonnelWork } from '@/api/personnel'
export default {
  data() {
    return {
      tableData: [],
      input: '',
    }
  },
  created() {
    this.getPersonnelWork()
  },

  methods: {
    async getPersonnelWork() {
      const res = await getPersonnelWork()
      console.log(res)
      this.tableData = res.data.currentPageRecords
      // console.log(res.data.currentPageRecords)
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
</style>
