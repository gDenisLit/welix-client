<script setup lang="ts">
import aTooltip from '@/material/a-tooltip.vue'
import { eventBus } from '@/services/event-bus.service'
import { ref } from 'vue'

const viewMode = ref(1700)
const resize = (size: number) => {
    viewMode.value = size
    eventBus.emit('resized', size)
}
</script>

<template>
    <div class="back">
        <a-tooltip placement="bottom" content="Go back">
            <template #payload>
                <router-link class="back-link" to="/template">
                    <font-awesome-icon icon="fa-light fa-arrow-left" />
                </router-link>
            </template>
        </a-tooltip>
    </div>

    <div class="view-port flex items-center">
        <a-tooltip @click="resize(1700)" placement="bottom" content="Switch to desktop">
            <template #payload>
                <div>
                    <font-awesome-icon icon="fa-light fa-display" :class="{ active: viewMode === 1700 }" class="icon" />
                </div>
            </template>
        </a-tooltip>
        <a-tooltip @click="resize(800)" placement="bottom" content="Switch to tablet">
            <template #payload>
                <div>
                    <font-awesome-icon icon="fa-light fa-tablet-screen" :class="{ active: viewMode === 800 }"
                        class="icon" />
                </div>
            </template>
        </a-tooltip>
        <a-tooltip @click="resize(420)" placement="bottom" content="Switch to mobile">
            <template #payload>
                <div>
                    <font-awesome-icon icon="fa-light fa-mobile" :class="{ active: viewMode === 420 }" class="icon" />
                </div>
            </template>
        </a-tooltip>
    </div>
</template>