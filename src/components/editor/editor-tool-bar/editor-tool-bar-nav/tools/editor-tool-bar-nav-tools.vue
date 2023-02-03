<script setup lang="ts">
import type { PropType } from 'vue'
import aTooltip from '@/material/a-tooltip.vue'

type Tool = {
    type: string,
    class: string,
    title: string,
    icon: string
}
const props = defineProps({
    tools: Array as PropType<Tool[]>,
    state: Object
})
</script>

<template>
    <ul class="clean-list">
        <template v-for="tool in tools">
            <li 
                @click.stop="$emit('setTool', tool.type)" 
                :tool="tool.class" 
                :class="JSON.parse(tool.class)"
            >
                <a-tooltip 
                    placement="right" 
                    :content="tool.title"
                >
                    <template #payload>
                        <div>
                            <font-awesome-icon 
                                :icon="tool.icon" 
                                class="icon" 
                            />
                        </div>
                    </template>
                </a-tooltip>
            </li>
        </template>
    </ul>
</template>