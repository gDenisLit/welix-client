<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import wapEditorLayout from '@/layouts/wap-editor/wap-editor.layout.vue'

const store = useStore()
const route = useRoute()

const { id } = route.params
store.dispatch({ type: 'loadWap', id })
const wap = computed(() => store.getters.getCurrWap)
</script>

<template>
    <wap-editor-layout>
        <template #header>
            <h1>Wap editor!</h1>
        </template>
    </wap-editor-layout>
</template>