<template>
  <span :endTime="endTime" :callback="callback" :endText="endText">
    <slot>
      {{ content }}
    </slot>
  </span>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
const content = ref("");
const endTime = ref("");
const props = defineProps({
  endText: {
    type: String,
    default: "已结束",
  },
  callback: {
    type: Function,
    default: "",
  },
});
onMounted(() => {
  getInfoData();
});
const getInfoData = () => {
  axios.get("index").then((response: any) => {
    console.log(response);
    let time = response.data.data.timestamp;
    endTime.value = time.toString();
    countdowm(endTime.value);
  });
};
const countdowm = (timestamp: string) => {
  let timer = setInterval(function () {
    let nowTime = new Date();
    let endTime = new Date(timestamp * 1000);
    let t = endTime.getTime() - nowTime.getTime() - 10;
    if (t > 0) {
      let day = Math.floor(t / 86400000);
      let hour = Math.floor((t / 3600000) % 24);
      let min = Math.floor((t / 60000) % 60);
      let sec = Math.floor((t / 1000) % 60);
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      let format = "";
      if (day > 0) {
        format = `${day}天${hour}小时${min}分${sec}秒`;
      }
      if (day <= 0 && hour > 0) {
        format = `${hour}小时${min}分${sec}秒`;
      }
      if (day <= 0 && hour <= 0) {
        format = `${min}分${sec}秒`;
      }
      content.value = format;
    } else {
      clearInterval(timer);
      content.value = props.endText;
      _callback();
    }
  }, 1000);
};
const _callback = () => {
  if (props.callback && props.callback instanceof Function) {
    props.callback();
  }
};
</script>
<style></style>
