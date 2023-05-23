<template>
  <div class="container">
    <sidebar></sidebar>
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Sidebar from "@/components/Sidebar.vue";
</script>
<style scoped>
body {
  background: #f5f7fa;
  display: block;
}

.container {
  height: 100%;
  width: 100%;
}

.content {
  box-sizing: border-box;
  padding: 20px 20px 20px 220px;
  min-height: 700px;
  overflow: auto;
}

.footer {
  margin-top: 10px;
  text-align: center;
  line-height: 30px;
  color: #999;
  display: block;
}
</style>
