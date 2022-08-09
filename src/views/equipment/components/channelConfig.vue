<template>
  <div>
    <el-dialog
      title="货道设置"
      :visible="channelConfigShow"
      width="60%"
      :before-close="closeChannelConfig"
    >
      <div class="channel-basic">
        <div class="text">
          <span class="span">货道行数：{{ vmTypeInfo.vmRow }}</span>
          <span class="span">货道列数：{{ vmTypeInfo.vmCol }}</span>
          <span class="span"
            >货道容量：{{ vmTypeInfo.channelMaxCapacity }}</span
          >
        </div>
        <div class="btn">
          <Vbutton title="智能排货" @click.native="boycottGoods"></Vbutton>
        </div>
      </div>
      <div class="main">
        <el-scrollbar style="height: 100%" wrap-style="overflow:hidden;">
          <div class="box">
            <el-row>
              <el-col
                :span="2.4"
                v-for="item in propChannelList"
                :key="item.channelId"
              >
                <div class="item">
                  <div class="code">{{ item.channelCode }}</div>
                  <div class="pic">
                    <img :src="item.sku ? item.sku.skuImage : ''" />
                    <div class="name">
                      {{
                        item.sku && item.sku.skuName
                          ? item.sku.skuName
                          : '暂无此商品'
                      }}
                    </div>
                  </div>
                  <div style="margin-top: 14px">
                    <a href="javascript:;" class="addbtn" @click="addGoodsFn"
                      >添加</a
                    >
                    <a
                      href="javascript:;"
                      class="xbtn"
                      @click="delGoods(item.channelCode)"
                      >删除</a
                    >
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmArrange">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 智能排货 -->
    <el-dialog
      title="智能排货"
      :visible.sync="boycottShow"
      width="55%"
      :before-close="closeBoycott"
    >
      <span>该区域属于{{ businessType }}商圈适合销售一下商品：</span>
      <el-row>
        <el-col
          :span="4"
          class="gutter"
          v-for="item in boycottGoodsList"
          :key="item.skuId"
        >
          <div class="sku">
            <img :src="item.image" alt="" />
            <div class="name">{{ item.skuName }}</div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmListFn">采纳推荐</el-button>
      </span>
    </el-dialog>
    <!-- 添加商品 -->
    <el-dialog
      title="选择商品"
      :visible.sync="addGoodsShow"
      width="55%"
      :before-close="closeAddgoods"
    >
      <!-- 搜索框 -->
      <div class="searchBar">
        <el-form ref="Form" label-width="80px" class="Form">
          <el-form-item label="商品名称">
            <el-input
              v-model="skuName"
              style="width: 300px"
              placeholder="请输入商品名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <searchBTN @click.native="searchFn"></searchBTN>
      </div>
      <!-- 商品列表 -->
      <el-row>
        <el-col
          v-for="item in addGoodsList"
          :key="item.skuId"
          :span="4"
          class="gutter"
        >
          <div class="sku" @click="curSkuFn(item)">
            <img
              src="../../../assets/image/选中.png"
              alt=""
              class="selected"
              v-show="item.skuName === curSkuName"
            />
            <img :src="item.skuImage" alt="" />
            <div class="name">{{ item.skuName }}</div>
          </div>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @prev-click="prevClickFn"
          @next-click="nextClickFn"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmGoods">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vbutton from '@/components/button/Vbutton.vue'
import search from '@/components/button/search.vue'
import {
  boycottGoodsAPI,
  channelConfigAPI,
  getBusinessTypeAPI,
  getvmServiceAPI,
} from '@/api/equipment'
export default {
  components: {
    Vbutton,
    searchBTN: search,
  },
  props: {
    // 控制显隐
    channelConfigShow: {
      type: Boolean,
      required: true,
    },
    // 售货机类型信息
    vmTypeInfo: {
      type: Object,
      required: true,
    },
    // 商品信息
    ChannelList: {
      type: Array,
      required: true,
    },
    VmInfoForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 智能排序
      boycottShow: false,
      // 商圈类型
      businessType: '',
      // 推荐列表
      boycottGoodsList: [],
      // 确认商品列表
      channelList: [],
      // 添加商品对话框
      addGoodsShow: false,
      // 添加商品列表
      addGoodsList: [],
      currentPage: 1,
      total: 10,
      // 搜索的商品名称
      skuName: '',
      curSkuName: '',
      // 选中的商品数据
      curSku: {},
      // 子组件
      propChannelList: this.ChannelList,
    }
  },

  created() {},

  methods: {
    // 关闭货道配置
    closeChannelConfig() {
      this.$emit('closeChannel', false)
    },
    // 删除商品
    delGoods(channelCode) {
      this.$emit('delGoods', channelCode)
    },
    // 智能排货
    async boycottGoods() {
      // console.log(this.vmTypeInfo)
      const res = await boycottGoodsAPI(this.VmInfoForm.businessId)
      // console.log(res)
      this.boycottGoodsList = res.data
      const res2 = await getBusinessTypeAPI(this.VmInfoForm.businessId)
      this.businessType = res2.data
      this.boycottShow = true
    },
    closeBoycott() {
      this.boycottShow = false
    },
    // 确认智能排货商品列表
    confirmListFn() {
      this.channelList = []
      this.boycottGoodsList.forEach((item, index) => {
        this.channelList.push({
          channelCode: '1-' + (index + 1),
          skuId: item.skuId,
        })
      })
      // console.log(this.channelList)
      this.boycottShow = false
    },
    // 确认排货
    async confirmArrange() {
      // 先判断是否是智能排货
      if (this.channelList.length == 0) {
        // 循环传递过来的商品列表
        this.ChannelList.forEach((item) => {
          this.channelList.push({
            channelCode: item.channelCode,
            skuId: item.sku && item.sku.skuId ? item.sku.skuId : 0,
          })
        })
      }
      await channelConfigAPI(this.VmInfoForm.innerCode, this.channelList)
      this.channelList = []
      this.closeChannelConfig()
    },
    // 搜索商品的方法
    async getvmService(pageIndex, skuName) {
      const res = await getvmServiceAPI(pageIndex, skuName)
      // console.log(res.data)
      this.total = +res.data.totalCount
      this.addGoodsList = res.data.currentPageRecords
    },
    // 打开添加商品面板
    async addGoodsFn() {
      await this.getvmService(1)
      this.addGoodsShow = true
    },
    // 关闭添加商品
    closeAddgoods() {
      this.addGoodsShow = false
    },
    async prevClickFn(page) {
      this.currentPage = page
      await this.getvmService(page, this.skuName)
    },
    async nextClickFn(page) {
      this.currentPage = page
      await this.getvmService(page, this.skuName)
    },
    // 搜索商品
    async searchFn() {
      this.currentPage = 1
      await this.getvmService(this.currentPage, this.skuName)
    },
    // 选中商品
    curSkuFn(obj) {
      this.curSkuName = obj.skuName
      // console.log(obj);
      this.curSku = {
        skuId: obj.skuId,
        skuImage: obj.skuImage,
        skuName: obj.skuName,
      }
      // console.log(this.curSku)
    },
    // 更换添加商品
    confirmGoods() {
      this.propChannelList.forEach((item) => {
        if ((item.skuId === this.curSku.skuId)) {
          item.sku = this.curSku
          console.log(item)
        }
      })
      console.log(this.propChannelList)
      // this.$emit('update', this.curSku)
      this.addGoodsShow = false
    },
  },
  watch: {
    ChannelList: {
      deep: true,
      handler(val) {
        this.propChannelList = val
      },
    },
  },
}
</script>

<style lang="less" scoped>
.channel-basic {
  padding: 0 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 847px;
  height: 56px;
  margin-bottom: 16px;
  background: #f3f6fb;
  .text {
    display: flex;
    flex: 1;
    .span {
      flex: 1;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
  }
}
.main {
  width: 814px;
  height: 384px;
  margin: 0 auto;
  .box {
    display: flex;
    flex-wrap: wrap;
    // background-color: #f3f6fb;
    width: 1620px;
    height: 700px;
    .item {
      margin: 0 5px 10px;
      position: relative;
      width: 150px;
      height: 180px;
      background: #fff;
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
      border-radius: 4px;
      text-align: center;
      .pic {
        height: 135px;
        padding-top: 16px;
        background-color: #f6f7fb;
        border-radius: 4px;
        img {
          display: inline-block;
          width: 84px;
          height: 78px;
          margin-bottom: 10px;
        }
      }
      .name {
        padding: 0 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .addbtn {
        color: #5f84ff;
      }
      .xbtn {
        color: #ff5a5a;
        margin-left: 10px;
      }
      .code {
        position: absolute;
        top: 10px;
        left: 0;
        width: 43px;
        height: 23px;
        line-height: 23px;
        background: #829bed;
        border-radius: 0 10px 10px 0;
        font-size: 12px;
        color: #fff;
      }
    }
  }
}
.sku {
  position: relative;
  width: 134px;
  height: 134px;
  padding-top: 16px;
  background-color: #f6f7fb;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
  border-radius: 4px;
  text-align: center;
  img {
    display: inline-block;
    width: 83px;
    height: 84px;
    margin-bottom: 5px;
  }
  .name {
    width: 102px;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.gutter {
  margin: 0 10px;
}
/deep/ .btn-prev {
  position: absolute;
  top: 50%;
  width: 50px !important;
  height: 50px !important;
  color: #000;
  opacity: 0.5;
  cursor: pointer;
}
/deep/ .btn-next {
  position: absolute;
  top: 50%;
  right: 0;
  width: 50px !important;
  height: 50px !important;
  color: #000;
  opacity: 0.5;
  cursor: pointer;
}
.selected {
  position: absolute;
  top: 0;
  left: 0px;
  width: 36px !important;
  height: 36px !important;
}
.searchBar {
  display: flex;
  align-items: center;
  button {
    margin-left: 20px;
    position: relative;
    top: -12px;
  }
}
</style>
