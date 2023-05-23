<template>
  <div class="goodsAdd">
    <div class="nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'goodsList' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{ goodsInfo.id ? "编辑商品" : "添加商品" }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="goodsRef" :rules="goodsRules" :model="goodsInfo" label-width="120px">
          <el-form-item label="商品分类">
            <el-select class="el-select-class" v-model="goodsInfo.cateId" clearable placeholder="选择商品分类">
              <el-option v-for="item in cateOptions" :key="item.id" :label="item.moduleName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="分类图片" prop="img_url">
            <Upload :btnType="0" @goodsEmit="goodsEmit"></Upload>
          </el-form-item>
          <!-- <el-form-item label="商品轮播图" prop="banner_url">
            <Upload :btnType="1" :limitNums="6" :isMultiple="true" @lbtEmit="lbtEmit"></Upload>
          </el-form-item> -->
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goodsInfo.name" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="商品简介" prop="introduce">
            <el-input type="textarea" v-model="goodsInfo.introduce" :rows="5" style="width: 80%"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item label="商品单位" prop="unit">
            <el-input v-model="goodsInfo.unit" style="width: 100px"></el-input>
            <div class="form-tip" style="margin-left: 20px;color: #c0b9b9">如：件、杯、包、袋</div>
          </el-form-item>
          <el-form-item label="销量" prop="saleNum">
            <el-input-number :controls="false" v-model="goodsInfo.saleNum" style="width: 150px" />
          </el-form-item>
          <el-form-item label="商品规格" class="spec_set">
            <div v-for="(spec, index) in specList" class="spec_box">
              <el-select v-model="spec.specName" placeholder="请选择商品规格" @change="specOnchange(spec.specName, index)" :style="{marginBottom: spec.specName ? '20px' : ''}">
                <el-option v-for="item in spec.specObj.options" :key="item.type" :label="item.label" :value="item.type" />
              </el-select>
              <div v-if="spec.specName">
                <template v-for="item in spec.specObj.typeList">
                  <template v-if="item[spec.specName]">
                    <el-input v-for="(inputName, idx) in (item[spec.specName] ?? [])" :key="idx" v-model="inputName.name" @change="specSonChane(inputName.name, spec.specName, idx)" style="width: 160px; margin: 0 10px 10px 0">
                      <template #suffix>
                        <el-icon class="pointer" @click="deleteSonSpec(spec.specName, idx)"><Delete /></el-icon>
                      </template>
                    </el-input>
                  </template>
                </template>
                <el-button plain type="text" @click="addSonSpec(spec.specName)">新增子规格</el-button>
              </div>
              <el-button class="spec_del" type="danger" :icon="Delete" @click="deleteSpec(index)"></el-button>
            </div>
            <div class="spec_btn_box" >
              <el-button type="primary" @click="addSpecData">新增规格</el-button>
              <SpecTypeDialog :specOptionsList="specOptionsList"></SpecTypeDialog>
            </div>
            <div class="spec-table" v-show="showTable">
              <Specification ref="specRef" :specList="specList" :specOptionsList="specOptionsList" @getSpecTable="getSpecTable"></Specification>
            </div>
          </el-form-item>
          <el-form-item label="属性设置" class="checkbox-wrap">
            <el-checkbox label="新品" name="is_new" v-model="goodsInfo.is_new"></el-checkbox>
          </el-form-item>
          <el-form-item label=" ">
            <el-switch
              active-text="上架"
              inactive-text="下架"
              active-value="1"
              inactive-value="0"
              v-model="goodsInfo.is_on_sale"></el-switch>
          </el-form-item>
          <el-form-item label="商品详情" prop="goods_desc">
            <div class="edit_container">
              <Editor :goodsInfo="(goodsInfo as any)"></Editor>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save(goodsRef)">确定保存</el-button>
            <el-button @click="goBackPage">返回列表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch, watchEffect, computed } from "vue";
import lrz from "lrz";
import moment from "moment";
import fecha from 'fecha'
import { v4 as uuidv4 } from 'uuid'
// import $ from 'jquery'
import Editor from "@/components/Editor.vue";
import Upload from "@/components/Upload.vue";
import Specification from "@/components/Specification.vue";
import SpecTypeDialog from "@/views/Dashboard/Goods/Dialog/specTypeDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import type { FormInstance, UploadProps, UploadUserFile } from 'element-plus'
import { Delete } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import goodsApi from "@/api/goods";
import type * as goods from '@/views/Dashboard/Goods/types/index'

const router = useRouter();
const route = useRoute();

// 轮播图数据
const lbtList = ref<goods.lbtData[]>([]);

const specTableRef = ref('')
// 商品分类
const cateOptions = ref<goods.Category[]>([]);
// 规格类型
const specOptionsList = reactive<goods.specOptions>(
  {
    options: [{ type: '颜色', label: '颜色' }], // 下啦选择规格类型
    typeList: [{ "颜色": [{ name:'黄色' }, { name: '红色' }, { name:'蓝色' }] }] // 子规格
  }
);

// 大的规格
const specList = reactive<goods.specListData[]>([
  {
    specName: '', // 绑定的选择
    specObj: specOptionsList
  }
])

// 表格参数
const tableParmas = ref<goods.tableParmasType[]>([])
const listParams = ref<goods.listParmasArrayType[]>([])

const goodsRef = ref<FormInstance>()
const specRef = ref()
// 商品详情信息
const goodsInfo = reactive({
  cateId: '',
  create_time: '',
  id: route.query.id || uuidv4(),
  name: "",
  img_url: "",
  // banner_url: '',
  introduce: "",
  goods_desc: "",
  is_on_sale: 0,
  is_new: false,
  unit: '',
  product_status: '',
  saleNum: 0
});
// 商品输入规则
const goodsRules = reactive({
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
  introduce: [{ required: true, message: "请输入简介", trigger: "blur" }],
  img_url: [{ required: true, message: "请选择商品图片", trigger: "blur" }]
});

// 获取商品分类列表
const getCategoryData = () => {
  goodsApi.getCommodityList().then(({ data: res }) => {
    if (res.code === 200) cateOptions.value = res.data;
    else ElMessage.error("获取商品分类失败");
  });
};

// 获取商品图片
// UploadUserFile[]
const goodsEmit = (file: any) => {
  goodsInfo.img_url = file[0].url
}

// 获取lbt图片
// const lbtEmit = (file: UploadUserFile[]) => {
//   console.log(file, 'file');
//   // goodsInfo.banner_url = file[0].url?.data
// }

// 规格下拉选择改变 防止重复规格
const specOnchange = (val: string, idx: number) => {
  let count = 0
  specList.forEach((item: { [key: string]: any })=> {
    item.specName === val && count++
  })
  if (count > 1) {
    ElMessage.warning('该规格已存在')
    specList[idx].specName = ''
  }
}

// 删除规格
const deleteSpec = (index: number) => {
  specList.splice(index, 1)
}

// 删除子规格
const deleteSonSpec = (type: string, index: number) => {
  specList[0].specObj.typeList.forEach((it: { [key: string]: any }) => {
    if (it[type]) it[type].splice(index, 1)
  })
}

// 新增子规格
const addSonSpec = (type: string) => {
  let obj = {
    name: ''
  }
  specList[0].specObj.typeList.forEach((it: { [key: string]: any }) => {
    if (it[type]) it[type].push(obj)
  })
}
// 新增规格
const addSpecData = () => {
  let obj = {
    specName: '', // 绑定的选择
    specObj: specOptionsList
  }
  specList.push(obj)
};
// 改变子规格
const specSonChane = (val: string, type: string, idx: number) => {
  specList[0].specObj.typeList.forEach((it: { [key: string]: any }) => {
    // 如果存在同名则重置
    if (it[type]) {
      let num = 0
      it[type].forEach((x: goods.specSonType) => {
        if (x.name === val) num++
      })
      if (num > 1) {
        it[type][idx].name = ''
        ElMessage.warning('有重复子规格')
      }
    }
  })
}
// 返回上一级
const goBackPage = () => {
  router.go(-1);
};
// 转换时间
const formatDate = (val: number) => {
  if (val) {
    return fecha.format(val, 'YYYY-MM-DD HH:mm')
  } else {
    return val || ''
  }
}
// 递归返回result
const getCartesianProduct = (arr: any, result: Array<any> = []): any => {
  if (arr.length === 0) return result
  if (result.length === 0) {
    result = arr[0].map((item: any) => [item])
  } else {
    result = result.flatMap(item => arr[0].map((value: any) => [...item, value]))
  }
  return getCartesianProduct(arr.slice(1), result)
}

const getSpecParams = () => {
  specList.filter((s: any) => s.specName).forEach((spec: any) => {
    spec.specObj.options.forEach((it: { [key: string]: any }) => {
      if (spec.specName === it.label) {
        spec.specObj.typeList.forEach((opt: goods.optionsType) => {
          if (opt[it.type]) {
            const oneSpecList: any = {
              style: []
            }
            opt[it.type].forEach((op: goods.specSonType) => {
              const obj = {
                category: it.type,
                id: uuidv4(),
                img_url: "",
                name: op.name,
                // product_id: goodsInfo.id,
                // state: "",
              }
              oneSpecList.style.push(obj)
            });
            listParams.value.push(oneSpecList)
          }
        });
      }
    })
  })
}
// 获取规格表格table
const getSpecTable = (specTable: any) => {
  const keys = Object.keys(specTable[0]).filter(item => item !== 'price')
  specTable.forEach((item: any) => {
    let obj = {
      style_id: item[keys[0]],
      color_id: item[keys[1]] || '',
      size_id: item[keys[2]] || '',
      price: item.price || 0,
    }
    tableParmas.value.push(obj)
  });
}

const save = (goodsRef: FormInstance | undefined) => {
  console.log(goodsRef, specRef.value, 'goodsRef===========');
  if (!goodsRef) return
  goodsRef.validate((valid) => {
    if (valid) {
      if (goodsInfo.img_url == "" || goodsInfo.img_url == null) {
        ElMessage.error("请上传商品首图!");
        return false;
      }
      // if (lbtList.value.length == 0) {
      //   ElMessage.error("请至少上传一张轮播图!");
      //   return false;
      // }
      // let list = []
      getSpecParams()
      let params: any = {
        commodity: {
          // create_time: formatDate(new Date().getTime()),
          // id: goodsInfo.id,
          img_url: goodsInfo.img_url,
          introduce: goodsInfo.introduce,
          name: goodsInfo.name,
          price: '0',
          product_status: goodsInfo.product_status,
          state: goodsInfo.cateId,
          top: 0
        },
        list: listParams.value,
        table: tableParmas.value
      }
      goodsApi.postAddcommodityLists(params)
        .then(({ data: res }) => {
          if (res.code === 200) {
            ElMessage.success("保存成功");
          } else {
            ElMessage.error("保存失败");
          }
        });
    } else {
      return false;
    }
  });
};
const showTable = computed(() => {
  if (specList.find(it => it.specName)) return true
  return false
})
onMounted(() => {
  getCategoryData();
});
</script>
<style lang="scss" scoped>
.spec_set {
  :deep(.el-form-item__content) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .spec_box {
    position: relative;
    background-color: #fff;
    width: 100%;
    padding: 20px 10px;
  }
  .spec_del {
    position: absolute;
    top: 10px;
    right:70px;
  }
}
:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
  background: #fff;
}

.specFormDialig .el-input {
  width: 150px;
  margin-right: 10px;
}

.el-select-class {
  width: 200px;
  margin-right: 20px;
}

.sepc-form {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.spec-form-wrap {
  margin-top: 0 !important;
}

.add-spec {
  margin-top: 10px;
}

.spec-form-wrap .header {
  display: flex;
  justify-content: flex-start;
}

.spec-form-wrap .header .l {
  width: 200px;
  margin-right: 20px;
}

.spec-form-wrap .header .m {
  width: 200px;
  margin-right: 20px;
}

.spec-form-wrap .header .m {
  width: 200px;
  margin-right: 20px;
}

/*.sepc-form div{*/
/*margin-left: 0;*/
/*}*/

.float-right {
  float: right;
}

.sepc-form .el-input {
  width: 200px;
  margin-right: 20px;
}

.spec_btn_box {
  margin: 20px 0;
  display: flex;
}

.checkbox-wrap{
  .checkbox-list {
    float: left;
    margin-right: 20px;
  }
}
</style>
