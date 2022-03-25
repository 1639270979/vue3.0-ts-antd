<template>
  <div v-if="!menuInfo.meta.hidden">
    <a-sub-menu :key="menuInfo.path">
      <template #icon><mail-outlined /></template>
      <template #title>{{ menuInfo?.meta?.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <template #icon>
              <pie-chart-outlined />
            </template>
            {{ item?.meta?.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-sub-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  PieChartOutlined,
  MailOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    PieChartOutlined,
    MailOutlined
  }
  // setup() {

  // }
})
</script>

<style lang="less">
.ant-menu-submenu-vertical {
  .ant-menu-title-content {
    display: none;
  }
  .ant-menu-submenu-arrow {
    display: none;
  }
}
.ant-menu-vertical .ant-menu-submenu-title {
    text-overflow: unset;
  }
</style>
