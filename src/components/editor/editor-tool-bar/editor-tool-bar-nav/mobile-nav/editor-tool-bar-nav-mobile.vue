<script setup lang="ts">
import type { PropType } from 'vue'

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
    <div class="tool-bar-nav__mobile" v-if="tools">
        <div class="tool-bar-nav__mobile__wrapper">
            <div class="mobile-menu-btn" @click.stop="$emit('toggleMobileMenu')" :class="{ open: state?.isMobileMenu }">
                <font-awesome-icon icon="fa-light fa-circle" class="btn-icon" />
                <template v-for="tool in tools">
                    <div :class="`mobile-icon ${tool?.type}`" @click.stop="$emit('setTool', tool?.type)">
                        <font-awesome-icon :icon="tool?.icon" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>