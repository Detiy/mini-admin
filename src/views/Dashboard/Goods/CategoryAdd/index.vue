<template>
  <div class="GoodsAdd">
    <div class="nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'category' }">商品设置</el-breadcrumb-item>
        <el-breadcrumb-item>{{
          categoryInfo.id ? "编辑分类" : "添加分类"
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <div class="backList">
        <el-button type="primary" @click="cancel" icon="arrow-left"
          >返回列表</el-button
        >
      </div>
      <div class="form-table-box">
        <el-form
          ref="categoryForm"
          :rules="categoryRules"
          :model="categoryInfo"
          style="max-width: 500px"
          label-width="120px">
          <el-form-item label="分类名称" prop="name" width="80px">
            <el-input v-model="categoryInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="简短介绍">
            <el-input
              type="textarea"
              v-model="categoryInfo.introduce"
              :rows="1"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <!-- <el-form-item
            :class="{ img_form: categoryInfo.img_url }"
            label="分类图片"
            prop="img_url">
            <div class="img_preview">
              <img
                v-if="categoryInfo.img_url"
                :src="categoryInfo.img_url"
                class="image_show" />
              <el-button
                v-if="categoryInfo.img_url"
                size="small"
                class="remove_btn"
                type=""
                :icon="Delete"
                @click.prevent="removeImage" />
              <div class="shadow"></div>
            </div>
            <el-upload
              v-if="!categoryInfo.img_url"
              class="u_category"
              name="file"
              action=""
              :file-list="fileList"
              :limit="1"
              :on-change="onChangeImage">
              <el-button size="small" type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">图片尺寸: 最大尺寸不能超过30MB</div>
              </template>
            </el-upload>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="save(categoryForm)">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { UploadProps, UploadUserFile, FormInstance, FormRules } from "element-plus"
import { Delete } from "@element-plus/icons-vue";
import goodsApi from "@/api/goods/index";

const router = useRouter();
const route = useRoute();

const categoryForm = ref<FormInstance>();
const fileList = ref<UploadUserFile[]>([]);
// 商品信息
const categoryInfo = reactive({
  id: 0, // id
  name: "", // moduleName
  introduce: "", // 介绍
  img_url: "", // 图片地址
  sort_order: 100, // 排序
  icon_url: "", // icon地址
});
// 商品分类规则
const categoryRules = reactive<FormRules>({
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
  introduce: [{ required: true, message: "请输入简介", trigger: "blur" }],
  img_url: [{ required: true, message: "请选择分类图片", trigger: "blur" }],
  icon_url: [{ required: true, message: "请选择分类图标", trigger: "blur" }],
});
// 选择图片
const onChangeImage: UploadProps["onChange"] = (file) => {
  const fileName = file.name.substring(0, file.name.lastIndexOf("."));
  let fileType = file.name.replace(fileName + ".", ""); // 得到文件类型
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
  if (size > 30) {
    return ElMessage.warning("图片大小不能超过30MB!");
  }
  const reader = new FileReader();
  reader.readAsDataURL(file.raw as Blob);
  reader.onload = () => {
    categoryInfo.img_url = reader.result as string;
  };
};
// 删除图片
const removeImage = () => {
  categoryInfo.img_url = "";
};
// 取消
const cancel = () => {
  router.go(-1);
};
// 保存
const save = async (categoryForm: FormInstance | undefined) => {
  if (!categoryForm) return
  await categoryForm.validate((valid) => {
    if (valid) {
      console.log(valid, categoryInfo, 'valid');
      let params = {
        moduleName: categoryInfo.name
      }
      goodsApi.postAddcommodityList(params).then((res) => {
        if (res.data.code === 200) {
          ElMessage.success("保存成功");
          router.go(-1);
        } else {
          ElMessage.error("保存失败");
        }
      });
    } else {
      return false;
    }
  });
};
// const getInfo = () => {
//   if (categoryInfo.id <= 0) {
//     return false;
//   }
//   //加载分类详情
//   let that = this;
//   axios
//     .get("category/info", {
//       params: {
//         id: that.categoryInfo.id,
//       },
//     })
//     .then((res) => {
//       let resInfo = res.data.data;
//       console.log(resInfo);
//       let data = {
//         name: "分类图",
//         url: resInfo.img_url,
//       };
//       fileList.push(data);
//       let iconData = {
//         name: "图标",
//         url: resInfo.icon_url,
//       };
//       // fileList2.push(iconData);
//       that.categoryInfo = resInfo;
//     });
// };

onMounted(() => {
  categoryInfo.id = Number(route.query.id) || 0;
  // getInfo();
});
</script>
<style lang="scss" scoped>
.backList {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.img_form {
  :deep(.el-form-item__content) {
    flex-direction: column;
    align-items: flex-start;
    line-height: normal;
    .img_preview {
      position: relative;
      .remove_btn,
      .shadow {
        display: none;
      }
      &:hover {
        .shadow {
          display: block;
          height: 100%;
          width: 100%;
          background-color: #333;
          opacity: 0.3;
          position: absolute;
          top: 0;
        }
        .remove_btn {
          cursor: pointer;
          display: block;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
          z-index: 2;
          background: transparent;
          color: #fff;
          font-size: 22px;
          border:none;
        }
      }
    }
  }
}
.image-uploader {
  height: 105px;
  .el-upload {
    border: 1px solid #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #20a0ff;
    }
  }
  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 105px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }
}
.image_show {
  background-color: #f8f8f8;
  min-width: 120px;
  height: 120px;
  display: block;
}
</style>
