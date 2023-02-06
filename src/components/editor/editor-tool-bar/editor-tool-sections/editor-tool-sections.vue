<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Container, Draggable } from 'vue3-smooth-dnd'
import type { PropType } from 'vue'
import type { Cmp } from '@/models/Cmp.model'

const store = useStore()
const props = defineProps({
    cmps: Array as PropType<Cmp[]>
})
const labels = ref([
    { id: 'label00', title: 'All', type: '', selected: false },
    {
        id: 'label01',
        title: 'Headers',
        type: 'wap-header',
        selected: true,
    },
    { id: 'label02', title: 'Heros', type: 'wap-hero', selected: false },
    {
        id: 'label03',
        title: 'Contact',
        type: 'wap-contact',
        selected: false,
    },
    {
        id: 'label04',
        title: 'Sections',
        type: 'wap-container',
        selected: false,
    },
    {
        id: 'label05',
        title: 'Testimonials',
        type: 'wap-review',
        selected: false,
    },
    { id: 'label07', title: 'Text', type: 'wap-text', selected: false },
    { id: 'label06', title: 'About', type: 'wap-footer', selected: false },
    {
        id: 'label06',
        title: 'Gallery',
        type: 'wap-gallery',
        selected: false,
    },
])

const title = computed(() => {
    const label = labels.value.find(label => label.selected)
    return (label) ? label.title : ''
})
const cmps = computed(() => {
    return store.getters.getCmps
})

const getChildPayload = (idx: number) => {
    if (props.cmps) return props.cmps[idx]
}
const setFilter = (filterBy: string, idx: number) => {
    labels.value.forEach(label => (label.selected = false))
    labels.value[idx].selected = true
    store.dispatch({ type: 'setFilterBy', filterBy })
}
</script>

<template>
    <section class="editor-tool-sections flex ">

        
        <div class="editor-tool-sections__labels flex flex-column">

            <div class="editor-tool-sections__label flex items-center" v-for="(label, idx) in labels" :key="label.id"
                :class="{ selected: label.selected }">
                <span class="editor-tool-sections__label-text" :class="{ selected: label.selected }"
                    @click="setFilter(label.type, idx)">{{ label.title }}
                </span>
            </div>
        </div>

        <div class="editor-tool-sections__options flex flex-column">
            <p class="editor-tool-sections__options-title">{{ title }}</p>

            <Container :get-child-payload="getChildPayload" group-name="1" behaviour="copy">
                <Draggable v-for="cmp in cmps" :key="cmp.id" @click.stop>
                    <div class="cmp-preview">
                        <img v-if="cmp.thumbnail" :src="cmp.thumbnail" alt="" />
                        <img v-else src="@/assets/img/omnifood-header.png" alt="" />
                    </div>
                </Draggable>
            </Container>
        </div>
    </section>
</template>