<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup lang="ts"></script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  background: #f5f7f9;
  font-family: Lato, Helvetica, sans-serif;
}
.nav .breadcrumb {
  height: 40px;
  line-height: 40px;
  flex: 1;
  color: #8492a6;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 20px;
}
.pointer {
  cursor: pointer;
}
.flex {
  display: flex;
}
</style>
