<script setup lang="ts">
import aTooltip from '@/material/a-tooltip.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const cmp = computed(() => {
    return store.getters.cmpToEdit
})
const el = computed(() => {
    return store.getters.elToEdit
})
const type = computed(() => {
    return el.value?.type ? 'el-editor' + el.value.type : ''
})

const undo = () => {
    store.dispatch({ type: 'undo' })
}
const redo = () => {
    store.dispatch({ type: 'redo' })
}
const updateCmp = (payload: any) => {
    const { style, link, url, urls } = payload

    const { key, idx } = el.value

    const copyCmp = JSON.parse(JSON.stringify(cmp.value))

    if (key) {
        if (style) {
            if (idx === null) {
                copyCmp.info[key].style = style
            } else {
                copyCmp.info[key][idx].style = style
            }
        }

        if (url) {
            copyCmp.info[key].url = url
        }

        if (urls) {
            copyCmp.info[key].urls = urls
        }

        if (link) {
            copyCmp.info[el.value.key].link = link
        }
    } else {
        copyCmp.style = style
    }

    const newCmp = JSON.parse(JSON.stringify(copyCmp))
    store.commit({ type: 'setCmpToEdit', cmp: newCmp })
    store.dispatch({ type: 'updateCmp', newCmp })
}
const removeCmp = () => {
    store.dispatch({ type: 'removeCmp', cmpId: cmp.value.id })
}
const duplicateCmp = () => {
    store.dispatch({ type: 'duplicateCmp', cmpId: cmp.value.id })
}
</script>

<template>
    <section class="el-editor">
        <component v-if="type" :is="type" @edited="updateCmp" @removedCmp="removeCmp" @duplicatedCmp="duplicateCmp"
            :cmp="cmp"></component>
        <div v-else class="el-editor-inner">
            <h2>Pick an element to edit</h2>
        </div>
        <div class="flex items-center justify-center m-2">
            <a-tooltip placement="bottom" content="Undo">
                <template #payload>
                    <font-awesome-icon @click="undo" icon="fa-light fa-share fa-flip-horizontal"
                        class="undo icon fa-flip-horizontal" />
                </template>
            </a-tooltip>
            <a-tooltip placement="bottom" content="Redo">
                <template #payload>
                    <font-awesome-icon @click="redo" icon="fa-light fa-share" class="undo icon" />
                </template>
            </a-tooltip>
        </div>
    </section>
</template>