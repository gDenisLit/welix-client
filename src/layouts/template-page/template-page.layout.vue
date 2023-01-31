<script setup lang="ts">
</script>

<template>
    <section class="template">
        <slot name="header"></slot>
        <section class="template__wrapper main-layout">
            <div class="template__inner">
                <div class="headings">
                    <h2 class="template-heading">
                        <slot name="heading"></slot>
                       
                    </h2>
                    <h3 class="template-subheading">
                        <slot name="sub-heading"></slot>
                     
                    </h3>
                </div>
                <slot name="wap-list"></slot>
            </div>
        </section>
    </section>
</template>