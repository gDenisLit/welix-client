<script setup lang="ts">
import { store } from '@/store';

const props = defineProps({
    user: Object || null
})
const logout = () => {
    store.dispatch('logout')
}
</script>

<template>
    <router-link class="header-link link-mid" to="/template">Templates</router-link>
    <router-link class="header-link link-dashboard" v-if="user" to="/dashboard">backoffice</router-link>
    <router-link class="header-link link-signup" v-if="!user" to="/login">Log in</router-link>
    <router-link class="header-link" v-if="user" to="/" @click="logout">Log out</router-link>
    <img v-if="user" class="user-img" :src="user.img" alt="" />
</template>