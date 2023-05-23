<template>
  <div class="left-box">
    <div class="logo">
      <img src="@/assets/images/logo.gif" />
    </div>
    <div
      class="left-menu"
      style="overflow-x: hidden; overflow-y: scroll; height: 100%">
      <el-menu
        class="sidebar"
        :unique-opened="true"
        :default-active="currentPagePath"
        @open="handleOpen"
        :router="true"
        @close="handleClose">
        <el-menu-item index="/dashboard/home">
          <i class="fa fa-tachometer"></i>
          <span>后台主页</span>
        </el-menu-item>
        <el-menu-item index="/dashboard/order">
          <i class="fa fa-large fa-reorder"></i>
          <span>订单列表</span>
        </el-menu-item>
        <el-sub-menu index="goods">
          <template #title>
            <i class="fa fa-shopping-bag"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item class="sub_menu" index="/dashboard/goodsList">
            <span>商品列表</span>
          </el-menu-item>
          <el-menu-item class="sub_menu" index="/dashboard/category">
            <span>商品分类</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- <el-menu-item index="/dashboard/shopcart">
          <i class="fa fa-large fa-shopping-cart"></i>
          <span>购物车</span>
        </el-menu-item> -->
        <el-menu-item index="/dashboard/user">
          <i class="fa fa-large fa-users"></i>
          <span>用户列表</span>
        </el-menu-item>
        <!-- <el-submenu index="settings">
          <template slot="title">
            <i class="fa fa-large fa-wrench"></i>
            <span>店铺设置</span>
          </template>
          <el-menu-item index="/dashboard/settings/showset">
            <i class="fa fa-circle"></i>
            <span>显示设置</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/ad">
            <i class="fa fa-circle"></i>
            <span>广告列表</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/notice">
            <i class="fa fa-circle"></i>
            <span>公告管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/freight">
            <i class="fa fa-circle"></i>
            <span>运费模板</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/shipper">
            <i class="fa fa-circle"></i>
            <span>快递设置</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/admin">
            <i class="fa fa-circle"></i>
            <span>管理员</span>
          </el-menu-item>
        </el-submenu> -->
        <el-menu-item @click="logout">
          <i class="fa fa-large fa-sign-out"></i>
          <span>退出</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useRoute, useRouter } from "vue-router";
// 路由
const router = useRouter();
const route = useRoute();
// 当前路由路径
const currentPagePath = ref("/dashboard");

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const logout = () => {
  ElMessageBox.confirm("是否要退出?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    localStorage.clear();
    router.replace({ name: "login" });
  });
  // const checkLogin = () => {
  // 			axios.get('index/checkLogin').then((response) => {
  // 				console.log(response.data)
  // 				if (response.data.errno === 401) {
  // 					localStorage.clear();
  // 					router.replace({name: 'login'});
  // 				}
  // 			})
  // 		}
};
</script>
<style lang="scss" scoped>
.left-box {
  width: 200px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100%;
  float: left;
  flex-direction: column;
  background: #f1f4f9;
  li {
    list-style: none;
  }
  :deep(.el-menu) {
    padding: 10px;
    margin: 0;
    height: 100%;
    .el-menu-item {
      border-radius: 4px;
    }
  //   .el-sub-menu {
  //   &.is-opened {
  //     .el-sub-menu__title {
  //       color: #1366ff;
  //       background-color: #E9F1FF;
  //     }
  //   }
  // }
    .el-sub-menu {
      font-size: 14px;
      border-radius: 4px;
      .el-sub-menu__title {
        border-radius: 4px;
        // padding-left: 30px;
        display: flex;
        align-items: center;
        height: 50px;
        .el-icon {
          height: 12px;
          width: 12px;
          margin-left: 10px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .left-menu {
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .fa {
    margin-right: 10px;
    font-size: 18px;
  }
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    width: 200px;
    border-right: solid 1px #e6e6e6;
    img {
      height: 60px;
    }
    /*box-shadow: 0 1px 1px rgba(0, 0, 0, .5);*/
  }
}

/*渐变背景*/
.back {
  background: -webkit-linear-gradient(138deg, #8731e8 0%, #4528dc 100%);
  background: -o-linear-gradient(138deg, #8731e8 0%, #4528dc 100%);
  background: linear-gradient(-48deg, #8731e8 0%, #4528dc 100%);
  opacity: 0.7;
}
</style>
