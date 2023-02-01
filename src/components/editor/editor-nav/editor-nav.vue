<script setup lang="ts">
import editorNavBtns from './editor-nav-btns/editor-nav-btns.vue'
import editorNavUrl from './editor-nav-url/editor-nav-url.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
    wapId: String
})
const previewSite = () => {
    const routeData = router.resolve({
        name: 'details',
        params: { wapId: props.wapId },
    })
    window.open(routeData.href, '_blank')
}
</script>

<template>
    <nav class="editor-nav flex items-center">
        <editor-nav-btns />
        <editor-nav-url />
        <span 
            class="preview-site" 
            @click="previewSite"
        >   Preview site →
        </span>
    </nav>
</template>