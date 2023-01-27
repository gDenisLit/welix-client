<script setup lang="ts">
</script>

<template>
    <section class="main-hero main-layout full">
        <div class="hero__inner">
            <div class="text-box">
                <h1 class="hero-heading">
                    <slot name="heading"></slot>
                </h1>
                <h2 class="hero-subheading">
                    <slot name="sub-heading"></slot>
                </h2>
                <router-link class="hero-btn" to="/template">
                    <slot name="action"></slot>
                </router-link>
            </div>
            <div class="hero-img">
                <img src="https://res.cloudinary.com/duvwxwtot/image/upload/v1659104964/sprint%204/hero3_vjlfr7.svg"
                    alt="">
            </div>

        </div>
    </section>
</template>

