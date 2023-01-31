<script setup lang="ts">
import type { PropType } from 'vue'
import type { Wap } from '@/models/Wap.model'

const props = defineProps({
    wap: Object as PropType<Wap>
})
</script>

<template>
    <component v-for="cmp in wap?.cmps" :is="cmp.type" :cmp="cmp" :wap="wap" :key="cmp.id"></component>
</template>