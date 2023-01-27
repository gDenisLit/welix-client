<script setup lang="ts">
</script>

<template>
    <section class="home-page">
        <div class="bg-cover-hero"></div>
        <div class="top-wrapper full main-layout">
            <slot name="header"></slot>
            <slot name="hero"></slot>
        </div>
    </section>
</template>