<template>
  <el-dialog title="新建工单" :visible="addDialogVisible" width="40%">
    <el-form
      :model="addForm"
      :rules="rules"
      ref="addForm"
      label-width="100px"
      class="add-form"
    >
      <el-form-item label="设备编号" prop="text">
        <el-input
          v-model="addForm.innerCode"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="工单类型" prop="choose">
        <el-select v-model="addForm.productType" placeholder="请选择">
          <el-option label="补货工单" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运营人员" prop="choose">
        <el-select v-model="addForm.assignorId" placeholder="请选择">
          <el-option label="小小" value="2"></el-option>
          <el-option label="小小" value="2"></el-option>
          <el-option label="小小" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="text">
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
  </el-dialog>
</template>

<script>
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
        text: [{ required: true, message: '请输入', trigger: 'blur' }],
        choose: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
    }
  },

  created() {},

  methods: {
    closeFn() {
      this.$emit('addShow', false)
    },
  },
}
</script>

<style lang="less" scoped>
.el-select {
  width: 100%;
}
</style>
