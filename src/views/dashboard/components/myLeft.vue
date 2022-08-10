<template>
  <div class="skuTop">
    <div class="header">
      商品热榜 <span> {{ timeAround }}</span>
    </div>
    <el-row display="flex" class="rowlist">
      <el-col v-for="(item, index) in skuTopList" :key="index">
        <div
          class="grid-content bg-purple"
          style="padding-left: 10px; display: flex"
        >
          <div
            style="width: 50px"
            :class="{ 1: 'hat1', 2: 'hat2', 3: 'hat3' }[index + 1] || 'numm'"
          >
            {{ index + 1 }}
          </div>
          {{ item.skuName }} <span class="count">{{ item.count }}单</span>
        </div>
        <span></span
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import { getSkuTop } from '@/api/home'
export default {
  data() {
    return {
      start: '',
      end: '',
      skuTopList: [],
    }
  },
  computed: {
    timeAround() {
      this.start = moment().format('YYYY.MM') + '.01'
      this.end = moment().format('YYYY.MM.DD')
      return this.start + ' ~ ' + this.end
    },
  },
  created() {
    this.getSkuTop()
  },

  methods: {
    async getSkuTop() {
      this.start = moment().format('YYYY-MM') + '-01'
      this.end = moment().format('YYYY-MM-DD')
      const res = await getSkuTop(10, this.start, this.end)
      this.skuTopList = res.data
    },
  },
}
</script>

<style scoped lang="less">
.skuTop {
  border-radius: 15px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  .header {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    span {
      font-size: 12px;
      color: rgb(153, 153, 153);
      margin-right: 10px;
      font-weight: normal;
    }
  }
  //
  .el-row {
    // margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.hat1 {
  text-align: center;
  width: 21px;
  height: 20px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACMElEQVQ4T82UPWgUURDHf3OXQy/4VYqVgoWKhYioKIaAhmguicaAWIitZewSEBQFQQvBtFZimdIEFSFFVBI/clFQz4OYRgQt1YgnuX1vZPdud9/tbhLt3Oa9fbv7m//M/GeFxKWfT33D2I1YBWPBKNjmGuwT51a/y+GpTS5GUtBP/RqAfGAASOyjAPFz6XjSwhGd4D3Krgi+uy+tJgA7ilvUKiw+jbUJFdFxVPqIIulCb0NpqMhN3VXvnMvRZ/H3Pi8FnS9pXEu3fonaRgEs0jWdgE6wxC+Kcgbj56DVExrVcrlmJRRL90wA1VkKfOGnr7RKjrNS4k3woHI8hrZ0PmyM28BGJtLzvAG9z0Fy3PEbdQnhAD2cFEH1XXczfbLrmmEv6X0hOkaedh6hPBR9wBoskyhf8Rhm27GPqDiWCr0a2iusbXhuQGb3IFxHKbCOUkP2GEXaGQHOsfnQVqSYa/gzafxwCJwS2Jol/3Ye5S5buCX7qKfN/7rrNnUztKrxw+lSRmXg1cWVJ2q6czt5qWC0kGmtUH1j2uqI7pSB8sKK0KAcM53DePZGrNYdVSd1dEROl28mRz2VfviCTnVcwdjLGM3F0xUNg0XtNRmcu5oE+vfLQgPFk0f24tkhTO08tg3sEti2exgdlcHyXBZwVWikehwN9+5/4v+B6ssdP4D1GYoWZX91wz8p1cf9NTyzFuOBMeD5q9dcTXNvwHq/5UKl+Ffdj6BZMDdIAP2Qgv4B21H4JL7cBkgAAAAASUVORK5CYII=)
    no-repeat 15px 0px;
  color: #8e5900;
}
.hat2 {
  text-align: center;
  width: 21px;
  height: 20px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACF0lEQVQ4T8WTz4vTUBDHZzYUbcEf9NBzkhaKnsRCFEqhFHqJCXv1IP4L620XBEVB0IPgXj2Jx/4DevHSW6EULw2WdpOWliKUFn+BNu+9jrxAS0zTbvZk4JE3TN7nfb+TGYTIs1gsvgkhrgkhQK7VahW898TfS6XS9TAGo9DZbEZJgOHLDMP4h4Oe53WJ6OYanslkNuoSqAwc5HK5jTZEdNB1XdJ1fXPTdDoNlIaBUXg0Xy6XN+clbws6mUwS2Q+DK5XKFtTXNC2NiEJ6GI1GsdB9aqvVagBtt9upbDb7Syr9goj3NU37LBOe5+1UuqsstVotgHqed5eI3uJwOHxMRHdUVT1ERBoMBheuab1ex0ajoRiG8VEI8QH7/f4lRVE+AcBXIcQxEQ12tVScUlmWQqFwCwBeAEBK07R7gezxeJzmnJ8AwAPGmMoYOwg3fBgWra2iKKt8Pt8HgHeqqr5GRLbV/I7jvOGcHyWcJiCiU9M0H+2dqG63W2CMOUKIVBw4opoh4g3TNM/2QmWy0+kcc85fnjdRAHBiWdar6Khv2V9/0Gq1nnLOnwghDmJ6dEVEz23bfhYFyngnVCabzeZtIjoCgIe+7wMigu/774UQp7Ztd+KA50LXh3q9Hq33xWJxr5D/A3Vd9wcAXImx+VPX9asXsj+fz3/7vn9Z1pExJuu4WeGYMfbHsqx0or8vocvlMhHUtu0t6F9KkMngoAlOWAAAAABJRU5ErkJggg==)
    no-repeat 15px 0px;
  color: #8e5900;
}
.hat3 {
  text-align: center;
  width: 21px;
  height: 20px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACd0lEQVQ4T82VMWgUQRSGv3fLabQWi4AI6VIKIiEWIgSDJiSoIFhZBEzAgCgpLAQPTLAWo5yRbSwURBHDRTSmECSKcgiGaMBOLIJ2FpqcuzNPZnb33MvGRDuvuZ2Ze9/8773/7QlrPvpicBKj24gtGAUTgwFik65J9mJ3ZsHqigzNj+YxUoA+Hwg9UNMg9xwpqIMCUQpUd6n1cDn9aqgFqjNcRmlvbrb1J4pcUOSVJMFuL05VG3dBAvTfu17nmcuiNULpp3mTPusLk4As/QyYKmsCXRmSksjom9/xjleAPjmcpO/ruQnQZRGDnC1Cp6gzIhWsy0FrveG6QA9w5TAQpSpdhLHIubpXqvcI2M4Np3SCMlXp5bM/eHQoxOaUuro61Tatp2ta/txBx94m0BodwCnRGfqBDvq4Jq7nD3tC3wAfmGtGsxSpC/zaePVy4d2QViixl/NYFkRvUqadMYRv/OQ+9uAVTKnViy21zWqdAL3VOhcrBByjRMB3rnqfap0yy/QhdPGjawfxVmnaxVsrrWezeS6D1FZbGkrnxy8o86zwVE5giua/c+AksfYknc913w2D9202DJlnZU4uLdzdeKJud+9ES+MYG3i1DpSfrha1zgrBRaksfN0Q6stxa/8RVI9n5i4OQ9rA2DyQ8aXHa0e9kH72A53qGqBhB7BWWofBl0RRnZbK++m1QLf+I9QrntyzmzjoQVe7aQiUYmgEL1k1czKx9Gk94KbQpuoaYfacf0/8P1Ctd15HaSsoUlZl39KZf1Kqs0er2KhMFKUmd0aP0rF0z86jbq2RDC+O/FX3dXawShyXk7+NHNDPerZ2YBPJ8IcC9BfAsOweLKuvfgAAAABJRU5ErkJggg==)
    no-repeat 15px 0px;
  color: #8e5900;
}
.numm {
  text-align: center;
  width: 16px;
  height: 20px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAo0lEQVQ4T2P8/f7FfwYKAOOoAQyjYcAwGgYMgz8MGBl+gHP6fwYOXDkeX1Le8JeRsRikkeX//97/DAwB2AzBZsBVBkbGAlYB8T3IGn5/eOnC8P//BAYGBm1kcSQD/r9nYmKuZ+ITnc7IyPgHm23///9n+f3hZRYjA2MDA8N/QZAaxj/vXzxiYGTc8u3b3zo+Kak3xJRu/z89E/n7j7np////VgAGUHY6vIpVhgAAAABJRU5ErkJggg==)
    no-repeat 18px 0px;
  color: #e9b499;
}
.rowlist {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .bg-purple {
    margin-bottom: 25px;
    position: relative;
  }
}
.count {
  position: absolute;
  right: 0;
  font-weight: 400;
  color: #737589;
  font-size: 14px;
}
</style>
