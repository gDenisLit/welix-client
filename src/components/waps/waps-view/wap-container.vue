<script setup lang="ts">
import { computed } from 'vue'
import type { Cmp } from '@/models/Cmp.model'
import type { PropType } from 'vue'
import type { Wap } from '@/models/Wap.model'
import wapCard from './wap-card.vue'
import wapList from './wap-list.vue'
import wapReview from './wap-review.vue'
import wapText from './wap-text.vue'
import wapGallery from './wap-gallery.vue'
import wapMap from './wap-map.vue'
import wapContact from './wap-contact.vue'

const props = defineProps({
    cmp: Object as PropType<Cmp>,
    wap: Object as PropType<Wap>
})
const info = computed(() => props.cmp?.info)
</script>

<template>
    <section :style="cmp?.style" :class="cmp?.classes">
        <div class="wap-container__inner">
            <component 
                v-for="currCmp in info.cmps" 
                :key="currCmp.id" 
                :is="currCmp.type" 
                :cmp="currCmp" 
                :wap="wap"
            >
            </component>
        </div>
    </section>
</template>