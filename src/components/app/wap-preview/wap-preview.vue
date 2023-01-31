<script setup lang="ts">
import type { PropType } from 'vue'
import type { Wap } from '@/models/Wap.model'

const props = defineProps({
    wap: Object as PropType<Wap>
})
</script>

<template>
    <div class="wap-preview" v-if="wap">
        <div class="wap-preview-img">
            <div class="wap-preview-btns">
                <a @click="$emit('editWap', wap)">Edit</a>
                <a @click="$emit('previewWap', wap?._id)">View</a>
            </div>
            <img :src="wap.imgUrl" alt="" />
        </div>
        <p>{{ wap.type }}</p>
    </div>
</template>