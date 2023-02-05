<script setup lang="ts">
import type { PropType } from 'vue'
import type { Tool } from '@/models/Tool.model'
import aTooltip from '@/material/a-tooltip.vue'

const props = defineProps({
    tools: Array as PropType<Tool[]>,
    state: Object
})
</script>

<template>
    <ul class="nav-tools clean-list">
        <template v-for="tool in tools">
            <li @click.stop="$emit('setTool', tool.type)" :tool="tool.class" :class="tool.class">
                <a-tooltip placement="right" :content="tool.title">
                    <template #payload>
                        <div>
                            <font-awesome-icon :icon="tool.icon" class="icon" />
                        </div>
                    </template>
                </a-tooltip>
            </li>
        </template>
    </ul>
</template>