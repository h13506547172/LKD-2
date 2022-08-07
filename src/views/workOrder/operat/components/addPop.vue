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
      :modal="false"
    >
      <el-table :data="replenishmentData" style="width: 100%">
        <el-table-column prop="channelCode" label="货道编号"> </el-table-column>
        <el-table-column prop="skuName" label="商品名称"> </el-table-column>
        <el-table-column prop="currentCapacity" label="当前数量">
        </el-table-column>
        <el-table-column prop="canAdd" label="还可添加"> </el-table-column>
        <el-table-column label="补满数量">
          <template #default="scope">
            <el-input
              v-if="replenishmentData[scope.$index].expectCapacity"
              type="number"
              :max="replenishmentData[scope.$index].canAdd"
              min="0"
              v-model="replenishmentData[scope.$index].expectCapacity"
            ></el-input>
            <span v-else>此货道缺货</span>
          </template>
        </el-table-column>
      </el-table>
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
      replenishmentShow: false,
      replenishmentData: [
        {
          channelCode: '1-1',
          skuName: '王小虎',
          currentCapacity: '6',
          canAdd: 10,
          expectCapacity: 4, // 补货数量
          skuId: '', //商品id
          skuImage: '',
        },
      ],
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
        // channelCode货道编号 currentCapacity当前数量 sku.skuName商品名称 maxCapacity最大商品数量
        console.log(res.data)
        const list = res.data
        list.forEach((item) => {
          if (!item.sku) {
            return this.replenishmentData.push({})
          }
          this.replenishmentData.push({
            channelCode: item.channelCode,
            skuName: item.sku.skuName,
            currentCapacity: item.currentCapacity,
            canAdd: item.maxCapacity - item.currentCapacity,
            expectCapacity: item.maxCapacity - item.currentCapacity, // 补货数量
            skuId: item.sku.skuId, //商品id
            skuImage: item.sku.skuImage,
          })
        })
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
