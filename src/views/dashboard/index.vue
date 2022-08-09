<template>
  <div>
    <div class="main">
      <!-- 头部 -->
      <div class="top">
        <div class="left">
          <div class="boxTop">
            <!-- 蓝色卡片组件 -->
            <blueCardVue></blueCardVue>

            <!-- 橙色卡片 -->
            <orangeCardVue></orangeCardVue>
          </div>
          <div class="boxBottom">
            <myPicVue></myPicVue>
          </div>
        </div>
        <div class="right">
          <myLeftVue></myLeftVue>
        </div>
      </div>
      <!-- 底部 -->
      <div class="bottom">
        <div class="nodeCollect">
          <nodeCollectVue></nodeCollectVue>
        </div>
        <div class="null">
          <div class="title" style="font-weight: 600">
            异常设备监控
            <i class="el-icon-more"></i>
          </div>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            "
          >
            <div>
              <img
                style="display: block"
                src="http://likede2-admin.itheima.net/img/empty.87c4f71b.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blueCardVue from './components/blueCard.vue'
import myLeftVue from './components/myLeft.vue'
import myPicVue from './components/myPic.vue'
import nodeCollectVue from './components/nodeCollect.vue'
import orangeCardVue from './components/orangeCard.vue'

export default {
  name: 'home',
  components: {
    nodeCollectVue,
    blueCardVue,
    orangeCardVue,
    myPicVue,
    myLeftVue,
  },
  data() {
    return {}
  },
  computed: {},
  created() {},

  methods: {},
}
</script>

<style scoped lang="less">
.main {
  .top {
    margin-bottom: 20px;
    justify-content: space-between;
    display: flex;
    .left {
      width: 75%;
      // background-color: pink;
      .boxTop {
        display: flex;
        justify-content: space-between;
      }
    }
    .right {
      width: 23%;
      margin-right: 20px;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    .nodeCollect {
      width: 58%;
    }
    .null {
      margin-right: 15px;
      width: 40%;
      background-color: white;
      position: relative;
      padding: 20px;
      border-radius: 15px;
      background-color: #fff;
      .el-icon-more {
        position: absolute;
        top: 20px;
        right: 20px;
        border: 1.5px solid #5f84ff;
        border-radius: 16px;
        color: #5f84ff;
        cursor: pointer;
      }
      /* img {
        width: 123px;
        height: 96px;
      } */
    }
  }
}
</style>
