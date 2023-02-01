<script setup lang="ts">
</script>

<template>
    <section class="editor flex flex-column">
        <slot name="header"></slot>
        <slot name="nav"></slot>
        <section class="editor-main flex">
            <slot name="tool-bar"></slot>
            <slot name="wap"></slot>
            <slot name="pointer"></slot>
        </section>
    </section>
</template>