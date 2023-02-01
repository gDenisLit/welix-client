<script setup lang="ts">
import type { PropType } from 'vue'
import type { Wap } from '@/models/Wap.model'
import wapHeader from '@/components/waps/waps-view/wap-header.vue'
import wapNav from '@/components/waps/waps-view/wap-nav.vue'
import wapHero from '@/components/waps/waps-view/wap-hero.vue'
import wapGallery from '@/components/waps/waps-view/wap-gallery.vue'
import wapList from '@/components/waps/waps-view/wap-list.vue'
import wapCard from '@/components/waps/waps-view/wap-card.vue'
import wapContainer from '@/components/waps/waps-view/wap-container.vue'
import wapReview from '@/components/waps/waps-view/wap-review.vue'
import wapText from '@/components/waps/waps-view/wap-text.vue'
import wapFooter from '@/components/waps/waps-view/wap-footer.vue'
import wapContact from '@/components/waps/waps-view/wap-contact.vue'
import wapMap from '@/components/waps/waps-view/wap-map.vue'

const props = defineProps({
    wap: Object as PropType<Wap>
})

interface Cmps {
    [cmp: string]: object
}
const cmps: Cmps = {
    'wap-header': wapHeader,
    'wap-nav': wapNav,
    'wap-hero': wapHero,
    'wap-gallery': wapGallery,
    'wap-list': wapList,
    'wap-card': wapCard,
    'wap-container': wapContainer,
    'wap-review': wapReview,
    'wap-text': wapText,
    'wap-footer': wapFooter,
    'wap-contact': wapContact,
    'wap-map': wapMap
}
</script>

<template>
    <component 
        v-for="cmp in wap?.cmps" 
        :is="cmps[cmp.type]" 
        :cmp="cmp" 
        :wap="wap"
    />
</template>
