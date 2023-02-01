<script setup lang="ts">
import { wapService } from '@/services/wap.service';
import { onMounted, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { id } = route.params

let wap = shallowRef()
onMounted(async () => {
    wap.value = await wapService.getById(id)
})
</script>

<template>
</template>