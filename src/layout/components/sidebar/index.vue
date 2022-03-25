<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="isCollapse"
    @click="change"
    style="width: 256px"
  >
    <sub-menu v-for="item in sidebarRouters" :key="item.path" :menu-info="item" />
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed, onMounted, watch } from 'vue'
import permissionStore from '@/store/permission'
import SubMenu from './subMenu.vue'
import { useRoute, useRouter } from 'vue-router'
import appStore from '@/store/app'

interface SelectType {
  openKeys: string[]
  selectedKeys: string[]
}

export default defineComponent({
  setup() {
    const state = reactive<SelectType>({
      openKeys: [],
      selectedKeys: []
    })
    const collapsed = ref(false)
    const router = useRouter()
    const route = useRoute()

    // 获取侧边栏路由
    const sidebarRouters = computed(
      () => permissionStore.getState().sidebarRouters
    )

    // 获取侧边栏状态 - 打开 or 收起
    const sidebar = computed(() => appStore.getState().sidebar)
    const isCollapse = computed(() => !sidebar.value.opened)

    const handleSide = () => {
      const { meta, path, matched } = route
      if (meta.activeMenu) {
        return [meta.activeMenu]
      }
      let openKeys: string[] = []
      if (matched && matched.length > 0) {
        openKeys = matched.map((item) => {
          return item.path
        })
      }
      // 点击菜单， 不收起其他菜单
      state.openKeys = [...state.openKeys, ...openKeys]
      // 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
      // state.openKeys = openKeys
      state.selectedKeys = [path]
    }

    // 初始化获取获取侧边栏状态openKeys和selectedKeys
    onMounted(() => {
      handleSide()
    })

    // 监听路由变化，用于实时获取侧边栏状态openKeys和selectedKeys
    watch(
      () => router.currentRoute.value.path,
      () => {
        // 要执行的方法
        handleSide()
      }
    )

    const change = (data:any) => {
      router.push(data.key)
    }

    return {
      ...toRefs(state),
      collapsed,
      isCollapse,
      sidebarRouters,
      change
    }
  },
  components: {
    SubMenu
  }
})
</script>
