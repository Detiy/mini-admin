<template>
  <el-button class="margin20" type="primary" @click="addSpecType">规格管理</el-button>
  <el-dialog
    v-model="visible"
    title="常用规格"
    width="50%"
    align-center
    @close="handleClose"
  >
    <div class="spec_item" v-for="(spec, index) in specCustomList.options">
      <p><span style="margin-right: 10px">规格类型</span><span>{{ spec.label }}</span></p>
      <p>
        <span style="margin-right: 10px">具体规格</span>
        <span v-for="item in specCustomList.typeList">
          <template v-if="item[spec.type]">
            <span v-for="it in item[spec.type]">
              <span>{{ it.name }}</span>
            </span>
          </template>
        </span>
      </p>
      <el-button class="spec_del" type="danger" size="small" :icon="Delete" v-if="spec.delShow" @click="delCustom(index)"></el-button>
    </div>
    <div class="addInput" v-show="addShow">
      <p class="flex" style="margin-top:20px">
        <span>规格类型</span>
        <el-input v-model="optionsInput" clearable placeholder="请输入" style="width: 50%;margin-left:20px;" />
        <span style="margin-left: 10px;color: red"> *必填</span>
      </p>
      <p class="flex" style="margin-top:20px">
        <span>具体规格</span>
        <el-input v-model="typeListInput" clearable placeholder="请输入" style="width: 70%;margin-left:20px" />
      </p>
      <div class="flex" style="margin-top:20px;padding-left: 20px;">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="new_btn" @click="addCustom">添加常用规格</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, watch } from 'vue'
import { Delete } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus';

const props = defineProps({
  specOptionsList: {
    type: Object,
    default: {}
  }
})
const visible = ref(false)
const addShow = ref(false)
const optionsInput = ref()
const typeListInput = ref()
const specCustomList = ref(props.specOptionsList)
watch(specCustomList.value, (val) => {
  if (val) {
    val.options.forEach((it: { [key: string]: any })=> {
      it.delShow = it.type === 'color' ? false : true
    })
  }
})

// 打开弹窗
const addSpecType = () => {
  visible.value = true
}
const handleClose = () => {
  visible.value = false
}
// 删除自定义的规格
const delCustom = (index: number) => {
  specCustomList.value.options.splice(index, 1)
  specCustomList.value.typeList.splice(index, 1)
}
// 添加自定义的规格
const addCustom = () => {
  if (specCustomList.value.options.length > 2) {
    ElMessage.warning('目前最多只支持三种规格')
    return
  }
  addShow.value = true
}
// 取消
const reset = () => {
  addShow.value = false
  optionsInput.value = ''
  typeListInput.value = ''
}
// 确认
const confirm = () =>{
  if (!optionsInput.value) {
    ElMessage.warning('请输入规格类型')
    return false
  }
  let optionsObj = {
    type: optionsInput.value,
    label: optionsInput.value,
    // delShow: true
  }
  let typeListObj = {
    [optionsInput.value]: [
      {name: typeListInput.value}
    ]
  }
  // 规格类型比较
  specCustomList.value.options.forEach((it: { [key: string]: any }) => {
    // 如果存在同名则重置
    console.log(it, '规格类型不能相同');
    if (it.label === optionsInput.value) {
      ElMessage.warning('规格类型不能相同, 请重新输入')
      optionsInput.value = ''
    }
  })
  if (optionsInput.value === '') return false
  addShow.value = false
  typeListInput.value = ''
  optionsInput.value = ''
  specCustomList.value.options.push(optionsObj)
  specCustomList.value.typeList.push(typeListObj)
}
</script>
<style lang="scss" scoped>
.spec_item {
  position: relative;
  background:rgba(0, 0, 0, .04);
  padding: 10px;
  margin: 10px 0;
  .spec_del {
    position:absolute;
    top:50%;
    transform: translateY(-50%);
    right: 20px;
    display: none;
  }
  &:hover {
    .spec_del {
      display: block;
    }
  }
}
.addInput {
  background:rgba(0, 0, 0, .04);
  padding: 10px;
}
.dialog-footer {
  border-top: 1px solid #e8f3ff;
  .cancel {
    margin-right: 10px;
  }
  .new_btn {
    float: left;
    margin-bottom: 10px;
  }
}
</style>
