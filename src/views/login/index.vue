<template>
  <div class="login-page">
    <div class="main">
      <img
        src="../../assets/image/logo.595745bd.png"
        alt=""
        class="login-img"
      />
      <div class="login-form">
        <!-- 登录区域 -->
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 手机号 -->
          <el-form-item prop="loginName">
            <el-input v-model="ruleForm.loginName">
              <i slot="prefix" class="el-icon-mobile-phone" />
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              :type="type"
              class="passwordIpt"
            >
              <i slot="prefix" class="el-icon-lock" />
              <i
                slot="suffix"
                :class="{
                  'el-icon-view': type !== 'password',
                  'el-icon-key': type === 'password',
                }"
                @click="clickEyeFn"
              />
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="code">
            <el-input
              v-model="ruleForm.code"
              placeholder="请输入验证码"
              maxlength="4"
            >
              <i slot="prefix" class="el-icon-circle-check" />
              <template #suffix>
                <img :src="codeImg" alt="" class="yzm" @click="getCodeImg" />
              </template>
            </el-input>
          </el-form-item>
          <el-button type="primary" @click="loginFn">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCodeImgAPI, loginAPI } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  data() {
    return {
      ruleForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0,
      },
      rules: {
        loginName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      // 密码框类型
      type: 'password',
      // 验证码图片地址
      codeImg: '',
    }
  },

  created() {
    this.getCodeImg()
  },

  methods: {
    // 点击小眼睛睁开
    clickEyeFn() {
      this.type === 'password' ? (this.type = 'text') : (this.type = 'password')
    },
    // 获取验证码的图片
    async getCodeImg() {
      this.ruleForm.clientToken = Math.floor(Math.random() * 3000)
      const res = await getCodeImgAPI(this.ruleForm.clientToken)
      // console.log(res)
      this.codeImg = res.config.url
    },
    // 登录按钮
    async loginFn() {
      // 验证表单
      this.$refs.ruleForm.validate(async (boolean) => {
        if (boolean) {
          const res = await loginAPI(this.ruleForm)
          if (res.data.success) {
            // 存储token并跳转页面
            await this.$store.dispatch('asyncGetToken', res.data)
            // 存储时间戳
            setTokenTime(Date.now())
            await this.$router.push('/')
            this.$message.success(res.data.msg)
          }else {
            this.$message.error(res.data.msg)
          }
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background: url('~@/assets/image/background.be4fae7d.png') no-repeat;
  background-size: cover;
  .main {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    border-radius: 10px;
    .login-img {
      position: absolute;
      width: 96px;
      height: 96px;
      top: -46px;
      left: 50%;
      margin-left: -48px;
    }
    // 表单区域
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
      height: 52px;
      .el-input__inner {
        height: 52px;
        padding-left: 40px;
      }
    }
    /deep/ i {
      font-size: 16px;
      margin: 18px 5px 6px 10px;
    }
    .yzm {
      height: 100%;
      position: relative;
      right: -5px;
    }
    .el-button {
      width: 100%;
      height: 52px;
      background: linear-gradient(262deg, #2e50e1, #6878f0);
      opacity: 0.91;
      border-radius: 8px;
      color: #fff;
    }
  }
}
</style>
