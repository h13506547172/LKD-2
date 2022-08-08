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
          <el-option label="投放工单" value="1"></el-option>
          <el-option label="维修工单" value="3"></el-option>
          <el-option label="撤机工单" value="4"></el-option>
        </el-select>
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
      <el-button type="primary" @click="createFn">确 定</el-button>
    </span>
    <!--  -->
  </el-dialog>
</template>

<script>
import { getrepairerListAPI } from '@/api/operations'
import { createOrderAPI, getTaskInfoAPI } from '@/api/operat'
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
    }
  },

  created() {},

  methods: {
    closeFn() {
      this.$emit('addShow', false)
    },
    // 创建工单
    async createFn() {
      await this.$refs.addForm.validate()
      await createOrderAPI(this.addForm)
      this.closeFn()
      this.$message.success('新建工单成功')
      // 将表单重置
      this.$refs.addForm.resetFields()
      this.addForm = {
        userId: this.$store.state.userInfo.userId,
        createType: 1,
        innerCode: '', // 设备id
        productType: '', // 工单类型
        details: [],
        assignorId: '', // 工单负责人id
        desc: '', // 描述信息
      }
    },
    // 重新创建
    async againCreate(taskId){
      const res = await getTaskInfoAPI(taskId)
      this.addForm.innerCode = res.data.innerCode
    }
  },
  watch: {
    // 获取运维人员名单
    async 'addForm.innerCode'(val) {
      const res = await getrepairerListAPI(val)
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
