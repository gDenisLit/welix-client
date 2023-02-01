<script setup lang="ts">
import aTooltip from '@/material/a-tooltip.vue'
import { eventBus } from '@/services/event-bus.service'
import backBtn from '@/material/back-btn.vue'
import { ref } from 'vue'

const viewMode = ref(1700)
const btns = ref([
    {
        id: 'btn-101',
        content: 'Switch to desktop',
        icon: 'fa-light fa-display',
        class: { active: viewMode.value === 1700 },
        size: 1700,
    },
    {
        id: 'btn-102',
        content: 'Switch to tablet',
        icon: 'fa-light fa-tablet-screen',
        class: { active: viewMode.value === 800 },
        size: 800,
    },
    {
        id: 'btn-103',
        content: 'Switch to mobile',
        icon: 'fa-light fa-mobile',
        class: { active: viewMode.value === 420 },
        size: 420,
    }
]
)
const resize = (size: number) => {
    viewMode.value = size
    eventBus.emit('resized', size)
}
</script>

<template>
    <back-btn to="/template" content="Go Back"/>
    <div class="view-port flex items-center">
        <template v-for="btn in btns">
            <a-tooltip 
                @click="resize(btn.size)" 
                placement="bottom" 
                :content="btn.content"
            >
                <template #payload>
                    <div>
                        <font-awesome-icon 
                            :icon="btn.icon" 
                            :class="btn.class" 
                            class="icon" 
                        />
                    </div>
                </template>
            </a-tooltip>
        </template>
    </div>
</template>