<script setup lang="ts">
import type { PropType } from 'vue'
import type { Wap } from '@/models/Wap.model'
import wapPreview from '../wap-preview/wap-preview.vue'

const props = defineProps({
    waps: Array as PropType<Wap[]>
})

</script>

<template>
    <ul class="wap-list-container" v-if="waps">
        <li v-for="wap in waps" :key="wap._id">
            <wap-preview 
                :wap="wap" 
                @editWap="(wap) => $emit('editWap', wap)"
                @previewWap="(wapId) => $emit('previewWap', wapId)" 
            />
        </li>
    </ul>
</template>