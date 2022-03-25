<template>
  <div>
    <div class='item'>

       <div>主题颜色</div>
      <color-picker v-model="color" @change="handleChangeColor"></color-picker>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import ColorPicker from '@/components/colorPicker/index.vue'
import settingsStore from '@/store/settings'

export default defineComponent({
  components: {
    ColorPicker
  },
  setup() {
    const color = computed(() => settingsStore.getState().theme)
    const handleChangeColor = (value: any) => {
      (window as any).less
        .modifyVars({
          'primary-color': value
          // 'btn-primary-bg': '#5d72cc'
        })

      settingsStore.changeSetting('theme', value)
      document.documentElement.style.setProperty('--theme', value)
    }

    return {
      handleChangeColor,
      color
    }
  }
})
</script>

<style lang="less" scoped>
.item {

     display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
