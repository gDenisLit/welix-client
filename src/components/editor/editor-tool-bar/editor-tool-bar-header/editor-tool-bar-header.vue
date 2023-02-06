<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    state: Object
})
const title = computed(() => {
    switch (props.state?.tool) {
        case 'section':
            return 'Add Section'
        case 'edit':
            return 'Edit'
        case 'theme':
            return 'Pick a theme'
    }
})
</script>

<template>
    <div class="tool-bar-actions__header flex justify-between">
        <h2>{{ title }}</h2>

        <p class="close" @click="$emit('closeTool')">
            <font-awesome-icon icon="fa-light fa-xmark-large" />
        </p>
    </div>
</template>