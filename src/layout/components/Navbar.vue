<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <img src="../../assets/image/logo.3673fab5.png" alt="" class="logo" />
    <div class="right-menu">
      <!-- <el-dropdown class="avatar-container" trigger="click">
      </el-dropdown> -->
      <div class="avatar-wrapper">
        <img :src="$store.state.userInfo.image" class="user-avatar" v-imgError='img404'/>
        <div class="text">欢迎您，{{$store.state.userInfo.loginName}}</div>
        <div class="exit">
          <span @click="exitFn">退出</span>
          <i class="el-icon-caret-bottom" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import img404 from "@/assets/image/68775e15bc12b22a0c38d8d556863767.jpeg";
export default {
  data () {
    return {
      img404
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    exitFn(){
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  z-index: 1111;
  top: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  background: url('../../assets/image/下载.png');
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  // .hamburger-container {
  //   line-height: 46px;
  //   height: 100%;
  //   float: left;
  //   cursor: pointer;
  //   transition: background 0.3s;
  //   -webkit-tap-highlight-color: transparent;

  //   &:hover {
  //     background: rgba(0, 0, 0, 0.025);
  //   }
  // }
  .logo {
    width: 88px;
    margin-left: 15px;
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .text {
      margin: 0 20px;
    }
    .exit {
      display: flex;
      align-items: center;
    }

      .avatar-wrapper {
        margin-right: 20px;
        position: relative;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 16px;
        .user-avatar {
          cursor: pointer;
          border-radius: 50% !important;
          border: 1px solid transparent;
          width: 35px;
          height: 35px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -15px;
          font-size: 12px;
        }
      }

  }
}
</style>
