<script setup lang="ts">
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
            <a-tooltip @click="copyUrl" placement="right">
                <template #title><span>Work together</span></template>
                <div><font-awesome-icon icon="fa-light fa-people-group" class="icon" /></div>
            </a-tooltip>
        </li>
        <li>
            <a-tooltip @click="saveWap" placement="right">
                <template #title><span>Publish site</span></template>
                <div><font-awesome-icon class="icon" icon="fa-light fa-airplay" /></div>
            </a-tooltip>
        </li>
    </ul>
</template>