<script setup lang="ts">
import { computed } from 'vue'
// import { useStore } from 'vuex'
import appHeaderLayout from '@/layouts/app-header/app-header-layout.vue'
import welixLogo from '@/material/welix-logo.vue'
import navLinks from '../nav-links/nav-links.vue'

// const store = useStore()
// const user = computed(() => store.getters.getUser)
</script>

<template>
    <app-header-layout>
        <template #logo>
            <welix-logo />
        </template>
        <template #nav-links>
            <nav-links />
        </template>
    </app-header-layout>
</template>