<template>
  <div>
    <el-table :data="specData" border :header-cell-style="{background:'#f5f7fa'}" stripe style="width: 100">
      <el-table-column label="序号" type="index" width="80" style="text-align: center" />
      <el-table-column label="ID" type="index" width="80" style="text-align: center" />
      <el-table-column v-for="(item, index) in objectList" :key="index" :label="item.key" :prop="item.key">
        <template #default="{ row }">
          <span>{{ getPropValue(row, item.key) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" type="index" :width="column.type === 2 ? '80' : '200' " style="text-align: center">
        <template #default="scope">
          <el-input v-if="column.type === 0" size="middle" v-model="scope.row[column.prop]" placeholder="请输入" @input="changeSpecData"/>
          <el-input-number v-else :controls="false" size="middle" v-model="scope.row[column.prop]" placeholder="请输入" @input="changeSpecData"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, defineProps, watch, nextTick, defineEmits } from 'vue'
import type * as goods from '@/views/Dashboard/Goods/types/index'


const props = defineProps({
  specList: {
    type: Array,
    default: []
  },
  specOptionsList: {
    type: Object,
    default: []

  }
})
const emits = defineEmits(['getSpecTable'])
// 规格表格
const specData = reactive<goods.specDataType[]>([]);
// 动态渲染的列表表头
const objectList = reactive<goods.objectListType[]>([])
  // 列表数据 (写死的)
const columns: Array<goods.columnType> =  reactive([
  // {
  //   prop: 'value',
  //   label: '型号/规格 (10件/箱)',
  //   type: 0
  // },
  {
    prop: 'price',
    label: '成本 (元)',
    type: 1
  },
  // {
  //   prop: 'retail',
  //   label: '零售 (元)',
  //   type: 1
  // },
  // {
  //   prop: 'weight',
  //   label: '重量 (kg)',
  //   type: 1
  // },
  // {
  //   prop: 'stock',
  //   label: '库存',
  //   type: 1
  // }
])
// 拿到每一个子规格的name
const getPropValue = (row: goods.specDataType, key: string) => {
  const obj = props.specOptionsList.typeList.find((item: goods.optionsType) => Object.keys(item)[0] === key)
  const value = obj[key].find((item: goods.specSonType) => item.name === row[key])
  return value?.name
}

// 渲染列表
const generateTableData = () => {
  specData.splice(0, specData.length) // 重置
  const keys = objectList.map(item => item.key)
  const cartesians = getCartesianProduct(keys.map(key => props.specOptionsList.typeList.find((item: goods.objectListType) => Object.keys(item)[0] === key)[key]))
  const filteredCartesians = cartesians.filter((cartesian: any) => cartesian.every((obj: goods.specSonType) => obj.name !== ''))
  for (const cartesian of filteredCartesians) {
    const item: any = {}
    keys.forEach((key, index) => {
      item[key] = cartesian[index].name
    })
    specData.push(item)
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
// 回传给父组件 列表的值
const changeSpecData = () => {
  emits('getSpecTable', specData)
}
watch(props.specList, (val) => {
  if (val) {
    objectList.splice(0, objectList.length)
    props.specList.filter((s: any) => s.specName).forEach((spec: any) => {
      spec.specObj.options.forEach((it: { [key: string]: any }) => {
        if (spec.specName === it.label) {
          if (!objectList.find(x => x.key === it.label)) {
            let colObj = {
              key: it.label
            }
            objectList.push(colObj)
          }
        }
      })
    })
  }
})
watch([props.specOptionsList, objectList], ([val, val1],[oVal, oVal1] ) => {
  if (val !== val1 || oVal !== oVal1) {
    nextTick(() => {
      generateTableData()
    })
  }
})
</script>
<style scoped>
  .el-table  {
    max-height: 450px;
    overflow: scroll;
  }
</style>