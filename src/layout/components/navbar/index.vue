<template>
  <div class='navbar-wrapper'>
    <div class="collapse-container">
      <menu-unfold-outlined
        v-if="isCollapse"
        class="collapse-trigger"
        @click="toggleSideBar"
      />
      <menu-fold-outlined v-else class="collapse-trigger" @click="toggleSideBar" />
    </div>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-setting">
      <a-dropdown>
        <div class="ant-dropdown-link" @click.prevent>
          <img class="avatar" :src="avatar" alt="">
          <caret-down-outlined />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <div @click="changeSetting">布局设置</div>
            </a-menu-item>
            <a-menu-item>
              <div>修改密码</div>
            </a-menu-item>
            <a-menu-item>
              <div>退出登录</div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

  </div>
</template>

<script lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined
} from '@ant-design/icons-vue'
import { defineComponent, computed } from 'vue'
import appStore from '@/store/app'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import avatar from '@/assets/images/avatar.png'
import settingsStore from '@/store/settings'

export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CaretDownOutlined,
    Breadcrumb
  },
  setup() {
    const sidebar = computed(() => appStore.getState().sidebar)
    const isCollapse = computed(() => !sidebar.value.opened)
    const toggleSideBar = () => {
      appStore.toggleSidebar()
    }

    const changeSetting = () => {
      settingsStore.changeSetting('showSettings', true)
    }

    return {
      isCollapse,
      toggleSideBar,
      avatar,
      changeSetting,
      settingsStore
    }
  }
})
</script>
<style lang="less" scoped>

.navbar-wrapper {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding-right: 20px;
}
.collapse-container {
  float: left;
  .collapse-trigger {
    font-size: 18px;
    line-height: 56px;
    padding: 0 16px 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: var(--theme);
    }
  }

}
.breadcrumb-container {
  float: left;
}
.right-setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: right;
  height: 50px;
  .avatar {
    width: 40px;
    height: 40px;
  }
}

</style>
