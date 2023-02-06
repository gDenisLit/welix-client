<script setup lang="ts">
import { reactive } from 'vue'
import editorToolBarNavMobile from './cmps/editor-tool-bar-nav-mobile.vue'
import editorToolBarNavTools from './cmps/editor-tool-bar-nav-tools.vue'
import editorToolBarNavActions from './cmps/editor-tool-bar-nav-actions.vue'
import { utilService } from '@/services/util.service'

const emit = defineEmits([
    'setTool'
])
const props = defineProps({
    isToolOpen: Boolean
})

const state = reactive({
    activeTool: '',
    isMobileMenu: false
})
const tools = utilService.getEditorTools(state, props)


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