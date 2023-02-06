<script setup lang="ts">
import { reactive, computed } from 'vue'
import editorToolBarHeader from './editor-tool-bar-header/editor-tool-bar-header.vue'
import editorToolBarNav from './editor-tool-bar-nav/editor-tool-bar-nav.vue'
import elEditor from './el-editor/el-editor.vue'
import editorToolSections from './editor-tool-sections/editor-tool-sections.vue'
import editorToolTheme from './editor-tool-theme/editor-tool-theme.vue'

const state = reactive({
    isOpen: false,
    tool: '',
})

const openTool = (type: string) => {
    if (state.tool === type && state.isOpen) {
        state.isOpen = false
        return
    }
    if (state.isOpen && state.tool !== type) {
        state.tool = type
        state.isOpen = true
        return
    }
    state.isOpen = !state.isOpen
    state.tool = type
}
const openElEdit = () => {
    state.tool = 'edit'
    state.isOpen = true
}
const isEditorOpen = computed(() => {
    return {
        'open-section': state.isOpen && state.tool === 'section',
        'open-edit':
            (state.isOpen && state.tool === 'edit') ||
            (state.isOpen && state.tool === 'theme'),
    }
})
</script>

<template>
    <div class="tool-bar flex">

        <editor-tool-bar-nav 
            @setTool="openTool" 
            :isToolOpen="state.isOpen" 
        />
        <section class="tool-bar-actions" :class="isEditorOpen">
            <editor-tool-bar-header 
                :state="state" 
                @closeTool="state.isOpen = false" 
            />
            <el-editor v-if="state.tool === 'edit'" />
            <editor-tool-sections v-if="state.tool === 'section'" />
            <editor-tool-theme v-if="state.tool === 'theme'" />
        </section>
    </div>
</template>