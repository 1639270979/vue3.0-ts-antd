<template>
  <a-drawer
    :title="title"
    placement="right"
    :closable="false"
    :visible="visible"
    :close="close"
  >
    <slot />
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    // const afterVisibleChange = (bool: boolean) => {
    //   console.log('visible', bool)
    // }

    const close = () => {
      context.emit('close', false)
    }

    return {
      // afterVisibleChange,
      close
    }
  }
})
</script>
