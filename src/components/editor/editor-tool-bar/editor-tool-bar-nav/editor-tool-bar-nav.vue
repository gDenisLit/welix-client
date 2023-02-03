<script setup lang="ts">
import { ref, reactive } from 'vue'
import editorToolBarNavMobile from './mobile-nav/editor-tool-bar-nav-mobile.vue'
import editorToolBarNavTools from './tools/editor-tool-bar-nav-tools.vue'
import editorToolBarNavActions from './actions/editor-tool-bar-nav-actions.vue'
import { utilService } from '@/services/util.service'

const emit = defineEmits([
    'setTool', 'saved'
])
const props = defineProps({
    isToolOpen: Boolean
})

const tools = ref(utilService.getEditorTools())
const state = reactive({
    activeTool: '',
    isMobileMenu: false
})

const toggleMobileMenu = () => {
    state.isMobileMenu = !state.isMobileMenu
}
const setTool = (type: string) => {
    toggleMobileMenu()
    state.activeTool = type
    emit('setTool', type)
}
</script>

<template>
    <editor-tool-bar-nav-mobile 
        :tools="tools" 
        :state="state" 
        @setTool="setTool" 
    />
    <div class="tool-bar-nav flex flex-column justify-between">
        <div class="top">
            <editor-tool-bar-nav-tools 
                :tools="tools" 
                :state="state" 
                @setTool="setTool" 
            />
        </div>
        <div class="bottom">
            <editor-tool-bar-nav-actions />
        </div>
    </div>
</template>