<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
    <header class="main-header main-layout full">
        <div class="screen full" @click="toggleMenu" v-if="isMenuOpen"></div>
        <div class="header__inner flex justify-between items-center">
            <section class="logo-wrapper">
                <slot name="logo"></slot>
            </section>
            <section class="nav-wrapper">
                <slot name="nav-links"></slot>
            </section>
        </div>
    </header>
</template>