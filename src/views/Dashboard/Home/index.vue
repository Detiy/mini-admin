<template>
  <div class="home">
    <div class="nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>后台主页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main clearfix">
      <div class="header clearfix">
        <el-card class="box-card card-1">
          <router-link class="link-color" :to="{ path: '/dashboard/order' }">
            <h1>{{ infoData.orderToDelivery }}</h1>
            <div class="text item">待发货订单</div>
          </router-link>
        </el-card>
        <el-card class="box-card card-2">
          <router-link class="link-color" :to="{ path: '/dashboard/goods' }">
            <h1>{{ infoData.goodsOnsale }}</h1>
            <div class="text item">上架中的商品</div>
          </router-link>
        </el-card>
        <el-card class="box-card card-3">
          <router-link class="link-color" :to="{ path: '/dashboard/user' }">
            <h1>{{ infoData.user }}</h1>
            <div class="text item">总用户数</div>
          </router-link>
        </el-card>
      </div>
      <div class="main">
        <el-tabs
          class="o-tab"
          v-model="activeName2"
          type="card"
          @tab-click="handleClick">
          <el-tab-pane label="今天" name="first"></el-tab-pane>
          <el-tab-pane label="昨天" name="second"></el-tab-pane>
          <el-tab-pane label="最近7天" name="third"></el-tab-pane>
          <el-tab-pane label="最近30天" name="fourth"></el-tab-pane>
        </el-tabs>
        <div class="tab-content clearfix">
          <el-card class="box-card2">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px">顾客</span>
              <el-popover placement="right" v-model="related_pop">
                <el-tabs
                  class="user-tab"
                  v-model="userTab"
                  type="card"
                  @tab-click="userTabClick">
                  <el-tab-pane label="新增" name="first"></el-tab-pane>
                  <el-tab-pane label="老客户" name="second"></el-tab-pane>
                </el-tabs>
                <el-table
                  :data="userData"
                  style="width: 100%"
                  height="550"
                  border
                  stripe>
                  <el-table-column label="头像" width="80">
                    <template #default="scope">
                      <img
                        :src="scope.row.avatar"
                        alt=""
                        style="width: 50px; height: 50px" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="nickname"
                    label="昵称"
                    width="140"></el-table-column>
                  <el-table-column prop="gender" label="性别" width="50">
                    <template #default="scope">
                      {{ scope.row.gender == 2 ? "女" : "男" }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="register_time"
                    label="注册时间"
                    width="170">
                  </el-table-column>
                  <el-table-column
                    prop="last_login_time"
                    label="最近登录"
                    width="170">
                  </el-table-column>
                </el-table>
                <el-button
                  class="float-right"
                  slot="reference"
                  size="mini"
                  type="primary"
                  @click="seeClick"
                  >查看</el-button
                >
              </el-popover>
            </div>
            <div class="text item">
              <span>新增</span>
              <h3 style="float: right">{{ mainInfo.newUser }}</h3>
            </div>
            <div class="text item">
              <span>老顾客</span>
              <h3 style="float: right">{{ mainInfo.oldUser }}</h3>
            </div>
          </el-card>
          <el-card class="box-card2">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px">下单</span>
            </div>
            <div class="text item">
              <span>加入购物车</span>
              <h3 style="float: right">{{ mainInfo.addCart }}</h3>
            </div>
            <div class="text item">
              <span>提交订单数/金额</span>
              <h3 style="float: right">
                {{ mainInfo.addOrderNum }} / {{ mainInfo.addOrderSum }}
              </h3>
            </div>
          </el-card>
          <el-card class="box-card2">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px">支付</span>
            </div>
            <div class="text item">
              <span>成交订单数</span>
              <h3 style="float: right">{{ mainInfo.payOrderNum }}</h3>
            </div>
            <div class="text item">
              <span>成交金额</span>
              <h3 style="float: right">{{ mainInfo.payOrderSum }}</h3>
            </div>
          </el-card>
        </div>
        <div class="line clearfix"></div>
        <div class="block-4 clearfix">
          <el-card class="box-card">
            <div class="text item">
              <span>客单价</span>
              <p style="float: right">
                {{ numFilter(mainInfo.payOrderSum / mainInfo.payOrderNum) }}
              </p>
            </div>
            <p class="tips">成交金额/成交订单数</p>
          </el-card>
          <el-card class="box-card">
            <div class="text item">
              <span>下单转化率</span>
              <p style="float: right">
                {{
                  numFilter(
                    mainInfo.addOrderNum / (mainInfo.newUser + mainInfo.oldUser)
                  )
                }}
              </p>
            </div>
            <p class="tips">下单人数/访问人数</p>
          </el-card>
          <el-card class="box-card">
            <div class="text item">
              <span>下单-支付转化率</span>
              <p style="float: right">
                {{ numFilter(mainInfo.payOrderNum / mainInfo.addOrderNum) }}
              </p>
            </div>
            <p class="tips">支付人数/下单人数</p>
          </el-card>
          <el-card class="box-card">
            <div class="text item">
              <span>支付转化率</span>
              <p style="float: right">
                {{
                  numFilter(
                    mainInfo.payOrderNum / (mainInfo.newUser + mainInfo.oldUser)
                  )
                }}
              </p>
            </div>
            <p class="tips">支付人数/访问人数</p>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // import day from '@/components/Day';
  import { ref, reactive, onMounted, computed } from "vue";
  import type { TabsPaneContext } from 'element-plus'

  let infoData = reactive({
    orderToDelivery: 0,
    goodsOnsale: 0,
    user: 0,
  });
  const activeName2 = ref("first");
  const userTab = ref("first");
  const mainInfo = reactive({
    newUser: 0,
    oldUser: 0,
    addCart: 0,
    addOrderNum: 0,
    addOrderSum: 0,
    payOrderNum: 0,
    payOrderSum: 0,
  });
  let loginInfo = reactive({
    username: "",
  });
  const userData = ref();
  const newData = ref([]);
  const oldData = ref([]);
  const related_pop = ref(false);

  const seeClick = () => {
    console.log("????");
  };
  const getInfo = () => {
    // axios.get("index").then((response: any) => {
    //   infoData = response.data.data;
    // });
  };
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    // related_pop.value = false;
    // userTab.value = "first";
    // console.log(tab._data.index);
    // let pindex = tab._data.index;
    // console.log("pindex:" + pindex);
    // getMainInfo(pindex);
  };
  const userTabClick = (tab: TabsPaneContext, event: Event) => {
    // let pindex = tab._data.index;
    // console.log(pindex);
    // if (pindex == 0) {
    //   userData.value = newData;
    //   console.log(userData);
    // } else {
    //   userData.value = oldData;
    //   console.log(userData);
    // }
  };
  const getMainInfo = (index: number) => {
    // axios
    //   .get("index/main", {
    //     params: {
    //       pindex: index,
    //     },
    //   })
    //   .then((response: any) => {
    //     mainInfo.value = response.data.data;
    //     newData.value = response.data.data.newData;
    //     oldData.value = response.data.data.oldData;
    //     userData.value = newData;
    //     console.log(mainInfo);
    //   });
  };

  onMounted(() => {
    getInfo();
    getMainInfo(0);
    // if (!loginInfo) {
    //   loginInfo = JSON.parse(window.localStorage.getItem("userInfo") || null);
    // }
  });

  const numFilter = (value: string | number) => {
    let realVal = Number(value).toFixed(2);
    return Number(realVal);
  };
</script>
<style lang="scss" scoped>
.count {
  background: #fff;
  padding: 10px;
}
.float-right {
  float: right;
}
.tips {
  color: #8c939d;
  font-size: 13px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 10px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.tab-content {
  margin-bottom: 20px;
}
.box-card {
  width: 32%;
  float: left;
  margin: 0 20px 14px 0;
  border: none;
  &:last-child {
    margin-right: 0px;
  }
  .link-color {
    color: #fff;
  }
  &.card-1 {
    background: #1366ff;
  }
  &.card-2 {
    background: #11b95c;
  }

  &.card-3 {
    background: #1f2d3d;
  }
  &.card-gray {
    background: #d1dbe5;
    a {
      color: #1f2d3d;
    }
  }
  &.card-yellow {
    background: #f8dd66;
    color: #111111;
  }
}

.box-card2 {
  width: 32%;
  float: left;
  margin-right: 17px;
  &:last-child {
    margin-right: 0;
  }
}

.header {
  margin-bottom: 30px;
}

.line {
  margin: 20px 0;
  border-top: 1px solid #d1dbe5;
}
</style>
