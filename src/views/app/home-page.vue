<script setup lang="ts">
import homePageLayout from '@/layouts/home-page/home-page.layout.vue'
import appHeader from '@/components/app/app-header/app-header.vue'
</script>

<template>
    <home-page-layout>
        <template #header>
            <app-header />
        </template>
        <!-- <template #hero>
            <hero />
        </template> -->
    </home-page-layout>
</template>