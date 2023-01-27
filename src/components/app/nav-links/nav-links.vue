<script setup lang="ts">
const props = defineProps({
    user: Object || null
})
</script>

<template>
    <router-link class="header-link link-mid" to="/template">Templates</router-link>
    <router-link class="header-link link-dashboard" v-if="user" to="/dashboard">backoffice</router-link>
    <router-link class="header-link link-login" v-if="!user" to="/login">log in</router-link>
    <router-link class="header-link link-signup" v-if="!user" to="/signup">sign up</router-link>
    <img v-if="user" class="user-img" :src="user.img" alt="" />
</template>