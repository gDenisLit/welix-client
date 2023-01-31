<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import type { Wap } from '@/models/Wap.model'
import { wapService } from '@/services/wap.service'
import wapDetailsLayout from '@/layouts/wap-details/wap-details.layout.vue'
import wapDetails from '@/components/editor/wap-details/wap-details.vue'

const route = useRoute()
const { id } = route.params

let wap: Wap
onMounted(async () => {
    wap = await wapService.getById(id)
})

const getWap = computed(() => {
    return wap
})

const getClass = computed(() => {
    return wap.class
})
</script>

<template>
    <wap-details-layout v-if="getWap" :class="getClass">
        <template #wap>
            <wap-details :wap="getWap" />
        </template>
    </wap-details-layout>
</template>