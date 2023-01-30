<script setup lang="ts">
import appHeaderLayout from '@/layouts/app-header/app-header-layout.vue'
import welixLogo from '@/material/welix-logo.vue'
import navLinks from '../nav-links/nav-links.vue'

const props = defineProps({
    user: Object
})
</script>

<template>
    <app-header-layout>
        <template #logo>
            <welix-logo />
        </template>
        <template #nav-links>
            <nav-links :user="user" />
        </template>
    </app-header-layout>
</template>