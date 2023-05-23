<template>
  <el-upload
    v-model:file-list="fileList"
    :multiple="isMultiple"
    :limit="limitNums"
    action=""
    :list-type="'picture-card'"
    :on-preview="handlePictureCardPreview"
    :on-change="onChangeImage"
    :on-remove="handleRemove">
    <el-icon>
      <el-button v-if="!props.btnType" size="small" type="primary">点击上传</el-button>
      <Plus v-if="props.btnType"/>
    </el-icon>
    <template #tip>
      <div class="el-upload__tip">图片尺寸: 最大尺寸不能超过2MB</div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import { ElMessage, ElMessageBox} from 'element-plus'
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import goodsApi from '@/api/goods';

const props = defineProps({
  // 类型 0 按钮 1 +
  btnType: {
    type: Number,
    default: 0
  },
  // 限制数量
  limitNums: {
    type: Number,
    default: 1
  },
  // 是否可以多传
  isMultiple: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['lbtEmit', 'goodsEmit'])
const fileList = ref<UploadUserFile[]>([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

// 选择图片
const onChangeImage: UploadProps["onChange"] = async (file: any) => {
  const fileName = file.name.substring(0, file.name.lastIndexOf("."));
  let fileType = file.name.replace(fileName + ".", ""); // 得到文件类型
  const fileRaw = file.raw
  const imgArr = [
    "jpeg",
    "gif",
    "png",
    "bmp",
    "jpg",
    "JPEG",
    "PNG",
    "GIF",
    "BMP",
    "JPG",
  ];
  // 过滤非图片时
  if (imgArr.indexOf(fileType) === -1) {
    ElMessage.error("请上传图片");
    return false;
  }
  // 文件名称不可超过100个字符
  if (fileName.length > 100) {
    return ElMessage.warning("文件名称不可超过100个字符");
  }
  let size = (file.size as number) / 1024 / 1024;
  // 附件的限制
  if (size > 2) {
    return ElMessage.warning("图片大小不能超过2MB!");
  }
  let formDatas = new FormData()
  formDatas.append('file', fileRaw)
  if (file.status === 'ready') {
    await goodsApi.postUploadImage(formDatas).then(({ data: res }) => {
      console.log(res, 'img');
      let obj = {
        name: fileName,
        url: res.data
      }
      fileList.value.push(obj)
    })
  }
  // 回传图片
  emits(props.btnType === 0 ? 'goodsEmit' : 'lbtEmit', fileList.value)
};
// 删除图片的提示
const onRemoveHandler = (index: number) => {
  // ElMessageBox.confirm("确定删除该图片?", "提示", {
  //   confirmButtonText: "确定",
  //   cancelButtonText: "取消",
  //   type: "warning",
  // })
  //   .then(() => {
  //     let arr = lbtList;
  //     arr[index].is_delete = 1;
  //   })
  //   .catch(() => {});
};
// 移除
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  onRemoveHandler(1)
};
// 预览
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
</script>
<style scoped></style>
