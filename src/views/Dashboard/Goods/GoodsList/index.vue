<template>
  <div class="goodsList">
    <div class="nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/goods/add">
          <el-button type="primary" icon="plus" size="small"
            >添加商品</el-button
          >
        </router-link>
      </div>
    </div>
    <div class="list">
      <div class="sortBtn">
        <span class="wrapper">
          <el-button
            v-for="item in sortBtnList"
            type="primary"
            size="small"
            :plain="true"
            :class="sort_id == item.id ? 'active' : ''"
            @click="sortOrder(item.id)">
            {{ item.name }}
          </el-button>
        </span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in tablist" :label="item.label" :name="item.active" />
      </el-tabs>
      <div class="filter">
        <el-form :inline="true" :model="filterGoodsName" class="one-line">
          <el-form-item label="商品名称">
            <el-input
              size="middle"
              v-model="filterGoodsName"
              placeholder="商品名称"
              @input="onSubmitFilter"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="state" label="商品分类" width="100">
            <template #default="scope">
              {{ matchCategoryName(scope.row.state) }}
            </template>
          </el-table-column>
          <el-table-column prop="img_url" label="商品图片" width="100">
            <template #default="scope">
              <img :src="scope.row.img_url" alt="" style="width: 40px; height: 40px">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="price" width="100" label="商品价格"></el-table-column>
          <el-table-column
            prop="sales_volume"
            label="销量"
            width="100">0</el-table-column>
          <el-table-column prop="repertory" label="库存" width="80">
            0
          </el-table-column>
          <el-table-column prop="product_status" label="上架" width="100">
            <template #default="scope">
              {{ Number(scope.row.product_status) ? '是' : '否'}}
            </template>
          </el-table-column>
          <el-table-column props="top" label="前十(推荐)" width="160">
            <template #default="scope">
              {{ Number(scope.row.top) ? '是' : '否'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                plain
                @click.prevent="handleRowEdit(scope.$index, scope.row)"
              >
              编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                plain
                @click.prevent="handleRowDelete(scope.$index, scope.row)"
              >
              删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
        <el-pagination
          :background="true"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
          :current-page="initialize.PageNum"
          :page-size="initialize.PageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next"
          :total="initialize.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import goodsApi from "@/api/goods";
import type * as goods from '@/views/Dashboard/Goods/types/index'


const router = useRouter();
const route = useRoute();

// 初始化列表参数 / 分页表
const initialize = reactive({
  PageNum: 1,
  PageSize: 10,
  total: 0,
});
// 商品排序按钮
const sortBtnList = reactive([
  { name: "按销量排序", id: 1 },
  { name: "按售价排序", id: 2 },
  { name: "按库存排序", id: 3 },
]);
// 商品列表的tab
const tablist = reactive([
  { label: "全部商品", active: "first" },
  { label: "出售中", active: "second" },
  { label: "已售完", active: "third" },
  { label: "已下架", active: "fourth" },
]);
// 搜索商品
const filterGoodsName = ref('');
// 商品数据
const tableData = ref<goods.GoodsTable[]>([]);
const tableData_c = ref<goods.GoodsTable[]>([]);

// 商品分类
const categoryData = ref<goods.Category[]>([]);

// 商品列表选中tab
const activeName = ref("first");

// 选中的哪个排序
const sort_id = ref(0);

// 切换列表 获取不同类型列表数据
const handleClick = (index: number, row: goods.GoodsTable) => {
  initialize.PageNum = 1;
};

// 分页 页码
const handlePageChange = (val: number) => {
  initialize.PageNum = val;
  getGoodsList()
};

// 分页 页数
const handleSizeChange = (val: number) => {
  initialize.PageSize = val;
  getGoodsList()
};

// 编辑 商品
const handleRowEdit = (index: number, row: goods.GoodsTable) => {
  router.push({ name: "goods_add", query: { id: row.id } });
};

// 删除 商品
const handleRowDelete = (index: number, row: goods.GoodsTable) => {
  ElMessageBox.confirm("确定要删除?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
     goodsApi.deletecommodityList(row.id).then(({ data: res }) => {
        if (res.code === 200) {
          ElMessage.success("删除成功");
          getGoodsList()
        } else {
          ElMessage.error("删除失败");
        }
      });
    })
    .catch(() => {});
};

// 搜索商品
const onSubmitFilter = () => {
  initialize.PageNum = 1;
  tableData.value = tableData_c.value.filter(it  => it.name.indexOf(filterGoodsName.value) !== -1)
};

// 获取商品列表数据
const getGoodsList = () => {
  let params = {
    PageNum: initialize.PageNum,
    PageSize: initialize.PageSize,
  }
  goodsApi.getCommodityLists(params).then(({ data: res }) => {
    console.log(res, 'sadasd');
    if (res.code === 200) {
      tableData.value = res.data.list;
      tableData_c.value = res.data.list;
      initialize.total = res.data.total;
    }
  });
};

// 获取商品分类列表
const getCategoryData = () => {
  goodsApi.getCommodityList().then(({data: res}) => {
    if (res.code === 200) categoryData.value = res.data;
    else ElMessage.error("获取失败");
  });
};

// 排序功能 先注释
const sortOrder = (num: number) => {
 console.log(num);
};

// 匹配商品分类名称
const matchCategoryName = (state: string) => {
  return categoryData.value.find(it => it.id === Number(state))?.moduleName
}
onMounted(() => {
  getGoodsList();
  getCategoryData()
});
</script>

<style lang="scss" scoped>
.el-table  {
  padding: 0 20px;
}
.pagination-box {
  margin-top: 20px;
  float: right;
}
.el-button {
  padding: 15px 15px;
}
.sort-width {
  width: 90px;
}
.right {
  float: right;
}
.one-line {
  margin-top: 2px;
  height: 40px;
  margin-right: 20px;
}

.sortBtn {
  margin: 30px 0 10px 0;
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
</style>
