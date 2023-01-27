<script setup lang="ts">
import homePageLayout from '@/layouts/home-page/home-page.layout.vue'
import appHeader from '@/components/app/app-header/app-header.vue'
import appHero from '@/components/app/app-hero/app-hero.vue'
</script>

<template>
    <home-page-layout>
        <template #header>
            <app-header />
        </template>
        <template #hero>
            <app-hero />
        </template>
    </home-page-layout>
</template>