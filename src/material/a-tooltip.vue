<script setup lang="ts">
const props = defineProps({
    placement: String,
    content: String
})
</script>

<template>
    <el-tooltip
        class="box-item"
        effect="dark"
        :content="content"
        :placement="placement"
      >
      <slot name="payload"></slot>
    </el-tooltip>
</template>