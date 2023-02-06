<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
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
const filterBy = ref('')

const title = computed(() => {
    const label = labels.value.find(label => label.selected)
    return (label) ? label.title : ''
})

const getChildPayload = (idx: number) => {
    if (props.cmps) return props.cmps[idx]
}
const setFilter = (filterBy: string, idx: number) => {
    labels.value.forEach(label => (label.selected = false))
    labels.value[idx].selected = true
    store.commit({ type: 'setFilter', filterBy })
}
const setSelectFilter = (idx: number) => {
    const { type } = labels.value[idx]
    setFilter(type, idx)
}
</script>

<template>
    <section class="flex sections">
        <div class="tool-bar-actions__labels flex flex-column">
            <div class="tool-bar-actions__label flex items-center" v-for="(label, idx) in labels" :key="label.id"
                :class="{ selected: label.selected }">
                <span class="tool-bar-actions__label-text" :class="{ selected: label.selected }"
                    @click="setFilter(label.type, idx)">
                    {{ label.title }}
                </span>
                <!-- <span class="mark-active" :class="{ selected: label.selected }"></span> -->
            </div>
        </div>

        <div class="tool-bar-actions__options flex flex-column">
            <div class="tool-bar-actions__options-filter">
                <a-select ref="select" class="select-filter" placeholder="All" @select="setSelectFilter">
                    <a-select-option v-for="(label, idx) in labels" :key="label.id" :value="idx">{{
                        label.title
                    }}</a-select-option>
                </a-select>
            </div>
            <p class="tool-bar-actions__options-title">{{ title }}</p>
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