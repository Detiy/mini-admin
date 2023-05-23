<template>
  <div class="category">
    <div class="nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>商品设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商品分类" name="first"></el-tab-pane>
        <el-tab-pane label="商品型号" name="second"></el-tab-pane>
      </el-tabs>
      <div class="form-table-box">
        <div class="btn-wrap">
          <router-link v-if="pIndex == 0" to="/dashboard/category/add">
            <el-button plain type="primary" icon="plus">添加分类</el-button>
          </router-link>
          <router-link v-if="pIndex == 1" to="/dashboard/specification/detail">
            <el-button plain type="primary" icon="plus">添加型号</el-button>
          </router-link>
        </div>
        <el-table
          v-if="pIndex == 0"
          :data="categoryData"
          style="width: 100%"
          border
          stripe>
          <el-table-column prop="name" label="分类名称">
            <template #default="scope">
              {{ scope.row.moduleName }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="图标显示" width="100">
            <template #default="scope">
              <el-switch
                v-model="scope.row.is_channel"
                active-text=""
                inactive-text=""
                @change="changeChannelStatus($event, scope.row.id)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="首页显示" width="100">
            <template #default="scope">
              <el-switch
                v-model="scope.row.is_show"
                active-text=""
                inactive-text=""
                @change="changeShowStatus($event, scope.row.id)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="全部产品页面显示" width="140">
            <template #default="scope">
              <el-switch
                v-model="scope.row.is_category"
                active-text=""
                inactive-text=""
                @change="changeCategoryStatus($event, scope.row.id)">
              </el-switch>
            </template>
          </el-table-column> -->

          <!-- <el-table-column prop="sort_order" label="排序" width="100" sortable>
            <template #default="scope">
              <el-input
                v-model="scope.row.sort_order"
                placeholder="排序"
                @blur="submitSort(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column> -->

          <el-table-column label="操作" width="300">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleRowEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <!-- <el-button
                size="small"
                type="danger"
                @click="handleRowDelete(scope.$index, scope.row)"
                >删除
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-table
          v-if="pIndex == 1"
          :data="specData"
          style="width: 100%"
          border
          stripe>
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="name" label="型号名"> </el-table-column>
          <el-table-column prop="sort_order" label="排序" width="200">
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template #default="scope">
              <el-button size="small" @click="specEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="specDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from "vue-router";
  import { ElMessageBox, ElMessage } from "element-plus";
  import type { TabsPaneContext } from "element-plus";
  import goodsApi from "@/api/goods";
  import type * as goods from '@/views/Dashboard/Goods/types/index'

  const router = useRouter();

  const activeName = ref("first");
  const pIndex = ref(0);
  const categoryData = ref([]);
  const specData = ref([]);
  const handleClick = (tab: TabsPaneContext) => {
    let pindex = Number(tab.index);
    if (pindex == 0) {
      getList();
      pIndex.value = 0;
    } else if (pindex == 1) {
      // getSpecList();
      pIndex.value = 1;
    }
  };
  // const changeShowStatus = ($event, para) => {
  //   axios
  //     .get("category/showStatus", {
  //       params: {
  //         status: $event,
  //         id: para,
  //       },
  //     })
  //     .then((response) => {});
  // };
  // const changeChannelStatus = ($event, para) => {
  //   axios
  //     .get("category/channelStatus", {
  //       params: {
  //         status: $event,
  //         id: para,
  //       },
  //     })
  //     .then((response) => {});
  // };
  // const changeCategoryStatus = ($event, para) => {
  //   axios
  //     .get("category/categoryStatus", {
  //       params: {
  //         status: $event,
  //         id: para,
  //       },
  //     })
  //     .then((response) => {});
  // };
  // const submitSort = (index: number, row: object) => {
  //   axios
  //     .post("category/updateSort", { id: row.id, sort: row.sort_order })
  //     .then((response) => {});
  // };
  const handleRowEdit = (index: number, row: goods.Category) => {
    router.push({ name: "categoryAdd", query: { id: row.id } });
  };
  // const handleRowDelete = (index: number, row: Category) => {
  //   ElMessageBox.confirm("确定要删除?", "提示", {
  //     confirmButtonText: "确定",
  //     cancelButtonText: "取消",
  //     type: "warning",
  //   }).then(() => {
  //     axios.post("category/destory", { id: row.id }).then((response) => {
  //       console.log(response.data);
  //       if (response.data.errno === 0) {
  //         ElMessage.success("删除成功!");
  //         getList();
  //       } else {
  //         ElMessage.error("删除失败，该分类有子分类!");
  //       }
  //     });
  //   });
  // };
  // const specEdit = (index, row) => {
  //   console.log(row.id);
  //   router.push({ name: "specification_detail", query: { id: row.id } });
  // };
  // const specDelete = (index, row) => {
  //   ElMessageBox.confirm("确定要删除?", "提示", {
  //     confirmButtonText: "确定",
  //     cancelButtonText: "取消",
  //     type: "warning",
  //   }).then(() => {
  //     axios.post("specification/delete", { id: row.id }).then((response) => {
  //       console.log(response.data);
  //       if (response.data.errno === 0) {
  //         ElMessage.success("删除成功!");
  //         getSpecList();
  //       } else {
  //         ElMessage.error("删除失败，该型号下有商品!");
  //       }
  //     });
  //   });
  // };

  // 获取商品分类列表
  const getList = () => {
    goodsApi.getCommodityList().then((res) => {
      if (res.data.code === 200) categoryData.value = res.data.data;
      else ElMessage.error("获取失败");
    });
  };
  // const getSpecList = () => {
  //   axios.get("specification").then((response) => {
  //     specData.value = response.data.data;
  //   });
  // };
  onMounted(() => {
    getList();
  })
</script>
<style langs="scss" scoped>
.sort-width {
  width: 90px;
}
.right {
  float: right;
}
.form-inline {
  margin-top: 2px;
  height: 40px;
  margin-right: 20px;
}
.block {
  margin-bottom: 10px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.active {
  border-color: #ff4949;
  color: #ff4949;
}
.marginRight {
  margin-right: 20px;
}
.btn-wrap {
  margin-bottom: 10px;
}
</style>
