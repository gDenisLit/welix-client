<script setup lang="ts">
import aTooltip from '@/material/a-tooltip.vue'

const emit = defineEmits([
    'saved'
])
const saveWap = () => {
    emit('saved')
}
const copyUrl = () => {
    const currPath = window.location.href
    navigator.clipboard.writeText(currPath)
}
</script>

<template>
    <ul>
        <li>
            <a-tooltip @click="copyUrl" placement="right" content="Work together">
                <template #payload>
                    <font-awesome-icon icon="fa-light fa-people-group" class="icon" />
                </template>
            </a-tooltip>
        </li>
        <li>
            <a-tooltip @click="saveWap" placement="right" content="Publish site">
                <template #payload>
                    <font-awesome-icon class="icon" icon="fa-light fa-airplay" />
                </template>
            </a-tooltip>
        </li>
    </ul>
</template>