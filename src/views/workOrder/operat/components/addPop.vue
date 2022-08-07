<template>
  <el-dialog
    title="新建工单"
    :visible="addDialogVisible"
    width="40%"
    :before-close="closeFn"
  >
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      label-width="100px"
      class="add-form"
    >
      <el-form-item label="设备编号" prop="innerCode">
        <el-input
          v-model="addForm.innerCode"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="工单类型" prop="productType">
        <el-select v-model="addForm.productType" placeholder="请选择">
          <el-option label="补货工单" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量">
        <a href="javascript:;" @click="showListing">
          <span style="color: #5f84ff">补货清单</span>
        </a>
      </el-form-item>
      <el-form-item label="运营人员" prop="assignorId">
        <el-select v-model="addForm.assignorId" placeholder="请选择">
          <el-option
            v-for="item in worker"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input
          type="textarea"
          v-model="addForm.desc"
          maxlength="40"
          placeholder="请输入备注，不超过30字"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
    <!-- 补货详情 -->
    <el-dialog
      title="补货详情"
      :visible.sync="replenishmentShow"
      width="40%"
      :modal='false'
    >
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="replenishmentShow = false">取 消</el-button>
        <el-button type="primary" @click="replenishmentShow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { getChannelListAPI, getOperatorListAPI } from '@/api/operat'
export default {
  props: {
    addDialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      addForm: {
        userId: this.$store.state.userInfo.userId,
        createType: 1,
        innerCode: '', // 设备id
        productType: '', // 工单类型
        details: [],
        assignorId: '', // 工单负责人id
        desc: '', // 描述信息
      },
      rules: {
        innerCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        productType: [{ required: true, message: '请选择', trigger: 'blur' }],
        assignorId: [{ required: true, message: '请选择', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      // 运营人员列表
      worker: [],
      // 补货详情
      replenishmentShow: false
    }
  },

  created() {},

  methods: {
    closeFn() {
      this.$emit('addShow', false)
    },
    async showListing() {
      // 补货清单
      await this.$refs.addForm.validateField('innerCode')
      if (this.addForm.innerCode) {
        const res = await getChannelListAPI(this.addForm.innerCode)
        console.log(res)
        this.replenishmentShow = true
      }
    },
  },
  watch: {
    // 获取可选人员名单
    async 'addForm.innerCode'(val) {
      const res = await getOperatorListAPI(val)
      // console.log(res)
      this.worker = res.data
    },
  },
}
</script>

<style lang="less" scoped>
.el-select {
  width: 100%;
}
</style>
