<template>
  <QuillEditor
    v-model="props.goodsInfo.goods_desc"
    ref="myQuillEditor"
    class="editer"
    :content="myContent"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @ready="onEditorReady($event)">
  </QuillEditor>
</template>
<script lang="ts" setup>
import { defineProps, reactive, ref } from "vue";

import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import imageResize from "quill-image-resize-module";

Quill.register("modules/ImageDrop", ImageDrop);
Quill.register("modules/imageResize", imageResize);

const props = defineProps({
  goodsInfo: {
    type: <any>Array,
    default: [],
  },
});
// 工具栏配置项
const toolbarOptions = [
  // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ["bold", "italic", "underline", "strike"],
  // 引用  代码块-----['blockquote', 'code-block']
  ["blockquote", "code-block"],
  // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ header: 1 }, { header: 2 }],
  // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ list: "ordered" }, { list: "bullet" }],
  // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ script: "sub" }, { script: "super" }],
  // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ indent: "-1" }, { indent: "+1" }],
  // 文本方向-----[{'direction': 'rtl'}]
  [{ direction: "rtl" }],
  // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ size: ["small", false, "large", "huge"] }],
  // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ color: [] }, { background: [] }],
  // 字体种类-----[{ font: [] }]
  [{ font: [] }],
  // 对齐方式-----[{ align: [] }]
  [{ align: [] }],
  // 清除文本格式-----['clean']
  ["clean"],
  // 链接、图片、视频-----['link', 'image', 'video']
  ["image", "video"],
];
const myContent = ref('')
const editorOption = {
  modules: {
    toolbar: toolbarOptions,
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: false,
    },
    ImageDrop: true,
    imageResize: {
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
      },
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  },
  theme: 'snow',
  placeholder: '请输入正文',
}

const onEditorBlur = (editor: Event) => {
  console.log("editor blur!", editor);
};
const onEditorReady = (editor: Event) => {
  console.log("editor ready!", editor);
};
</script>
<style scoped>
.editer {
  height: 500px;
}
</style>
