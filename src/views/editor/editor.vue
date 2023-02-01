<script setup lang="ts">
import wapEditorLayout from '@/layouts/wap-editor/wap-editor.layout.vue'
import editorHeader from '@/components/editor/editor-header/editor-header.vue'
import editorNav from '@/components/editor/editor-nav/editor-nav.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const router = useRouter()

const { id } = route.params
store.dispatch({ type: 'loadWap', id })
const wap = computed(() => store.getters.getCurrWap)
</script>

<template>
    <wap-editor-layout>
        <template #header>
            <editor-header />
        </template>
        <template #nav>
            <editor-nav />
        </template>
    </wap-editor-layout>
</template>