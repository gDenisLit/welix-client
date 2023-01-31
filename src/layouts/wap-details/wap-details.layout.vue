<script setup lang="ts">
const props = defineProps({
    class: String
})
</script>

<template>
    <section class="wap-details" :class="class">
        <slot name="wap"></slot>
    </section>
</template>