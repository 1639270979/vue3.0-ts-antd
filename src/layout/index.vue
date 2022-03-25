<template>
  <div class="layout">
    <sidebar  class="sidebar-container" :style="{ width: barWidth }"></sidebar>
    <div class="main-container" :style="{ 'margin-left': barWidth }">
      <div :class="{ 'fixed-header': fixedHeader }"  :style="{ width: `calc(100% - ${barWidth}` }">
        <navbar></navbar>
      </div>
      <app-main></app-main>
    </div>
    <right-drawer title='设置' :visible="visible" @close="close">
      <settings></settings>
    </right-drawer>
  </div>
</template>
<script lang="ts">

import Sidebar from './components/sidebar/index.vue'
import { defineComponent, computed } from 'vue'
import appStore from '@/store/app'
import settingsStore from '@/store/settings'
import RightDrawer from '@/components/RightDrawer/index.vue'
import Settings from './components/Settings/index.vue'
import AppMain from './components/AppMain/index.vue'
import Navbar from './components/navbar/index.vue'

export default defineComponent({
  components: {
    Sidebar,
    Navbar,
    AppMain,
    RightDrawer,
    Settings
  },
  setup() {
    const sidebar = computed(() => appStore.getState().sidebar)
    const fixedHeader = computed(() => settingsStore.getState().fixedHeader)
    const visible = computed(() => settingsStore.getState().showSettings)

    const barWidth = computed(() => {
      if (!sidebar.value.opened) {
        // 关闭时，右侧内容主题left设置为默认的54
        return '54px !important'
      } else {
        return '230px !important'
      }
    })
    const close = () => {
      settingsStore.changeSetting('showSettings', false)
    }

    return {
      visible,
      barWidth,
      fixedHeader,
      close
    }
  }
})
</script>
<style lang='less' scoped>
.layout {
  flex-direction: row;
  height: 100%;
  .sidebar-container {
    transition: width 0.28s;
    width: 200px !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    // box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  }
  .main-container {
    transition: all 0.28s;
  }
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
}
</style>
<style>
.lay-trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.lay-trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
