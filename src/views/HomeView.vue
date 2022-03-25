<template>
  <div class="home">
    <div>ada</div>
    <a-layout >按钮c</a-layout>
    <!-- <a-button type='primary' @click="handleChangeColor">按钮</a-button> -->
    <a-button type='ghost' @click="jump">按钮</a-button>
    <a-radio>Radio</a-radio>
    <a href="">管理</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HomeView',
  components: {
    ALayout: Layout
  },
  setup() {
    const router = useRouter()
    console.log(1234)
    const jump = () => {
      router.push('/test')
    }

    return {
      jump
    }
  }
})
</script>
